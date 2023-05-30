const { DataTypes, Sequelize, ModelStatic } = require("sequelize")


/**
 * Product Model Constructor
 * @param {Sequelize} sequelize
 * @returns {ModelStatic}
 */

module.exports = (sequelize) => {

    const Product = sequelize.define('product', {
        //id -> pas besoin de le mettre, sequelize va créer un id auto incrémenté, PK, démarrant à 1
        name : {
            type : DataTypes.STRING(250),
            unique : 'UK_Product_Name', //On peut aussi mettre un boolean mais le nom de la clef est alors auto-générée et c'est la 💩 pour la manipuler ensuite
            allowNull : false //Accepter ou non la valeur NULL
        },
        desc : {
            type : DataTypes.STRING(4000),
            allowNull : true
        }, 
        price : {
            type : DataTypes.DOUBLE,
            allowNull : false
        },
        quantity : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        available : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true
        }
    })

    return Product
   
}
