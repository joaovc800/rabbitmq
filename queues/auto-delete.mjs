import amqp from 'amqplib'

async function autoDelete() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    //await channel.assertQueue('autodelete', {
        //autoDelete: true
    //})

    //channel.publish('', 'autodelete', Buffer.from('Minha fila auto-delete'))

    //Fila auto-delete quando todos os consumidores para a fila se auto-deleta
    await channel.prefetch(10)
    channel.consume('autodelete', (data) => {
        console.log(data.content.toString())
    })
}

autoDelete()