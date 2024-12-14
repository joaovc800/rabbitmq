import amqp from 'amqplib'

async function exchangeDirect() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    //Criando a exchange
    channel.assertExchange('my_exchange', 'direct')

    //Criar fila
    await channel.assertQueue('push_notification', {
        durable: true
    })

    await channel.assertQueue('email_notification', {
        durable: true
    })

    //Binding - linkar a fila com a exchange
    await channel.bindQueue('push_notification', 'my_exchange', 'newNotify')
    await channel.bindQueue('email_notification', 'my_exchange', 'newNotify')


    //Publicando a mensangem com routekey
    channel.publish('my_exchange', 'newNotify', Buffer.from('teste mensagem'))

    await channel.close()
    await connection.close()

}

exchangeDirect()