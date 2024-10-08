const tasklist = document.querySelector('.tasklist')

const taskinput = document.querySelector('.taskinput')

const taskButton = document.querySelector('.inputdiv button')

const tasksDone = document.querySelector('.tasksdone')

getTasksFromLocalStorage()

tasksDone.innerHTML = getNumberOfTasks(false)

function addTask() {
    const task = taskinput.value.trim()

    if (task !== '') {
        const li = document.createElement('li')
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener('click', deleteTask)
        deleteBtn.className = 'deletebtn'
        li.textContent = task
        li.appendChild(deleteBtn)
        tasklist.appendChild(li)
        addTasksToLocalStorage()
        tasksDone.innerHTML = getNumberOfTasks(true)
        taskinput.value = ''
        li.addEventListener('click', completetask)

    }

    else {
        alert("Please enter a task first!")
    }




}

function completetask(event) {
    const task = event.target

    task.classList.toggle('done')
    addTasksToLocalStorage()
    tasksDone.innerHTML = getNumberOfTasks(true)
}

function deleteTask(event) {
    const task = event.target.parentElement
    tasklist.removeChild(task)
    addTasksToLocalStorage()
    tasksDone.innerHTML = getNumberOfTasks(false)
}

function addTasksToLocalStorage() {
    const tasks = []
    const taskItems = tasklist.getElementsByTagName('li')

    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].firstChild.textContent
        const isDone = taskItems[i].classList.contains('done')
        tasks.push({ text: taskText, completed: isDone });
    }


    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li')
            li.textContent = task.text
            tasklist.appendChild(li)
            li.addEventListener('click', completetask)
            if (task.completed) {
                li.classList.add('done')
            }
            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'Delete'
            deleteBtn.className = 'deletebtn'
            deleteBtn.addEventListener('click', deleteTask)
            li.appendChild(deleteBtn)
        })
    }
}

function getNumberOfTasks(showCongrats) {
    const alltasks = document.querySelectorAll('li').length
    const doneTasks = document.querySelectorAll('.done').length
    if (doneTasks === alltasks && alltasks > 0 && showCongrats) {
        alert('Congrats!')
    }
    return [doneTasks, alltasks].join('/')


}

console.log(getNumberOfTasks())

taskButton.addEventListener('click', () => {
    addTask()
})

