const recordStarted = document.querySelector('.recordStarted');
const form          = document.querySelector('.formUploadRecord');
const title         = localStorage.getItem("titleValue");
var fileBlob;

form.addEventListener('submit', evt => {
    var uid         = getCurrentUserId();
    var storageRef  = firebase.storage().ref(uid + "/" + title);
    
    storageRef.put(fileBlob).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
    });

    var recipe = {
        [title]: {
            Zubereitung: "record"
        }
    }
    addRecipe(recipe);
});

document.addEventListener('DOMContentLoaded', function(){
    // tooltip
    var tooltip = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(tooltip, "outDuration");
});

// Record voice
URL = window.URL || window.webkitURL;
var gumStream;
var rec;
var input;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
const recipes = document.querySelector('.recipes');

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() { 
    console.log("recordButton clicked"); 

    var constraints = {
        audio: true,
        video: false
    };

    recordButton.disabled = true;
    stopButton.disabled = false;

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
   
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);

        rec = new Recorder(input, {numChannels: 1})
        //start the recording process 
        rec.record()
        console.log("Recording started");

    }).catch(function(err) {
        console.log("ERROR uiRecipeRecord");
        recordButton.disabled = false;
        stopButton.disabled = true;
    });

    recordStart();
}

function stopRecording() {
    deleteNoRecords();
    deleteRecordStart();
    console.log("stopButton clicked");

    stopButton.disabled = true;
    recordButton.disabled = false;

    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    // store blob to fileblob to retrieve it later to send it to the storage
    fileBlob = blob;

    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;
    //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + '.wav';

    link.innerHTML = link.download;
    //add the new audio and a elements to the li element 
    li.appendChild(au);
    li.appendChild(link);
    //add the li element to the ordered list 
    recordingsList.appendChild(li);
}

// Upload in storage
function recordStart() {
    const html = `<i>Aufnahme wurde gestartet. Sprechen Sie Ihr Rezept aus....</i>`;
    recordStarted.innerHTML += html;
}

function deleteRecordStart() {
    recordStarted.innerHTML = '';
  }

function deleteNoRecords() {
    const noRecords = document.getElementById("noRecords");
    noRecords.innerHTML = '';
  }