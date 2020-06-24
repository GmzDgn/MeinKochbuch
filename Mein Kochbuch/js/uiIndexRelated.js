// This document is to handle actions from the "relative"-site.

const recipes           = document.querySelector(".row");
const form          	= document.querySelector('#textmsg-form');
var userIdReciever;
var cardContainer;

document.addEventListener("DOMContentLoaded", function(){
    var modal = document.querySelector(".modal");
    M.Modal.init(modal);
});

// Listener
form.addEventListener('submit', evt => {
    const email     = getCurrentUserEmail();
    const id        = firebase.auth().currentUser.uid;
    var timeInMs    = Date.now();

    var message = {
        [timeInMs]: {
            VonEmail: email,
            VonID: id,
            Nachricht: form.msg.value
        }
    }
    sendMessage(userIdReciever, message);
});

// Render 'Kontakte' data
const renderContacts = (data, id) => {
    const subEmail      = data.substr(0, data.indexOf('@')); 
    const upperEmail    = subEmail.substring(0, 1).toUpperCase() + subEmail.substring(1);

    const html = `
        <div class="col m4">
            <div class="card">
                <div class="card-image">
                    <img src="/img/tina.png">
                </div>
                <center><span class="card-title" style="font-size: 50px;"><b>${upperEmail}</b></span></center>
                <div class="card-action">
                    <button id="sendMsgButton" data-id="${id}" data-target="modal-textmsg" class="button4 modal-trigger" style="background-color: #dedede; margin-right:10px;">
                        <i class="material-icons medium">textsms</i>
                    </button>
                    <button class="button4" style="background-color: #dedede; margin-right:10px;">
                        <i class="material-icons medium">call</i>
                    </button>
                    <button class="button4" style="background-color: #dedede;">
                        <i class="material-icons medium">videocam</i>
                    </button>
                </div>
            </div>
        </div>
    `;
    recipes.innerHTML += html;
    cardContainer = document.getElementById('sendMsgButton');
};

setTimeout(function(){
    // Get Id
    cardContainer.addEventListener('click', evt => {
        userIdReciever = cardContainer.getAttribute('data-id');
    });
}, 2200);