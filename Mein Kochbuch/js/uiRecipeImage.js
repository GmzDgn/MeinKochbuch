const form = document.querySelector('.formUploadImage');
var title = localStorage.getItem("titleValue");

document.addEventListener('DOMContentLoaded', function(){
    // tooltip
    var tooltip = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(tooltip, "outDuration");
});

// Add image to storage and database
form.addEventListener('submit', evt => {
     var image = document.getElementById("uploadImage").files[0];
     var uid = getCurrentUserId();
 
     var storageRef = firebase.storage().ref(uid + "/" + title);
     storageRef.put(image);

     var recipe = {
         [title]: {
             Zubereitung: "image"
         }
     }
     addRecipe(recipe);
});

// Get image path
var pictureSource;   
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function getPhoto(source){
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI, 
        sourceType: source
    });
}

function onFail(msg){
    alert('Failed because: ' + msg);
}

