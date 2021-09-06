//RECUPERATION DE LA REPONSE DE LAPI QUI EST STOCKÉ DANS LE LOCAL STORAGE DE L'API
let retourCommande = JSON.parse(localStorage.getItem("stockCommande"));
//CONNEXION AU DOM
let articlePageValider = document.getElementById("articleval");

//CREATION DES ELEMENTS DE LA PAGE
let orinoco = document.createElement("span");
let ligneMerci = document.createElement("p");
let ligneNumCommande = document.createElement("p");

//AJOUT DES CLASS
orinoco.classList.add("enseigne");
ligneMerci.classList.add("ligne-merci");
ligneNumCommande.classList.add("ligne-num-commande");

//AJOUT DU TEXTE
orinoco.innertext="Orinoco";
ligneMerci.innerText="Merci "+retourCommande.contact.lastName + ", pour votre commande. Nous la préparons et l'expedions dans les meilleurs délais à très vite sur notre site"
ligneNumCommande.innerText="Voici votre numéro de commande: "+ retourCommande.orderId;
//AJOUT DES ELEMENTS DANS LE DOM
articlePageValider.appendChild(ligneMerci);
articlePageValider.appendChild(ligneNumCommande);
