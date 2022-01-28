// get all required elements
const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = ()=>{ // onkeyup -> when user removes a key this executes 
    let userData = inputBox.value; // getting user entered value
    if(userData.trim() != 0) { // if user data aren't spaces
        addBtn.classList.add("active") // add css active to 'add button' to active it
    }
    else {
        addBtn.classList.remove("active") // unactive the add button
    }
}

showTasks()

// if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value // getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo") // getting localstorage
    if(getLocalStorage == null){ // check if localstorage is null
        listArr = [] // create a new array
    } else {
        listArr = JSON.parse(getLocalStorage) // convert json string into a json object
    }
    listArr.push(userData) //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr)) //transforming js object into a json string
    showTasks()
    addBtn.classList.remove("active")
}

// delete all tasks
deleteAllBtn.onclick = ()=>{
    listArr = [] // empty the listArr
    // after emptying re update the ul
    localStorage.setItem("New Todo",JSON.stringify(listArr)) //transforming js object into a json string
    showTasks()
}

// function to add task list to the ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo") // getting localstorage
    if(getLocalStorage == null){ // check if localstorage is null
        listArr = [] // create a new array
    } else {
        listArr = JSON.parse(getLocalStorage) // convert json string into a json object
    }
    const pendingNumber = document.querySelector(".pendingNumber")
    pendingNumber.textContent = listArr.length // passing the length oof array
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active")
    } else {
        deleteAllBtn.classList.remove("active")
    }
    let newLitag = ''
    listArr.forEach((element, index) => {
        newLitag += `<li> ${element} <span id="del" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span> <span id="edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></span></li>`
    });
    console.log(newLitag)
    todoList.innerHTML = newLitag
    inputBox.value = ""
}

//delete task funciton
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo")
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1) // delete or remove the particular indexed li
    // after removing re update the li list
    localStorage.setItem("New Todo",JSON.stringify(listArr)) //transforming js object into a json string
    showTasks()
}

//edit task function
function editTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo")
    listArr = JSON.parse(getLocalStorage)
    listArr[index] = inputBox.value
    //listArr.splice(index, 1)
    localStorage.setItem("New Todo",JSON.stringify(listArr)) //transforming js object into a json string
    showTasks()
}