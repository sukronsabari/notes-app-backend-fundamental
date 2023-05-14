const routes = (handler) => [
  {
    method: "POST",
    path: "/export/notes",
    handler: (req, h) => handler.postExportNotesHandler(req, h),
    options: {
      auth: "notesapp_jwt",
    },
  },
];

module.exports = routes;
