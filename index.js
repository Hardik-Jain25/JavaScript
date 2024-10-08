let container = document.querySelector(".container")
let gridButton = document.getElementById("sumbit-grid")
let clearGridButton = document.getElementById("clear-grid")
let gridWidth = document.getElementById("width-range")
let gridHeight = document.getElementById("height-range")
let colorButton = document.getElementById("color-input")
let eraseButton = document.getElementById("erase-btn")
let paintButton = document.getElementById("paint-btn")
let widthValue = document.getElementById("width-value")
let heightValue = document.getElementById("height-value")


let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"

    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
}

let devicetype = ""

let draw = false
let erase = false

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        devicetype = "touch";
        return true;
    } catch (err) {
        devicetype = "mouse";
        return false;
    }
}

isTouchDevice()


gridButton.addEventListener("click", () => {
    container.innerHTML = ""
    let count = 0
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2
        let div = document.createElement("div")
        div.classList.add("gridRow")


        for (let j = 0; j < gridWidth.value; j++) {
            count += 2
            let col = document.createElement("div")
            col.classList.add("gridCol")
            col.setAttribute("id", `gridCol${count}`)
            col.addEventListener(events[devicetype].down, () => {
                draw = true
                if (erase) {
                    col.style.backgroundColor = "transparent"

                } else {
                    col.style.backgroundColor = colorButton.value
                }
            })
            col.addEventListener(events[devicetype].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id
checker(elementId)
            })
            col.addEventListener(events[devicetype].up, ()=>{
                draw = false

            })
            div.appendChild(col)
        }
        container.appendChild(div)
    }
})

function  checker(elementId){
    let gridColoumns  = document.querySelectorAll(".gridCol")
    gridColoumns.forEach((element)=>{
          if(elementId == element.id){
            if(draw && !erase){

                element.style.backgroundColor = colorButton.value
            }else{
                element.style.backgroundColor = "transparent"
            }
          }
    })
}

clearGridButton.addEventListener("click",()=>{
    container.innerHTML = ""
})

eraseButton.addEventListener("click" , ()=>{
erase = true
})

paintButton.addEventListener("click" , ()=>{
erase = false
})


gridWidth.addEventListener("input", ()=>{
    widthValue.innerHTML = gridWidth.value <9 ?`0${gridWidth.value}`: gridWidth.value
})


gridHeight.addEventListener("input", ()=>{
    heightValue.innerHTML = gridHeight.value <9 ?`0${gridHeight.value}`: gridHeight.value
})


window.onload= ()=>{
    gridHeight.value = 0
    gridWidth.value = 0

}