const collection    = document.querySelector(".collection");
var id, idReceiver;

document.addEventListener('DOMContentLoaded', function(){
    var tooltip     = document.querySelectorAll('.tooltipped');
    var instances   = M.Tooltip.init(tooltip, "outDuration");

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

// Render 'Rezepte' data
const renderContacts = (mail, message, key, idFrom) => {
    email               = mail;
    idReceiver          = idFrom;

    const id            = key;
    const subEmail      = email.substr(0, email.indexOf('@')); 
    const upperEmail    = subEmail.substring(0, 1).toUpperCase() + subEmail.substring(1);
    const msg           = message;

    const html = `
    <li class="collection-item avatar " id="${id}" style="padding-top: 50px; padding-bottom: 60px;">
        <button id="deleteButton" class="button5 modal-trigger" data-target="modal1" 
        style="background-color: #dedede; margin-right:50px; width: 90px">
            <img style="height:80px; width:80px" id="delete" data-id="${id}" src="/img/delete.png"/>
        </button>
        <button id="callButton" class="button5" style="background-color: #dedede; 
        margin-right:20px; width: 90px;">
            <i class="material-icons medium" id="call">call</i>
        </button>
        <button id="shareButton" class="button5" style="background-color: #dedede; margin-right:20px; width:90px;">
            <img style="height:80px; width:80px" id="share" data-id="${id}" src="/img/share.png"/>
        </button>
        <img src="/img/tina.png" class="circle responsive-img">
        <span class="title" style="font-size: 30px;"><b>${upperEmail}</b> hat Ihnen die folgende Nachricht gesendet:</span>
        <p><br>${msg}<br>
    </li>
    `;
    collection.innerHTML += html;
};

// Event listener for buttons
collection.addEventListener('click', evt => {
    if(evt.target.id == "share"){
        localStorage.setItem("idReceiver", idReceiver);
        localStorage.setItem("isReceiverTrue", true);

        // to delete
        id = evt.target.getAttribute("data-id");
        deleteMessage();

        window.location.href = "/pages/myBook/myBook.html";

    } else if(evt.target.id == "call") {

    } else if(evt.target.id == "delete"){
        id = evt.target.getAttribute("data-id");
    }
});

// Delete message in DB
function deleteMessage(){
    deleteMessageDB(id);
}

// Delete message from DOM
const removeMessage = (id) => {
   var lis = document.querySelectorAll('#collection li');
   for(var i=0; li=lis[i]; i++) {
       if(id == li.id){
            li.parentNode.removeChild(li);
       }
   }

};





