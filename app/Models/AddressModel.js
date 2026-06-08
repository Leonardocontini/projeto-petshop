import { DataTypes } from 'sequelize'
import sequelize from '../../database/connections/sequelize.js'

const AddressModel = sequelize.define(
    'AddressModel',
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
                model: 'users',
                key: 'id'
            }
        },

        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        district: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        city: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'addresses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['id_user']
            },
            {
                fields: ['city']
            }
        ]
    }
)

export default AddressModel
