import { Router } from "express";

import ListPetController from "../../app/Http/Controllers/PetApi/ListPetController.js";
import GetPetController from "../../app/Http/Controllers/PetApi/GetPetController.js";
import CreatePetController from "../../app/Http/Controllers/PetApi/CreatePetController.js";
import UpdatePetController from "../../app/Http/Controllers/PetApi/UpdatePetController.js";
import DeletePetController from "../../app/Http/Controllers/PetApi/DeletePetController.js";

export default (() => {
    const router = Router();

    router.get("/", ListPetController);
    router.get("/:id", GetPetController);
    router.post("/", CreatePetController);
    router.put("/:id", UpdatePetController);
    router.delete("/:id", DeletePetController);

    return router;
})();
