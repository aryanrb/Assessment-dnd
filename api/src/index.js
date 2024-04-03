const app = require("./app");
const config = require("./config");
const io = require("./config/socket");

app.listen(config.port, () => console.log(`Listening to port ${config.port}`));
io.listen(8000, () => console.log("io running"));
