//CONNEXION AU DOM PAR ARTICLE
let container = document.getElementById("container");
console.log(container);

//RECUPERATION DE L'id 
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

//REQUETE POUR GET POUR RECUPERER INFO D'UNE SEUL PELUCHE
fetch("http://localhost:3000/api/teddies/"+urlParams.get('id'))
    .then(function(res){
        return res.json(); 
    })
    //RETOUR DE API NOMMER PELUCHE
    .then(function(peluche){

        //CREATION DES ELEMENTS DE LA PAGE
        let infoDiv = document.createElement("div");
        let pelucheNom = document.createElement("H5");
        let imgDiv = document.createElement("div");
        let pPrice = document.createElement("p");
        let buttonPanier = document.createElement("button");
        let ajouter = document.createElement("a");
        let image = document.createElement("img");
        let pDescription = document.createElement("p");
        //Creation element menu couleur
        let tab = document.createElement("div");
        let select = document.createElement("select");
        let option = document.createElement("option");

        //AJOUT DES CLASS
        infoDiv.classList.add("infopart");
        imgDiv.classList.add("imgpart");
        image.classList.add("img-produit");
        buttonPanier.classList.add("btn", "btn-warning", "ajoutPanier");
        ajouter.classList.add("gopanier");
        select.classList.add("form-select", "form-select-lg", "mb-3");

        //AJOUT ATTRIBUT
        image.setAttribute("src", peluche.imageUrl);
        //ajouter.setAttribute("href", "#");
        select.setAttribute("aria-label", ".form-select-lg example");
        option.setAttribute("selected", "");

        //AJOUT DU TEXTE
        pelucheNom.innerText=peluche.name; 
        pPrice.innerText = peluche.price/100+"€";
        let couleurs = peluche.colors;
        ajouter.innerText="Ajouter au panier";
        option.innerText="Couleurs";
        pDescription.innerText= peluche.description ;

        //AJOUT DES ELEMENT DANS LE DOM
        buttonPanier.appendChild(ajouter);
        tab.appendChild(select);
        select.appendChild(option);
        container.appendChild(imgDiv);
        imgDiv.appendChild(image);
        container.appendChild(infoDiv);
        infoDiv.appendChild(pelucheNom);
        infoDiv.appendChild(tab);
        infoDiv.appendChild(pDescription);
        infoDiv.appendChild(pPrice);
        infoDiv.appendChild(buttonPanier);
        //CREATION D'UNE BOUCLE POUR RECUPERER LES COULEURS DES PELUCHES
        for(color of peluche.colors){
            let options = document.createElement("option");
            options.setAttribute("value", peluche.colors.indexOf(color));
            options.innerText=color;
            select.appendChild(options);
        }
    //AJOUT ELEMENT DANS LE PANIER VIA LOCALSTORAGE
    buttonPanier.addEventListener("click", function(event){
        var panierPeluches = JSON.parse(localStorage.getItem("panier")) || [];
        panierPeluches.push(peluche);
        localStorage.setItem("panier", JSON.stringify(panierPeluches));
    })

})
    .catch(function(err) {
        console.log("Probleme lié à API ou à la requete");
});      