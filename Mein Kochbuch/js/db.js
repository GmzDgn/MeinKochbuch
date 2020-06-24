// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB5NkmwC-nLDUDIs3A_YHW9vLdSh68dcNg",
    authDomain: "database-meinkochbuch.firebaseapp.com",
    databaseURL: "https://database-meinkochbuch.firebaseio.com",
    projectId: "database-meinkochbuch",
    storageBucket: "database-meinkochbuch.appspot.com",
    messagingSenderId: "104486138250",
    appId: "1:104486138250:web:59adea2b0e109f867ed873"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

var user = firebase.auth().currentUser;
var contacts;
var valueInquiries = 0;
var deleteRecipeTitle;
var deleteMessageID;

// User real-time listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User: " + user.uid + " is logged in!");
        return user.uid;
    } else {
        console.log("No user is logged in!");
    }
});

// Add a recipe
const addRecipe = (data) => {
    var userID = getCurrentUserId();
    db.collection(userID).doc('Rezepte').set(data, { merge: true }).then(function() {
        console.log("New recipe is written successfully!");
        localStorage.setItem("recipeWrittenSuccessfully", true);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Add Recipe Error Code: ", error.code);
        console.log("Add Recipe Error Message: ", errorMessage);
    });
}

// Add a recipe for receiver
const addRecipeReceiver = (id, data) => {
    db.collection(id).doc('Rezepte').set(data, { merge: true }).then(function() {
        console.log("New recipe is written successfully!");
        localStorage.setItem("recipeSharedSuccessfully", true);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Add Recipe Error Code: ", error.code);
        console.log("Add Recipe Error Message: ", errorMessage);
    });
}

// Delete a recipe
const deleteRecipe = (id) => {
    const recipeId = id;
    deleteRecipeTitle = id;
    const userID = getCurrentUserId();

    db.collection(userID).doc('Rezepte').update({ 
        [recipeId]: firebase.firestore.FieldValue.delete()
    });
}

// Delete a message
const deleteMessageDB = (id) => {
    const message = id;
    deleteMessageID = id;
    const userID = getCurrentUserId();

    db.collection(userID).doc('Anfragen').update({ 
        [message]: firebase.firestore.FieldValue.delete()
    });
}

// Decrease InqueriesValue
function decreaseValue(){
    --valueInquiries;
} 

// Send a message. 
function sendMessage(rec, msg) {
    var reciever = rec;
    var data = msg;

    db.collection(reciever).doc('Anfragen').set(data, { merge: true }).then(function() {
        console.log("New message is sent successfully!");
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Send Message Error Code: ", error.code);
        console.log("Send Message Error Message: ", errorMessage);
    });
}

// Real-time listener (onShnapshot) for myBook
setTimeout(function(){
    if(location.pathname == '/pages/myBook/myBook.html'){
        db.collection(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    try {
                        if(change.doc.id == 'Rezepte'){
                            const data = change.doc.data();
                            for (const key in data) {
                                // Key = title (for example Soup)
                                const title = data[key];
                                const value = title["Zubereitung"];
                                renderRecipe(value, key);
                            }
                        }
                    } catch (err) {
                          console.log("renderRecipe() is not defined for this html file.");
                    }
                }
                if(change.type === 'modified'){
                    // remove the document data from the web page
                    removeRecipe(deleteRecipeTitle);
                }
            });
        });   
    }
}, 1500);

// real-time listener (onShnapshot) for inqueries/messages
setTimeout(function(){
    if(location.pathname == '/pages/index.html' || location.pathname == '/pages/inqueries/inqueries.html'){
        db.collection(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    try {
                        if(change.doc.id == 'Anfragen'){
                            const data = change.doc.data();
                            for (const key in data) {
                                ++valueInquiries;
                                if(location.pathname == '/pages/inqueries/inqueries.html'){
                                    const id = data[key];
                                    const msg = id["Nachricht"];
                                    const email = id["VonEmail"];
                                    const idFrom = id["VonID"];

                                    renderContacts(email, msg, key, idFrom);
                                }
                            }
                        }

                    } catch (err) {
                            console.log("renderRecipe() is not defined for this html file.");
                    }
                }
                if(change.type === 'modified'){
                    if(valueInquiries != 0){
                        decreaseValue();
                        removeMessage(deleteMessageID);
                    }
                }
            });
            if(location.pathname == '/pages/index.html'){
                displayInqueries(valueInquiries);
            }
        });   
    }
}, 1500);

// real-time listener (onShnapshot) for contacts
setTimeout(function(){
    if(location.pathname == '/pages/related/indexRelated.html' 
    || location.pathname == '/pages/myContacts/myContacts.html'){
        db.collection(firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    try {
                        if(change.doc.id == 'Kontakte'){
                            const data = change.doc.data();
                            for (const key in data) {
                                // key = id 
                                // title = email
                                const title = data[key];
                                renderContacts(title, key);
                            }
                        }
                    } catch (err) {
                        console.log("db.js: ", err);
                    }
                }
            });
        });
    }
}, 1500);

// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            // probalby multiple tabs open at once
            console.log('Persistence failed');
        } else if(err.code == 'unimplemented'){
            // lack of browser support
            console.log('Persistence is not available');
        }
});

function getValueInquiries(){
    return valueInquiries;
}

