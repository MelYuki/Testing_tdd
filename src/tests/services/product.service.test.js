
// Imports nécessaires pour utiliser "chai"
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
const db = require('../../models');
const ProductService = require('../../services/product.service');
chai.use(chaiAsPromised)

// Création de expect, should, assert
const expect = chai.expect;
const should = chai.should();

// Code lancé avant ou après l'ensemble des tests
// Si en dehors d'un describe -> Global à tous les tests
// Par exemple, on pourrait s'en servir pour remplir la DB
before(() => {
    // console.log('Se déclenche avant tous les tests') 
})
after(() => {
    //  console.log('Se déclenche après tous les tests')
})

// Code lancé avant ou après chacun des tests
beforeEach(async () => {
    await db.sequelize.sync({ force: true }) //Permet de sync la db avant chacun des tests
    // console.log('Avant chaque test');
})
afterEach(() => {
    //  console.log('Après chaque test');
})

// * UNIT TEST ON PRODUCT SERVICE 
describe('Product Service', () => {

    describe('Feature Get', () => {
        //Pour chaque test de la feature Get, on va remplir la db avec des fausses données
        beforeEach(async () => {
            const product1 = { name: 'Coca', price: 1.50, quantity: 3 }
            const product2 = { name: 'Fanta', price: 1.50, quantity: 2 }
            const product3 = { name: 'Sprite', price: 1.50, quantity: 1 }

            await ProductService.add(product1)
            await ProductService.add(product2)
            await ProductService.add(product3)
        })

        it('Get All', async () => {
            // arrange
            // On a rien à founir pour un GetAll, pas de données d'entrée

            // expect
            const expectProductList = [
                { id : 1, name : 'Coca', price : 1.50, quantity : 3 },
                { id : 2, name : 'Fanta', price : 1.50, quantity : 2 },
                { id : 3, name : 'Sprite', price : 1.50, quantity : 1 }
            ]

            // action
            const productList = await ProductService.getAll()
            
            // assert
            productList.should.be.a('array');
            // deep.equal -> Pour comparer que toutes les valeurs à l'intérieur du tableau ont égales -> Va parcourir toutes les propriétés des objets
            productList.should.be.deep.equal(expectProductList);
        })
    })

    describe('Feature Add', () => {

        it('Add New Product', async () => {
            // arrange -> ce dont on a besoin
            const newProduct = {
                name: 'Patate',
                price: 3.5,
                quantity: 1
            }

            // expect
            const expectName = 'Patate';
            const expectPrice = 3.5;
            const expectQuantity = 1;
            const expectAvailable = true;

            // action
            //Si utilisation await, la fonction dans laquelle se trouve le await devra être asynchrone -> async
            const productAdded = await ProductService.add(newProduct)

            // assert
            should.exist(productAdded) //Est-ce que notre produit existe ?
            productAdded.should.be.an('object'); //Est-ce que notre produit est bien un objet ?
            productAdded.should.have.property('name').to.be.equal(expectName);
            productAdded.should.have.property('price').to.be.equal(expectPrice);
            productAdded.should.have.property('quantity').to.be.equal(expectQuantity);
            productAdded.should.have.property('available').to.be.equal(expectAvailable);

        });

        it('Error When Product Already Exists', async () => {

            // arrange
            const newProduct = {
                name: 'Coca',
                price: 1.50,
                quantity: 3
            }

            // expect
            const expectError = 'Product Name Already Exists'

            // action + assert
            // On ajoute une première fois le produit
            await ProductService.add(newProduct);
            // On vérifie que le deuxième ajout fait bien une erreur
            await expect(ProductService.add(newProduct)).to.be.rejectedWith(expectError);
        })

    })
})