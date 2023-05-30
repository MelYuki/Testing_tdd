const db = require("../models")

const ProductService = {
    getAll : async () => {
        const result = await db.Product.findAll()

        // Il est nécessaire de transformer le tableau obtenu pour qu'il ne reste qu'un tableau avec des produits qui ont juste un id, un name, un price, un quantity
        return result.map(p => ({ id : p.id, name : p.name, price : p.price, quantity : p.quantity }))
    },

    add : async (newProduct) => {

        // Vérification suite au Test2 -> Name Already Exists
        // Trouver un product avec le même nom
        const existingProduct = await db.Product.findOne( { where : { name : newProduct.name }} )
        if(existingProduct) {
            throw new Error('Product Name Already Exists')
        }

        // Code minimum Test1
        const result = await db.Product.create(newProduct);
        return result
    }
}

module.exports = ProductService