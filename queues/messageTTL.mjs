import amqp from 'amqplib'

async function messageTTL() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    //Após 10s remove da fila
    await channel.assertQueue('message_ttl', {
        messageTtl: 10000
    })

    channel.publish('', 'message_ttl', Buffer.from('Minha mensage de 10s'))
}

messageTTL()