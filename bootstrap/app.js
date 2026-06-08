import dotenv from "dotenv";
import initRelations from "../database/relations.js";

export default function app() {

    /** Inicializar variáveis de ambiente */
    dotenv.config({
        quiet: true
    });

    process.env.JWT_SECRET = process.env.JWT_SECRET || "petshop-dev-secret";
    process.env.NODE_WEB_PORT = process.env.NODE_WEB_PORT || "3000";

    /** Relacionamentos */
    initRelations();
}
