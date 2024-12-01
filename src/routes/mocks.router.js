import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js"
import MockingService from "../services/mocking.js";
import UserModel from "../dao/models/User.js";
import PetModel from "../dao/models/Pet.js";

const router = Router();

// Endpoint para generar e insertar datos simulados de usuarios y mascotas
router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;

  // Validación de parámetros
  if (!Number.isInteger(users) || users <= 0 || !Number.isInteger(pets) || pets <= 0) {
    return res.status(400).send({ status: "error", message: "Los parámetros 'users' y 'pets' deben ser números enteros positivos." });
  }

  try {
    // 1. Generar mascotas simuladas
    const generatedPets = await MockingService.generateMockingPets(pets);
    const insertedPets = await PetModel.insertMany(generatedPets);

    // 2. Generar usuarios simulados
    const generatedUsers = await MockingService.generateMockingUser(users);

    // 3. Asignar mascotas a los usuarios y guardar en la base de datos
    for (let i = 0; i < generatedUsers.length; i++) {
      const user = generatedUsers[i];

      // Asignar un número aleatorio de mascotas a cada usuario
      const numPets = Math.floor(Math.random() * 5); // Hasta 5 mascotas por usuario
      user.pets = insertedPets.slice(i * numPets, (i + 1) * numPets).map(pet => ({ _id: pet._id }));

      // Insertar usuario con mascotas asignadas
      await UserModel.create(user);
    }

    res.send({
      status: "success",
      message: `Se han generado e insertado ${users} usuarios y ${pets} mascotas en la base de datos.`,
    });
  } catch (error) {
    console.error("Error al generar datos:", error);
    res.status(500).send({ status: "error", message: "Ocurrió un error al generar los datos." });
  }
});

// Endpoint para obtener mascotas simuladas
router.get("/mockingpets", mocksController.getMockingPets);

// Endpoint para obtener usuarios simulados
router.get("/mockinguser", mocksController.getMockingUser);

export default router;
