const NotesHandler = require("./handler");
const routes = require("./routes");

// membuat plugin notes
module.exports = {
  name: "notes",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);

    // mendaftarkan route pada server, routes akan mengembalikan arrayof route, dimana fungsi ini membutuhkan handler (notesHandler)
    server.route(routes(notesHandler));
  },
};
