import amqp from 'amqplib'

async function maxPriority() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'filas-teste'
    })

    //Criando canal de comunicação
    const channel = await connection.createChannel()

    await channel.assertQueue('priority', {
        maxPriority: 5
    })

    //for (let index = 0; index < 10; index++) {
        //channel.publish('', 'priority', Buffer.from('Mensagem padrão sem prioridade')) 
    //}

    //Coloca no inicio da fila como prioridade, quanto maior o numero maior a prioridade
    channel.publish('', 'priority', Buffer.from('Mensagem padrão com prioridade'), {
        priority: 1
    })

    //Fechando o canal e conexão
    await channel.close()
    await connection.close()
}

maxPriority()