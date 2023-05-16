const path = require("node:path");

const routes = (handler) => [
  {
    method: "POST",
    path: "/upload/images",
    handler: (req, res) => handler.postUploadImageHandler(req, res),
    options: {
      payload: {
        // konfigurasi agar routes hanya menerima payload berupa multipart/form-data
        allow: "multipart/form-data",
        multipart: true,

        // konfigurasi agar hapi mengubah buffer payload (berkas yang dikirim) menjadi readableStream
        output: "stream",
      },
    },
  },
  // route yang menangani berkas statis
  // Jika ada permintaan seperti /upload/images/contoh.jpg, maka plugin inert akan
  // mencari berkas pada directory file/images/contoh.jpg dan mengirimkannya sebagai respons ke klien.
  {
    method: "GET",
    // jika akan permitaan ke path dengan awalan /upload/*
    path: "/upload/{param*}",
    handler: {
      directory: {
        // carikan berkas statis pada directory 'file'
        path: path.resolve(__dirname, "file"),
      },
    },
  },
];

module.exports = routes;
