const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Rooms = sequelize.define('rooms', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        corpus: {type: DataTypes.STRING, allowNull: false},
        floor: {type: DataTypes.INTEGER, allowNull: false},
        number: {type: DataTypes.STRING, allowNull: false},
        wallColor: {type: DataTypes.STRING},
        floorColor: {type: DataTypes.STRING},
        walls: {type: DataTypes.ARRAY(DataTypes.JSON), allowNull: false}
    },
    {
        indexes: [{
            unique: true,
            fields: ['corpus', 'floor', 'number']
        }],
        timestamps: false
    })

const Walls = sequelize.define('walls', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER, allowNull: false},
    points: {type: DataTypes.JSONB, allowNull: false},
    isPillarBefore: {type: DataTypes.BOOLEAN, allowNull: true},
    isPillarAfter: {type: DataTypes.BOOLEAN, allowNull: true},
}, {timestamps: false})

const Floors = sequelize.define('floors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER, allowNull: false},
    points: {type: DataTypes.JSONB, allowNull: false}
}, {timestamps: false})

const Sprites = sequelize.define('sprites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    floor: {type: DataTypes.INTEGER, allowNull: false},
    position: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false},
}, {timestamps: false})

const SpriteTypes = sequelize.define('sprite_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})

const Users = sequelize.define('users', {
    login: {type: DataTypes.STRING, allowNull: false, unique: true,},
    password: {type: DataTypes.STRING, allowNull: false},
    isAdmin: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
}, {timestamps: false})

SpriteTypes.hasMany(Sprites, { onDelete: "cascade" })
Sprites.belongsTo(SpriteTypes)

module.exports = {
    Rooms,
    Floors,
    Walls,
    Sprites,
    SpriteTypes,
    Users
}