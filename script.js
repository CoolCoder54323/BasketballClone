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

    console.log("Adding Images")
    if(heightMode==="Max")
    {
        var testarray = [0,2,3,4]
        console.log(testarray)
        testarray.forEach(value => {
            console.log(value)
        })
        console.log("Max mode")
        console.log(fnames)
        console.log(fnames[1])
        console.log(fnames)
        let [firstFruit, secondFruit] = fnames;
        console.log(firstFruit); // 'apple'
        console.log(secondFruit); // 'banana'
        for (let element of fnames) {
            console.log(element);
        }
        fnames.forEach((item, index) => {
            console.log('Current item:', item);
        });
        fnames.forEach((item,index)=> {
            console.log(item)
            if(addImage(item,fwidths[index],max) != 0){
                console.error("Image Adding Error")
            }
        })
        console.log("All done :(")
        console.log(fnames)
    }
    else if(heightMode === "fading-right")
    {
        if(height === -1)
        {
            fnames.forEach((item,index)=> {
                if(addImage(item,fwidths[index],max*Math.pow(0.95,index))!==0){
                    console.error("Image Adding Error")
                }
                
            }) 
        }
        else if(height > 0 )
        {
            fnames.forEach((item,index)=> {
                if(addImage(item,fwidths[index],height*Math.pow(0.95,index))!==0){
                    console.error("Image Adding Error")
                }
            }) 
        }
    }
}

function addImage(fname, fwidth,height ) {
    // Create a new div element
    var newDiv = document.createElement("div");
    height = Math.round(height)
    console.log(`Loading ${fname} at ${fwidth}vh long and ${height}vh tall`)
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
var names = [""], widths = [""]
var data
console.log(("Fetching"))
fetch('./players.json')
    .then((response) => response.json())
    .then((json) => {
        data = json
        console.log("lofe")
        if(console.log(json)){
            console.log("What th")
        }
        

        names.length = json.length
        widths.length = json.length
        json.forEach((player,index)=>
        {
            names[index] = player.name
            widths[index] = player.ratio
            
        })
        addImages(names,widths)
    }).catch(error => console.error('Error:', error));
    console.log(data)



