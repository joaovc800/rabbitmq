import amqp from 'amqplib'

async function consumer() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertQueue('minha_fila', {
        durable: true
    })

    await channel.prefetch(200)

    channel.consume('max_length', (data) => {
        console.log(data.content.toString())
        setTimeout(() => {
            channel.ack(data)
        }, 5000)
    })
}

consumer()