let _id = localStorage.getItem("id_ToDoListApp_8435976127");
const monstersData = [
  {
    rarety: 1,
    attack: 10,
    health: 100
  },
  {
    rarety: 1,
    attack: 12,
    health: 80
  },
  {
    rarety: 1,
    attack: 12,
    health: 75
  },
  {
    rarety: 1,
    attack: 15,
    health: 55
  },
  {
    rarety: 1,
    attack: 9,
    health: 110
  },
  {
    rarety: 1,
    attack: 12,
    health: 70
  },
  {
    rarety: 1,
    attack: 1,
    health: 350
  },
  {
    rarety: 1,
    attack: 12,
    health: 80
  },
  {
    rarety: 1,
    attack: 12,
    health: 80
  },
  {
    rarety: 1,
    attack: 12,
    health: 80
  },
  {
    rarety: 1,
    attack: 12,
    health: 80
  },

  {
    rarety: 2,
    attack: 12,
    health: 100
  },
  {
    rarety: 2,
    attack: 13,
    health: 95
  },
  {
    rarety: 2,
    attack: 15,
    health: 80
  },
  {
    rarety: 2,
    attack: 12,
    health: 140
  },
  {
    rarety: 2,
    attack: 17,
    health: 90
  },
  {
    rarety: 2,
    attack: 18,
    health: 95
  },
  {
    rarety: 2,
    attack: 12,
    health: 110
  },
  {
    rarety: 2,
    attack: 14,
    health: 100
  },
  {
    rarety: 2,
    attack: 13,
    health: 120
  },
  {
    rarety: 2,
    attack: 13,
    health: 100
  },
  {
    rarety: 2,
    attack: 13,
    health: 110
  },

  {
    rarety: 3,
    attack: 13,
    health: 200
  },
  {
    rarety: 3,
    attack: 19,
    health: 170
  },
  {
    rarety: 3,
    attack: 18,
    health: 130
  },
  {
    rarety: 3,
    attack: 65,
    health: 100
  },
  {
    rarety: 3,
    attack: 19,
    health: 150
  },
  {
    rarety: 3,
    attack: 13,
    health: 300
  },
  {
    rarety: 3,
    attack: 28,
    health: 130
  },
  {
    rarety: 3,
    attack: 15,
    health: 240
  },
  {
    rarety: 3,
    attack: 25,
    health: 120
  },
  {
    rarety: 3,
    attack: 19,
    health: 190
  },
  {
    rarety: 3,
    attack: 23,
    health: 170
  },
];
const itemsData = [
  {
    price: 20
  },
  {
    price: 100
  },
  {
    price: 30
  },
  {
    price: 60
  },
  {
    price: 60
  },
  {
    price: 30
  },
];
let tasksData = [];
let userData = [];

const getData = async (tasks, userStat, monster, monsterCollection) => {
  const res = await axios.get(`http://localhost:5000/user/getUser/${_id}`);
  tasksData = res.data.tasks;
  userData = res.data;
  userDie();
  if (tasks) innerHTMLTasks();
  if (userStat) innerHTMLUserStat();
  if (monster) innerHTMLMonster();
  if (monsterCollection) innerHTMLMonsterCollection();
};

const formatDate = (timestamp) => {
  if (isNaN(timestamp) || timestamp === null) {
    return "";
  }
  const date = new Date(timestamp);
  const currentYear = new Date().getFullYear();
  const day = date.getDate();
  const month = date.toLocaleString('fr-FR', { month: 'long' });
  const year = date.getFullYear();
  return currentYear === year 
      ? `${day} ${month}` 
      : `${day} ${month} ${year}`;
};

