const search_button =document.querySelector(".search-button")

let search_player=()=>{
    let search_name =document.getElementById("searchtxt").value
    if (search_name === "") {
        search_name = "a";
    }
    handlesearch(search_name);
}

let handlesearch = (search_name) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${search_name}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.player) {
                displayplayer(data.player);
            } else {
                displayplayer([]);
            }
        });
};

let displayplayer =(player)=>{
    const container = document.getElementById("search-result")
    container.innerHTML = "";
    console.log(player);

    player.forEach((element) => {
        const div=document.createElement("div")
        div.classList.add("card")

        const alreadyAdded = team.some(p => p.idPlayer === element.idPlayer);


        div.innerHTML = `
        <img src="${element.strThumb}">
        <h3>${element.strPlayer}</h3>
        <p><strong>Sport:</strong> ${element.strSport}</p>
        <p><strong>Team:</strong> ${element.strTeam}</p>
        <p><strong>Position:</strong> ${element.strPosition}</p>
        <p><strong>Gender:</strong> ${element.strGender}</p>
        <p><strong>Nationality:</strong> ${element.strNationality}</p>
        <button class="details-button card-button">See Details</button>
        <button class="add-button card-button" ${alreadyAdded ? 'disabled style="background-color: green; color: white;"' : ''}>
            ${alreadyAdded ? 'Added' : 'Add to Team'}
        </button>

        <div class="social-icons">
        <i class="fab fa-facebook fa-lg social-icon" title="Facebook"></i>
        <i class="fab fa-twitter fa-lg social-icon" title="Twitter"></i>
        <i class="fab fa-instagram fa-lg social-icon" title="Instagram"></i>
        </div>
        `;

        div.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                alert("No social media link provided in API.");
            });
        });


        div.querySelector(".add-button").addEventListener("click", () => {
            addteam(element);
        });

        
        div.querySelector(".details-button").addEventListener("click", () => {
            alert(
                `Name: ${element.strPlayer}\n` +
                `Team: ${element.strTeam}\n` +
                `Sport: ${element.strSport}\n` +
                `Gender: ${element.strGender}\n` +
                `Position: ${element.strPosition}\n` +
                `Nationality: ${element.strNationality}\n` +
                `Birth Date: ${element.dateBorn || 'N/A'}\n` +
                `Relevance: ${element.relevance}\n` +
                `Description:\n${element.strDescriptionEN || 'No description available in API'}`
            );
        });


        container.appendChild(div);
    });
}

let team=[];
let members=0;
let addteam=(element)=>{

    if (team.length >= 11) {
        alert("Team is full!");
        return;
    }
    team.push(element);
    members++;
    let search_name =document.getElementById("searchtxt").value
    if (search_name.trim() === "") search_name = "a";
    handlesearch(search_name);
    displayteam(team);
    console.log(team);
}

let displayteam=(team)=>{
    const teammember= document.getElementById("team-mem")
    teammember.innerHTML=members;
    const teamcontainer = document.getElementById("team")
    teamcontainer.innerHTML = "";

    team.forEach((element)=>{
        const div=document.createElement("div")
        div.classList.add("teamcard")

        div.innerHTML=`
        <img src="${element.strCutout}">
        <h3>${element.strPlayer}</h3>
        <button class="remove-button remove-button">Remove Player</button>
        `;

        div.querySelector(".remove-button").addEventListener("click", () => {
            removeplayer(element);
        });
        teamcontainer.appendChild(div);
    });
}

let removeplayer = (player) => {
    team = team.filter(p => p.idPlayer !== player.idPlayer);
    members = team.length;
    let search_name =document.getElementById("searchtxt").value
    if (search_name.trim() === "") search_name = "a";
    handlesearch(search_name);
    displayteam(team);
};

window.addEventListener('load', () => {
    handlesearch("a");
});
search_button.addEventListener("click", search_player)
displayteam(team);