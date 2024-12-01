import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
  try {
    const pets = await MockingService.generateMockingPets(100);
    res.send({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error al generar mascotas simuladas" });
  }
};

const getMockingUser = async (req, res) => {
  try {
    const user = await MockingService.generateMockingUser(50);
    res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error al generar usuarios simulados" });
  }
};

export default { getMockingPets, getMockingUser };
