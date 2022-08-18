import {Reminder} from './reminder.js';

const body = document.body;
const toDoContainer = document.getElementById("toDoContainer");
const addToDoListButton = document.getElementById("addToDo");
const noteContainer = document.getElementById("noteContainer");
const addNoteButton = document.getElementById("addNote");
const prevMonthButton = document.getElementById("previous");
const nextMonthButton = document.getElementById("next");
const addReminder = document.getElementById("addReminder");
const reminderContainer = document.getElementById("reminderContainer");

const date = new Date();

let taskListCounter = 0;
let noteCounter = 0;
let reminderList = [];
let reminderIndex = 0;
let reminderCounter = 0;

addToDoListButton.onclick = newToDoList;
addNoteButton.onclick = newNote;
prevMonthButton.onclick = previousMonth;
nextMonthButton.onclick = nextMonth;
addReminder.onclick = newReminder;

//Load calendar to display current month on start
loadCalendar();

function newToDoList()
{
    if(taskListCounter < 5)
    {
         toDoContainer.appendChild(createToDoList());
         taskListCounter++;
    }else{
        alert("Too many task lists!");
    }
}

/*
 * createToDoList function
 * Helper function to create a new toDo list
 */
function createToDoList()
{
    //Create our HTML components
    let toDoList = document.createElement("div");
    let nameInput = document.createElement("input");
    let addTaskBtn = document.createElement("button");
    let deleteListBtn = document.createElement("button");
    let listHeaderContainer = document.createElement("div");
    let deleteListIcon = document.createElement("ion-icon");
    let addTaskIcon = document.createElement("ion-icon");

    //Create task counter variable
    toDoList.counter = 0;
    
    //Set IDs for CSS and code use
    toDoList.setAttribute("id", "toDoList");
    listHeaderContainer.setAttribute("id", "listHeader");
    nameInput.setAttribute("id", "listName");
    addTaskBtn.setAttribute("id", "addTaskBtn");
    deleteListBtn.setAttribute("id", "deleteListBtn");
    nameInput.setAttribute("readonly", "");

    //Add Text content for our HTML components
    nameInput.setAttribute("placeholder", "New List");
    
    //Set Icon for components
    deleteListIcon.setAttribute("name", "trash-outline");
    addTaskIcon.setAttribute("name", "add-outline");
    
    nameInput.ondblclick = () => {
        nameInput.removeAttribute("readonly");
    }

    nameInput.onmouseout = () => {
        nameInput.setAttribute("readonly", "");
    }   

    //Set Button events
    deleteListBtn.onclick = () => {
        toDoList.remove();
        taskListCounter--;
    };

    addTaskBtn.onclick = () => {
        if(toDoList.counter === 14)
        {
            alert("There are too many tasks on this list! \nTry Finishing some! :)");
        }else{
        toDoList.counter++;
        //Create Task Components
        let task = document.createElement("div");
        let taskDesc = document.createElement("input");
        let deleteTaskBtn = document.createElement("button");
        let deleteTaskIcon = document.createElement("ion-icon");
        let taskComplete = document.createElement("div");
        

        //Set Task Component Attributes
        task.setAttribute("id", "task");
        taskDesc.setAttribute("id", "taskDesc");
        deleteTaskBtn.setAttribute("id", "deleteTaskBtn");
        deleteTaskIcon.setAttribute("name" , "close-outline");
        taskDesc.setAttribute("readonly","");
        taskComplete.setAttribute("id", "taskCheck");
        taskComplete.setAttribute("complete","false");
        taskComplete.style.backgroundColor = "red";

        //Set Button Events
        taskComplete.onclick = () => {
            if(taskComplete.getAttribute("complete") === "false")
            {
                taskComplete.setAttribute("complete","true");
                taskComplete.style.backgroundColor = "#53DD6C";
            }else{
                taskComplete.setAttribute("complete","false");
                taskComplete.style.backgroundColor = "#BA1B1D";
            }
        }

        deleteTaskBtn.onclick = () => {
            task.remove();
            toDoList.counter--;
        }

        taskDesc.ondblclick = () => {
            taskDesc.removeAttribute("readonly");
        }

        taskDesc.onmouseout = () => {
            taskDesc.setAttribute("readonly","");
        }

        //Parent Components
        deleteTaskBtn.appendChild(deleteTaskIcon);
        task.appendChild(taskComplete);
        task.appendChild(taskDesc);
        task.appendChild(deleteTaskBtn);

        //Place Task on page
        toDoList.appendChild(task);
    }
    };

    //Parent HTML nodes 
    deleteListBtn.appendChild(deleteListIcon);
    addTaskBtn.appendChild(addTaskIcon);
    listHeaderContainer.appendChild(nameInput);
    listHeaderContainer.appendChild(addTaskBtn);
    listHeaderContainer.appendChild(deleteListBtn);
    toDoList.appendChild(listHeaderContainer);

    return toDoList;
}

