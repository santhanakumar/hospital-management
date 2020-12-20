const Hapi = require("@hapi/hapi");
const dbSetup = require("./database/setup");
const routes = require("./routes/index");

const init = async () => {
  await dbSetup();
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: { cors: true },
  });
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  });
  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
