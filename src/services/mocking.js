import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

class MockingService {
    static async generateMockingPets(num) {
        const pets = [];

        for (let i = 0; i < num; i++) {
            pets.push({
                // animal.dog
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                adopted: false,
                birthDate: faker.date.past(),
                image: "https://via.placeholder.com/150"
            })
        }
        return pets;
    }

    static async generateMockingUser(num) {
        const usuarios = [];
        for (let i = 0; i < num; i++) {
            usuarios.push ({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash ("coder 123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            });
        }
        return usuarios;
    }
}

export default MockingService;