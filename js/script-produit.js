let container = document.getElementById("container");
       
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);




fetch("http://localhost:3000/api/teddies/"+urlParams.get('id'))
.then(function(res){
return res.json(); 
console.log(res);
})
.then(function(peluche){
let imgDiv = document.createElement("div");
imgDiv.classList.add("imgpart");
let image = document.createElement("img");
image.setAttribute("src", peluche.imageUrl);
image.classList.add("img-produit")

let infoDiv = document.createElement("div");
infoDiv.classList.add("infopart");
let pelucheNom = document.createElement("H5");
pelucheNom.innerText=peluche.name; 
let pPrice = document.createElement("p");
pPrice.innerText = peluche.price/100+"€";
let couleurs = peluche.colors;
console.log(couleurs);
let buttonPanier = document.createElement("button");
buttonPanier.classList.add("btn", "btn-warning", "ajoutPanier");
//butonPanier
let ajouter = document.createElement("a");
ajouter.classList.add("gopanier");
ajouter.innerText="Ajouter au panier";
ajouter.setAttribute("href", "#");
buttonPanier.appendChild(ajouter);

console.log(buttonPanier);


//menu couleur
let tab = document.createElement("div");
let select = document.createElement("select");
select.classList.add("form-select", "form-select-lg", "mb-3");
select.setAttribute("aria-label", ".form-select-lg example");
console.log(select);
let option = document.createElement("option");
option.setAttribute("selected", "");
option.innerText="Couleurs";
console.log(option);

console.log(infoDiv);
tab.appendChild(select);
select.appendChild(option);
let pDescription = document.createElement("p");
pDescription.innerText= peluche.description ;


console.log(pPrice);
console.log(infoDiv);
console.log(imgDiv);
console.log(pPrice);

container.appendChild(imgDiv);
imgDiv.appendChild(image);
container.appendChild(infoDiv);
infoDiv.appendChild(pelucheNom);
infoDiv.appendChild(tab);
infoDiv.appendChild(pDescription);
infoDiv.appendChild(pPrice);
infoDiv.appendChild(buttonPanier);

for(color of peluche.colors){
let options = document.createElement("option");
options.setAttribute("value", peluche.colors.indexOf(color));
options.innerText=color;
select.appendChild(options);
console.log(tab);
}
// partie panier
//let panier = document.getElementsByClassName("gopanier");
//console.log (panier);
buttonPanier.addEventListener("click", function(event){
var panierPeluches = JSON.parse(localStorage.getItem("panier")) || [];
panierPeluches.push(peluche);
localStorage.setItem("panier", JSON.stringify(panierPeluches));
})

})
.catch(function(err) {
// Une erreur est survenue
});      