const innerHTMLTasks = () => {
  const sortedTasksData = tasksData.sort((a, b) => new Date(a.date) - new Date(b.date));
  injectTasks.innerHTML = '<div class="lineSeparation"></div>';
  if (tasksData.length === 0) {
    injectTasks.innerHTML += `
      <p id="noTaskText" class="textS2">Aucune tâche en cours :)</p>
    `;
  } else {
    sortedTasksData.forEach((taskData) => {
      const date = new Date(taskData.date);
      const now = new Date().valueOf() - 86400000;
      injectTasks.innerHTML += `
        <div class="taskAndLineContainer">
          <div class="taskContainer hoverType1">
            <div class="leftSection">
              <form><input type="radio" class="radioTask"></form>
              <div class="task">
                <div class="taskName">${taskData.name}</div>
                <div class="taskDate" style="color: ${date < now ? "#C83C3C" : "#379455" }">${formatDate(taskData.date)}</div>
              </div>
            </div>
            <div class="rightSection">
              <div class="project">
                <div class="projectName">${taskData.projectName}</div>
                <div class="projectIcon" style="color: ${taskData.projectColor}">#</div>
              </div>
            </div>
          </div>
          <div class="lineSeparation"></div>
        </div>
      `;
    });
    deleteOneTask();
  }
};

const innerHTMLUserStat = () => {
  injectHealth.innerHTML = userData.lifePoint.toString() + "/100";
  injectHealthProgression.style.width = userData.lifePoint + "%";
  injectLevel.innerHTML = userData.level.toString();
  injectLevelProgression.style.width = userData.levelProgression + "%";
  injectCoins.innerHTML = userData.coins.toString();
  injectArmors.innerHTML = userData.armors.toString();
};

const innerHTMLMonster = () => {
  injectMonsterHealth.innerHTML = monstersData[userData.currentMonster - 1].health;
  injectMonsterCurrentHealth.innerHTML = userData.currentMonsterHealth.toString();
  injectMonsterHealthProgression.style.width = (userData.currentMonsterHealth * 100) / monstersData[userData.currentMonster - 1].health + "%";
  injectDamage.innerHTML = userData.currentMonsterDamage.toString();
  switch (monstersData[userData.currentMonster - 1].rarety) {
    case 1:
      injectTypeOfMonster.innerHTML = "Commun";
      injectTypeOfMonster.style.color = "#EEB925";
      break;
    case 2:
      injectTypeOfMonster.innerHTML = "Rare";
      injectTypeOfMonster.style.color = "#2B7BD5";
      break;
    case 3:
      injectTypeOfMonster.innerHTML = "Légendaire";
      injectTypeOfMonster.style.color = "#D52B80";
      break;
  }
  injectCurrentMonsterImage.style.backgroundImage = `url("./assets/monsters/monster${userData.currentMonster}.png")`;
  injectCurrentMonsterImage.style.backgroundPosition = 'center';
  injectCurrentMonsterImage.style.backgroundSize = 'cover';
  injectCurrentMonsterImage.style.backgroundRepeat = 'no-repeat';
};

const innerHTMLMonsterCollection = () => {
  const monsterIcons = document.querySelectorAll("#collectionPart .monsterContainer .monsterIcon");
  for (let i = 0; i < Array.from(monsterIcons).length; i++) {
    monsterIcons[i].style.background = `url("./assets/monsters/monster${i + 1}.png")`;
    monsterIcons[i].style.backgroundPosition = 'center';
    monsterIcons[i].style.backgroundSize = 'cover';
    monsterIcons[i].style.backgroundRepeat = 'no-repeat';
    for (let j = 0; j < userData.monsterCollection.length; j++) {
      if ((i + 1) === userData.monsterCollection[j]) {
        monsterIcons[i].style.filter = "none";
      };
    };
  };
};

