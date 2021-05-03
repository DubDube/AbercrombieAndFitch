const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTasksHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

let createNewTaskElement = function (taskString, arr) {

	listItem = document.createElement("li");
	checkBox = document.createElement("input");
	label = document.createElement("label");
	editInput = document.createElement("input");
	editButton = document.createElement("button");
	deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";


	// input value 
	label.innerText = taskString;

	console.log('taskString====>', taskString)
	listItem.setAttribute("role", "listitem");
	listItem.setAttribute("class", "new-list-item");
	editButton.setAttribute("aria-label", "edit");
	deleteButton.setAttribute("aria-label", "delete");

	listItem.appendChild(checkBox);
	var newTask = listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);


	// if (typeof(Storage) !== "undefined") {
	//   // let newTask = listItem.appendChild(label);
	//   // console.log('new  Task----ff------->', newTask)
	//   // Store
	//   localStorage.setItem('listItem',listItem);
	//   // Retrieve
	//   document.getElementById("incomplete-tasks").innerHTML = localStorage.getItem('listItem',listItem);
	// } else {
	//   document.getElementById("incomplete-tasks").innerHTML = "Sorry, your browser does not support Web Storage...";
	// }
	return listItem;

};


let addTask = function () {
	if (taskInput.value !== "") {
		let listItemName = taskInput.value;
		listItem = createNewTaskElement(listItemName);
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);


		itemsArray.push(taskInput.value);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		itemsArray;
	} else {

		alert("Please input your task");

	}
	taskInput.value = ""
};


let editTask = function () {
	let listItem = this.parentNode;
	console.log('listItem', listItem)
	console.log('this   ===>>.', this)

	let editInput = listItem.querySelectorAll("input[type=text")[0];
	let label = listItem.querySelector("label");
	let button = listItem.getElementsByTagName("button")[0];

	let containsClass = listItem.classList.contains("editMode");
	if (containsClass) {
		label.innerText = editInput.value
		button.innerText = "Edit";
	} else {
		editInput.value = label.innerText
		button.innerText = "Save";
	}

	listItem.classList.toggle("editMode");
};

let deleteTask = function (el) {
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	ul.removeChild(listItem);
};

let taskCompleted = function (el) {
	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
	let listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

let bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
	let checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
	let editButton = taskListItem.querySelectorAll("button.edit")[0];
	let deleteButton = taskListItem.querySelectorAll("button.delete")[0];
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}