
var PPG = 0
var APG = 0
var TRB = 0
var imageReady = false

let hashMap = new Map();
const track = document.querySelector(".images");
var textBoxes = document.querySelectorAll("#myTextBox")

var names = [""], ratios = [""]
var data



//Set listeners
window.onmousedown = e => {
   track.dataset.mouseDownAt = e.clientX;
   console.log("Hii" + track.dataset.mouseDownAt)
}
window.onmouseup = (mouse) => {
    track.dataset.mouseDownAt = "0"
    track.dataset.pastPercent = track.dataset.percentage
}

// Scroll content based on mouse movement
window.onmousemove = e => {
    var element = document.querySelector('.content');

    // Check if mouse is down
    if(track.dataset.mouseDownAt==="0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta/maxDelta) * -100,
            nextPercentage = Math.min(Math.max(parseFloat(track.dataset.pastPercent) + percentage,-100),100);
    track.dataset.percentage = nextPercentage
    track.animate({ transform: `translate(${nextPercentage}%)`},{duration:500, fill:"forwards"})
    element.animate({backgroundPosition: `-${nextPercentage}%0%`},{duration:500, fill:"forwards"})

}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === ' ') {
        console.log("SPACE BAR")
        names = names.filter((name,index) => {
            let playerData = hashMap.get(name);
            if (playerData && (playerData[0] < PPG || playerData[1] < APG || playerData[2] < TRB)){
                ratios.splice(index)
                return false
            }
            return true
        })
        console.log(names)
        addImages(names,ratios,heightMode="Max",40)
    
    }});  



//Helper functions
function setTextboxes(textbox) {
    textbox.value = ""
    textbox.oninput = updateTextbox
    textbox.oninput();
}

function updateTextbox() {
    let id = this.id.split('-')[0]
    switch(id) {
        case 'ppg':
            PPG = this.value
        case 'apg':
            APG = this.value
        case 'trb':
            TRB = this.value
    }
}


function addImages(fnames,fratios,heightMode="Max",height=-1,max=70) {

    console.log("Adding Images")
    track.innerHTML = ''; // Clear existing content
    if(heightMode==="Max") {
        if(height === -1) {
            fnames.forEach((item,index)=> {
                addImage(item,fratios[index],max)
            })
        }
        else if (height>0) {
            fnames.forEach((item,index)=> {
                addImage(item,fratios[index],height)
            })
        }
    }
    else if(heightMode === "fading-right") {
        if(height === -1) {
            fnames.forEach((item,index)=> {
                addImage(item,fratios[index],max*Math.pow(0.95,index))
                
            }) 
        }
        else if(height > 0 ) {
            fnames.forEach((item,index)=> {
                addImage(item,fratios[index],height*Math.pow(0.95,index))
            }) 
        }
    }
}

function addImage(fname, fratio,height ) {
    console.log(`Loading ${fname} at ${fratio}vh long and ${height}vh tall`)

    // Create a new div element
    var newDiv = document.createElement("div");
    var dynamicImage  = new Image()
    // Optionally, set some properties on the new div
    newDiv.className = "image-div";
    dynamicImage.src = "PlayerImages/" + fname + ".png";
    dynamicImage.style.height = `${Math.round(height)}vh`;
    ratio = Math.round((height * fratio) * 10) / 10
    dynamicImage.style.width = `${ratio}vh`;
    dynamicImage.setAttribute("draggable","false")

    var targetElement = document.querySelector(".images");

    newDiv.appendChild(dynamicImage);

    // Append the new div to each target element
    targetElement.append(newDiv.cloneNode(true))

}


function updateDisplay(json) {
    data = json
    names.length = json.length
    ratios.length = json.length
    json.forEach((player,index)=>
    {
        if(hashMap.has(player.name)){
            return
        }
        console.log(`APG: ${APG} ${player.name}s APG{player.apg}`)
        if(player.ppg >= PPG && player.apg >= APG && player.trb >= TRB){
            hashMap.set(player.name , [player.ppg,player.apg,player.trb])
            names[index] = player.name
            ratios[index] = player.ratio
        }

        addImages(names,ratios,"Max",40)

    })
}



console.log(("Fetching"))
fetch('./players.json')
    .then((response) => response.json())
    .then((json) => {
        updateDisplay(json)
        document.querySelectorAll('.textbox').forEach(setTextboxes);
    }).catch(error => console.error('Error:', error));





