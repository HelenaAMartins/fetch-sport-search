function teamInfo(teamID) {
  const target = document.querySelector(".thirdSection");
  target.innerHTML = "";
  fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamID}`)
    .then((res) => res.json())
    .then((data) => {
      let template = '<div class="teamInfoPage">';

      for (let i = 0; i < data.teams.length; i++) {
        template += `<div class="teamDetails">
          <div class="teamDetailsSocial">
            <ul>
              ${
                data.teams[i].strYoutube
                  ? `<li><a href="https://${data.teams[i].strYoutube}"><img src="./img/youtube.png" /></a></li>`
                  : ""
              }
              ${
                data.teams[i].strFacebook
                  ? `<li><a href="https://${data.teams[i].strFacebook}"><img src="./img/facebook.png" /></a></li>`
                  : ""
              }
              ${
                data.teams[i].strTwitter
                  ? `<li><a href="https://${data.teams[i].strTwitter}"><img src="./img/twitter.png" /></a></li>`
                  : ""
              }
              ${
                data.teams[i].strInstagram
                  ? `<li><a href="https://${data.teams[i].strInstagram}"><img src="./img/instagram.png" /></a></li>`
                  : ""
              }
            </ul>
          </div>
          <div class="teamDetailsHead">
            <h1>${data.teams[i].strTeam}</h1>
            ${
              data.teams[i].strTeamLogo
                ? `<img src="${data.teams[i].strTeamLogo}" />`
                : ""
            }
          </div>
          <div class="teamDetailsSportLeague">
            <p>${data.teams[i].strCountry || "-"}</p>
            <p>${data.teams[i].strSport || "-"}</p>
            <p>${data.teams[i].strLeague || "-"}</p>
          </div>
          <p>
          ${data.teams[i].strDescriptionEN || ""}
          </p>        
        </div>`;
        // Stadium Details
        template += `<h2>Stadium Details</h2>
        <div class="stadiumDetails">
          <div class="stadiumDetailsThumb">
            <img src="${
              data.teams[i].strStadiumThumb ||
              "https://via.placeholder.com/540x304.png?text=Image+unavailable"
            }" />
          </div>
          <div class="teamContent">                    
              <b>Stadium name: </b>${data.teams[i].strStadium || "-"}</br>
              <b>Location: </b>${data.teams[i].strStadiumLocation || "-"}</br>
              <b>Capacity: </b>${data.teams[i].intStadiumCapacity || "-"}</br>
              <p>${
                data.teams[i].strStadiumDescription || ""
              }</p>                  
          </div>
       </div>`;
        // Gallery Section
        template += `<h2>Gallery</h2>
        <div class="galleryContainer">
        ${
          data.teams[i].strTeamBadge
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamBadge}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamJersey
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamJersey}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamLogo
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamLogo}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamFanart1
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamFanart1}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamFanart2
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamFanart2}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamFanart3
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamFanart3}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamFanart4
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamFanart4}">
          </div>`
            : ""
        }
        ${
          data.teams[i].strTeamBanner
            ? `<div class="galleryItem">
            <img src="${data.teams[i].strTeamBanner}">
          </div>`
            : ""
        }  
        </div>`;
      }
      template += "</div>";
      target.innerHTML = template;
      // Open Modal
      modal.style.display = "block";
    });
}

function handleClick() {
  const divTeam = document.querySelectorAll(".teamInfo");
  divTeam.forEach((team) => {
    team.addEventListener("click", (e) => {
      teamInfo(e.target.id);
    });
  });
}

function searchTeam() {
  const teamName = document.querySelector("#teamName").value;
  document.querySelector(".secondSection").innerHTML = "";
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamName}`
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.teams.length; i++) {
        const name = document.createElement("p");
        const league = document.createElement("p");
        const sport = document.createElement("p");
        const logo = document.createElement("img");
        const id = document.createElement("p");

        name.append(data.teams[i].strTeam);
        league.append(data.teams[i].strLeague);
        sport.append(data.teams[i].strSport);
        logo.setAttribute("src", data.teams[i].strTeamBadge);
        id.append(data.teams[i].idTeam);

        const div = document.createElement("div");
        div.setAttribute("class", "teamInfo");
        div.setAttribute("id", data.teams[i].idTeam);

        div.append(logo, name, league, sport, id);

        document.querySelector(".secondSection").append(div);
      }
      handleClick();
    });
}
