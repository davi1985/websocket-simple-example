//index.js
const app = require("./app");
const appWs = require("./app-ws");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App Express is running!`);
});

const wss = appWs(server);

setInterval(() => {
  const status = {
    1: "APPROVED",
    2: "REFUSED",
    3: "WAITING",
  };

  wss.broadcast({
    proposalId: Math.ceil(Math.random() * 100),
    status: status[Math.ceil(Math.random() * 3)],
  });
}, 2000);