const addOneTask = () => {
  buttonAddTask.addEventListener("click", () => {
    popupContent = document.querySelector("#popup .popupContent")
    popupContent.innerHTML = `
      <div class="popupCloseContainer">
        <div id="popupClose"></div>
      </div>
      <div class="titlePopup"><h1 textTitle>Ajouter une tâche</h1></div>
      <form id="formAddTask">
        <input type="text" placeholder="Tâche" class="inputType1 textS2">
        <textarea placeholder="Description (facultatif)" class="inputType1"></textarea>
        <input type="date" class="inputType1 textS2">
        <div class="colorInputContainer radio-group">
          <label class="radioButton radioButton1"><input type='radio' name='radio' value='#D58C2B'/><span></span></label>
          <label class="radioButton radioButton2"><input type='radio' name='radio' value='#27C263'/><span></span></label>
          <label class="radioButton radioButton3"><input type='radio' name='radio' value='#2B7BD5'/><span></span></label>
          <label class="radioButton radioButton4"><input type='radio' name='radio' value='#D52B80'/><span></span></label>
          <label class="radioButton radioButton5"><input type='radio' name='radio' value='#5736D8'/><span></span></label>
          <label class="radioButton radioButton6"><input type='radio' name='radio' value='#C83C3C'/><span></span></label>
          <label class="radioButton radioButton7"><input type='radio' name='radio' value='#424246'/><span></span></label>
        </div>
        <input type="text" placeholder="Projet (facultatif)" class="inputType1 textS2">
        <input type="submit" value="Ajouter la tâche" class="buttonType1 textS2">
      </form>
    `
    popup.classList.remove("closePopup");
    formAddTask.addEventListener("submit", async (e) => {
      e.preventDefault();
      let selectedRadio = document.querySelector('input[name="radio"]:checked');
      if (!selectedRadio) {
        selectedRadio = "#424246";
      };
      if (e.target[0].value) {
        popup.classList.add("closePopup");
        popupContent.innerHTML = '<div class="popupCloseContainer"><div id="popupClose"></div></div>';
        const taskData = {
          name: e.target[0].value,
          date: e.target[2].valueAsNumber,
          description: e.target[1].value,
          projectName: e.target[10].value,
          projectColor: selectedRadio.value
        }
        tasksData.push(taskData);
        await axios.put(`http://localhost:5000/user/editTasks/${_id}`, {tasks: tasksData})
        await getData(true, false, false, false);
        openOneTask();
        checkConnexion();
      };
    });
    const popupClose = document.getElementById("popupClose");
    popupClose.addEventListener("click", () => {
      popup.classList.add("closePopup");
      popupContent.innerHTML = '<div class="popupCloseContainer"><div id="popupClose"></div></div>'
    });
  });
};

const openOneTask = () => {
  let tasks = document.getElementsByClassName("taskAndLineContainer");
  for (let i = 0; i < Array.from(tasks).length; i++) {
    const task = Array.from(tasks)[i];
    task.addEventListener("click", (e) => {
      if (e.target.type !== "radio") {
        popupContent = document.querySelector("#popup .popupContent")
        popupContent.innerHTML = `
          <div class="popupCloseContainer">
            <div id="popupClose"></div>
          </div>
          <div class="taskDetails" style="border: 3px solid ${tasksData[i].projectColor}">
            <div class="taskDetailsHeader">
              <p class="titleTask">${tasksData[i].name}</p>
              <p class="dateTask">${formatDate(tasksData[i].date)}</p>
            </div>
            <p class="descriptionTask">${tasksData[i].description ? tasksData[i].description : "aucune description"}</p>
            <p class="projectTask" style="color: ${tasksData[i].projectColor}">${tasksData[i].projectName}</p>
          </div>
        `
        popup.classList.remove("closePopup");
  
        const popupClose = document.getElementById("popupClose");
        popupClose.addEventListener("click", () => {
          popup.classList.add("closePopup");
          popupContent.innerHTML = '<div class="popupCloseContainer"><div id="popupClose"></div></div>'
        });
      };
    });
  };
};

const deleteOneTask = () => {
  let radiosOnTask = document.getElementsByClassName("radioTask");
  for (let i = 0; i < Array.from(radiosOnTask).length; i++) {
    const radio = Array.from(radiosOnTask)[i];
    radio.addEventListener("click", async () => {
      radio.closest(".taskAndLineContainer").remove();
      await axios.delete(`http://localhost:5000/user/deleteOneTask/${_id}?taskId=${tasksData[i]._id}`);
      await getData(true, true, false, false);
      checkConnexion();
    });
  };
};

