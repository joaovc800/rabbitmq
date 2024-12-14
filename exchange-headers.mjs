import amqp from 'amqplib'

async function exchangeHeaders() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertExchange('notify_headers', 'headers')

    await channel.assertQueue('email_notification')
    await channel.assertQueue('sms_notification')
    await channel.assertQueue('push_notification')

    await channel.bindQueue('email_notification', 'notify_headers', '', {
        'notification_type': 'email'
    })

    await channel.bindQueue('sms_notification', 'notify_headers', '', {
        'notification_type': 'sms'
    })

    await channel.bindQueue('push_notification', 'notify_headers', '', {
        'notification_type': 'push'
    })

    channel.publish('notify_headers', '', Buffer.from('Meu Header'), {
        headers: {
            'notification_type': 'sms'
        }
    })

    await channel.close()
    await connection.close()

}

exchangeHeaders()