import { DataTypes } from "sequelize";
import sequelize from "../../database/connections/sequelize.js";

const OrderItemModel = sequelize.define(
    "OrderItemModel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "id"
            }
        },

        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "order_items",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                unique: true,
                fields: ["id_order", "id_product"]
            },
            {
                fields: ["id_product"]
            }
        ]
    }
);

export default OrderItemModel;
