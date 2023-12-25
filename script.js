
var PPG = 0
var APG = 0
var TRB = 0
var imageReady = false

let hashMap = new Map();



// JavaScript to update the label with the current value of the slider
function setSliders(slider) {
    slider.oninput = updateSlider
    slider.oninput();
}

function updateSlider(){
        let id = this.id.split('-')[0]
        let valueId = id + '-value';
        switch(id)
        {
            case 'ppg':
                PPG = this.value
            case 'apg':
                APG = this.value
            case 'trb':
                TRB = this.value
        }
        var removees = []
        names = names.filter((name,index) => {
            let playerData = hashMap.get(name);
            console.log(playerData ,playerData[1], APG)
            if (playerData && playerData[0] < PPG && playerData[1] < APG && playerData[2] < TRB){
                widths.splice(index)
                return false
            }
            return true
        });
        console.log(names)
        addImages(names,widths)
        

        document.getElementById(valueId).textContent = this.value;
}
    


function addImages(fnames,fwidths,heightMode="Max",height=-1,max=70) {

    console.log("Adding Images")
    var container = document.querySelector(".images");
    container.innerHTML = ''; // Clear existing content
    if(heightMode==="Max")
    {
        if(height === -1){
            fnames.forEach((item,index)=> {
                addImage(item,fwidths[index],max)
            })
        }
        else if (height>0)
        {
            fnames.forEach((item,index)=> {
                addImage(item,fwidths[index],height)
            })
        }
    }
    else if(heightMode === "fading-right")
    {
        if(height === -1)
        {
            fnames.forEach((item,index)=> {
                addImage(item,fwidths[index],max*Math.pow(0.95,index))
                
            }) 
        }
        else if(height > 0 )
        {
            fnames.forEach((item,index)=> {
                addImage(item,fwidths[index],height*Math.pow(0.95,index))
            }) 
        }
    }
}

function addImage(fname, fwidth,height ) 
{
    console.log(`Loading ${fname} at ${fwidth}vh long and ${height}vh tall`)


    // Create a new div element
    var newDiv = document.createElement("div");
    var dynamicImage  = new Image()
    // Optionally, set some properties on the new div
    newDiv.className = "image-div";
    dynamicImage.src = "PlayerImages/" + fname + ".png";
    dynamicImage.style.height = `${Math.round(height)}vh`;
    width = Math.round((height * fwidth) * 10) / 10
    dynamicImage.style.width = `${width}vh`;



    var targetElement = document.querySelector(".images");

    newDiv.appendChild(dynamicImage);


    // Append the new div to each target element
    targetElement.append(newDiv.cloneNode(true))

}

var names = [""], widths = [""]
var data
function updateValues(json) {
    data = json
    names.length = json.length
    widths.length = json.length
    json.forEach((player,index)=>
    {
        if(hashMap.has(player.name)){
            return
        }
        console.log(`APG: ${APG} ${player.name}s APG{player.apg}`)
        if(player.ppg >= PPG && player.apg >= APG && player.trb >= TRB){
            hashMap.set(player.name , [player.ppg,player.apg,player.trb])
            names[index] = player.name
            widths[index] = player.ratio
        }

        
    })
    addImages(names,widths,"Max",40)
    imageReady = true
}

console.log(("Fetching"))
fetch('./players.json')
    .then((response) => response.json())
    .then((json) => {
        updateValues(json)
        document.querySelectorAll('.slider').forEach(setSliders);
    }).catch(error => console.error('Error:', error));





