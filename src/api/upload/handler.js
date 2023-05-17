const ClientError = require("../../exceptions/ClientError");

class UploadHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUploadImageHandler(req, h) {
    try {
      // mendapatkan berkas yang dikirim (dalam bentuk ReadbleStream)
      const { data } = req.payload;

      // memastikan objek headers memiliki content-type yang sesuai
      this._validator.validateImageHeaders(data.hapi.headers);

      // this._service.writeFile(file, meta);
      const filename = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        status: "success",
        data: {
          fileLocation: filename,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UploadHandler;
