const ClientError = require("../../exceptions/ClientError");

class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;
  }

  async postCollaborationHandler(req, h) {
    try {
      this._validator.validateCollaborationPayload(req.payload);

      // memerikasa userId yang berada pada token yang (yang mengirim req), apakah merupakan owner apa bukan
      const { id: credentialId } = req.auth.credentials;
      const { noteId, userId } = req.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);

      // menambahkan collaborator
      const collaborationId = await this._collaborationsService.addCollaborator(
        noteId,
        userId
      );

      const response = h.response({
        status: "success",
        message: "Kolaborasi berhasil ditambahkan",
        data: {
          collaborationId,
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

  async deleteCollaborationHandler(req, h) {
    try {
      this._validator.validateCollaborationPayload(req.payload);

      // memerikasa userId yang berada pada token yang (yang mengirim req), merupakan owner apa bukan
      const { id: credentialId } = req.auth.credentials;
      const { noteId, userId } = req.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);

      // menghapus collaborations jika req yang dikirim merupakan berasal dari owner
      await this._collaborationsService.deleteCollaboration(noteId, userId);

      return {
        status: "success",
        message: "Kolaborasi berhasil dihapus",
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

module.exports = CollaborationsHandler;
