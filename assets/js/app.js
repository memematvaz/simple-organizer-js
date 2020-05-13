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

    const work = document.getElementById('textarea').value;

    const deleteButton = document.createElement('a');
    deleteButton.classList = 'delete-button';
    deleteButton.innerText = 'X';

    const li = document.createElement('li');
    li.innerText = work;
    li.appendChild(deleteButton)
    workList.appendChild(li);

    addWorkLocalStorage(work);
}

function deleteWork(e) {
    e.preventDefault();
    if(e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove();
        deleteWorkLocalStorage(e.target.parentElement.innerText)
    }   
}

function localStorageReady() {
    let works;

    works = getTextTareasLocalStorage();

    works.forEach(function(work) {
        const deleteButton = document.createElement('a');
        deleteButton.classList = 'delete-button';
        deleteButton.innerText = 'X';

        const li = document.createElement('li');
        li.innerText = work;
        li.appendChild(deleteButton);
        workList.appendChild(li);
   });
    
}


function addWorkLocalStorage(work) {
    let works;

    works = getTextTareasLocalStorage();
    
    works.push(work);

    localStorage.setItem('works', JSON.stringify(works));
}

function getTextTareasLocalStorage() {
    let works;

    if(localStorage.getItem('works') === null) {
        works = [];
    } else {
        works = JSON.parse(localStorage.getItem('works'));
    }
    return works;

}

function deleteWorkLocalStorage(work) {
    let works, deleteWork;

    deleteWork = work.substring(0, work.length -1);

    works = getTextTareasLocalStorage();

    works.forEach(function(work, index){
        if(deleteWork === work) {works.splice(index, 1)}
        
    });

    localStorage.setItem('works', JSON.stringify(works));
}