function newNote()
{
    if(noteCounter >= 7)
    {
        alert("Max notes reached");
    }else{
         noteContainer.appendChild(createNote());
    }
}

function createNote()
{
    //Create our HTML components
    let note = document.createElement("div");
    let noteDataContainer = document.createElement("div");
    let noteData = document.createElement("span");
    let noteDeleteBtn = document.createElement("button");
    let noteDeleteIcon = document.createElement("ion-icon");

    //Set IDs for components
    note.setAttribute("id", "note");
    noteData.setAttribute("id", "noteData");
    noteData.setAttribute("contenteditable","true");
    noteDeleteBtn.setAttribute("id", "noteDeleteBtn");
    noteDeleteIcon.setAttribute("name", "close-outline");
    noteDataContainer.setAttribute("id", "noteDataContainer");


    //Set Events for components
    noteDeleteBtn.onclick = () => {
        noteCounter--;
        note.remove()
    }

    //Parent components
    noteDeleteBtn.appendChild(noteDeleteIcon);
    noteDataContainer.appendChild(noteData);
    note.appendChild(noteDeleteBtn);
    note.appendChild(noteDataContainer);
    
    noteCounter++;
    return note;
}

function loadCalendar()
{
    date.setDate(1);

    const monthDays = document.getElementById("days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate(); 

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const monthName = document.getElementById("monthName");
    monthName.textContent = months[date.getMonth()];
    const dateDisplay = document.getElementById("dateDisplay");
    dateDisplay.textContent = new Date().toDateString();

    let days = "";

    for(let x = firstDayIndex; x > 0; x--)
    {
        let rems = '<div ="reminder-day-container">';
        let dateCheck;
        let prevMonthDay = prevLastDay - x + 1;
        if(date.getMonth() == 0)
        {
            dateCheck = new Date(`${date.getFullYear() - 1}-12-${prevMonthDay}`);
        }else{
            dateCheck = new Date(`${date.getFullYear()}-${date.getMonth()}-${prevMonthDay}`);
        }
        
        for(let r = 0; r < reminderList.length; r++)
        {
    
            if(dateCheck.getTime() === reminderList[r].getDate().getTime())
            {
                    rems += `<div class="calendar-reminder" style="background-color:${reminderList[r].getColor()}" title="${reminderList[r].getDesc()}"></div>`;
            }
            
        }
        if(rems !== "")
        {
            rems += "</div>"
        }
            days += `<div class="prev-month-date">${prevMonthDay}${rems}</div>`;
    
        
    }
    
    for(let i = 1; i <= lastDay; i++)
    {
        let rems = '<div ="reminder-day-container">';
        let dateCheck;
        if(date.getMonth() == 0)
        {
            dateCheck = new Date(`${date.getFullYear() - 1}-12-${i}`);
        }else{
            dateCheck = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${i}`);
        }

        for(let r = 0; r < reminderList.length; r++)
        {
    
            if(dateCheck.getTime() === reminderList[r].getDate().getTime())
            {
                    rems += `<div class="calendar-reminder" style="background-color:${reminderList[r].getColor()}" title="${reminderList[r].getDesc()}"></div>`;
            }
            
        }

        if(rems !== "")
        {
            rems += "</div>"
        }

        if(
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        )
        {
            days += `<div id="today">${i}${rems}</div>`;
        }else{
            days += `<div class="day">${i}${rems}</div>`;
        }
    }

    for(let j = 1; j <= nextDays; j++)
    {
        let rems = '<div ="reminder-day-container">';
        let dateCheck;
        if(date.getMonth() === 11)
        {
            dateCheck = new Date(`${date.getFullYear() + 1}-1-${j}`);
        }else{
            dateCheck = new Date(`${date.getFullYear()}-${date.getMonth() + 2}-${j}`);
        }

        for(let r = 0; r < reminderList.length; r++)
        {
    
            if(dateCheck.getTime() === reminderList[r].getDate().getTime())
            {
                    rems += `<div class="calendar-reminder" style="background-color:${reminderList[r].getColor()}" title="${reminderList[r].getDesc()}"></div>`;
            }
            
        }
        if(rems !== "")
        {
            rems += "</div>"
        }

        days += `<div class="next-month-date">${j}${rems}</div>`;
        monthDays.innerHTML = days;
    }

}

/*
 * Loads the previous month on the calendar
 */
function previousMonth()
{
    date.setMonth(date.getMonth() - 1);
    loadCalendar();
}

/*
 * Loads the next month on the calendar
 */
function nextMonth()
{
    date.setMonth(date.getMonth() + 1);
    loadCalendar();
}

function newReminder()
{
    if(reminderCounter >= 11){
        alert("Max Reminders Reached");
    }else{
        reminderContainer.appendChild(createReminder());
    }
}

function createReminder()
{
    let reminderDiv = document.createElement("div");
    let colorBox = document.createElement("input");
    let desc = document.createElement("input");
    let dateInput = document.createElement("input");
    let deleteBtn = document.createElement("button");
    let deleteIcon = document.createElement("ion-icon");

    reminderDiv.setAttribute("id", "reminder");
    reminderDiv.setAttribute("index", reminderIndex);
    colorBox.setAttribute("type","color");
    colorBox.setAttribute("id","color");
    desc.setAttribute("id", "reminderDesc");
    dateInput.setAttribute("type","date");
    dateInput.setAttribute("id","dateInput");
    deleteBtn.setAttribute("id", "deleteBtn");
    deleteIcon.setAttribute("name","close-outline");

    //Create our reminder object and add it to the array
    let rem = new Reminder(new Date(dateInput.value), desc.value, colorBox.value, reminderIndex);
    reminderList[reminderIndex] = rem;

    //Input events
    deleteBtn.onclick = () => {
        reminderCounter--;
        //Remove this reminder from the array of reminders
        let arrayCopy = reminderList.filter((r) => {return r !== rem});
        reminderList = arrayCopy;
        reminderIndex--;
        loadCalendar();
        reminderDiv.remove();
    }

    dateInput.onchange = () => {
        rem.setDate(new Date(dateInput.value + "T00:00:00"));
        loadCalendar();
    }

    colorBox.onchange = () => {
        rem.setColor(colorBox.value);
        loadCalendar();
    }

    desc.onchange = () => {
        rem.setDesc(desc.value);
        loadCalendar();
    }

    deleteBtn.appendChild(deleteIcon);
    reminderDiv.appendChild(colorBox);
    reminderDiv.appendChild(desc);
    reminderDiv.appendChild(dateInput);
    reminderDiv.appendChild(deleteBtn);


    reminderIndex++;
    reminderCounter++;

    return reminderDiv;
}



