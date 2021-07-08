function playerInfo(playerID) {
  const target = document.querySelector(".thirdSection");
  target.innerHTML = "";
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerID}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let template = '<div class="playerInfoPage">';

      for (let i = 0; i < data.players.length; i++) {
        template += `<div class="playerDetails"> 
        <div class="playerDetailsHead">
           <img src="${
             data.players[i].strThumb ||
             "https://via.placeholder.com/500x500.png?text=Image+unavailable"
           }" />
           
          <div>
            <div class="playerDetailsSocial">
              <ul>
        
                ${
                  data.players[i].strFacebook
                    ? `<li><a href="https://${data.players[i].strFacebook}"><img src="./img/facebook.png" /></a></li>`
                    : ""
                }
                ${
                  data.players[i].strTwitter
                    ? `<li><a href="https://${data.players[i].strTwitter}"><img src="./img/twitter.png" /></a></li>`
                    : ""
                }
                ${
                  data.players[i].strInstagram
                    ? `<li><a href="https://${data.players[i].strInstagram}"><img src="./img/instagram.png" /></a></li>`
                    : ""
                }
          
              </ul>
            </div>
            <h1>${data.players[i].strPlayer}</h1>
            <div class="playerDetailsInfo">
              <p>Birthday: ${data.players[i].dateBorn}</p>
              <p>Birth Place: ${data.players[i].strBirthLocation}</p>
              <p>Nationality: ${data.players[i].strNationality}</p>
            </div>
            <b>Team:</b> ${data.players[i].strTeam || "-"}</br>
            <b>Position:</b> ${data.players[i].strPosition || "-"}</br>
            <b>Height:</b> ${data.players[i].strHeight || "-"}</br>
            <b>Weight:</b> ${data.players[i].strWeight || "-"}</br>
            <p>
            ${data.players[i].strDescriptionEN || ""}
            </p>        
          </div>
        </div>
         `;

        template += `</br><h2>Gallery</h2>
        <div class="galleryContainer">
        ${
          data.players[i].strThumb
            ? `<div class="galleryItem">
            <img src="${data.players[i].strThumb}">
          </div>`
            : ""
        }
        ${
          data.players[i].strCutout
            ? `<div class="galleryItem">
            <img src="${data.players[i].strCutout}">
          </div>`
            : ""
        }
        ${
          data.players[i].strRender
            ? `<div class="galleryItem">
            <img src="${data.players[i].strRender}">
          </div>`
            : ""
        }
        ${
          data.players[i].strBanner
            ? `<div class="galleryItem">
            <img src="${data.players[i].strBanner}">
          </div>`
            : ""
        }
        ${
          data.players[i].strTeamFanart1
            ? `<div class="galleryItem">
            <img src="${data.players[i].strTeamFanart1}">
          </div>`
            : ""
        }
        ${
          data.players[i].strTeamFanart2
            ? `<div class="galleryItem">
            <img src="${data.players[i].strTeamFanart2}">
          </div>`
            : ""
        }
        ${
          data.players[i].strTeamFanart3
            ? `<div class="galleryItem">
            <img src="${data.players[i].strTeamFanart3}">
          </div>`
            : ""
        }
        ${
          data.players[i].strTeamFanart4
            ? `<div class="galleryItem">
            <img src="${data.players[i].strTeamFanart4}">
          </div>`
            : ""
        }
        ${
          data.players[i].strTeamBanner
            ? `<div class="galleryItem">
            <img src="${data.players[i].strTeamBanner}">
          </div>`
            : ""
        } 
        </div>`;

        template += `<iframe width="100%" src=" https://www.zoom.com.br/search?q=chuteira${
          data.players[i].strKit ? `%20${data.players[i].strKit}` : ""
        }"`;
      }
      template += "</div>";

      target.innerHTML = template;
      modal.style.display = "block";
    });
}

function handleClick() {
  const divPlayer = document.querySelectorAll(".PlayerBasicInfo");
  divPlayer.forEach((player) => {
    player.addEventListener("click", (e) => {
      console.log(e);
      playerInfo(e.target.id);
    });
  });
}

function searchPlayer() {
  const playerName = document.querySelector("#playerName").value;

  const target = document.querySelector(".secondSection");
  target.innerHTML = "";
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playerName}`
  )
    .then((res) => res.json())
    .then((data) => {
      let template = "";
      console.log(data);
      for (let i = 0; i < data.player.length; i++) {
        template += `<div class="PlayerPreview" ><div class="PlayerBasicInfo" id="${
          data.player[i].idPlayer
        }">
                 
        <img src="${data.player[i].strCutout || "./img/user.png"}" />
        <p>${data.player[i].strPlayer}</p>
        
        <p>${data.player[i].strTeam}</p>
        <p>${data.player[i].idPlayer}</p>
        
        </div>`;
        template += "</div>";
      }
      target.innerHTML = template;
      handleClick();
    });
}
