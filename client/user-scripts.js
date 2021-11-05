/* *************************
 *** USER SIGNUP ***
 ************************** */
function userSignUp() {
  console.log("userSignUp Function Called");

  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;

  let newUserData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };

  console.log(
    `newUserData --> ${newUserData.user.email} ${newUserData.user.password}`
  );

  fetch(`http://localhost:3000/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let token = data.SessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      console.error(err);
    });
}

/* *************************
 *** USER LOGIN ***
 ************************** */
function userLogin() {
  //  console.log('userLogin Function Called')

  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  console.log(userEmail, userPass);

  let userData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };

  console.log(userData);

  fetch(`http://localhost:3000/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let token = data.SessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      // console.error(err)
    });

  // console.log(res);
}

/* *************************
 *** USER LOGOUT ***
 ************************** */
function userLogout() {
  //  console.log('userLogout Function Called')
  localStorage.setItem("SessionToken", undefined);
  //This is really the main functionality that we have added here. We are utilizing the same setItem method within local storage that we used when a user signs up or logs in, however here we are setting the sessionToken to undefined. After this function is run by clicking the logout button the user will no longer have a token meaning they will not be able to access any protected routes.
  console.log(`SessionToken --> ${localStorage.SessionToken}`);
  //If you look in the browser you should see 'sessionToken ==> undefined' once you click logout.
  tokenChecker();
  // console.log(res);
}

/* *************************
 *** TOKEN CHECKER FUNCTION ***
 ************************** */
function tokenChecker() {
  console.log("tokenChecker Function Called");

  let display = document.getElementById("journals");
  let header = document.createElement("h5");
  let accessToken = localStorage.getItem("SessionToken");
  let alertText = "Log in or sign up to get started!";

  for (let i = 0; i < display.childNodes.length; i++) {
    display.removeChild(display.firstChild);
  }
  if (accessToken === "undefined") {
    display.appendChild(header);
    header.textContent = alertText;
    header.setAttribute("id", "defaultLogin");
  } else {
    null;
  }
}
tokenChecker();
