const recipes       = document.querySelector('.row');
const isReceiver    = localStorage.getItem("isReceiverTrue");
var id, shareButton, getData;

document.addEventListener('DOMContentLoaded', function() {
    // tooltip
    var tooltip = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(tooltip, "outDuration");

    //modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

if(isReceiver == "true"){
    const html = `
    <div class="collection">
        <i class="material-icons medium left" style="margin-top: 5px; margin-left: 5px;">help</i>
        <a href="#!" class="collection-item" style="float: left; color: black; margin-top: 15px; margin-bottom: 15px;">Bitte leiten Sie das angefragte Rezept weiter.</a>
    </div>
    `;
    recipes.innerHTML += html;
}

// Render Rezepte data
const renderRecipe = (data, id) => {
    if(isReceiver == "false"){
        const html = `
        <div class="col m4">
            <div class="card recipe" data-id="${id}">
                <div class="card-image">
                    <img src="/img/dishes.jpg">
                </div>
                <span class="card-title" style="font-size: 40px;"><center><b>${id}</b></center></span>
                <div class="card-action">
                    <button id="editButton" class="buttonMyBook" style="background-color: #dedede; margin-right:20px;">  
                        <img style="height:75px; width:80px" id="create" src="/img/edit.png"/>
                    </button>
                    <button id="shareButton" class="buttonMyBook" style="background-color: #dedede; margin-right:20px;">
                        <img style="height:75px; width:80px" id="shareRecipe" data-id="${id + ": " + data}" src="/img/share.png"/>
                    </button>
                    <button id="deleteButton" class="buttonMyBook modal-trigger" data-target="modal1" style="background-color: #dedede;">
                        <img style="height:80px; width:80px" id="deleteRecipe" data-id="${id}" src="/img/delete.png"/>
                    </button>
                </div>
            </div>
        </div>
    `;
    recipes.innerHTML += html;
    } else {
        const html = `
        <div class="col m3">
            <div class="card recipe" data-id="${id}" style= "width:400px">
                <div class="card-image">
                    <img src="/img/dishes.jpg">
                </div>
                <span class="card-title" style="font-size: 40px;"><center><b>${id}</b></center></span>
                <div class="card-action">
                    <button id="editButton" class="buttonMyBook" style="background-color: #dedede; margin-right:20px;">
                    <img style="height:65px; width:70px" id="create" src="/img/edit.png"/>
                    </button>
                    <button id="shareButton" class="buttonMyBook" style="background-color: #dedede; margin-right:20px;">
                    <img style="height:65px; width:70px" id="shareRecipe" data-id="${id + ": " + data}" src="/img/share.png"/>
                    </button>
                    <button id="deleteButton" class="buttonMyBook modal-trigger" data-target="modal1" style="background-color: #dedede;">
                        <img style="height:65px; width:70px" id="deleteRecipe" data-id="${id}" src="/img/delete.png"/>
                    </button>
                </div>
            </div>
        </div>
    `;
    recipes.innerHTML += html;
    }
};

// Delete recipe
if(location.pathname == '/pages/myBook/myBook.html'){
    recipes.addEventListener("click", evt => {
        if(evt.target.id === "deleteRecipe"){
            id = evt.target.getAttribute("data-id");
        } else if(evt.target.id === "shareRecipe"){
            getData = evt.target.getAttribute("data-id");
            shareRecipe(getData);
        }
    });
}

// Delete recipe with ID
function deleteRecipeWithID(){
    deleteRecipe(id);
}

// Delete recipe from DOM
const removeRecipe = (id) => {
    const recipe = document.querySelector(`.recipe[data-id=${id}]`);
    recipe.remove();
};

function shareRecipe(data){
    localStorage.setItem("isReceiverTrue", false);
    var idReceiver = localStorage.getItem("idReceiver");
    var timeInMs    = Date.now();

    var recipe = {
        [timeInMs]: data
    }
    addRecipeReceiver(idReceiver, recipe);
    window.location.href = "/pages/index.html";
}

