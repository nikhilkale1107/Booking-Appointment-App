function saveToLocalStorage(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (email == "") {
      return;
    }

    const obj = {
      name,
      email,
      phone,
    };
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    //post on crudcrud server
    axios
      .post("https://crudcrud.com/api/ffbd7ab104ff4e94a9d48e47c6852b43", obj)
      .then((value) => showNewUserOnScreen(obj))
      .catch((error) => console.log(error));
  }

  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    loadDataFromTheServer();
  });

  function loadDataFromTheServer() {
    let users;

    axios
      .get("https://crudcrud.com/api/ffbd7ab104ff4e94a9d48e47c6852b43")
      .then(function (value) {
        users = value.data.users;
        console.log(users.users);

        for (let i = 0; i < users.length; i++) {
          showNewUserOnScreen(users[i]);
        }
      })
      .catch((error) => console.log(error));
  }

  function showNewUserOnScreen(obj) {
    console.log(obj);
    let list = document.getElementById("list");
    let li = document.createElement("li");

    let userInfo = document.createElement("span");
    userInfo.textContent = `${obj.name} - ${obj.email} - ${obj.phone}`;

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "Delete";
    let editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.textContent = "Edit";
    deleteButton.addEventListener("click", function () {
      deleteFromLocalStorage(obj.email);
    });

    editButton.addEventListener("click", function () {
      document.getElementById("name").value = obj.name;
      document.getElementById("email").value = obj.email;
      document.getElementById("phone").value = obj.phone;

      deleteFromLocalStorage(obj.email);
    });

    li.appendChild(userInfo);
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    list.appendChild(li);
  }

  function deleteFromLocalStorage(email) {
    axios
      .delete(`https://crudcrud.com/api/ffbd7ab104ff4e94a9d48e47c6852b43/${email}`)
      .then((value) => {
        console.log(value);
        li.remove();
      })
      .catch((e) => console.log(e));
  }