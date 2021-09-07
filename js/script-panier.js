//RECUPERATION DES DONNEES DU LOCALSTORAGE POUR LA GESTION DU CONTENU DU PANIER
var panierPeluches = JSON.parse(localStorage.getItem("panier")) || [];


 let recupPrix = [];
let total = 0;



            //function totoo(){
            //panPeluches = JSON.parse(localStorage.getItem("panier")) || [];
            //panPeluches.map((art, i) => {
            //recupPrix=[];
            //recupPrix.push(art.price);
            //const reducer = (accumulator, currentValue) =>accumulator + currentValue;
            //const total = recupPrix.reduce(reducer, 0);});
            //}






//CREATION D'UNE FONCTION POUR RENSEIGNER SUR LE REMPLISSAGE DU PANIER
function etatPanier (){
    let etat;
    if(panierPeluches.length >= 1){
          etat = titreEtatPanier.textContent="Résumé du panier "+ total/100 +"€";
    }else{
      etat = titreEtatPanier.textContent= "Votre panier est vide";
    }
}

//FONCTION POUR AFFICHER LE CONTENU DU PANIER
function afficherPanier (){
    //Nettoyage du panier
    ol.innerHTML="";
    //Création du panier
    panierPeluches.map((article, i) => {
        
        recupPrix.push(article.price);
        const reducer = (accumulator, currentValue) =>accumulator + currentValue;
        total = recupPrix.reduce(reducer, 0);




        //Création des elements de la page partie paier
        let lignePanier = document.createElement("li");
        let spanPrix = document.createElement("span");
        let enlever = document.createElement("button");
        //Ajout des class des elements partie panier
        enlever.classList.add("btn-danger", "retirer");
        lignePanier.classList.add("list-group-item", "justify-content-between", "ligne-panier");
        //Ajout du texte
        lignePanier.innerHTML= article.name;
        spanPrix.innerText= "Prix: " + article.price / 100 +"€";
        enlever.innerText= "Retirer";
        //Retirer element du panier
        enlever.onclick =  function (event){
            panierPeluches.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(panierPeluches));


            //panPeluches = JSON.parse(localStorage.getItem("panier")) || [];
            //console.log(panPeluches);
            //panPeluches.map((art, i) => {
            //recupPrix=[];
            //recupPrix.push(art.price);
            //const reducer = (accumulator, currentValue) =>accumulator + currentValue;
            //const total = recupPrix.reduce(reducer, 0);});
            window.location.reload();
            console.log(total);



            etatPanier();
            afficherPanier ();
        }

      //AJOUT DES ELEMENTS DANS LE DOM
      articles.appendChild(ol);
      ol.appendChild(lignePanier);
      lignePanier.appendChild(spanPrix);
      lignePanier.appendChild(enlever);
    });
  }

//CONNECION AU DOM
let articles = document.getElementById("container");
let boutonValider = document.getElementById("validerAchat");

//CREATION DES ELEMENTS DE LA PAGE
let titreEtatPanier = document.createElement("h3");
let ol = document.createElement("ol");

//AJOUT DES CLASS
titreEtatPanier.classList.add("titre-partie-panier");
ol.classList.add("list-group", "list-group-numbered", "ol-contenant");

//AJOUT DES ELEMENTS DANS LE DOM
articles.appendChild(titreEtatPanier);
     
afficherPanier ();
etatPanier();

//VALIDATION DE L'ACHAT
boutonValider.addEventListener('click', function (event){
    event.preventDefault();
    if (panierPeluches.length < 1){
        window.alert("Votre panier est vide");
    }else{
    //Récupération des valeurs du formulaire pour envoi à l'api  "creation de l'objet contact"
    let contact ={
        firstName:document.getElementById("validationPrenom").value,
        lastName: document.getElementById("validationNom").value,
        address: document.getElementById("validationAdresse").value,
        city: document.getElementById("validationVille").value,
        email: document.getElementById("validationEmail").value    
    }
    //CREATION DU TABLEAU "PRODUCTS" POUR ENVOI A L'API
    let products= [];
    //BOUCLE POUR REMPLIR TABLEAU "PRODUCTS" PAR IMPLÉMENTATION DU LOCAL STORAGE
    let tableauProduit = JSON.parse(localStorage.getItem("panier"));
    var prod = (tableauProduit.map(function(produit) {
          return products.push(produit._id);
          }));
    //REQUETE POST POUR RECUPERATION POUR ENVOI DES DONNEES ET RECUPERATION DE LA REPONSE DE L'API
    fetch("http://localhost:3000/api/teddies/order",{
        method: "POST", 
        headers:{
            "accept": "application.json",
            "content-type": "application/json"
        },
        body: JSON.stringify({contact, products})
    })
    .then(function(res){
        return res.json(); 
    })
    //REPONSE DE L'API 
    .then(function(commande){
        //STOCKAGE DE LA REPONSE DE L'API DANS LE LOCAL STORAGE KEY: stockCommande
        localStorage.setItem("stockCommande", JSON.stringify(commande));
        //VIDER LE PANIER APRES REPONSE DE L'API
        localStorage.setItem("panier", JSON.stringify([]));
    })
    //LIEN VERS PAGE VALIDER APRES VALIDATION ACHAT
    document.location.href="valider.html";
}})
console.log(total);
localStorage.setItem("prixFinal", JSON.stringify(total/100));

