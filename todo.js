let heading = document.querySelector(".name");
let duedate = document.querySelector(".duedate");
let rem = document.querySelector(".setrem");
let todocont = document.querySelector(".todo-content");

const create = document.querySelector(".create");
const showtodo = document.querySelector(".showtodo");
const timecont = document.querySelector(".time-cont");
const timercont = document.querySelector(".timer");
const createcont = document.querySelector(".createcont");
const editcont = document.querySelector(".editcont");
const editname = document.querySelector(".editname");
const remindcont = document.querySelector(".remindcont");
const reminddiv = document.querySelector(".reminddiv");
const incomul = document.querySelector(".incomul");
const compul = document.querySelector(".compul");
const compcont = document.querySelector(".compcont");
const totcompl = document.querySelector(".totcompl");

let count;
let data = [];
var array;
let catchid =[];
let complete=[];
var comparr1;
var comparr2;
let incomplete=[];
load();
function load()
{ 
    array=JSON.parse(localStorage.getItem('data'));
    count=JSON.parse(localStorage.getItem('count'));
    if(localStorage.getItem("incomplete") === null && localStorage.getItem("completed") === null)
    {
        localStorage.setItem('incomplete', JSON.stringify(incomplete));
        localStorage.setItem('completed', JSON.stringify(complete));
    }
    comparr1=JSON.parse(localStorage.getItem('incomplete'));
    comparr2=JSON.parse(localStorage.getItem('completed'));
    
    if(localStorage.getItem("data") === null || localStorage.getItem("data") === undefined)
    {
        alert("Add todo list");
        console.log("Add todo list");
        count = 0;
    }
    else{
        for(var i=0; i< array.length; i++)
        {
            data[i] = array[i];

            const divcont = document.createElement("div");
            const timeclock = document.createElement("div");
            const hour = document.createElement("div");
            const min = document.createElement("div");
            const sec = document.createElement("div");
            const todocontent = document.createElement("div");

            divcont.classList.add("time-todo-con");
            timeclock.classList.add("time-clock");
            hour.classList.add("hour");
            min.classList.add("min");
            sec.classList.add("sec");
            todocontent.classList.add("todo-content");
            todocontent.innerHTML = array[i]['name'];
            
            timeclock.appendChild(hour);
            timeclock.appendChild(min);
            timeclock.appendChild(sec);
            divcont.appendChild(timeclock);
            divcont.appendChild(todocontent);
            timecont.appendChild(divcont);
            timercont.appendChild(timecont);
            todocontent.setAttribute("id",array[i]['id']);
            divcont.setAttribute("id",array[i]['id']);
            console.log("ID " +divcont.id); //----------->ID console
            clock(array[i]['id'],array[i]['date']);

            // Todo container 
            const todobox = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const todotxt = document.createElement("div");
            const icon1 = document.createElement("i");
            const icon2 = document.createElement("i");
        
            todobox.classList.add("todobox");
            checkbox.classList.add("checkbox");
            todotxt.classList.add("todotxt",array[i]['id']);
            icon1.classList.add("bx", "bx-edit");
            icon2.classList.add("bx" ,"bx-alarm"); 
            todotxt.innerHTML = array[i]['name'];
            checkbox.setAttribute("id",array[i]['id']);
            icon1.setAttribute("id",array[i]['id']);
            icon2.setAttribute("id",array[i]['id']);
            todobox.appendChild(checkbox);
            todobox.appendChild(todotxt);
            todobox.appendChild(icon1);
            todobox.appendChild(icon2);
            showtodo.appendChild(todobox);
            todobox.setAttribute("id",array[i]['id']);
        }
        for(let j=0;j<comparr1.length;j++)
        {
            incomplete[j] = comparr1[j];
            const list = document.createElement("li");
            list.innerHTML += incomplete[j]['name'];
            incomul.appendChild(list);
        }
        for(let k=0;k<comparr2.length;k++)
        {
            complete[k] = comparr2[k];
            const list = document.createElement("li");
            list.innerHTML += complete[k]['name'];
            compul.appendChild(list);
        }
    }
}

createcont.addEventListener("click",(event)=>{
    setTimeout(()=>{
        createcont.style.display = "none";
    },0.2);
});
create.addEventListener("click",(event)=>{
    event.stopPropagation();
    create.style.display = "flex";
});

