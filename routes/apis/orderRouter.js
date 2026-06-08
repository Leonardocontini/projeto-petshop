import { Router } from "express";

import ListOrderController from "../../app/Http/Controllers/OrderApi/ListOrderController.js";
import GetOrderController from "../../app/Http/Controllers/OrderApi/GetOrderController.js";
import CreateOrderController from "../../app/Http/Controllers/OrderApi/CreateOrderController.js";
import UpdateOrderController from "../../app/Http/Controllers/OrderApi/UpdateOrderController.js";
import DeleteOrderController from "../../app/Http/Controllers/OrderApi/DeleteOrderController.js";

export default (() => {
    const router = Router();

    router.get("/", ListOrderController);
    router.get("/:id", GetOrderController);
    router.post("/", CreateOrderController);
    router.put("/:id", UpdateOrderController);
    router.delete("/:id", DeleteOrderController);

    return router;
})();
