import { DataTypes } from "sequelize";
import sequelize from "../../database/connections/sequelize.js";

const PetModel = sequelize.define(
    "PetModel",
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

        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        species: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        breed: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        tableName: "pets",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                fields: ["id_user"]
            },
            {
                fields: ["species"]
            }
        ]
    }
);

export default PetModel;
