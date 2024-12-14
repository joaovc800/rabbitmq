import amqp from 'amqplib'
import { randomUUID } from 'crypto'

async function exclusive() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    channel.prefetch(3)
    await channel.assertQueue('exclusive', {
        exclusive: true
    })

    channel.consume('exclusive', (data) => {
        console.log(data.content.toString())
        setTimeout(() => {
            channel.ack(data)
        }, 1000)
    })

    //Adicionando mensagens a uma fila temporária
    for (let index = 0; index < 10; index++) {
        channel.publish('', 'exclusive', Buffer.from(`MENSAGEM EXCLUSIVA - ${randomUUID()}`))
    }
}

exclusive()