function timer()
{
    const divcont = document.createElement("div");
    const timeclock = document.createElement("div");
    const hour = document.createElement("div");
    const min = document.createElement("div");
    const sec = document.createElement("div");
    const todocontent = document.createElement("div");

    divcont.classList.add("time-todo-con");
    timeclock.classList.add("time-clock");
    hour.classList.add("hour");
    min.classList.add("min");
    sec.classList.add("sec");
    todocontent.classList.add("todo-content");
    todocontent.innerHTML = heading.value;
    timeclock.appendChild(hour);
    timeclock.appendChild(min);
    timeclock.appendChild(sec);
    divcont.appendChild(timeclock);
    divcont.appendChild(todocontent);
    timecont.appendChild(divcont);
    todocontent.setAttribute("id",count + 1);
    divcont.setAttribute("id",count + 1);
    timercont.appendChild(timecont);
    // Todo container 
    const todobox = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const todotxt = document.createElement("div");
    const icon1 = document.createElement("i");
    const icon2 = document.createElement("i");
 
    todobox.classList.add("todobox");
    checkbox.classList.add("checkbox");
    todotxt.classList.add("todotxt");
    icon1.classList.add("bx", "bx-edit");
    icon2.classList.add("bx" ,"bx-alarm");
    todotxt.innerHTML = heading.value;
    checkbox.setAttribute("id",count + 1);
    icon1.setAttribute("id",count + 1);
    icon2.setAttribute("id",count + 1);
    todobox.appendChild(checkbox);
    todobox.appendChild(todotxt);
    todobox.appendChild(icon1);
    todobox.appendChild(icon2);
    showtodo.appendChild(todobox);
    todobox.setAttribute("id",count + 1);

    setTimeout(()=>{
        createcont.style.display = "none";
    },0.2);
    let i = data.length;
    data[i] = {id: count + 1,name: heading.value,date: duedate.value,rem: rem.value,count: count + 1,remind: false};
    clock(data[i]['id'],data[i]['date']);
    count++;
    save();
    location.reload();
}
function clock(id,date)
{
    let hourid = document.getElementById(id);
    let hour = hourid.querySelector(".hour");
    let minid = document.getElementById(id);
    let min = minid.querySelector(".min");
    let secid = document.getElementById(id);
    let sec = secid.querySelector(".sec");
    setInterval(() =>{
        hour.style.backgroundColor = "red"; 
        min.style.backgroundColor = "red"; 
        sec.style.backgroundColor = "red"; 
    },1000);
    setInterval(() =>{
        hour.style.backgroundColor = "rgb(4, 24, 66)"; 
        min.style.backgroundColor = "rgb(4, 24, 66)"; 
        sec.style.backgroundColor = "rgb(4, 24, 66)"; 
    },2000);
    var countdownInterval = setInterval(()=>{
        var currentdate = new Date();
        var futuredate = new Date(date);
        const timeDifference = futuredate.getTime() - currentdate.getTime();
        if (timeDifference < 0) {
                clearInterval(countdownInterval);
                catchid.push(id);
                checkincom(id);
                compsave();
                removeid(id);
        }
        else{
            // Calculate the hours, minutes, and seconds from the time difference
            let hours = Math.floor(timeDifference / (1000 * 60 * 60));
            let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            let seconds = Math.floor((timeDifference / 1000) % 60);
            hour.innerHTML = formatTime(hours);
            min.innerHTML = formatTime(minutes);
            sec.innerHTML = formatTime(seconds);
            remainder(id,hours,minutes);
            }
    },1000);
    
}

function checkincom(id)
{
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id === id)
        {
            let i = incomplete.length;
            const index = data.findIndex((dval) => dval.id == id);
            console.log(index);
            incomplete[i] = {name: data[index]['name']};
            const list = document.createElement("li");
            list.innerHTML += incomplete[i]['name'];
            incomul.appendChild(list);
        }
    }
}
//Local storage for complete and Incomplete
function compsave()
{
    localStorage.setItem('incomplete', JSON.stringify(incomplete));
    comparr1=JSON.parse(localStorage.getItem('incomplete'));
    localStorage.setItem('completed', JSON.stringify(complete));
    comparr2=JSON.parse(localStorage.getItem('completed'));
}
function removeid(id)
{
    let dataId  = Number(id);
    setTimeout(()=>{
        let timetodocon = document.getElementById(dataId);
        timetodocon.parentNode.removeChild(timetodocon);
        let todobox = document.getElementById(dataId);
        todobox.parentNode.removeChild(todobox);
    },0.5);
    console.log(data);
    const index = data.findIndex((dval) => dval.id === dataId);
    console.log("index "+index);
    data.splice(index,1);
    let Myarray=JSON.parse(localStorage.getItem('data'));
    Myarray.splice(index,1);
    localStorage.setItem('data', JSON.stringify(Myarray));
}
//Local storage for data and count
function save()
{
    localStorage.setItem('data', JSON.stringify(data));
    array=JSON.parse(localStorage.getItem('data'));
    localStorage.setItem('count', JSON.stringify(count));
}

function formatTime(time)
{
    return time < 10 ? ("0"+time) : time;
}

const plusbtn = document.querySelectorAll(".plus");
plusbtn.forEach(element=>{
    element.addEventListener("click", ()=>{
        element.classList.toggle('rotate');
            setTimeout(()=>{
                create.style.display = "flex";
                createcont.style.display = "flex";
            },0.2);
    });
});

    let checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(element => {
        element.addEventListener("click", (event)=> {
            var id = event.target.id;
            let i = complete.length;
            const index = data.findIndex((dval) => dval.id == id);
            complete[i] = {name: data[index]['name']};
            const list = document.createElement("li");
            list.innerHTML += complete[i]['name'];
            compul.appendChild(list);
            compsave();
            removeid(id);
          });
    });

   
    function notification(hour,min,name)
    {
        Notification.requestPermission().then((prem)=>{
            if(prem === "granted")
            {
                const notification = new Notification(name,{
                    body: "Only "+hour+" hours "+min+" mins left"
                })
                notification.addEventListener("error",(e)=>{
                    alert("Error");
                })
            }
        });
    }

