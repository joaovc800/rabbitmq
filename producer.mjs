import amqp from 'amqplib'

async function producer() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    //Definindo a fila - criando se não existir
    await channel.assertQueue('minha_fila', {
        durable: true
    })

    //Enviando mensagens via publish
    for (let index = 0; index < 100; index++) {
        channel.publish('', 'minha_fila', Buffer.from('Minha mensagem' + index))
    }

    //Fechando o canal e conexão
    await channel.close()
    await connection.close()
}

setInterval(producer, 5000)