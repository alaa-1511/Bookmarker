var inputName=document.getElementById('nameSite');
var inputUrl=document.getElementById('urlStyle');
var inputsubmitSite=document.getElementById('submitSite');
var inputSearch=document.getElementById('search');
var inputUpdate=document.getElementById('Update');
var inputDelete=document.getElementById('Delete');
var btnUpdate=document.getElementById('btnUpdate');
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
updateMood = false;
var  containerWebsite=[];
if(localStorage.getItem("web")!==null){
  containerWebsite=JSON.parse(localStorage.getItem("web"));
  dasplyWebSite()
}


inputsubmitSite.addEventListener('click',function(){
 
  addWebsite()
  dasplyWebSite()
  clearWebsite()
  
  
  
});

function addWebsite(){
  if (
    inputName.classList.contains("is-valid") &&
    inputUrl.classList.contains("is-valid")
  ){
    website={
      name:inputName.value,
      url:inputUrl.value
    }

  
    containerWebsite.push(website);
    localStorage.setItem("web",JSON.stringify(containerWebsite));
    inputName.classList.remove("is-valid");
    inputUrl.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
};

function dasplyWebSite(){
  var boxs='' ;
  for(var i=0 ; i< containerWebsite.length; i++){

  boxs +=`
          <tr>
              <td>${i}</td>
              <td>  ${containerWebsite[i].name}</td>
              <td>  ${containerWebsite[i].url}</td>
              <td>
                <button onclick="visit(${i})" class="btn btn-outline-success btn-sm">
                 <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button onclick=" UpdateformSite(${i})" class="btn btn-outline-warning btn-sm">
                   <i class="fas fa-pen pe-2"></i>Update
                </button>
              </td>
              <td>
                <button onclick="deleteWebsite(${i})" class="btn btn-outline-danger btn-sm">
                  <i class="fa-solid fa-trash-can pe-2 "></i>Delete
                </button>
              </td>
          </tr>

              
    `
  }
  document.getElementById('Data').innerHTML=boxs;
};

// clear
function clearWebsite() {
  inputName.value="";
 inputUrl.value="";

}

// delete
function deleteWebsite(indexdelete) {
  const confirmBox = document.querySelector(".confirm-box");
  const confirmButton = document.getElementById("confirmDelete");
  const cancelButton = document.getElementById("cancelDelete");

  confirmBox.classList.remove("d-none");


  confirmButton.onclick = function () {
    containerWebsite.splice(indexdelete, 1);
    localStorage.setItem("web", JSON.stringify(containerWebsite));
    dasplyWebSite();
    confirmBox.classList.add("d-none");
  };

  cancelButton.onclick = function () {
    confirmBox.classList.add("d-none");
  };
}

  
// update



function UpdateSite() {
  const updatedName = inputName.value.trim();
  const updatedUrl = inputUrl.value.trim();

  if (
    updatedName === containerWebsite[UpdateIndexData].name &&
    updatedUrl === containerWebsite[UpdateIndexData].url
  ) {
    showAlertNoChanges();
    return; 
  }

  
  containerWebsite[UpdateIndexData].name = updatedName;
  containerWebsite[UpdateIndexData].url = updatedUrl;
  localStorage.setItem("web", JSON.stringify(containerWebsite));
  dasplyWebSite();
  clearWebsite();
  btnUpdate.classList.add("d-none");
  submitSite.classList.remove("d-none");
}

function showAlertNoChanges() {
  const infoBox = document.querySelector(".box-information");
  infoBox.classList.remove("d-none");

  const exitButton = document.getElementById("BoxExit");
  exitButton.addEventListener("click", function () {
    infoBox.classList.add("d-none");
  });
}


var UpdateIndexData;
function  UpdateformSite(indexUpdate){
  UpdateIndexData=indexUpdate;
  btnUpdate.classList.remove("d-none");
  submitSite.classList.add("d-none");
  
  inputName.value=containerWebsite[indexUpdate].name;
  inputUrl.value=containerWebsite[indexUpdate].url;

}


// search
inputSearch.addEventListener("input", function(){
  searchSite()
});

function searchSite(){
var  term =inputSearch.value;
box='';
for(var i=0;i<containerWebsite.length; i++){
  if(containerWebsite[i].name.toLowerCase().includes(term.toLowerCase()) ==  true){
      box +=`
      <tr>
          <td>${i}</td>
          <td>  ${containerWebsite[i].name}</td>
          <td>  ${containerWebsite[i].url}</td>
          <td>
            <button onclick="visit(${i})" class="btn btn-outline-success">
            <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </td>
          <td>
            <button onclick=" UpdateformSite(${i})" class="btn btn-outline-warning">
              <i class="fas fa-pen pe-2"></i>Update
            </button>
          </td>
          <td>
            <button onclick="deleteWebsite(${i})" class="btn btn-outline-danger">
              <i class="fa-solid fa-trash-can pe-2 "></i>Delete
            </button>
          </td>
      </tr>

          
`
}
}
document.getElementById('Data').innerHTML=box;

}


function validationInputs(element){
  var text =element.value;
  var regex= {
    nameSite: /^[a-zA-Z0-9\s\-_]{3,10}$/,
    urlStyle:/^(https?:\/\/)?(www\.)?[\w.-]+\.\w{2,}(\/?(:\d{2,5})?(\/[\w.-]*)*)?$/

  }
  if(regex [element.id].test(text)== true){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
}else{
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
  return false;
}
};



function visit(e) {
  let httpsRgx = /^https?:\/\//;
  if (httpsRgx.test(containerWebsite[e].url)) {
    open(containerWebsite[e].url);
  } else {
    open(`https://${containerWebsite[e].url}`);
  }
}

//Close Modal Function

function closeModal() {
  boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});


