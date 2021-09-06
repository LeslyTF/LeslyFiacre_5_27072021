  //Recuperation des données du local storage.
  var panierPeluches = JSON.parse(localStorage.getItem("panier")) || [];
  console.log(panierPeluches);

  //creation du contenu de l'affichage du panier.
  let articles = document.getElementById("container");
  let titreEtatPanier = document.createElement("h3");
  titreEtatPanier.classList.add("titre-partie-panier");
  console.log(titreEtatPanier);
  console.log(panierPeluches.length);
  let boutonValider = document.getElementById("validerAchat");
  
  function etatPanier (){
    let etat;
    if(panierPeluches.length >= 1){
          console.log(panierPeluches.length);
          etat = titreEtatPanier.textContent="Résumé du panier";
    }else{
          
      etat = titreEtatPanier.textContent= "Votre panier est vide";

        }
  }

  articles.appendChild(titreEtatPanier);
  let ol = document.createElement("ol");
  
  ol.classList.add("list-group", "list-group-numbered", "ol-contenant");

  //fonction afficher panier
  function afficherPanier (){
    // nettoyage du panier 
    ol.innerHTML="";
    //creation du panier
    panierPeluches.map((article, i) => {
      let lignePanier = document.createElement("li");
      lignePanier.innerHTML= article.name;
      let spanPrix = document.createElement("span");
      spanPrix.innerText= "Prix: " + article.price / 100 +"€";
      lignePanier.classList.add("list-group-item", "justify-content-between", "ligne-panier");
      let enlever = document.createElement("button");
      enlever.classList.add("btn-danger", "retirer");
      enlever.onclick =  function (event){
        panierPeluches.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(panierPeluches));
        etatPanier();
        afficherPanier ();
      }
      console.log(lignePanier);
      enlever.innerText= "Retirer";
      articles.appendChild(ol);
      ol.appendChild(lignePanier);
      lignePanier.appendChild(spanPrix);
      lignePanier.appendChild(enlever);
      console.log(panierPeluches);
    });
  }
      //test creation de fonction vers la page de remerciement
      function lien (){
      let lienValider = document.createElement("a");
      lienValider.setAttribute("href", "html/valider.html");
      boutonValider.appendChild(lienValider);
      } 

    afficherPanier ();
    etatPanier();
    lien();

    boutonValider.addEventListener('click', function (event){
        event.preventDefault();
        //recupération des valeurs du formulaire
        let contact ={
          firstName:document.getElementById("validationPrenom").value,
          lastName: document.getElementById("validationNom").value,
          address: document.getElementById("validationAdresse").value,
          city: document.getElementById("validationVille").value,
          email: document.getElementById("validationEmail").value    
      }
    
        let products= [];
        console.log(products);
        let tableauProduit = JSON.parse(localStorage.getItem("panier"));
        var prod = (tableauProduit.map(function(produit) {
          return products.push(produit._id);
          }));

          console.log(products);

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
            .then(function(commande){
                console.log(commande);
              localStorage.setItem("stockCommande", JSON.stringify(commande));
              localStorage.setItem("panier", JSON.stringify([]));
            console.log(commande); 

          })
          document.location.href="valider.html";
        })
