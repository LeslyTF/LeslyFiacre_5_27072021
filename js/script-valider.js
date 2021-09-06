let orinoco = document.createElement("span");
          orinoco.innertext="Orinoco";
          orinoco.classList.add("enseigne");

          let retourCommande = JSON.parse(localStorage.getItem("stockCommande"));
          console.log(retourCommande);
          let articlePageValider = document.getElementById("articleval");
          let ligneMerci = document.createElement("p");
          ligneMerci.classList.add("ligne-merci");
          let ligneNumCommande = document.createElement("p");
          ligneNumCommande.classList.add("ligne-num-commande");
          ligneNumCommande.innerText="Voici votre numéro de commande: "+ retourCommande.orderId;
          ligneMerci.innerText="Merci "+retourCommande.contact.firstName + ", pour votre commande. Nous la préparons et l'expedions dans les meilleurs délais à très vite sur notre site"
            console.log(ligneMerci);
          articlePageValider.appendChild(ligneMerci);
          articlePageValider.appendChild(ligneNumCommande);

          console.log(retourCommande.contact.firstName);
