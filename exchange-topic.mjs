import amqp from 'amqplib'

async function exchangeTopic() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertExchange('system_exchange', 'topic')
    await channel.assertQueue('system_logs')
    await channel.assertQueue('system_errors')

    await channel.bindQueue('system_logs', 'system_exchange', 'logs.#')
    await channel.bindQueue('system_errors', 'system_exchange', '#.erro')

    channel.publish('system_exchange', 'logs.system.info', Buffer.from('Sistema iniciado'))
    channel.publish('system_exchange', 'logs.system.erro', Buffer.from('Erro no sistema'))

    await channel.close()
    await connection.close()

}

exchangeTopic()