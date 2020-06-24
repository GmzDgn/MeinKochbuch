var title       = localStorage.getItem("titleValue");
localStorage.setItem("titleValue", "");

const addTitle  = document.getElementById('titleRecipe');
const form      = document.querySelector('.formUploadText');

document.addEventListener('DOMContentLoaded', function(){
    var tooltip         = document.querySelectorAll('.tooltipped');
    var instances       = M.Tooltip.init(tooltip, "outDuration");
});

form.addEventListener('submit', evt => {
    var recipe = {
        [title]: {
            Zubereitung: form.textRecipe.value
        }
    }
    addRecipe(recipe);
    form.textRecipe = '';
});

const html = `Die Zubereitung für Ihr Rezept "<b>${title}</b>":`;
addTitle.innerHTML += html;
