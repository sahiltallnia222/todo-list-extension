
document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const addButton = document.getElementById("addButton");
    const changeFormat = document.getElementById("changeFormat");
    const todoList = document.getElementById("todoList");
    let keepFormat=true;
    addButton.addEventListener("click", function () {
      const task = todoInput.value.trim();
      if (task !== "") {
        
        todoInput.value = "";
  
        // Save the task to storage
        chrome.storage.sync.get({ tasks:[]}, function (result) {
          const tasks = result.tasks;
          console.log(tasks);
          const index = Date.now();
          const li = document.createElement("li");
          li.innerHTML = `<div><p>${new Date(index).getDate()}/${new Date(index).getMonth()+1}/${new Date(index).getFullYear()}</p><pre>${task}</pre><button class='removeButton' id="removeButton${index}">Remove Note</button></div>`;
          li.querySelector(`#removeButton${index}`).addEventListener('click',()=>removeTask(index));
          todoList.prepend(li);
          tasks.push({index,task});
          chrome.storage.sync.set({ tasks: tasks });
        });

      }
    });


    function removeTask(index){
      chrome.storage.sync.get({ tasks: [] }, function (result) {
        const tasks = result.tasks;
        const updatedTasks = tasks.filter(item => item.index !== index);
        chrome.storage.sync.set({ tasks: updatedTasks },()=>{loadData()});
      });
    }

    // Load tasks from storage
    chrome.storage.sync.get({ tasks: [] }, function (result) {
      const tasks = result.tasks;
      console.log(tasks);
      tasks.forEach(function (t) {
        const {index,task}=t;
        const li = document.createElement("li");
        li.innerHTML = `<div><p>${new Date(index).getDate()}/${new Date(index).getMonth()+1}/${new Date(index).getFullYear()}</p><pre>${task}</pre><button class='removeButton' id="removeButton${index}">Remove Note</button></div>`;
        li.querySelector(`#removeButton${index}`).addEventListener('click',()=>removeTask(index));
        todoList.prepend(li);
      });
    });
    function changeFmt(){
      if(keepFormat){
        todoList.innerHTML='';
      chrome.storage.sync.get({ tasks: [] }, function (result) {
        const tasks = result.tasks;
        tasks.forEach(function (t) {
          const {index,task}=t;
          const li = document.createElement("li");
          li.innerHTML = `<div>
          <p>${new Date(index).getDate()}/${new Date(index).getMonth()+1}/${new Date(index).getFullYear()}</p>
          <p>${task}</p><button  class='removeButton' id="removeButton${index}">Remove Note</button></div>`;
          li.querySelector(`#removeButton${index}`).addEventListener('click',()=>removeTask(index));
          todoList.prepend(li);
        });
      });
      keepFormat=false;
      }else{
        loadData()
        keepFormat=true
      }
    }

    changeFormat.addEventListener('click',()=>changeFmt());
    function loadData(){
      todoList.innerHTML='';
      chrome.storage.sync.get({ tasks: [] }, function (result) {
        const tasks = result.tasks;
        tasks.forEach(function (t) {
          const {index,task}=t;
          const li = document.createElement("li");
          li.innerHTML = `<div>
          <p>${new Date(index).getDate()}/${new Date(index).getMonth()+1}/${new Date(index).getFullYear()}</p>
          <pre>${task}</pre><button  class='removeButton' id="removeButton${index}">Remove Note</button></div>`;
          li.querySelector(`#removeButton${index}`).addEventListener('click',()=>removeTask(index));
          todoList.prepend(li);
        });
      });
    }
  });
  
