const ClientError = require("../../exceptions/ClientError");

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(req, h) {
    try {
      this._validator.validateUserPayload(req.payload);

      const { username, password, fullname } = req.payload;

      const userId = await this._service.addUser({
        username,
        password,
        fullname,
      });

      const response = h.response({
        status: "success",
        message: "User berhasil ditambahkan",
        data: {
          userId,
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

      const response = h.response({
        status: "fail",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });

      response.code(500);
      console.log(error);
      return response;
    }
  }

  async getUserByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const user = await this._service.getUserById(id);

      return {
        status: "success",
        data: {
          user,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: "fail",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });

      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = UsersHandler;
