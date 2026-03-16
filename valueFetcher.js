
document.querySelector(".addNew").addEventListener("click", () => navigate("/add"));


function renderAddNew() {
  const container = document.getElementById("viewLog");
  const header = document.querySelector(".header");

  container.innerHTML = renderAddNewView();
  header.innerHTML = renderAddNewHeader();

  const saveBtn = document.querySelector(".saveBtn");
  const cancelBtn = document.querySelector(".cancelBtn")
  const chooseIconBtn = document.querySelector(".chooseIconBtn");
  const iconSelectorBox = document.querySelector(".iconSelectorBox");
  const appnsec = document.getElementById("appnsec");
  const xlogo = document.getElementById("xlogo");

  const searchInput = document.querySelector('.sfi');
  const searchResults = document.querySelector('.sres');
  const searchList = document.querySelector('.slist');
  const iclistContainer = document.querySelector('.iclist');
  const allIcons = Object.values(ResourceDB).flat();

  for (const key in ResourceDB) {
    ResourceDB[key].forEach(item => {
      const div = document.createElement('div');
      div.className = 'icx';
      div.setAttribute('data-title', item.title);

      const img = document.createElement('img');
      img.src = item.logourl;
      img.alt = item.title;

      div.appendChild(img);
      iclistContainer.appendChild(div);
    });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      searchResults.style.display = "none";
      return;
    }

    const filtered = allIcons.filter(icon =>
      icon.title.toLowerCase().includes(query)
    );

    searchList.innerHTML = "";

    if (filtered.length === 0) {
      searchList.innerHTML = `<br/><br/>`;
    } else {
      filtered.forEach(icon => {
        const div = document.createElement('div');
        div.className = "icx";
        div.innerHTML = `<img src="${icon.logourl}" aria-label="${icon.title}" alt="${icon.title}" title="${icon.title}">`;
        searchList.appendChild(div);
      });
    }

    searchResults.style.display = "block";
  });

  function handleIconClick(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener('click', function (event) {
      const clickedDiv = event.target.closest('.icx, .slist div, .dlist div');
      if (!clickedDiv || !this.contains(clickedDiv)) return;

      const title = clickedDiv.getAttribute('data-title') || clickedDiv.querySelector('img')?.getAttribute('title');
      const imgSrc = clickedDiv.querySelector('img')?.src;

      if (appnsec && xlogo && chooseIconBtn) {
        if (!appnsec.value.trim()) {
          appnsec.value = title; 
        }
        xlogo.src = imgSrc;
        chooseIconBtn.click();
      }
    });
  }

  handleIconClick('.iclist');
  handleIconClick('.slist');
  handleIconClick('.dlist');



  chooseIconBtn.addEventListener("click", function () {
    iconSelectorBox.classList.toggle("show");
  });

  saveBtn.addEventListener("click", async function() {
    const username = document.getElementById("x1").value;
    const email = document.getElementById("x2").value;
    const password = document.getElementById("x3").value;
    const appTitle = appnsec.value.trim();
    const fallbackLogo = "https://www.svgrepo.com/show/289744/globe-internet.svg";
    const logoURL = xlogo?.src?.trim() || fallbackLogo;
  
    if (!appTitle) {
      alert("App name is required");
      return;
    }
  
    const credentialData = {
      key: appTitle,
      logourl: logoURL,
      username,
      email,
      password
    };
  
    const editingId = this.getAttribute('data-editing-id');
    
    try {
      if (editingId) {
        await updateCredential(parseInt(editingId), credentialData);
      } else {
        await addCredential(credentialData);
      }
      
      buildSidebarFromDB();
      history.back()
    } catch (error) {
      console.error("Error saving credential:", error);
      alert("Failed to save credential");
    }
  });
  

  cancelBtn.addEventListener("click", async function () {
    history.back()
  })
}



function renderAddNewHeader(){
    return `
    <div class="appInfo">
        <div class="appName ">
            <p>Add New Login</p>
        </div>
    </div>
    `
}

