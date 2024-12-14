import amqp from 'amqplib'

async function producerQueueDurableAndNotDurable() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertQueue('durable', {
        durable: true
    })

    await channel.assertQueue('not_durable', {
        durable: false
    })

    channel.publish('', 'durable', Buffer.from('Mensagem durável'), {
        persistent: true
    })
    
    channel.publish('', 'not_durable', Buffer.from('Mensagem não durável'))

    //Fechando o canal e conexão
    await channel.close()
    await connection.close()
}

producerQueueDurableAndNotDurable()