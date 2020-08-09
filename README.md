# MyStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Mon application (Back-end & Front-end) est déployer sur Heroku :https://my4store.herokuapp.com/

Ce projet est sous la forme d'un site de vente en ligne , il comporte deux parties essentielles:
        - interfaces conçues aux administrateurs
        - interfaces conçues aux acheteurs

et comporte une partie d'authentification en commun pour ces deux types d'utilisateurs , l'authentification
comporte une connexion si l'utilisateur possède déja un compte ou s'enregistrer au près de la base de donnée 
et créer un compte.

Selon le types d'utilisateurs (Administrateurs/ Acheteurs) mon application affiche:

* Des interfaces conçues aux administrateurs pour :
            - Ajouter des nouveaux produits à vendres
            - Supprimer des produits et les rendres non disponibles
            - Consulter la liste des commandes reçues et voir s'ils ont été livrées ou non

* Des interfaces conçues aux acheteurs où ils peuvent faire les opèrations suivantes :
            * Parcourir la liste des produits disponible
            * Voir en détails un produit bien définis 
            * Commander un produit et spècifier la quantité à commander de chaque produit
            * Supprimer un produit du carte des achats
            * Lancer une commande une fois il a finis sa liste de commande

Pour empêcher l'accès non autorisé des utilisateurs aux services de l'administrateur j'ai appliqué des guards 
qui indiquent qu'il s'agit des droits réservés aux administrateurs.

Concernant la partie Back-end j'ai utilisé une base de donnée MSQL Server ou encore Postgres SQL et elle est implémentée 
avec ASP.NET Core et c#.
