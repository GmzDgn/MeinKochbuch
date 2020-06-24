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

const btnsignin = document.getElementById("signin");
const btnlogin  = document.getElementById("login");
const email = document.getElementById("login-email");
const password = document.getElementById("login-password");

// Sign in
btnsignin.addEventListener("click", function(){
    const eMail = email.value;
    const pass  = password.value;
    const auth = firebase.auth();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        
        const promise = auth.createUserWithEmailAndPassword(eMail, pass).then(cred => {
            var userCredential = cred;
            createDbElements(userCredential);
            window.location = '/pages/index.html';
        });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("SignIn Firebase Error Code: ", error.code);
        console.log("SignIN Firebase Error Message: ", errorMessage);
    });
});

// Log in
btnlogin.addEventListener("click", function(){
    const eMail = email.value;
    const pass  = password.value;
    const auth = firebase.auth();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        return firebase.auth().signInWithEmailAndPassword(eMail, pass).then(cred => {
            if(eMail == "tina@test.de"){
                window.location = '/pages/related/indexRelated.html';
            } else {
                window.location = '/pages/index.html';
            }
        });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Login Firebase Error Code: ", error.code);
        console.log("Login Firebase Error Message: ", errorMessage);
    });
});

// After sign in create db elements in firebase
function createDbElements(cred) {
    // create documentation "Rezepte"
    db.collection(cred.user.uid).doc('Rezepte').set({}).then(function() {
        console.log("The cocument 'Rezepte' is successfully written!");
    });

    // create documentation "Kontakte"
    db.collection(cred.user.uid).doc('Kontakte').set({}).then(function() {
        console.log("The document 'Kontakte' is successfully written!");
    });
    
    // create documentation "Anfragen"
    db.collection(cred.user.uid).doc('Anfragen').set({}).then(function() {
        console.log("The document 'Anfragen' is successfully written!");
    });
}