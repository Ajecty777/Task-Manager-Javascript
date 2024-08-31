const addTask = document.querySelector("#addTask");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("ul");
const form = document.querySelector(".add");
const deleteButtons = document.querySelectorAll("i");
const clearAll = document.querySelector(".clear");
const taskMessage = document.querySelector(".task-message");
const searchForm = document.querySelector(".search");
const resetButton = document.querySelector(".reset");

function updateMessage(){
    const taskLength = taskList.children.length;
    taskMessage.textContent = `You have ${taskLength} pending tasks.`;
}

updateMessage();

form.addEventListener('submit', (event)=>{
event.preventDefault();

const value = form.task.value.trim()

if(value.length){
    console.log(value);
    taskList.innerHTML = taskList.innerHTML + `<li class="list-item">
                                    <span>${value}</span>
                                    <i class="bi bi-trash-fill delete"></i>
                                </li>`;
    form.reset();
    updateMessage();
}
})

taskList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('delete')){
        event.target.parentElement.remove();
        updateMessage();
    }
})

clearAll.addEventListener('click', ()=>{
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item =>{
        item.remove();
    });
    updateMessage();
});

function filterTask(term){
    Array.from(taskList.children).filter(task =>{
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task=>{
        task.classList.add("hide");
    });

    Array.from(taskList.children).filter(task=>{
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task=>{
        task.classList.remove("hide");
    })
}

searchForm.addEventListener("keyup", (event)=>{
   const term = searchForm.task.value.trim().toLowerCase();

   filterTask(term);
} );

searchForm.addEventListener("click", event=>{
    if(event.target.classList.contains("reset")){
        searchForm.reset();
    }
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
})
