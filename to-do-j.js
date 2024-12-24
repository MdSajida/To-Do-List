const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const todoSection = document.getElementById('todo-section');
const welcomeMessage = document.getElementById('welcome-message');
let editing=false;
let lih;
// Load the current user and their tasks
const currentUser  = localStorage.getItem('currentUser');


// Function to handle user logout
function handleLogout() {
 
  
  localStorage.removeItem('currentUser'); 
  window.location.href = 'todo-users.html';
}

document.addEventListener('DOMContentLoaded', function() {
  if (!currentUser) {
    window.location.href = 'todo-users.html'; // Redirect to login if not logged in
    return;
  } else {
    welcomeMessage.textContent = `Welcome, ${currentUser}!`;
    loadTasks();
  }
});


function loadTasks() {

  const users = JSON.parse(localStorage.getItem('users')) || [];//[{user},{user}]
  const user = users.find(user => user.username === currentUser );
 //user : the value of obh=ject{username:,password:,tasks:[]}
  
  
  const todos=user? user.tasks : [];//[{text:"to-d" ,cmpleted: false/true}] 
  //todos=[{todo},{todo}]
  //todo here is object
  todos.forEach(todo => {
      addTaskToDOM(todo.text, todo.completed);
  });
}

function addTaskToDOM(text, completed = false) {
  const ele = document.createElement('li');
  ele.innerHTML = `
      <span class="task-text ${completed ? 'checked' : ''}">${text}</span>
      <span class="actions">
          <span class="complete-task"><i class="fa-solid fa-check"></i></span>
          <span class="edit-task"><i class="fa-regular fa-pen-to-square"></i></span>
          <span class="delete-task"><i class="fa-solid fa-trash"></i></span>
      </span>`;
  taskList.appendChild(ele);//adding li to ul;
  const hr = document.createElement('hr');
  taskList.appendChild(hr);
}

/*localStorage.setItem('todo','13')//if present then edits the value;
on empty key it returns a object else returns a string
*/

// const val=JSON.parse(localStorage.getItem('inthu-tasks'));
// console.log(typeof(val));//string

/*json.parse:converts to object format array of objects
if loggedInUser : inthu :-if JSON.parse(localStorage.getItem('loggedInUser'));
then error :saying token 'i', "inthu" is not valid JSON at JSON.parse (<anonymous>)

JSON.stringify: converts to string " "

*/

function addTask(e){
 
  
     let text="";
    (taskInput.value.trim() != "") ? text=taskInput.value : text="" ;
    if(text!=""){
     
      if(e.key=='Enter' && editing){
       lih.firstElementChild.textContent= taskInput.value;
       updateLocalStorage();
       setInitial();
        
      }
      if(e.target.innerHTML=='Edit'){     
        lih.firstElementChild.textContent=taskInput.value;
        updateLocalStorage();
        setInitial();
         
      }
      else{
        //(e.target.innerHTML=='Add'
        //adding new element by the user
      addTaskToDOM(text);
      taskInput.value='';
      updateLocalStorage();
    
      }

    }
     
    
}

function setInitial(){
  taskInput.value='';
  addTaskButton.innerHTML='Add'
  lih.classList.toggle('edited');
  //adding or chnaging the class name toggling
  lih=null;
  editing=false;
}


function updateLocalStorage() {
  
  const todos=[];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === currentUser );
  document.querySelectorAll('#task-list li').forEach(li => {
      const taskText = li.querySelector('.task-text').textContent;
      const completed = li.querySelector('.task-text').classList.contains('checked');
      todos.push({ text: taskText, completed: completed });
  });
  user.tasks=todos;
  
  localStorage.setItem('users', JSON.stringify(users));
}


addTaskButton.addEventListener('click',addTask);
// Add task when the Enter key is pressed


taskInput.addEventListener('keypress', function (e) {

  if (e.key === 'Enter') {
   addTask(e);
  //e here is Enter event
      
  }
});


taskList.addEventListener('click',(e)=>{
     
  if(e.target.parentElement.className ==='delete-task'){
    if(editing==true){
     setInitial();
    }
    const li= e.target.parentElement.parentElement.parentElement
    li.nextElementSibling.remove();//hr
    li.remove();  
    updateLocalStorage(); // Update local storage after deletion
  }   
  if(e.target.parentElement.className ==='complete-task'){
    if(editing==true){
      setInitial();
    }
    const li= e.target.parentElement.parentElement.parentElement
    li.querySelector('.task-text').classList.toggle('checked');//one argument is required : res 1st true/false
     
   // console.log(li);
   
    updateLocalStorage(); // Update local storage after completion
  }
  if(e.target.parentElement.className ==='edit-task' ){
    
      
      if(editing==true && lih===e.target.parentElement.parentElement.parentElement){
        //when clicked on same lih edit button
        
        setInitial();
              
      }
      else {
        if(editing==true){
           //when clicked on other edit button the prev one should be 
           //removed from the race and new lih should come.

          lih.classList.toggle('edited');//inital settings
          
          // // Deselect previous task if editing
          //to remove prev lih.
          }
      
      editing=true;
      addTaskButton.innerHTML='Edit';
      lih= e.target.parentElement.parentElement.parentElement
      lih.classList.toggle('edited');//t f
      taskInput.value=lih.firstElementChild.textContent;
      //li.firstElementChild is span tag element
     
    
     }
  }
  


})
