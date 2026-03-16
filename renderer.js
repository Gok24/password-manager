



  

function renderView(credential, i) {
  return `
    <div id="vlx-${i}" class="vlx" data-index="${i}" data-id="${credential.id}">
      <div class="indexLog">${i + 1}</div>
      <div class="displayUserName">
        <div class="dlabel"><p>Username</p></div>
        <div class="secret"><input type="text" value="${credential.username}" readonly id="username-${i}" data-index="${i}"></div>
      </div>
      <div class="displayEmail">
        <div class="dlabel"><p>Email</p></div>
        <div class="secret"><input type="text" value="${credential.email}" id="email-${i}" data-index="${i}" readonly></div>
      </div>
      <div class="displayPWD">
        <div class="dlabel"><p>Password</p></div>
        <div class="secret">
          <div class="swrap"><input type="password" value="${credential.password}" readonly id="password-${i}" data-index="${i}"></div>
          <div class="secretActions">
            <!--<span class="copySecret" data-action="copy" data-index="${i}"><i class="fa-regular fa-copy"></i></span>-->
            <span class="viewSecret" data-action="toggle-view" data-index="${i}"><i class="fa-regular fa-eye"></i></span>
          </div>
        </div>
      </div>
      <div class="appActions">
        <div class="updateAction"><button class="updateBtn" data-action="update" data-index="${i}" data-id="${credential.id}">Update</button></div>
        <div class="deleteAction"><button class="deleteBtn" data-action="delete" data-index="${i}" data-id="${credential.id}">Delete</button></div>
      </div>
      <div class="horizontalBreak"></div>
    </div>
  `;
}




  

  function renderHeader({ title, logourl }) {
    return `
      <div class="appInfo">
        <div class="logoIcon">
          <img src="${logourl}" alt="${title} logo">
        </div>
        <div class="appName">
          <p>${title}</p>
        </div>
      </div>
    `;
  }
  

  function renderSideBar({ key, title, logourl, count = 0 }) {
    return `
      <div class="item ctvi" data-appid="${key}">
        <div class="itemIcon">
          <img src="${logourl}" alt="${title} icon">
        </div>
        <div class="itemName">
          <p>${title}</p>
        </div>
        <div class="itemBubble">
          <span>${count}</span>
        </div>
      </div>
    `;
  }
  
   

  function renderSettingsView() {
    return `
    <div>
        <div class="SettingsLabel">
            <p>Appearance</p>
        </div>
        <div class="apprSelectionBox">
            <div class="seltor">
                <div class="artbox lightbox">
                    <div class="sideball">

                        <div class="sideballacc"></div>
                    </div>
                </div>
                <p>Light</p>
            </div>
            <div class="seltor">
                <div class="artbox darkbox">
                    <div class="sideball">

                        <div class="sideballacc"></div>
                    </div>
                </div>
                <p>Dark</p>
            </div>
        </div>

            <div class="lm">
              <div class="lbl">
                <span>Security</span>
              </div>
              <div class="pact">
                <div class="destx"><p>Master Password</p></div>
                <div class="dbtn"><button class="chngp"><i class="fa-regular fa-pen"></i> Change</button></div>
    
              </div>
              <!--<div class="pact">
                <div class="destx"><p>Auto-logout after (inactivity)</p></div>
                <div class="dbtn"><button class="al"> 1 min <i class="fa-regular fa-chevron-down"></i></button></div>
    
              </div>-->
            </div>

              <div class="lm">
                <div class="lbl">
                <span>Data </span>
              </div>
              <div class="pact">
                <div class="destx"><p>Delete all your Data permenantly</p></div>
                <div class="dbtn"><button class="dl"><i class="fa-duotone fa-solid fa-trash"></i> Delete</button></div>

              </div>
            </div>
      </div>
    `;
  }
  

  function renderSettingsHeader(){
    return `
        <div class="appInfo">
            <div class="appName">
                <p>Settings</p>
            </div>
        </div>
    `
  }


  function renderHomeHeader() {
    return `
      <div class="appInfo">
        <div class="appName">
          <p></p>

        </div>
        
      </div>
    `;
  }
  
  const catSayings = [
    "Meow means 'feed me now', hooman.",
    "You were gone for 5 minutes. I thought you died.",
    "You work. I nap. Fair trade.",
    "I'm not fat, I'm just floofy.",
    "Oh look, another expensive thing I can sit on.",
    "I licked it. It’s mine now.",
    "Was that glass important?",
    "Mrrrrrowwwww (Translation: I demand snacks!)",
    "Don't touch me... unless you're giving treats.",
    "Touch me with respect, peasant.",
  "Pet me once. That’s it. You’ve been warned.",
  "Who said you could touch the royal fluff?",
  "You may pet me now. Actually, no. Stop.",
  "That's the forbidden spot! Prepare to bleed.",
  "I liked that pet... until I didn’t.",
  "One wrong stroke and I sue.",
  "Why are you touching me with those peasant hands?",
  "You pet. I allow. Then I attack.",
    "Did I ask for your opinion? No. I’m a cat.",
    "My fur? That’s your new outfit now.",
    "I’m silently judging you from the bookshelf.",
    "Meeeeeeeeeeeeeooooooooowww at 3AM. You’re welcome.",
    "Yes, that was nice. Don't ever do it again.",
    "Pet me! … Okay now stop. Actually, start again.",
    "You live here too? Weird."
  ];

  function rencat(){
    dispc = document.querySelector(".dispc")
    const randomIndex = Math.floor(Math.random() * catSayings.length);
      dispc.textContent = catSayings[randomIndex];
  }
  function renderHomeMainView(showActions = false) {
    let html = `
      <div class="homeWrapper">
        <div class="SettingsLabel">
          
        </div>
        <div class="clp">
        <span class="dispc">meow</span>
          <dotlottie-player onclick="rencat()" class="tlo" background="#FFFFFF00" direction="1" id="animation_hand-wave_351224c2-4d61-11ef-aaca-8bfcedf78565" speed="1" mode="normal" src="/res/lotties/petcat.lottie" loop autoplay ></dotlottie-player>
          
        </div>
        
      </div>
    `;
  
    if (showActions) {
      html += `
        <div class="homeActions">
          <button class="homeSettingsBtn">Settings</button>
          <button class="homeAddNewBtn">Add New</button>
        </div>
      `;
    }
  
    html += `</div>`;
    return html;
  }
  
  function renderFSHV(){
    return `
        <div class="homeActions">
<div class="wave">
    <span></span>
    <span></span>
    <span></span>
  </div>
    <div class="HAmodel">
        <div class="smltitle">
            
        </div>
        <div class="bigDesc">
            <p>A fully local, encrypted password manager for secure and private storage.</p>
        </div>
        <div class="smalldesc">
            <p>Keep your passwords safe offline with strong encryption—only you control your data, no clouds or third parties.</p>
        </div>

        <div class="featList">
            <p><i class="fa-regular fa-box-check"></i> Local storage (on your device)</p>
            <p><i class="fa-regular fa-key"></i> Strong AES-256 encryption</p>
            <p><i class="fa-regular fa-lock"></i> Secure password generation</p>
            <p><i class="fa-regular fa-shield-heart"></i> Quick and safe access to saved information</p>
        </div>

        <div class="btclass">
        <button class="homeAddNewBtn">Add New</button>
        <button class="homeSettingsBtn">Settings</button>
        </div>
    </div>

        </div>    
    `
  }
  
  function renderHomeView(showFullScreen = false) {
    const header = document.querySelector(".header");
    const container = document.getElementById("viewLog");
  
    header.innerHTML = renderHomeHeader();
    
    if (showFullScreen) {
      header.innerHTML=""
      container.innerHTML = renderFSHV();
      document.querySelector(".homeSettingsBtn").addEventListener("click", () => navigate("/settings"));
      document.querySelector(".homeAddNewBtn").addEventListener("click", () => navigate("/add"));
      return;
    }
  
    container.innerHTML = renderHomeMainView();
  }
  
  




  const SettingsButton = document.querySelector(".settings")
  SettingsButton.addEventListener("click", () => navigate("/settings"));

  
  
  function bindCtviClickHandlers() {
    const items = document.querySelectorAll(".ctvi");
    const container = document.getElementById("viewLog");
    const header = document.querySelector(".header");
  
    items.forEach(item => {
      item.addEventListener("click", () => {
        const appId = item.getAttribute("data-appid");
        navigate(`/view/${encodeURIComponent(appId)}`);
      });
    });
  }
  
  
  const savedLogins = document.querySelector(".savedLogins");

  buildSidebarFromDB();

  

  async function buildSidebarFromDB() {
    const allCreds = await getAllCredentials();
    const groups = {};
  
    allCreds.forEach(cred => {
      if (!groups[cred.key]) groups[cred.key] = [];
      groups[cred.key].push(cred);
    });
  
    const savedLogins = document.querySelector(".savedLogins");
    const sideTab = document.querySelector(".sideTab");
    const mainViewTab = document.querySelector(".mainViewTab");
  
    savedLogins.innerHTML = "";
  
    const hasSavedLogins = Object.keys(groups).length > 0;
  
    if (!hasSavedLogins) {
      sideTab.style.display = "none";
      mainViewTab.style.maxWidth = "600px";
      mainViewTab.style.alignSelf = "center";
      return false;
    }
  
    sideTab.style.display = "flex";
    mainViewTab.style.maxWidth = "600px";
  
    for (const [key, creds] of Object.entries(groups)) {
      const logo = creds[0].logourl || "fallback.svg";
      savedLogins.innerHTML += `
        <div class="item ctvi" data-appid="${key}">
          <div class="itemIcon"><img src="${logo}"></div>
          <div class="itemName"><p>${key}</p></div>
          <div class="itemBubble"><span>${creds.length}</span></div>
        </div>
      `;
    }
    bindCtviClickHandlers();
    return true; 
  }
  
  





  function bindUpdateHandlers() {
    document.querySelectorAll('.updateBtn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.getAttribute('data-id');
        const index = this.getAttribute('data-index');
        const container = document.getElementById(`vlx-${index}`);
        
        const credential = {
          id: parseInt(id),
          key: container.closest('#viewLog').getAttribute('data-app-id'),
          username: container.querySelector(`#username-${index}`).value,
          email: container.querySelector(`#email-${index}`).value,
          password: container.querySelector(`#password-${index}`).value,
          logourl: document.querySelector('.appInfo .logoIcon img')?.src
        };
        
        navigateToEdit(credential);
      });
    });
  }
  
  async function navigateToEdit(credential) {
    
    navigate("/add", true);
    
    setTimeout(() => {
      document.getElementById("appnsec").value = credential.key || "";
      document.getElementById("x1").value = credential.username || "";
      document.getElementById("x2").value = credential.email || "";
      document.getElementById("x3").value = credential.password || "";
      
      if (credential.logourl) {
        document.getElementById("xlogo").src = credential.logourl;
      }
      
      const saveBtn = document.querySelector('.saveBtn');
      if (saveBtn) {
        saveBtn.setAttribute('data-editing-id', credential.id);
        saveBtn.textContent = "Update";
      }
    }, 100);
  }




  function setupChngp(){
    chngp = document.querySelector(".chngp")
    dl = document.querySelector(".dl")
    chngp.addEventListener('click',()=>{
      localStorage.removeItem("encryptedData");
      window.location.replace("setup.html");
    })

    dl.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all activity permanently? This action cannot be undone.')) {
        localStorage.removeItem("encryptedData");
        localStorage.removeItem("sessionCreated");
        localStorage.removeItem("sessionIV");
        localStorage.removeItem("sessionToken")
        deleteDatabase()
        window.location.replace("setup.html")
          .then((message) => {
            console.log(message);  
            alert('All data has been permanently deleted!');
          })
          .catch((error) => {
            console.error(error);  
            alert('An error occurred while deleting the data.');
          });
      }
    });
  }
  function setupDarkModeToggle() {
    const lightModeBtn = document.querySelector('.lightbox').closest('.seltor');
    const darkModeBtn = document.querySelector('.darkbox').closest('.seltor');
    
    const darkModeOn = getCookie("darkMode") === "true";
    updateModeSelection(darkModeOn);
    
    lightModeBtn.addEventListener('click', () => {
      setCookie("darkMode", "false");
      document.body.classList.remove("dark-mode");
      updateModeSelection(false);
    });
    
    darkModeBtn.addEventListener('click', () => {
      setCookie("darkMode", "true");
      document.body.classList.add("dark-mode");
      updateModeSelection(true);
    });
  }
  
  function updateModeSelection(isDarkMode) {
    const lightModeBtn = document.querySelector('.lightbox').closest('.seltor');
    const darkModeBtn = document.querySelector('.darkbox').closest('.seltor');
    
    lightModeBtn.classList.toggle('selectedmode', !isDarkMode);
    darkModeBtn.classList.toggle('selectedmode', isDarkMode);
  }

  document.addEventListener("DOMContentLoaded", () => {
    handleRoute(location.hash || "#/");
    
    
    const darkModeOn = getCookie("darkMode") === "true";
    document.body.classList.toggle("dark-mode", darkModeOn);
    
    if (location.hash.includes("settings")) {
      setupDarkModeToggle();
    }
  });

