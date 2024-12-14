import amqp from 'amqplib'

async function maxLength() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    //Após 10s remove da fila
    await channel.assertQueue('max_length', {
        maxLength: 1000
    })

    for (let index = 0; index < 1200; index++) {
        channel.publish('', 'max_length', Buffer.from('Minha mensage' + (index + 1)))
    }
    
}

maxLength()