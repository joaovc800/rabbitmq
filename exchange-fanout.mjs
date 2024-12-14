import amqp from 'amqplib'
import { randomUUID } from 'crypto'

async function exchangeFanout() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste',
        vhost: 'fanout-example'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertExchange('notifications', 'fanout')

    await channel.assertQueue('email_notification')
    await channel.assertQueue('sms_notification')
    await channel.assertQueue('push_notification')

    await channel.bindQueue('email_notification', 'notifications', '')
    await channel.bindQueue('sms_notification', 'notifications', '')
    await channel.bindQueue('push_notification', 'notifications', '')

    channel.publish('notifications', '', Buffer.from(`Sua conta teve uma atividade suspeita - ${randomUUID()}`))

    await channel.close()
    await connection.close()

}

exchangeFanout()