import express from "express";
import routes from "./src/routes/routes.js";
import { sequelize } from "./models/Modelos.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
}).catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
});

try{
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
});
} catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
}
