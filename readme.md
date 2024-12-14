# Explorando o RabbitMQ com Node.js

![Node.js Logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)
![RabbitMQ Logo](https://www.rabbitmq.com/img/rabbitmq-logo.svg)
![Docker Logo](https://upload.wikimedia.org/wikipedia/commons/6/64/Docker_logo.png)

Neste repositório, realizei alguns testes com o RabbitMQ, utilizando o Node.js como **producer** e **consumer**. Durante os testes, aprendi bastante sobre o fluxo de filas e exchanges do RabbitMQ.

Abaixo estão os passos para rodar o projeto localmente:

## Pré-requisitos

Antes de rodar os exemplos, é necessário instalar as dependências do Node.js e subir o RabbitMQ utilizando o Docker.

### 1. Instalar as dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```


### 2. Subir o RabbitMQ com Docker

Para subir o RabbitMQ com a interface gráfica de gerenciamento, utilize o `docker-compose`:

```bash
docker-compose up -d
```

Isso irá iniciar o RabbitMQ com a interface de gerenciamento acessível através de `http://localhost:15672/`.

### 3. Executando os Exemplos

Após a instalação das dependências e o RabbitMQ em funcionamento, você pode rodar os arquivos de exemplo para testar diferentes funcionalidades do RabbitMQ.

#### Exemplos de Exchanges

As exchanges são responsáveis por rotear as mensagens para as filas. Execute os arquivos abaixo para testar diferentes tipos de exchanges:

- **Direct Exchange**: Roteamento simples com base na chave de roteamento.
```bash
node ./exchange-direct.mjs
```

- **Fanout Exchange**: Roteamento de mensagens para todas as filas vinculadas.
```bash
node ./exchange-fanout.mjs
```


- **Headers Exchange**: Roteamento baseado em cabeçalhos de mensagens.
```bash
node ./exchange-headers.mjs
```


- **Topic Exchange**: Roteamento baseado em padrões de chave de roteamento.
```bash
node ./exchange-topic.mjs
```



- **Exchange Binding**: Como as exchanges podem ser vinculadas a filas.
```bash
node ./exchange-binding.mjs
```


#### Exemplos de Propriedades das Filas

As filas no RabbitMQ podem ter várias propriedades configuráveis. Execute os arquivos abaixo para ver exemplos de diferentes propriedades de filas:

- **Auto-Delete**: A fila será excluída automaticamente quando não houver consumidores.
```bash
node ./queues/auti-delete.mjs
```


- **Durable**: A fila será preservada mesmo após reiniciar o RabbitMQ.
```bash
node ./queues/durable.mjs
```

- **Exclusive**: A fila é exclusiva para a conexão que a criou.
```bash
node ./queues/exclusive.mjs
```


- **Max-Length**: Limita o número de mensagens na fila.
```bash
node ./queues/max-length.mjs
```


- **Max-Priority**: Define a prioridade máxima das mensagens na fila.
```bash
node ./queues/max-priority.mjs
```


- **Message TTL (Time-to-Live)**: Define o tempo de vida das mensagens na fila.
```bash
node ./queues/messageTTL.mjs
```

#### Producer (Produtor)

O produtor envia mensagens para o RabbitMQ. Para rodar o exemplo de produtor, execute:
```bash
node ./producer.mjs
```


#### Consumer (Consumidor)

O consumidor recebe as mensagens enviadas para as filas. Para rodar o exemplo de consumidor, execute:
```bash
node ./consumer.mjs
```

## Conclusão

Este repositório oferece exemplos práticos de como trabalhar com o RabbitMQ usando Node.js. Com esses exemplos, você poderá entender como funcionam as exchanges, filas e como produzir e consumir mensagens de maneira eficiente.
