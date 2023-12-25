// JavaScript to update the label with the current value of the slider
document.querySelectorAll('.slider').forEach(slider => {
    slider.oninput = function() {
        let valueId = this.id.split('-')[0] + '-value';
        document.getElementById(valueId).textContent = this.value;
    }
    // Initialize text content
    slider.oninput();
});

function addImages(fnames,fwidths,heightMode="Max",height=-1,max=70) {

        
    if(heightMode==="Max")
    {
        fnames.forEach((item,index)=> {
            addImage(item,fwidths[index],max)
        })
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

function addImage(fname, fwidth,height ) {
    // Create a new div element
    var newDiv = document.createElement("div");
    height = Math.round(height)

    // Optionally, set some properties on the new div
    newDiv.className = "image-div";
    let dynamicImage = document.createElement('img');
    dynamicImage.src = "PlayerImages/" + fname + ".png";
    dynamicImage.style.height = `${height}vh`;
    width = Math.round((60 * fwidth) * 10) / 10
    dynamicImage.style.width = `${width}vh`;


    // Select the target element(s) where you want to add the new div
    // This example selects all elements with the class name 'target-class'
    var targetElements = document.querySelectorAll(".images");

    newDiv.appendChild(dynamicImage);


    // Append the new div to each target element
    targetElements.forEach(function(target) {
        target.appendChild(newDiv.cloneNode(true)); // cloneNode is used to append the div to multiple targets
    });
}

var names = ["Joel_Embiid","Lebron_James","Anthony_Edwards","Micheal_Jordan"]
var widths = [0.4, 0.4,0.5,0.5]


addImages(names,widths,"fading-right")