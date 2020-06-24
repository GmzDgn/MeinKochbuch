const recipes = document.querySelector('.recipes');
var instanceTitle;

document.addEventListener('DOMContentLoaded', function(){
    if(location.pathname == '/pages/recipes.html'){
        // tooltip
        var tooltip = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(tooltip, "outDuration");

        // modal
        var elems               = document.querySelectorAll('.modal');
        var instancesModal      = M.Modal.init(elems);

        var singleModal         = document.querySelector('#modalTitle');
        instanceTitle           = M.Modal.getInstance(singleModal);
    }
});

// To pass values to the recipeText.html page
function passTitle(title){
    var title = document.getElementById("title").value;
    if(title == null || title == ""){
        localStorage.setItem("titleValue", "kein Titel");
    } else {
        localStorage.setItem("titleValue", title);
    }
}