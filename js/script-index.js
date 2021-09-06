let container = document.getElementById("container");
console.log(container);
//REQUETE GET VERS API 
fetch("http://localhost:3000/api/teddies")
  .then(function(res){
      return res.json(); 
      console.log(res);
  })
  .then(function(peluches){
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
        cardTitle.innerText= peluche.name;
        link.innerText = "Voir plus";
        //AJOUT DES ATTRIBUTS 
        link.setAttribute("href", "html/produit.html?id="+peluche._id);
        image.setAttribute("src", peluche.imageUrl);
        image.setAttribute("alt","peluche-orinoco" );
        //AJOUT DANS LE DOM 
        container.appendChild(card);
        card.appendChild(image); 
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(link);
    }
})
  .catch(function(err) {
    console.log("Erreur lié à l'API ou à requete");
  });
    
      
    