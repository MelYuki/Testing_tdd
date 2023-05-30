console.log('Demo_02 Test TDD');

// Configuration des variables d'environnement
require('dotenv').config(); //Récupère toutes les variables d'environnement des fichiers .env et les mets dans les variables d'environnement de votre machine

// Import de l'objet db
const db = require('./models') //Si je renseigne juste le nom du dossier, importe par défaut le fichier index.js se trouvant dedans

// Connection à la db
db.sequelize.authenticate()
    .then(() => console.log('Connection DB OK'))
    .catch((error) => console.log('Connection DB Fail : ', error))

    
// Synchro
if(process.env.NODE_ENV === 'development') {
    // db.sequelize.sync( { alter : { drop : false } } ) //Autorise la modification de la db mais pas la suppression
    // db.sequelize.sync( { force : true } ) //Force comme un bourrin, supprime toute la db et la recrée
    
}

