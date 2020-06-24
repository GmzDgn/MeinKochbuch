// Get current users email address from firebase
function getCurrentUserEmail(){
    var user = firebase.auth().currentUser;
    var email;
    
    if (user != null) {
        email = user.email;
        return email;
      } else {
        console.log("User Email is null.");
      }
}

// Get current users id from firebase
function getCurrentUserId(){
    var user = firebase.auth().currentUser;
    var id;
    
    if (user != null) {
        id = user.uid;
        return id;
      } else {
        console.log("User ID is null.");
      }
}