function remainder(id,hr,min)
{
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id === id)
        {
            const index = data.findIndex((dval) => dval.id === id);
            let remain = data[index].remind;
            if(!remain)
            {
                let remain = data[index].rem;
                let name = data[index].name;
                let count = data[index].count;
                let [hour, minute] = remain.split(':');
                var currentdate = new Date();
                let currentHour = currentdate.getHours();
                let currentMinute = currentdate.getMinutes();
                if(id == count)
                {
                    if(hour == currentHour && minute == currentMinute )
                    {
                        data[index].count = 0; 
                        data[index].remind = true;
                        save();
                        notification(hr,min,name);
                    }
                }
            }
        }
    }
    
}

let navbar = document.querySelector(".navbar");

let menubtn = document.querySelector(".main-container .bxs-timer");
let closebtn = document.querySelector(".main-container .bx-x");
menubtn.addEventListener("click",()=>{
    navbar.classList.toggle("showInput");
    if(navbar.classList.contains("showInput"))
    {
        menubtn.classList.replace("bxs-timer","bx-x");
        showtodolst();
    }
    else{
        menubtn.classList.replace("bx-x","bxs-timer");
        showtimerlst();
    }
});


let timerlst = document.querySelector(".clock");
let todolst = document.querySelector(".todo");
function showtodolst()
{
    timerlst.style.display = "flex";
    todolst.style.display = "none";
}
function showtimerlst()
{
    timerlst.style.display = "none";
    todolst.style.display = "flex";
}

window.addEventListener('resize', function() {
    if (window.matchMedia("(min-width: 600px)").matches) {
      // Load page here
      this.location.reload();
    }
  });

 let editid;
  let edit = document.querySelectorAll('.bx-edit');

    edit.forEach(element => {
        element.addEventListener("click", (event)=> {
            editid = event.target.id;
            editcont.style.display = "flex";
          });
    });

    editcont.addEventListener("click",(event)=>{
        setTimeout(()=>{
            editcont.style.display = "none";
        },0.2);
    });
    editname.addEventListener("click",(event)=>{
        event.stopPropagation();
        editname.style.display = "flex";
    });

    let editall = document.querySelector(".edit");
    editall.addEventListener("click", ()=>{
        let ename = document.querySelector(".ename").value;
        let todocontid = document.getElementById(editid);
        let todocon = todocontid.querySelector(".todo-content");
            var elements = document.getElementsByClassName("todobox");

            for (var i = 0; i < elements.length; i++) {
              if(elements[i].id === editid)
              {
                let todotxt = elements[i].querySelector(".todotxt");
                todotxt.innerHTML = ename;
              }
            }
        todocon.innerHTML = ename;
        const index = data.findIndex((dval) => dval.id == editid);
        data[index].name = ename;
        save();
        document.querySelector(".ename").value = " ";
    });

    let remindtime = document.querySelectorAll('.bx-alarm');

    remindtime.forEach(element => {
        element.addEventListener("click", (event)=> {
            editid = event.target.id;
            remindcont.style.display = "flex";
          });
    });

    remindcont.addEventListener("click",(event)=>{
        setTimeout(()=>{
            remindcont.style.display = "none";
        },0.2);
    });
    reminddiv.addEventListener("click",(event)=>{
        event.stopPropagation();
        reminddiv.style.display = "flex";
    });

    let remindbtn = document.querySelector(".reminbtn");
    remindbtn.addEventListener("click",()=>{
        let remind = document.querySelector(".remind").value;
        const index = data.findIndex((dval) => dval.id == editid);
        console.log(index);
        data[index].rem = remind;
        data[index].count = editid;
        data[index].remind = false;
        save();
        document.querySelector(".remind").value = " ";
    });

    compcont.addEventListener("click",(event)=>{
        setTimeout(()=>{
            compcont.style.display = "none";
        },0.2);
    });
    totcompl.addEventListener("click",(event)=>{
        event.stopPropagation();
        totcompl.style.display = "flex";
    });

    const taskbtn = document.querySelector(".taskbtn");

    taskbtn.addEventListener("click", ()=>{
        taskbtn.classList.toggle('rotat');
            setTimeout(()=>{
                compcont.style.display = "flex";
            },0.2);
    });

    const phtaskbtn = document.querySelector(".bx-task");
    phtaskbtn.addEventListener("click", ()=>{
            setTimeout(()=>{
                compcont.style.display = "flex";
            },0.2);
    });
    
    const trashbtn = document.querySelector(".bx-trash");
    trashbtn.addEventListener("click", ()=>{
            complete.length = 0;
            incomplete.length =0;
            compsave();
            location.reload();
    });
    