
var PPG = 0
var APG = 0
var TRB = 0
var IMAGEMODE = "Max"

const MAX = 378

// imageGrid = document.querySelector(".images-grid");

let largestImage = ["",0]

var backgroundImage = document.querySelector('.content');
let hashMap = new Map();
const track = document.querySelector(".images");
var textBoxes = document.querySelectorAll("#myTextBox")
var cd = document.querySelector('.content');
var width = cd.style.backgroundPositionX


var names = [""]
var data


//Set listeners
window.onmousedown = e => {
   track.dataset.mouseDownAt = e.clientX;
   console.log("Hii" + track.dataset.mouseDownAt)
}
window.onmouseup = (mouse) => {
    track.dataset.mouseDownAt = "0"
    track.dataset.percentage = roundTo(track.dataset.percentage,-1)
    track.animate({backgroundPositionX: `${track.dataset.percentage}%`},
                  {duration:500, fill:"forwards",    animationTimingFunction: "ease"})
    backgroundImage.animate({backgroundPositionX: `${-(track.dataset.percentage) + width}px`},
                    {duration:500, fill:"forwards"})
    

    track.dataset.pastPercent = track.dataset.percentage
}

// Scroll content based on mouse movement
window.onmousemove = e => {


    // Check if mouse is down
    if(track.dataset.mouseDownAt==="0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta/maxDelta) * -100,
            nextPercentage = Math.min(Math.max(parseFloat(track.dataset.pastPercent) + percentage,-50),-25);
    track.dataset.percentage = nextPercentage
    track.animate({ transform: `translate(${(nextPercentage/100)*track.clientWidth}px)`},{duration:500, fill:"forwards"})
    backgroundImage.animate({backgroundPositionX: `${-(nextPercentage)*50 + width}px`},{duration:500, fill:"forwards"})

}



document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === ' ') {
        console.log("SPACE BAR")
        newNames = new Array()

        hashMap.forEach((playerData,name)=>{

            console.log(name, playerData[0], PPG,playerData[1], APG)
            if (playerData[0] >= PPG && playerData[1] >= APG && playerData[2] >= TRB){
                 newNames.push(name)     
            }
        })
        removeList = names.filter((value,index)=>{
            if(newNames.includes(value)){
                return false
            }
            return true
        })

        console.log(removeList)

        console.log(newNames)

        removeImages(removeList,500)

        names = newNames

    
    }});
    

function roundTo(num, decimalPlaces) {
    var multiplier = Math.pow(10, decimalPlaces);
    return Math.round(num * multiplier) / multiplier;
}

function center() {
    //let x  = -track.clientWidth * track.dataset.percentage,
    let middle = window.innerWidth/2 - track.clientWidth
    


}



function removeImages(removeList,dur){
    
    multiplier = removeList.length

    removeList.forEach((name)=>{
        document.querySelector("." + name).animate({width: "0px"},{duration:dur})
    })
    setTimeout(()=>{addImages(names,heightMode=IMAGEMODE)}, dur)

    

}

function addStylesheetRule(rule) {
    var styleEl = document.createElement('style');
    // Append <style> element to <head>
    document.head.appendChild(styleEl);

    // Grab style sheet
    var styleSheet = styleEl.sheet;
    styleSheet.insertRule(rule);
}

//Helper functions
function setTextboxes(textbox) {
    var id = textbox.id
    textbox.value = ""
    textbox.oninput = updateTextbox
    textbox.onclick = ()=>{
        console.log("HELLO",textbox.valu,id)

        // if(textbox.value === ""){
        //     animateColor()
        //     addStylesheetRule(`#${id}.textbox::placeholder { color: white; }`);
        // }
    }
    textbox.oninput();

}

function updateTextbox() {
    let id = this.id.split('-')[0]
    var value = this.value;
    this.value = value.replace(/[^0-9]/g, '');

    console.log(id)
    switch(id) {
        case 'ppg':
            console.log("Updated ppg")
            PPG = this.value
            break;
        case 'apg':
            console.log("Updated apg")
            APG = this.value
            break;
        case 'trb':
            console.log("Updated trb")
            TRB = this.value
            break;
    }
}


