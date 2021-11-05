/* *************************
 *** POST JOURNAL ***
 ************************** */
function postJournal() {
  //   console.log("postJournal Function Called");
  const accessToken = localStorage.getItem("SessionToken");
  //The variable accessToken is set up to store the SessionToken in local storage.

  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let entry = document.getElementById("entry").value;
  //Here we are setting up some variables that reference our input fields in the DOM (check out the HTML to see which ones are referenced).

  let newEntry = {
    journal: {
      title: title,
      date: date,
      entry: entry,
      //This variable stores the information for the body of the request
    },
  };
  fetch(`http://localhost:3000/journal/create`, {
    //On this line we are utilizing the URL we have set up on the server-side to refer to the journal/create route.
    method: "POST",
    //Since we are referring to a route that uses POST we need to make sure that the method utilized matches that.
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
    body: JSON.stringify(newEntry),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMine();
    })
    .catch((err) => {
      console.error(err);
    });
}

/* *************************
 *** UPDATE JOURNAL ***
 ************************** */
function editJournal(postId) {
  //   console.log("editJournal Function Called");
  console.log(postId);

  const fetch_url = `http://localhost:3000/journal/update/${postId}`;
  const accessToken = localStorage.getItem("SessionToken");

  let card = document.getElementById(postId);
  let input = document.createElement("input");

  if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updatedEntry");
    input.setAttribute("placeholder", "Edit your journal entry");
  } else {
    let updated = document.getElementById("updatedEntry").value;
    let newEntry = {
      journal: {
        entry: updated,
      },
    };

    fetch(fetch_url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayMine();
      })
      .catch((err) => {
        console.error(err);
      });
    card.removeChild(card.lastChild);
  }
}

/* *************************
 *** DELETE JOURNAL ***
 ************************** */
function deleteJournal(postId) {
  console.log(postId);

  const fetch_url = `http://localhost:3000/journal/delete/${postId}`;
  const accessToken = localStorage.getItem('SessionToken');
  console.log(accessToken)

  fetch(fetch_url, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayMine();
    })
    .catch(err => {
      console.error(err);
    });
}
