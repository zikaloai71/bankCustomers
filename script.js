const taskHeads = ["name", "balance"];
const addForm = document.querySelector("#addForm");
const dataWrap = document.querySelector("#dataWrap");

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


    let addBalance = createMyOwnEle(
      "button",
      td,
      "add balance",
      "btn btn-success mx-2"
    );

    

    let withdraw = createMyOwnEle(
      "button",
      td,
      "withdraw",
      "btn btn-danger mx-2"
    );
  

    let show = createMyOwnEle(
      "button",
      td,
      "show operations",
      "btn btn-primary mx-2"
    );
    
  });
};

if (dataWrap) {
  const users = readFromStorage();
  draw(users);
}