function addImages(fnames,heightMode="Max",height=-1,max=MAX) {

    var images = document.querySelector(".images")

    console.log("Adding Images")
    track.innerHTML = ''; // Clear existing content
    if(heightMode==="Max") {
        if(height === -1) {
            fnames.forEach((item)=> {
                addImage(item,max)
            })
        }
        else if (height>0) {
            fnames.forEach((item)=> {
                addImage(item,height)
            })
        }
    }
    else if(heightMode === "fading-right") {
        scale = 0.97
        images.style.left = "8%"
        console.log("Mode Fading right")
        console.log(images.classList)

        if(height === -1) {
            fnames.forEach((item,index)=> {
                addImage(item,max*Math.pow(scale,fnames.length - index))
                
            }) 
        }
        else if(height > 0 ) {
            fnames.forEach((item,index)=> {
                addImage(item,height*Math.pow(scale,fnames.length - index))
            }) 
        }
    }

    // setGrid()
    let [local_width, imgArr] = getWidth()
    imgArr.forEach((elem,idx)=>{
        elem.style.width = local_width
    })
}

const getWidth = ()=> { 
    let imgArr =  Array.prototype.slice.call(document.querySelector(".images").children)

    let [img] = imgArr.filter((element)=>{
        element = Array.prototype.slice.call(element.children)[0]
        if(element.classList[0] === largestImage[0]){
            return true
        }
    })

    img = Array.prototype.slice.call(img.children)[0]

    return [img.style.width,imgArr]
}

function addImage(fname,height) {
    var fratio = hashMap.get(fname)[3]

    largestImage = fratio > largestImage[1] ? [fname,fratio] : largestImage
    console.log(`Loading ${fname} at ${fratio}vh long and ${height}vh tall`)

    // Create a new div element
    var newDiv = document.createElement("div");
    var dynamicImage  = new Image()
    // Optionally, set some properties on the new div
    newDiv.className = "image-div";
    dynamicImage.src = "PlayerImages/" + fname + ".png";
    dynamicImage.classList.add(fname)
    dynamicImage.style.height = `${Math.round(height)}px`;
    width = Math.round((height * fratio) * 10) / 10
    dynamicImage.style.width = `${width}px`;
    dynamicImage.setAttribute("draggable","false")

    var targetElement = document.querySelector(".images");

    newDiv.appendChild(dynamicImage);

    // Append the new div to each target element
    targetElement.append(newDiv.cloneNode(true))

}

// function setGrid() {
//     imageGrid.innerHTML = ""


//     console.log("SETTING GRID")

//     let maxWidth = document.querySelector(`.${largestImage[0]}`).clientWidth

//     let tempCol = ""

//     console.log(maxWidth)
    
//     for(let i = 0; i < names.length;i++){
//         tempCol += `${maxWidth}px`
//         if(i < Math.floor(imageGrid.clientWidth/maxWidth)-1) tempCol += " ";
//         imageGrid.innerHTML += `<div>${i+1}</div>`
//     }
//     console.log(tempCol)

//     imageGrid.style.gridTemplateColumns = tempCol


// }

function updateDisplay(json) {
    names.length = json.length
    json.forEach((player,index)=>
    {
        if(hashMap.has(player.name)){
            return
        }
        console.log(`APG: ${APG} ${player.name}s APG{player.apg}`)
        if(player.ppg >= PPG && player.apg >= APG && player.trb >= TRB){
            hashMap.set(player.name , [player.ppg,player.apg,player.trb,player.ratio])
            names[index] = player.name
            console.log(names)
        }
    })
    addImages(names,IMAGEMODE)

}



console.log(("Fetching"))
fetch('./players.json')
    .then((response) => response.json())
    .then((json) => {
        data = json
        updateDisplay(json)
        console.log(15676523456,Number(getWidth()[0].split('v')[0]))
        track.animate({ transform: `translate(${window.innerWidth/2 - track.clientWidth + 1*Number(getWidth()[0].split('p')[0])/2}px)`},{duration:500, fill:"forwards"})

        document.querySelectorAll('.textbox').forEach(setTextboxes);
    }).catch(error => console.error('Error:', error));








