
let PPG = 0
let APG = 0
let TRB = 0
let IMAGEMODE = "Max"

let moved = false;

const MAX = 378
const track = document.querySelector(".images");

let offset;
let nextPercentage;
let mouseSelected = false

let largestImage = ["",0]
let selectedPLayerDiv;

let backgroundImage = document.querySelector('.content');
let hashMap = new Map();
//let BGwidth = document.querySelector('.content').style.backgroundPositionX


var names = [""]


//Set listeners
window.onmousedown = e => {
   if(e.target.classList.contains("textbox-container")) return;
   track.dataset.mouseDownAt = e.clientX;
   console.log("Press at:" + track.dataset.mouseDownAt)
   
}
window.onmouseup = (mouse) => {
    track.dataset.mouseDownAt = "0"
    if(!moved) return;
    // track.animate({backgroundPositionX: `${track.dataset.percentage}%`},
    //               {duration:500, fill:"forwards",    animationTimingFunction: "ease"})
    // backgroundImage.animate({backgroundPositionX: `${-(track.dataset.percentage) + width}px`},
    //                 {duration:500, fill:"forwards"})
    currX = 0;
    newX =0;

    if(parseFloat(track.style.transform.split("(")[1])){
        currX = parseFloat(track.style.transform.split("(")[1])
        newX = closestNumber(currX-offset,getWidth());
    }
    
    track.animate({ transform: `translate(${newX + offset}px)`},{duration:500, fill:"forwards"})
    track.dataset.percentage = track.dataset.pastPercent = ((((newX)/track.clientWidth)*100))
    autoSelectPlayer()
    moved = false

}

window.onmousemove = e => {
    
    moved = true;
    if(e.target.classList.contains("textbox-container")) return;
    if(track.dataset.mouseDownAt==="0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2,
          percentage = (mouseDelta/maxDelta) * -100
    moveImage(percentage)
    autoSelectPlayer()

    // backgroundImage.animate({backgroundPositionX: `${-(nextPercentage)*50 + width}px`},{duration:500, fill:"forwards"})
}

document.addEventListener('keydown', (event) => {
    console.log(event.code)
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

    }
    if(event.code === 'KeyT'){

    }

});

/*
        Set utility functions
*/

function closestNumber(n, m) {

    let q = parseInt(n / m);
    let lowPos = m * q;
    let highPos = (n * m) > 0 ?
        (m * (q + 1)) : (m * (q - 1));

    //Return Closest    
    if (Math.abs(n - lowPos) < Math.abs(n - highPos))
        return lowPos;
     
    return highPos;
}

function roundTo(num, decimalPlaces) {
    var multiplier = Math.pow(10, decimalPlaces);
    return Math.round(num * multiplier) / multiplier;
}

function center() {
    let middle = window.innerWidth/2 - track.clientWidth
}

const getWidth = ()=> { 
    let imgArr = Array.from(document.querySelector(".images").childNodes)

    let [img] = imgArr.filter((element)=>{
        element = (element).querySelector("*")
        if(element.classList[0] === largestImage[0]){
            return true
        }
    })

    img = img.querySelector("*")

    return parseFloat(img.style.width.split('p')[0])
}

/*
        Set utility functions
*/

function autoSelectPlayer() {
    
    let pos = track.clientWidth * track.dataset.percentage/100,
    playersMoved =  Math.round(pos/getWidth())
    //console.log(`Highlighting the ${playersMoved} player`)
    if(selectedPLayerDiv == track.childNodes[track.childNodes.length-playersMoved-1]) return;

    if(selectedPLayerDiv) selectedPLayerDiv.classList.remove("selected-image-div");
    selectedPLayerDiv = track.childNodes[track.childNodes.length-playersMoved-1]
    selectedPLayerDiv.classList.add("selected-image-div")
}

function selectPLayer(playerName) {
    

}

function setTextboxes(textbox) {
    textbox.value = ""
    textbox.oninput = updateTextbox
    textbox.oninput();
}

function updateTextbox() {
    let id = this.id.split('-')[0]
    let value = this.value;
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

    let local_width = getWidth()
    Array.from(images.childNodes).forEach((image)=>{
        image.style.width = local_width + "px"
    })
}

