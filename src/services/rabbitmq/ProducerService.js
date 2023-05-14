const amqp = require("amqplib");

// const ProducerService = {
//   sendMessage: async (queue, message) => {
//     // connect ke rabbitmq server
//     const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

//     // membuat channel untuk mengirim dan menerima pesan
//     const channel = await connection.createChannel();

//     // cek queue, jika tidak ada akan otomatis dibuat
//     await channel.assertQueue(queue, {
//       durable: true,
//     });

//     // mengirim pesan ke message broker(rabbitmq)
//     channel.sendToQueue(queue, Buffer.from(message));

//     // direkomendasikan untuk menutup koneksi setelah pengiriman selesai
//     setTimeout(() => {
//       connection.close();
//     }, 1000);
//   },
// };

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;
