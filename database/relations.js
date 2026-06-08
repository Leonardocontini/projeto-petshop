import AddressModel from "../app/Models/AddressModel.js";
import UserModel from "../app/Models/UserModel.js";
import ProductModel from "../app/Models/ProductModel.js";
import PetModel from "../app/Models/PetModel.js";
import OrderModel from "../app/Models/OrderModel.js";
import OrderItemModel from "../app/Models/OrderItemModel.js";

export default function initRelations() {
    UserModel.hasMany(AddressModel, {
        foreignKey: "id_user",
        as: "addresses"
    });

    AddressModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "user"
    });

    UserModel.hasMany(PetModel, {
        foreignKey: "id_user",
        as: "pets"
    });

    PetModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "owner"
    });

    UserModel.hasMany(OrderModel, {
        foreignKey: "id_user",
        as: "orders"
    });

    OrderModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "customer"
    });

    OrderModel.hasMany(OrderItemModel, {
        foreignKey: "id_order",
        as: "items",
        onDelete: "CASCADE"
    });

    OrderItemModel.belongsTo(OrderModel, {
        foreignKey: "id_order",
        as: "order"
    });

    ProductModel.hasMany(OrderItemModel, {
        foreignKey: "id_product",
        as: "orderItems"
    });

    OrderItemModel.belongsTo(ProductModel, {
        foreignKey: "id_product",
        as: "product"
    });
}
