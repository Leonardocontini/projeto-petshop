import { DataTypes } from "sequelize";
import sequelize from "../../database/connections/sequelize.js";

const OrderModel = sequelize.define(
    "OrderModel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },

        status: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "pending"
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        tableName: "orders",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                fields: ["id_user"]
            },
            {
                fields: ["status"]
            },
            {
                fields: ["created_at"]
            }
        ]
    }
);

export default OrderModel;
