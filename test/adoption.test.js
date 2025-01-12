import supertest from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";

// Configuramos el requester
const requester = supertest("http://localhost:8080");

describe("Router de Adopciones", () => {
    describe("GET /api/adoptions", () => {
        it("Me debería retornar una lista de adopciones", async () => {
            const { status } = await requester.get("/api/adoptions");

            expect(status).to.equal(200);
        });

        it("Me retorna 404 si la ruta no existe", async () => {
            const { status } = await requester.get("/adoptions/noexiste");
            expect(status).to.equal(404);
        });

        it("Buscamos que me retorne la info de una adopción existente", async () => {
            let aid = "6782e513ec286bb3fd5cc8be";

            const { status } = await requester.get(`/api/adoptions/${aid}`);
            expect(status).to.equal(200);
        });

        it("Nos debería retornar 404 si la adopción no existe", async () => {
            let noExisteAid = "67626d05a3f6fa3a7145f729";
            const { status } = await requester.get(`/api/adoptions/${noExisteAid}`);

            expect(status).to.equal(404);
        });

        it("Vamos a crear una adopción", async () => {
            let uid = "674ca7455f59d5a67ca33bf9"; // Este ID quedo para testear
            let pid = "674ca7405f59d5a67ca33be8"; // Este también

            // Agregar validación  para asegurar que los IDs son válidos
            if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)) {
                return expect.fail("El UID o el PID tienen un formato inválido.");
            }

            const { status } = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);
        });
    });
});