//-------------------routing---------------------------------//


function navigate(path, replace = false) {
  if (location.hash !== `#${path}`) {
    if (replace) {
      location.replace(`#${path}`);
    } else {
      location.hash = path;
    }
  }
  handleRoute(path);
}


function handleRoute(path) {
  const cleanPath = path.startsWith('#') ? path.substring(1) : path;
  
  if (cleanPath === "/" || cleanPath === "") {
    buildSidebarFromDB().then(hasLogins => {
      renderHomeView(!hasLogins);
    });
  } else if (cleanPath === "/settings") {
    renderSettings();
  } else if (cleanPath === "/add") {
    renderAddNew();
  } else if (cleanPath.startsWith("/view/")) {
    const key = decodeURIComponent(cleanPath.split("/view/")[1]);
    renderSavedLogin(key);
  }
}

window.addEventListener("hashchange", () => {
  handleRoute(location.hash);
});

  function renderSettings() {
    const container = document.getElementById("viewLog");
    const header = document.querySelector(".header");
  
    container.innerHTML = renderSettingsView();
    header.innerHTML = renderSettingsHeader();
  


    setupChngp();
    setupDarkModeToggle();
  
    const triggerButton = container.querySelector(".triggerAlert");
    if (triggerButton) {
      triggerButton.addEventListener("click", () => {
        alert("Button inside settings view clicked!");
      });
    }
  }
  
  function renderAddNew() {
    const container = document.getElementById("viewLog");
    const header = document.querySelector(".header");
  
    container.innerHTML = renderAddNewView();
    header.innerHTML = renderAddNewHeader();
  
  }
  async function renderSavedLogin(appId) {
    const container = document.getElementById("viewLog");
    const header = document.querySelector(".header");
  
    const logins = await getCredentialsByKey(appId);
  
    if (!logins || logins.length === 0) {
      container.innerHTML = `<p>No data for "${appId}".</p>`;
      header.innerHTML = "";
      return;
    }
  
    const { logourl } = logins[0];
    const logo = logourl || "https://www.svgrepo.com/show/289744/globe-internet.svg";
  
    header.innerHTML = renderHeader({
      title: appId,
      logourl: logo
    });
      container.setAttribute('data-app-id', appId);
    
    container.innerHTML = logins.map((login, i) => renderView(login, i)).join('');
    
    bindUpdateHandlers();
    bindDeleteHandlers();
    bindViewPass();
  }

  function bindViewPass(){
    document.querySelectorAll('.viewSecret').forEach(vs=>{
      vs.addEventListener('click', async function(){
        parentofvs = this.closest('.secret');
        thisinput = parentofvs.querySelector('.swrap input');
        if(thisinput.type==='password'){
          thisinput.type='text'
        }else{
          thisinput.type='password'
        }
      })
    })
  }
  
  function bindDeleteHandlers() {
    document.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.getAttribute('data-id');
        const index = this.getAttribute('data-index');
        
        if (confirm("Are you sure you want to delete this credential?")) {
          try {
            await deleteCredential(parseInt(id));
            document.getElementById(`vlx-${index}`).remove();
            
            buildSidebarFromDB();
            
            const remainingItems = document.querySelectorAll('.vlx');
            if (remainingItems.length === 0) {
              history.back()
            }
          } catch (error) {
            console.error("Error deleting credential:", error);
            alert("Failed to delete credential");
          }
        }
      });
    });
  }