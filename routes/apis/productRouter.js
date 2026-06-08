import { Router } from "express";

import ListProductController from "../../app/Http/Controllers/ProductApi/ListProductController.js";
import GetProductController from "../../app/Http/Controllers/ProductApi/GetProductController.js";
import CreateProductController from "../../app/Http/Controllers/ProductApi/CreateProductController.js";
import UpdateProductController from "../../app/Http/Controllers/ProductApi/UpdateProductController.js";
import DeleteProductController from "../../app/Http/Controllers/ProductApi/DeleteProductController.js";

export default (() => {
    const router = Router();

    router.get("/", ListProductController);
    router.get("/:id", GetProductController);
    router.post("/", CreateProductController);
    router.put("/:id", UpdateProductController);
    router.delete("/:id", DeleteProductController);

    return router;
})();
