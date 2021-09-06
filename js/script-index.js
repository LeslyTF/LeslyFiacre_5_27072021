//TEST 1 CONNEXION AU DOM CONTAINER DOIT RETOURNER ARTICLE
let container = document.getElementById("container");
console.log(container);
//REQUETE GET VERS API 
fetch("http://localhost:3000/api/teddies")
  .then(function(res){
      return res.json(); 
      console.log(res);
  })
  .then(function(peluches){
    // TEST 2 DOIT RETOURNER LA REPONSE DE L'API SOIT UN TABLEAU D'OBJET POUR CHAQUES PELUCHES
    console.log(peluches) 
    for(peluche of peluches){
        //CREATION DES ELEMENTS HTML
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("H5");
        let image = document.createElement("img");
        let link = document.createElement("a");
        //AJOUT DES CLASSES AUX ELEMENTS HTML
        card.classList.add("card","card-index");
        cardBody.classList.add("card-body");
        cardTitle.classList.add("card-title");
        image.classList.add("card-img-top");
        link.classList.add("btn", "btn-primary"); 
        // TEST 3 DOIT RETOURNER L'OUVERTURE D'UN ELEMENT POUR CHACUN DES ELEMENTS DU TABLEAU PELUCHES
        cardTitle.innerText= peluche.name;
        link.innerText = "Voir plus";
        //AJOUT DES ATTRIBUTS 
        //TEST 4 LE LIEN DOIT AMENER VERS LA PAGE POUR CHAQUE PRODUIT INDIVIDUELLE
        link.setAttribute("href", "html/produit.html?id="+peluche._id);
        image.setAttribute("src", peluche.imageUrl);
        image.setAttribute("alt","peluche-orinoco" );
        //AJOUT DANS LE DOM 
        //TEST 5 LA PAGE ACCUEIL DOIT ETRE FONCTIONNELLE
        container.appendChild(card);
        card.appendChild(image); 
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(link);
    }
})
  .catch(function(err) {
      //TEST 6 ERREUR DANS LA RECUPERATION DE LA REPONSE
    console.log("Erreur de chargement");
  });
    
      
    