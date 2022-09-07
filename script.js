const taskHeads = ["name", "balance"];
const addForm = document.querySelector("#addForm");
const dataWrap = document.querySelector("#dataWrap");
const showSingleCustomer = document.querySelector("#single");

const readFromStorage = (key = "users", dataType = "array") => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key)) || [];
    if (!Array.isArray(data) && dataType == "array")
      throw new Error("data is not an array");
  } catch (e) {
    data = [];
  }
  return data;
};

const writeToStorage = (data, key = "users") => {
  localStorage.setItem(key, JSON.stringify(data));
};

const createUserObject = (addForm) => {
  let user = {
    id: Date.now(),
    remaining: addForm.elements["balance"].value,
    operations: { opeType: "", opeValue: "" },
  };
  taskHeads.forEach((head) => {
    user[head] = addForm.elements[head].value;
  });
  return user;
};

const createMyOwnEle = (eleTag, parent, txtContent = null, classes = null) => {
  const myNewElement = document.createElement(eleTag);
  if (classes) myNewElement.classList = classes;
  if (txtContent) myNewElement.innerText = txtContent;
  parent.appendChild(myNewElement);
  return myNewElement;
};

const showSingle = (user) => {
    writeToStorage(user, "user");
    window.location.href = "singleUser.html";
  };

const actions = (users, user, form, input, type, message) => {
    form.style.display = (form.style.display === "none")?"block":"none";
  
    if(user.remaining==="you don't have money"){
     user.remaining=0
    }
    user.remaining = parseInt(user.remaining);
    if (input.value === "") {
      input.value = 0;
    } else if (type === "add to balance") {
  
      if (input.value >= 5000) {
        message.innerText ="enter amount which is less than 5000";
        form.style.display = "block";
        return;
      }
      else{
        user.remaining += parseInt(input.value);
        user.operations.opeType+='added '
        user.operations.opeValue+=`${input.value} `
        writeToStorage(users);
        readFromStorage();
        draw(users);
      }
    
    } else if (type === "withdraw") {
      if (input.value > user.remaining) {
        message.innerText =
          "you don't have enough money please enter less amount";
        form.style.display = "block";
        return;
      } else {
        
        if(parseInt(input.value)===user.remaining){
          user.remaining="you don't have money"
          writeToStorage(users);
          readFromStorage();
          draw(users);
        }
        else{
          user.remaining -= parseInt(input.value);
          user.operations.opeType+='withdraw '
          user.operations.opeValue+=`${input.value} `
          writeToStorage(users);
          readFromStorage();
          draw(users);
        }
       
      }
    }
  };


if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = createUserObject(this);
    const users = readFromStorage();
    users.push(user);
    writeToStorage(users);
    window.location.href = "index.html";
  });
}

const draw = (users) => {
  dataWrap.innerHTML = "";
  if (users.length == 0) {
    let tr = createMyOwnEle("tr", dataWrap, null, "alert alert-danger");
    let td = createMyOwnEle("td", tr, "no data found", "alert alert-danger");
    td.setAttribute("colspan", "5");
  }
  users.forEach((user, i) => {
    let tr = createMyOwnEle("tr", dataWrap);
    createMyOwnEle("td", tr, user.id);
    createMyOwnEle("td", tr, user.name);
    createMyOwnEle("td", tr, user.balance);
    createMyOwnEle("td", tr, user.remaining);

    let td = createMyOwnEle("td", tr);

    let form = createMyOwnEle("form", td);
    const editInput = createMyOwnEle("input", form, "", "form-control");
    let message = createMyOwnEle("div", form,`enter the value of money then select the process you want`);
    form.style.display = "none";

    let addBalance = createMyOwnEle(
      "button",
      td,
      "Deposit",
      "btn btn-success mx-2"
    );
    addBalance.addEventListener("click", () => {
        actions(users, users[i], form, editInput, "add to balance", message);
      });
    

    let withdraw = createMyOwnEle(
      "button",
      td,
      "withdraw",
      "btn btn-danger mx-2"
    );
    withdraw.addEventListener("click", () => {
        actions(users, users[i], form, editInput, "withdraw", message);
      });

    let show = createMyOwnEle(
      "button",
      td,
      "show operations",
      "btn btn-primary mx-2"
    );
    show.addEventListener("click", () => showSingle(users[i]));
  });
};

if (dataWrap) {
  const users = readFromStorage();
  draw(users);
}

if (showSingleCustomer) {
    let users = readFromStorage();
    let user = readFromStorage("user", "object");
    if (users.length === 0) {
      createMyOwnEle("div", single, "no data to show", "alert alert-danger");
      user = {};
    } else {
      createMyOwnEle(
        "div",
        single,
        `${user.name}`,
        "alert alert-primary"
      );
      createMyOwnEle(
        "div",
        single,
        `${user.operations.opeType} `,
        "alert alert-primary"
      );
      createMyOwnEle(
        "div",
        single,
        `${user.operations.opeValue} `,
        "alert alert-primary"
      );
    }
  }