function renderAddNewView(){
    return `
                        <div class="anMain">
                        <div class="anlhw">
                        <div class="anllabel">
                            <p>Details</p>
                        </div>     
                        <div class="hbreak"></div>
                    </div>                   
                        <div class="logoch">
                            <div class="desc">
                                <p class="desct">App Icon</p>
                                <p class="descs"> Select the App or Website's logo.</p>
                            </div>

                            <div class="gem">
                                <div class="logoDisp">
                                    <img id="xlogo" src="https://www.svgrepo.com/show/289744/globe-internet.svg" alt="">
                                </div>
                                <div class="logoActions">
                                    <button class="chooseIconBtn"> <i class="fa-regular fa-pen"></i>change</button>
                                </div>
                            </div>
                        </div>

                        <div class="iconSelectorBox">
                            <div class="searchForIcon">
                                <input type="text" placeholder="Search logos" class="sfi" name="" spellcheck="false" id="">
                            </div>
                            <div class="containIcons">
                                <div class="sres">
                                    <div class="label">
                                        <p>Result</p>
                                    </div>
                                    <div class="slist">
                                        <div><img src="https://www.svgrepo.com/show/289744/globe-internet.svg" alt=""></div>
                                    </div>
                                </div>
                                <div class="dflt">
                                    <div class="label">
                                        <p>Default</p>
                                    </div>
                                    <div class="dlist">
                                        <div class="icx"><img src="https://www.svgrepo.com/show/289744/globe-internet.svg" alt=""></div>
                                    </div>
                                </div>
                                <div class="feat">
                                    <div class="label">
                                        <p>Popular</p>
                                    </div>
                                    <div class="iclist">
                                    </div>
                                
                                </div>
                            </div>
                        </div>

                        <div class="logoch2">
                            <div class="desc">
                                <p class="desct">App Name</p>
                            </div>

                            <div class="gem">
                                <div class="secret "><input autocomplete="off" id="appnsec" type="text" value="" spellcheck="false" ></div>
                            </div>
                        </div> 
                        <div class="anlhw">
                            <div class="anllabel">
                                <p>Secrets</p>
                            </div>     
                            <div class="hbreak"></div>
                        </div>  
                        <div class="enterDetails">
                            <div class="displayUserName">
                                <div class="dlabel"><p>Username</p></div>
                                <div class="secret"><input autocomplete="off" type="text" id="x1" value="" spellcheck="false"></div>
                              </div>
                              <div class="displayEmail">
                                <div class="dlabel"><p>Email</p></div>
                                <div class="secret"><input autocomplete="off" type="text" value="" id="x2" spellcheck="false" ></div>
                              </div>
                              <div class="displayPWD">
                                <div class="dlabel"><p>Password</p></div>
                                <div class="secret">
                                  <div class="swrap"><input autocomplete="off" type="password" id="x3" value="" spellcheck="false"></div>
                                  <div class="secretActions">
                                    <span class="copySecret gspico" onclick="handlegsp()" data-action="copy" data-index=""><i class="fa-light fa-star-of-life"></i></span>
                                    <span class="viewSecret vsico" onclick="handlepassview()" data-action="toggle-view" data-index=""><i class="fa-regular fa-eye"></i></span>
                                  </div>
                                </div>
                              </div>
                              <div class="appActions">
                                <div class="cancelAction"><button class="cancelBtn" data-action="cancel" data-index="">Cancel</button></div>
                                <div class="saveAction"><button class="saveBtn" data-action="save" data-index="">Save</button></div>
                              </div>
                        </div>
                    </div>
    `
}

function handlegsp(){
  document.getElementById("x3").value=generateStrongPassword()
}
function handlepassview(){
  thisinputx = document.getElementById("x3")
  if(thisinputx.type==='password'){
    thisinputx.type='text'
  }else{
    thisinputx.type='password'
  }
}