function addImage(fname,height) {

    let fratio = hashMap.get(fname)[3]
    let imageWidth = Math.round((height * fratio) * 10) / 10

    console.log(`Loading ${fname} at ${fratio}vh long and ${height}vh tall`)
    

    const dynamicImage  = new Image()
    dynamicImage.src = "PlayerImages/" + fname + ".png";
    dynamicImage.classList.add(fname)
    dynamicImage.style.height = `${Math.round(height)}px`;
    dynamicImage.style.width = `${imageWidth}px`;
    dynamicImage.setAttribute("draggable","false")

    const newDiv = document.createElement("div");
    newDiv.className = "image-div";
    newDiv.appendChild(dynamicImage);
    newDiv.onmouseover = ()=>{
        if(track.dataset.mouseDownAt !== "0") return;
        mouseSelected = true;
        newDiv.classList.add("highlighted-image-div")
    }
    newDiv.onmouseleave = ()=>{
        if(track.dataset.mouseDownAt !== "0") return;
        mouseSelected = false;
        newDiv.classList.remove("highlighted-image-div")
    }
    newDiv.onclick = ()=>{
        if(newDiv === selectedPLayerDiv || moved===true) return;

        let newIndex = 0,
            startingIndex = 0;
        track.childNodes.forEach((value,key)=>{
            if(value == newDiv){
                newIndex = key;
            }
            if(value == selectedPLayerDiv) {
                startingIndex = key;
            }
        })
        console.log("Percent", (getWidth()*(hashMap.size-newIndex))/track.clientWidth)
        let newX = (getWidth()*(hashMap.size-newIndex-1));   
        offset = window.innerWidth/2 - track.clientWidth + getWidth()/2
        if(selectedPLayerDiv){
            selectedPLayerDiv.classList.remove("selected-image-div")
        }
        selectedPLayerDiv = newDiv
        newDiv.classList.add("selected-image-div")
        track.animate({ transform: `translate(${newX + offset}px)`},{duration:400, fill:"forwards", easing:"cubic-bezier(.17,.67,.37,1.02)"})
        track.dataset.percentage = track.dataset.pastPercent = (((newX/track.clientWidth)*100))   
        

    }

    document.querySelector(".images").append(newDiv)
    largestImage = fratio > largestImage[1] ? [fname,fratio] : largestImage
}

function removeImages(removeList,dur){
    
    multiplier = removeList.length

    removeList.forEach((name)=>{
        let imageDiv = document.querySelector("." + name)
        imageDiv.animate({width: "0px"},{duration:dur})
    })
    setTimeout(()=>{addImages(names,heightMode=IMAGEMODE)}, dur)

}

function initDisplay(json) {
    names.length = json.length
    json.forEach((player,index)=>
    {
        if(hashMap.has(player.name)){
            return
        }
        if(player.ppg >= PPG && player.apg >= APG && player.trb >= TRB){
            hashMap.set(player.name , [player.ppg,player.apg,player.trb,player.ratio])
            names[index] = player.name
        }
    })
    addImages(names,IMAGEMODE)

}


function moveImage(percentage) {
    offset = window.innerWidth/2 - track.clientWidth + getWidth()/2

    nextPercentage = Math.min(Math.max(parseFloat(track.dataset.pastPercent) + percentage,0),90);
    track.dataset.percentage = nextPercentage
    track.animate({ transform: `translate(${(nextPercentage/100)*track.clientWidth+offset}px)`},{duration:percentage !== 0 ? 500 : 0, fill:"forwards"})
    track.style.transform = `translate(${(nextPercentage/100)*track.clientWidth+offset}px)`
}
    

console.log(("Fetching"))
fetch('./players.json')
    .then((response) => response.json())
    .then((json) => {
        initDisplay(json)
        offset = window.innerWidth/2 - track.clientWidth + getWidth()/2;
        console.log("Width =",(getWidth()))
        track.animate({ transform: `translate(${window.innerWidth/2 - track.clientWidth + getWidth()/2}px)`},{duration:500, fill:"forwards"})
        autoSelectPlayer()
        console.log("Next Percentage",nextPercentage ? nextPercentage : 0)
        track.style.transform = `translate(${track.clientWidth + (offset)})px)`
        document.querySelectorAll('.textbox').forEach(setTextboxes);
    }).catch(error => console.error('Error:', error));








