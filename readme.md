# Demo du TDD (Test Driven Development)
Cas "concret" avec sequelize + msql → Gestion d'un stock de produit

# Dépendances
- Features Project
    - Sequelize (ORM) (https://sequelize.org/)
    - Tedious (Librairie pour pouvoir travailler avec MSQL (ssms))
    - dotenv (Librairie qui permet de configurer les variables d'environnement)
    - cross-env (Librairie pour switch d'environnement)
    ```
        npm i sequelize tedious dotenv cross-env
    ```
- Test :
    - mocha : Test Runner
    - chai : Ajout des fonctionnalités
    - chai-as-promised : Gestion async/await
    ```
        npm i --save-dev mocha chai chai-as-promised
    ```
    - sqlite3 : Pour pouvoir utiliser sqlite pour les tests db 'in memory'
    ```
        npm i --save-dev sqlite3
    ```
# Rappels - Déroulement d'un TDD
1) Écrire un test
2) Lancer le test -> Il doit échouer
3) Écrire le code **minimum** pour que le test fonctionne
4) Relancer le test
    - Il fonctionne -> Retour à l'étape 1 pour commencer un nouveau test
    - Il échoue -> Retour à l'étape 3

# Configuration MSSQL
- Clique-droit sur le serveur -> Proprietés -> Securité -> Autoriser connection SQL Sever + Windows Authentication 
- Créer un User : Security -> Logins -> Clique-Droit -> New Login -> Choisir un Username et un Password
- Créer DataBase : Clique-droit Database -> New DataBase
- Donner accès à l'utilisateur :  Security -> Logins ->  Clique-Droit sur le User -> Proprietés -> User Mapping -> Cocher la bd et les droits