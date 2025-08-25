import express from "express";
import routes from "./src/routes/routes";

const app = express();
const port = 3000;
const routes = require("./src/routes/routes");

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
});