let shopDisabled = false;
const buyItem = () => {
  if (!shopDisabled) {
    let items = document.getElementsByClassName("itemContainer");
    for (let i = 0; i < Array.from(items).length; i++) {
      const item = Array.from(items)[i];
      item.addEventListener("click", async () => {
        shopDisabled = true;
        const random = Math.random();
        let futureMonster;
        if (random < 0.6) {
          futureMonster = (0*11) + Math.floor(Math.random() * 11) + 1;
        } else if (random < 0.9) {
          futureMonster = (1*11) + Math.floor(Math.random() * 11) + 1;
        } else {
          futureMonster = (2*11) + Math.floor(Math.random() * 11) + 1;
        };
        const itemId = i + 1;
        await axios.put(`http://localhost:5000/user/buyItem/${_id}?itemId=${itemId}&futureMonsterHealth=${monstersData[futureMonster - 1].health}&futureMonster=${futureMonster}&futureMonsterDamage=${monstersData[futureMonster - 1].attack}&monsterDamage=${monstersData[userData.currentMonster - 1].attack}`).catch((err) => alert(err.response.data.message));
        await getData(false, true, true, true);
        checkConnexion();        
        shopDisabled = false;
      });
    };
  };
};

const checkConnexion = async () => {
  _id = localStorage.getItem("id_ToDoListApp_8435976127");
  const email = localStorage.getItem("email_ToDoListApp_8435976127");
  const password = localStorage.getItem("password_ToDoListApp_8435976127");
  const encodedEmail = encodeURIComponent(email);
  const encodedPassword = encodeURIComponent(password);  
  axios.get(`http://localhost:5000/user/checkAccount?email=${encodedEmail}&password=${encodedPassword}`)
  .then((res) => {
    if (res.status !== 200) {
      localStorage.clear()
      window.location.href = "./login.html";
    };
  })
  .catch((err) => {
    if (err.status !== 200) {
      localStorage.clear()
      window.location.href = "./login.html";
    };
  })
};

const userDie = async () => {
  if (userData.lifePoint <= 0) {
    let futureMonster;
    const random = Math.random();
    if (random < 0.6) {
      futureMonster = (0*11) + Math.floor(Math.random() * 11) + 1;
    } else if (random < 0.9) {
      futureMonster = (1*11) + Math.floor(Math.random() * 11) + 1;
    } else {
      futureMonster = (2*11) + Math.floor(Math.random() * 11) + 1;
    };
    await axios.put(`http://localhost:5000/user/userDie/${_id}?updatedMonsterHealth=${monstersData[futureMonster - 1].health}&updatedMonster=${futureMonster}&updatedMonsterDamage=${monstersData[futureMonster - 1].attack}&updatedlifePoint=${100}&updatedCoins=${0}&updatedArmors=${0}`);
    popupContent = document.querySelector("#popup .popupContent")
    popupContent.innerHTML = `
      <div class="popupCloseContainer">
        <div id="popupClose"></div>
      </div>
      <div class="diePopup">
        <h2 class="textS1">Vous êtes mort :(</h2>
        <p class="textS2">Vous perdez votre or, vos armures et le monstre en cours</p>
      </div>
    `
    popup.classList.remove("closePopup");
    const popupClose = document.getElementById("popupClose");
    popupClose.addEventListener("click", () => {
      popup.classList.add("closePopup");
      popupContent.innerHTML = '<div class="popupCloseContainer"><div id="popupClose"></div></div>'
    });
    await getData(false, true, true, false);
    checkConnexion();
  };
}


window.addEventListener("load", async () => {
  await checkConnexion();
  await getData(true, true, true, true);
  addOneTask();
  openOneTask();
  buyItem();
});