const inqueries = document.querySelector('#inqueries');
var instanceUpload, instanceShared, instancesModal;
var getItemUpload = localStorage.getItem("recipeWrittenSuccessfully");
var getItemShared = localStorage.getItem("recipeSharedSuccessfully");

// This method displays the number of inqueries on the homepage. 
const displayInqueries = (value) => {
    numberOfInqueries = value;
    if(value > 1){
        const html = `Sie haben
        <span style="color: red;">${numberOfInqueries}</span> 
        Nachrichten`;
        inqueries.innerHTML += html;
    } else if(value == 0){
        const html = `<span style="font-size: 40pt;">Sie haben keine Nachrichten</span>`;
        inqueries.innerHTML += html;
    } else if(value == 1){
        const html = `Sie haben 
        <span style="color: red;">${numberOfInqueries}</span> 
        Nachricht`;
        inqueries.innerHTML += html;
    }
};

document.addEventListener('DOMContentLoaded', function(){
    var elems               = document.querySelectorAll('.modal');
    var instancesModal      = M.Modal.init(elems);

    var singleModalUpload   = document.querySelector('#modalUpload');
    instanceUpload          = M.Modal.getInstance(singleModalUpload);

    var singleModalShared   = document.querySelector('#modalShared');
    instanceShared          = M.Modal.getInstance(singleModalShared);

    if(getItemUpload == "true"){
        instanceUpload.open();
        localStorage.setItem("recipeWrittenSuccessfully", false);
    } else if(getItemShared == "true"){
        instanceShared.open();
        localStorage.setItem("recipeSharedSuccessfully", false);
    }
});



