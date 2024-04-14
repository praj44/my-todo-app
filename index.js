console.log("Welcome to our todo app");

let todos=[];

let todoDataList=document.getElementById('todo-data-list');  //todo data box in which heading and actual todos will come in list
let saveButton=document.getElementById('save-todo');  //todo save button
let todoInputBar=document.getElementById('todo-input-bar');  //input bar of our todo app

todoInputBar.addEventListener("keyup",function toggleSaveButton() {
    let todotext= todoInputBar.value;
    if(todotext.length == 0) {
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")){
    saveButton.classList.remove("disabled"); 

    }
})

saveButton.addEventListener("click",function getTextAndAddTodo() {
    let todotext= todoInputBar.value;
    if(todotext.length == 0) return;
    let todo={text: todotext, status:'In Progress', finishtext:'Finished'};
    todos.push(todo);
    addTodo(todo,todos.length);
    todoInputBar.value='';
})

function rerender() {
    todoDataList.innerHTML='';
    todos.forEach((element,idx) => {
        addTodo(element,idx+1);
    })
}

function removeTodo(event) {
    // console.log('clicked',event.target.previousElementSibling);
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed=event.target;
    let indextoberemoved=Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indextoberemoved,1);
    rerender();
}

function finishtodo(event) {
    let finishedbuttonpressed=event.target;
    let indextobefinished=Number(finishedbuttonpressed.getAttribute("todo-idx"));
    
    
    //toggling 
    if(todos[indextobefinished].status=="Finished"){
        todos[indextobefinished].status="In Progress";
        todos[indextobefinished].finishtext="Finished";
    }else{
        todos[indextobefinished].status="Finished";
        todos[indextobefinished].finishtext="Undo";
    }
    //rearranging the todos according to the status
    todos.sort((a,b) => {
        if(a.status=='Finished'){
            return 1;
        }
        return -1;
    });


    rerender();
}

function addTodo(todo,todoCount){
    let rowDiv = document.createElement("div");
    let todoItem= document.createElement("div");
    let todoNumber= document.createElement("div");
    let todoDetail= document.createElement("div"); 
    let todoStatus= document.createElement("div"); 
    let todoActions= document.createElement("div"); 
    let deleteButton = document.createElement("button"); 
    let finishedButton = document.createElement("button");
    let hr=document.createElement("hr");

    //adding classes in our element
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail");
    todoStatus.classList.add("todo-status");
    todoActions.classList.add("todo-action","d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger","delete-todo");
    finishedButton.classList.add("btn","btn-success","finish-todo");

    finishedButton.setAttribute("todo-idx",todoCount-1);
    deleteButton.setAttribute("todo-idx",todoCount-1);

    deleteButton.onclick= removeTodo;
    finishedButton.onclick=finishtodo;


    todoNumber.textContent=`${todoCount}.`;  
    todoDetail.textContent=todo.text;    //sets the todo text sent from the input element
    todoStatus.textContent=todo.status;
    deleteButton.textContent="Delete";
    finishedButton.textContent=todo.finishtext;



    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);

}

















































// let getTodosButton=document.getElementById('get-todos');

// getTodosButton.addEventListener("click",() => {
//     console.log("clicked");
// });


