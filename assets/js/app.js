const workList = document.getElementById('work-list')
const form = document.getElementById('form')

eventListeners();

function eventListeners() {
form.addEventListener('submit', addWork);
workList.addEventListener('click', deleteWork);
document.addEventListener('DOMContentLoaded', localStorageReady);
}

function addWork(e) {
    e.preventDefault();

    const textarea = document.getElementById('textarea').value;

    const deleteButton = document.createElement('a');
    deleteButton.classList = 'delete-button';
    deleteButton.innerText = 'X';

    const li = document.createElement('li');
    li.innerText = textarea;
    li.appendChild(deleteButton)
    workList.appendChild(li);

    addWorkLocalStorage(textarea);
}

function deleteWork(e) {
    e.preventDefault();
    if(e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove();
        deleteWorkLocalStorage(e.target.parentElement.innerText)
    }   
}

function localStorageReady() {
    let textareas;

    textareas = getTextTareasLocalStorage();

    textareas.forEach(function(textarea) {
        const deleteButton = document.createElement('a');
        deleteButton.classList = 'delete-button';
        deleteButton.innerText = 'X';

        const li = document.createElement('li');
        li.innerText = textarea;
        li.appendChild(deleteButton);
        workList.appendChild(li);
   });
    
}


function addWorkLocalStorage(textarea) {
    let textareas;

    textareas = getTextTareasLocalStorage();
    
    textareas.push(textarea);

    localStorage.setItem('textareas', JSON.stringify(textareas));
}

function getTextTareasLocalStorage() {
    let textareas;

    if(localStorage.getItem('textareas') === null) {
        textareas = [];
    } else {
        textareas = JSON.parse(localStorage.getItem('textareas'));
    }
    return textareas;

}

function deleteWorkLocalStorage(textarea) {
    let textareas, deleteTextarea;

    deleteTextarea = textarea.substring(0, textarea.length -1);

    textareas = getTextTareasLocalStorage();

    textareas.forEach(function(textarea, index){
        if(deleteTextarea === textarea) {textareas.splice(index, 1)}
        
    })

    localStorage.setItem('textareas', JSON.stringify(textareas));
}

