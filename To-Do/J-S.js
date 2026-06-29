//eventlistener is not blocked scope it alive even after it define inside the block to any variable, 
//he element itself lives in the DOM, and the event listeners are bound to it.
const container = document.getElementById("list1");
const inputText = document.getElementById("input-Box");
const taskBtn = document.getElementById("BTN");
//const addTask = document.getElementById("Div-Content");


let dive; 
taskBtn.addEventListener("click", function(){
    let text = inputText.value.trim();
    if(text === ""){
        console.log("Please Enter your task first");
    }
    else{
        //this wiil create an new div 
        dive = document.createElement("div");
        
        //these are the attribute we added
        dive.className = "card";
        dive.draggable = true;
        dive.textContent = text;
        dive.id = "card-" + Date.now(); // unique id
        //append child add the div at the end of the main div(list1)
        container.appendChild(dive);
         dive.addEventListener("dragstart", dragStart);
        dive.addEventListener("dragend", dragEnd);
        inputText.value = "";   
    }})
   
    


const cards = document.querySelectorAll(".card")
const lists = document.querySelectorAll(".list")

for(const card of cards){
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for(const list of lists){
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
    
    
}

function dragStart(e){
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(){
console.log("Drag ended")
}

function dragOver(e)
{
    e.preventDefault();

}

function dragEnter(e){
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e){
    this.classList.remove("over")
}

function dragDrop(e){
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    
    this.appendChild(card);
    this.classList.remove("over");

}