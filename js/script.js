console.log("script chargé !");

//create an header

document.addEventListener('header', function()
{
    const logo = document.querySelector(".logo");
    const button = document.querySelector(".top-button");
})

  
//select the form
function getValues(pokemonChoisi) {
   
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonChoisi}`)
    .then(response => response.json())
    .then(onePokemon => {
        console.log(onePokemon);

        //no need to write the same code again, just create a function
        buildResults(onePokemon);
         }
    )
}

//function to select the pokemon in a dropdown menu
    function getPokemons() {
        fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
        .then(response => response.json())
        .then(allPokemon => {

            //alphabetically arranged
            allPokemon.sort((a, b) => a.name.localeCompare(b.name));

            const PokemonSelection = document.querySelector("#pokemondropdown");
            allPokemon.forEach(unPokemon => {
                let option = document.createElement("option");
                option.setAttribute('value', unPokemon.name);
                option.textContent = unPokemon.name;
                PokemonSelection.appendChild(option);
            });
        }
        )
    }


    //function to open a form to get the access
    getPokemons();
    
    //button
    document.querySelector("#mon_bouton").addEventListener("click", function(event)
    {
        event.preventDefault(); 
        const Pokemonselect = document.querySelector('select').value;
        console.log("Pokemonselect : ", Pokemonselect);
        getValues(Pokemonselect);
        
        
    });
   
                                      
      //php link code
 function getDatas(event){
    event.preventDefault();
     let choice = document.querySelector('select').value;
     console.log(choice);
     fetch("./php/getDatas.php",{
         method: "POST",
         body: choice,
         header: {
            "Content-Type": "application/text",
         },
     })

     //get the response
     .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
     })
     .then(res=>buildResults(res));
   
    }
     document.querySelector("#mon_bouton1").addEventListener("click", getDatas);

     function buildResults(onePokemon) {
        console.log(onePokemon);
        const paraElement = document.getElementById("elementid");
        const paraEvolue = document.getElementById("evolueid");

        //create an array to retrive the apitypes and apievolutions datas
        let array=[];
        onePokemon.apiTypes.forEach(type =>
        {
        array.push(type.name);
        });

        //concate incase if we have more than 2 names by /"
        let lestypes = array.join("/");
        paraElement.textContent = `Element : ${lestypes}`;
        let array1=[];
        onePokemon.apiEvolutions.forEach(type =>
        {
        array1.push(type.name);
        });
        let lesevolutions = array1.join("/");
        paraEvolue.textContent = `Evolue en : ${lesevolutions}`;
        document.querySelector("h2").textContent = "Voici les informations de " + onePokemon.name;
        
        //we can not display the button until it is necessary or to hide
        document.querySelector("#resultcontainer").style.display = "block";
        document.querySelector("#detailcontainer").style.display = "block";

        //display an image whenever un pokemon was choosen    
        const pokemonImage = document.querySelector("img");
        pokemonImage.setAttribute("src", onePokemon.image);

        
        
        //this is for the 'details' button

        const btn = document.getElementById("open-link");
        btn.addEventListener("click", () => {

            //create a url to open a new html page (para=parameters)
            let para = new URLSearchParams();
            para.append("Pokemon", onePokemon.name);
            
            location.href = "http://localhost/Pokemon-phpjs/details.html?" + para.toString();
                 })
     }
   

      
        
     


