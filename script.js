// let container = document.querySelector(".container");
let center = document.querySelector(".center");
let canvas = document.querySelector("canvas");
let body = document.querySelector("body");

let uploadbtn
let urlbtn
let addbtn = document.querySelector(".add-button");
let ctx = canvas.getContext("2d");

//////////////////CANVAS DRAW FUNCTION
// uploadbtn.addEventListener("click",function(){
//     let input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     container.appendChild(input);
//     input.click();
//     input.remove();
//     input.addEventListener("change",function(e){
//         let img = document.createElement("img");
//         img.src = URL.createObjectURL(e.target.files[0]);
//         img.style.objectFit = "contain";
//         img.addEventListener("load",function(){
//             ctx.drawImage(img,0,0,canvas.width,canvas.height);
//         });
//     })
// }) 

let thingsadded = [];
let workingid;

function addtoppanellistener(){
    let toppanel = document.querySelector(".top-panel");
    uploadbtn.addEventListener("click",function(){
        let input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        container.appendChild(input);
        input.click();
        input.remove();
        input.addEventListener("change",creatediv);
        toppanel.remove();
        document.querySelector(".add-button").classList.toggle("selected");
    });
    
    urlbtn.addEventListener("click",function(e){
        let check = document.querySelector(".url-modal");
        if(check == null){
            let div = document.createElement("div");
            div.classList.add("url-modal");
            div.innerHTML = `
                                <input type="text">
                                <button class="url-modal-button">Add</button>
                            `;
            document.querySelector("body").appendChild(div);
            let val;
            let modalbtn = document.querySelector(".url-modal-button");
            modalbtn.addEventListener("click",function(e){
                val = e.currentTarget.parentNode.children[0].value;
                // console.log(val);
                div.remove();
                creatediv(e,val);
                toppanel.remove();
                document.querySelector(".add-button").classList.toggle("selected");
            });
        }else{
            check.remove();
        }
    });
}

function creatediv(e,url){
    let div = document.createElement("div");
    let id = uid();
    div.setAttribute("id",id);
    div.classList.add("new-element");
    let img = document.createElement("img");
    if(url==undefined){
        div.style.background = `url('${URL.createObjectURL(e.target.files[0])}')`;
        // img.src = `url('${URL.createObjectURL(e.target.files[0])}')`;
        // img.src = e.target.files[0];
    }else{
        div.style.background = `url('${url})`;
        console.log("hi");
    }
    // div.append(img);
    div.style.backgroundSize = "100% 100%";
    let button1 = document.createElement("button");
    button1.innerText = "m";
    button1.classList.add("move");
    let button2 = document.createElement("button");
    button2.innerText = "r";
    button2.classList.add("resize");
    button1.addEventListener("mousedown",move);
    button2.addEventListener("mousedown",resize);
    div.append(button1);
    div.append(button2);
    center.append(div);
    div.addEventListener("click",(e) => {
        e.currentTarget.classList.toggle("selected");
        e.currentTarget.children[0].classList.toggle("selected");
        e.currentTarget.children[1].classList.toggle("selected");
    });
    thingsadded.push(div);
}

function move(e){
    e.stopPropagation();
    workingid = e.currentTarget.parentNode.getAttribute("id");
    if(e.buttons == 1){
        document.querySelector("body").addEventListener("mouseup",givecordformove);
    } 
}

function givecordformove(e){
    let newx = e.pageX;
    let newy = e.pageY;
    // console.log(newx+" "+newy);
    document.querySelector("body").removeEventListener("mouseup",givecordformove);
    changeposition(e,newx,newy);
}

function changeposition(e,newx,newy){
    let div = document.getElementById(workingid);
    style = window.getComputedStyle(div);
    let width = parseInt(style.getPropertyValue('width').split("px")[0]);
    let height = parseInt(style.getPropertyValue('height').split("px")[0]);
    // console.log(width/2+" "+height/2);
    newy = newy - 5;
    newx = newx - width - 40;
    // console.log(newx+" "+newy);
    div.style.left = newx+"px";
    div.style.top = newy+"px";
}

function resize(e){
    e.stopPropagation();
    workingid = e.currentTarget.parentNode.getAttribute("id");
    if(e.buttons == 1){
        document.querySelector("body").addEventListener("mouseup",givecordforresize);
    }
}

function givecordforresize(e){
    let newx = e.pageX;
    let newy = e.pageY;
    document.querySelector("body").removeEventListener("mouseup",givecordforresize);
    changesize(e,newx,newy);
}

function changesize(e,newx,newy) {
    let div = document.getElementById(workingid);
    style = window.getComputedStyle(div);
    let width = parseInt(style.getPropertyValue('width').split("px")[0]);
    let height = parseInt(style.getPropertyValue('height').split("px")[0]);
    let right = parseInt(style.getPropertyValue('left').split("px")[0]) + width;
    let bottom = parseInt(style.getPropertyValue('top').split("px")[0]) + height;
    let rightdif = right - newx;
    let bottomdif = bottom - newy;
    div.style.height = (height - bottomdif + 10)+"px"; //-20 butotn size : temp
    div.style.width = (width - rightdif - 35)+"px"; //-20 button size : temp
    // draw();

    let ele = document.getElementById(workingid);
    if(ele.classList[0].split("-")[1] == "emoji"){
        resize1(ele);
    }
}

addbtn.addEventListener("click",function(){
    addbtn.classList.toggle("selected");
    let check = document.querySelector(".top-panel");
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("top-panel");
        div.innerHTML = `<div class="upload-button">Upload a photo</div>
                        <div class="url-button">Image URL</div>`;
        
        body.appendChild(div);
        uploadbtn = document.querySelector(".upload-button");
        urlbtn = document.querySelector(".url-button");
        addtoppanellistener();
    }else{
        check.remove();
    }
});

// function draw(){
//     for(let i=0;i<thingsadded.length;i++){
//         let ele = thingsadded[i];
//         style = window.getComputedStyle(ele);
//         let top = style.getPropertyValue('top').split("px")[0];
//         let left = style.getPropertyValue('left').split("px")[0];
//         console.log(top+" "+left);
//         ctx.drawImage(ele,top,left);
//     }
// }


///////////////////////////////////////Effects 
let effectsbtn = document.querySelector(".effects-button");
let defaultfilters = {
    blur:"0px",
    brightness:"100%",
    contrast:"100%",
    grayscale:"0%",
    "hue-rotate":"0deg",
    saturate:"100%",
    sepia:"0%"
}

function removeExtramodal(ele){
    let divs = document.querySelectorAll(".left-panel div");
    for(let j=0;j<divs.length;j++){
        if(divs[j]!=ele){
            let classes = divs[j].classList;
            if(classes.length==3){
                divs[j].click();
            }
        }
    }
}


effectsbtn.addEventListener("click",function(){
    removeExtramodal(effectsbtn);
    effectsbtn.classList.toggle("selected");
    let check = document.querySelector(".effects-container");
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("effects-container");
        div.innerHTML = `<button class="filter-reset" style="display: block;">Reset</button>
                        <label for="customRange3" class="form-label">Blur</label>
                        <input type="range" class="form-range filters" reset="0" unit="px" min="0" max="5" step="0.5" value="0" id="customRange3" filter="blur">
                        <label for="customRange3" class="form-label">Brightness</label>
                        <input type="range" class="form-range filters" reset="100" unit="%" min="0" max="200" step="2" value="100" id="customRange3" filter="brightness">
                        <label for="customRange3" class="form-label">Contrast</label>
                        <input type="range" class="form-range filters" reset="100" unit="%" min="0" max="200" step="2" value="100" id="customRange3" filter="contrast">
                        <label for="customRange3" class="form-label">Grayscale</label>
                        <input type="range" class="form-range filters" reset="0" unit="%" min="0" max="100" step="1" value="0" id="customRange3" filter="grayscale">
                        <label for="customRange3" class="form-label">Hue</label>
                        <input type="range" class="form-range filters" reset="0" unit="deg" min="0" max="360" step="10" value="0" id="customRange3" filter="hue-rotate">
                        <label for="customRange3" class="form-label">Saturate</label>
                        <input type="range" class="form-range filters" reset="100" unit="%" min="0" max="200" step="2" value="100" id="customRange3" filter="saturate">
                        <label for="customRange3" class="form-label">Sepia</label>
                        <input type="range" class="form-range filters" reset="0" unit="%" min="0" max="100" step="1" value="0" id="customRange3" filter="sepia">`;
        body.appendChild(div);
        let filters = document.querySelectorAll(".filters");
        // let defaultfilters = 
        for(let i=0;i<filters.length;i++){
            filters[i].oninput = function(){
                changefilter(this);
            }
        }
        let filterreset = document.querySelector(".filter-reset");
        filterreset.addEventListener("click",function(){
            let divs = document.querySelectorAll(".new-element.selected");
            for(let i=0;i<divs.length;i++){
                let ans="";
                for(let j in defaultfilters){
                    ans = ans + `${j}(${defaultfilters[j]})` +" ";
                }
                divs[i].style.filter = ans; 
            }
            for(let i=0;i<filters.length;i++){
                filters[i].value = filters[i].getAttribute("reset");
            }
        });
        filterreset.click();
    }else{
        check.remove();
    }
});

function changefilter(ele){
    let divs = document.querySelectorAll(".new-element.selected");
    let filter = ele.getAttribute("filter");
    let unit = ele.getAttribute("unit");
    for(let i=0;i<divs.length;i++){
        let filterarr = divs[i].style.filter.split(" ");
        let ans = "";
        for(let j of filterarr){
            if(j.includes(filter)){
                ans = ans + `${filter}(${ele.value}${unit})` +" ";
            }else{
                ans = ans +j +" ";
            }
        }
        console.log(ans);
        divs[i].style.filter = ans;
    }
}


//////////////////////////////////////////////ROUND BUTTON
let roundbtn = document.querySelector(".round-button");

roundbtn.addEventListener("click",function(e){
    removeExtramodal(roundbtn);
    roundbtn.classList.toggle("selected");
    let check = document.querySelector(".round-modal");
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("round-modal");
        div.innerHTML = `<label for="customRange3" class="form-label">Roundness</label>
                         <input type="range" class="form-range round" reset="0" min="0" max="50" step="1" value="0" id="customRange3" filter="blur">`;
        body.appendChild(div);
        let round = document.querySelector(".round"); //slider button
        // let defaultfilters = 
        round.oninput = function(){
            changeround(this);
        }
    }else{
        check.remove();
    }
});

function changeround(ele){
    let divs = document.querySelectorAll(".new-element.selected");
    for(let i=0;i<divs.length;i++){
        divs[i].style.borderRadius = ele.value+"%";
    } 
}

/////////////////////////////TEXT BOX
let textbtn = document.querySelector(".text-button");
let textboxadded = [];
let workingtextid;

function createTextBox(e,url){
    let div = document.createElement("div");
    let id = uid();
    workingtextid = id;
    div.setAttribute("id",id);
    div.classList.add("new-text-box");
    div.classList.add("selected");
    div.setAttribute("contenteditable","true");
    let button1 = document.createElement("button");
    button1.innerText = "m";
    button1.classList.add("move");
    button1.classList.add("selected");
    button1.setAttribute("contenteditable","false");
    button1.setAttribute("style","font-size:16px;");
    let button2 = document.createElement("button");
    button2.innerText = "r";
    button2.classList.add("resize");
    button2.classList.add("selected");
    button2.setAttribute("contenteditable","false");
    button2.setAttribute("style","font-size:16px;");
    button1.addEventListener("mousedown",move);
    button2.addEventListener("mousedown",resize);
    div.append(button1);
    div.append(button2);
    div.setAttribute("contenteditable","true");
    center.append(div);
    div.focus();
    div.addEventListener("click",(e) => {
        e.currentTarget.classList.toggle("selected");
        e.currentTarget.children[0].classList.toggle("selected");
        e.currentTarget.children[1].classList.toggle("selected");
    });
    textboxadded.push(div);
}

textbtn.addEventListener("click",function(e){
    // removeExtramodal(textbtn);
    textbtn.classList.add("selected");
    setTimeout(()=>{
        textbtn.classList.remove("selected");
    },350);
    createTextBox();
});


////////////////////////////////////////TEXT STYLING
let textEditbtn = document.querySelector(".text-edit-button");

function removeExtramodal2(){
    let divs = document.querySelectorAll(".text-modal div");

}

textEditbtn.addEventListener("click",function(e){
    removeExtramodal(textEditbtn);
    textEditbtn.classList.toggle("selected");
    let check = document.querySelector(".text-modal");
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("text-modal");
        div.innerHTML = `<div class="options2 background-color pickcolor colorPickSelector">BackGround color</div>
                        <div class="options2 color pickcolor">Font color</div>
                        <div class="options2 fontstyle">Font style</div>
                        <div class="options2 bold">Bold</div>
                        <div class="options2 underline">UnderLine</div>
                        <div class="options2 italic">Italic</div>
                        <div class="options2 fontsizeup">Font-size up</div>
                        <div class="options2 fontsizedown">Font-size down</div>
                        <div class="options2 alignment">Alignment</div>`;
        body.appendChild(div);
        $(".pickcolor").colorPick({
            'initialColor': "#ABCD",
            'allowRecent': true,
            'recentMax': 5,
            'allowCustomColor': true,
            'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d"],
            'onColorSelected': function () {
                if (this.color != "#ABCD") {
                    let property = this.element[0].classList[1];
                    let boxes = document.querySelectorAll(".new-text-box.selected");
                    for(let j of boxes){
                        j.style[property] = this.color;
                    }
                }
            }
        });

        let fontbtn = document.querySelector(".fontstyle");
        fontbtn.addEventListener("click",handlefont);

        document.querySelector(".bold").addEventListener("click",function(e){handlebold();});
        document.querySelector(".underline").addEventListener("click",function(e){handleunderline();});
        document.querySelector(".italic").addEventListener("click",function(e){handleitalic();});
        document.querySelector(".fontsizeup").addEventListener("click",function(e){handlesizeup();});
        document.querySelector(".fontsizedown").addEventListener("click",function(e){handlesizedown();});
        document.querySelector(".alignment").addEventListener("click",function(e){handlealignment();});
        //load modal 2 way
    }else{
        check.remove();
        if(document.querySelector(".font-modal")!=null){
            document.querySelector(".font-modal").remove();
        }
        if(document.querySelector(".alignment-modal")!=null){
            document.querySelector(".alignment-  n   modal").remove();
        }
    }
});

function handlefont(e){
    let check = document.querySelector(".font-modal");
    if(document.querySelector(".alignment-modal")!=null){
       document.querySelector(".alignment").click(); 
    }
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("font-modal");
        div.innerHTML = `   <div style="font-family:Noto Sans" value="Noto Sans">Noto Sans</div>
                            <div style="font-family:Arial" value="Arial">Arial</div>
                            <div style="font-family:Calibri" value="Calibri">Calibri</div>
                            <div style="font-family:Comic Sans MS" value="Comic Sans MS">Comic Sans MS</div>
                            <div style="font-family:Courier New" value="Courier New">Courier New</div>
                            <div style="font-family:Impact" value="Impact">Impact</div>
                            <div style="font-family:Georgia" value="Georgia">Georgia</div>
                            <div style="font-family:Garamond" value="Garamond">Garamond</div>
                            <div style="font-family:Lato" value="Lato">Lato</div>
                            <div style="font-family:Open Sans" value="Open Sans">Open Sans</div>
                            <div style="font-family:Palatino" value="Palatino">Palatino</div>
                        `;
        body.append(div);
        document.querySelector(".font-modal").addEventListener("click",function(e){
            changefont(e.path[0].innerText);
        });
    }else{
        check.remove();
    }
}

function changefont(font){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        j.style.fontFamily = font;
    }
}

function handlebold(){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        j.classList.toggle("make-bold");
    }
}

function handleunderline(){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        j.classList.toggle("make-underline");
    }
}

function handleitalic(){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        j.classList.toggle("make-italic");
    }
}

function handlesizeup(){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        style = window.getComputedStyle(j);
        let size = parseInt(style.getPropertyValue("font-size").split("px")[0]);
        console.log(size);       
        j.style.fontSize = (size+1)+"px";
    }
}

function handlesizedown(){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        style = window.getComputedStyle(j);
        let size = parseInt(style.getPropertyValue("font-size").split("px")[0]);
        j.style.fontSize = (size-1)+"px";
    }
}

function handlealignment(e){
    let check = document.querySelector(".alignment-modal");
    if(document.querySelector(".font-modal")!=null){
        document.querySelector(".fontstyle").click(); 
    }
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("alignment-modal");
        div.innerHTML = `   <div>Left</div>
                            <div>Center</div>
                            <div>Right</div>
                        `;
        body.append(div);
        document.querySelector(".alignment-modal").addEventListener("click",function(e){
            changealignment(e.path[0].innerText);
        });
    }else{
        check.remove();
    }
}

function changealignment(alignment){
    let boxes = document.querySelectorAll(".new-text-box.selected");
    for(let j of boxes){
        j.style.textAlign = alignment;
    }
}

///////////////////////////////EMOJI

let emojibtn = document.querySelector(".emoji-button");

emojibtn.addEventListener("click",function(e){
    removeExtramodal(emojibtn);
    emojibtn.classList.toggle("selected");
    let check = document.querySelector(".emoji-modal");
    if(check==null){
        let div = document.createElement("div");
        div.classList.add("emoji-modal");
        div.innerHTML = `<div>&#128512;</div><div>&#128513;</div><div>&#128514;</div><div>&#128515;</div><div>&#128516;</div><div>&#128517;</div><div>&#128518;</div><div>&#128519;</div><div>&#128520;</div><div>&#128521;</div><div>&#128522;</div><div>&#128523;</div><div>&#128524;</div><div>&#128525;</div><div>&#128526;</div><div>&#128527;</div><div>&#128528;</div><div>&#128529;</div><div>&#128530;</div><div>&#128531;</div><div>&#128532;</div><div>&#128533;</div><div>&#128534;</div><div>&#128535;</div><div>&#128536;</div><div>&#128537;</div><div>&#128538;</div><div>&#128539;</div><div>&#128540;</div><div>&#128541;</div><div>&#128542;</div><div>&#128543;</div><div>&#128544;</div><div>&#128545;</div><div>&#128546;</div><div>&#128547;</div><div>&#128548;</div><div>&#128549;</div><div>&#128550;</div><div>&#128551;</div><div>&#128552;</div><div>&#128553;</div><div>&#128554;</div><div>&#128555;</div><div>&#128556;</div><div>&#128557;</div><div>&#128558;</div><div>&#128559;</div><div>&#128560;</div><div>&#128561;</div><div>&#128562;</div><div>&#128563;</div><div>&#128564;</div><div>&#128565;</div><div>&#128566;</div><div>&#128567;</div>`;
        body.appendChild(div);
        // const ps = new PerfectScrollbar(".emoji-modal", {
        //     wheelSpeed: 15
        // });
        div.addEventListener("click",function(e){
            createEmoji(e.path[0].innerText);
        })

    }else{
        check.remove();
    }
});

function createEmoji(code){
    let div = document.createElement("div");
    let id = uid();
    workingtextid = id;
    div.setAttribute("id",id);
    div.classList.add("new-emoji-box");
    div.classList.add("selected");
    let button1 = document.createElement("button");
    button1.innerText = "m";
    button1.classList.add("move");
    button1.classList.add("selected");
    button1.setAttribute("style","font-size:16px;");
    let button2 = document.createElement("button");
    button2.innerText = "r";
    button2.classList.add("resize");
    button2.classList.add("selected");
    button2.setAttribute("style","font-size:16px;");
    button1.addEventListener("mousedown",move);
    button2.addEventListener("mousedown",resize);
    div.append(button1);
    div.append(button2);
    div.append(code); 
    center.append(div);
    div.focus();
    // div.innerText=code
    div.addEventListener("click",(e) => {
        e.currentTarget.classList.toggle("selected");
        e.currentTarget.children[0].classList.toggle("selected");
        e.currentTarget.children[1].classList.toggle("selected");
    });
}

function resize1(ele){
    console.log("hi");
    style = window.getComputedStyle(ele);
    console.log(style.getPropertyValue('font-size').split("px")[0]);
    let width = parseInt(style.getPropertyValue('width').split("px")[0])*(0.6);
    let height = parseInt(style.getPropertyValue('width').split("px")[0])*(0.5);
    console.log(width+" "+height);
    console.log(Math.min(width,height));
    ele.style.fontSize = `${Math.min(width,height)}px`;
    console.log(ele.style.fontSize);
    draw();
}


///////////////////////////CROP
// let cropbtn = document.querySelector(".crop-button");



/////////////////////////DRAW
// const canvas = document.querySelector('#draw');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth / 2;
// canvas.height = window.innerHeight;
canvas.width = 1376;
canvas.height = 821.6;
// ctx.strokeStyle = '#002fa7';
// ctx.lineJoin = 'round';
// ctx.lineCap = 'round';

// ctx.globalCompositeOperation = 'multiply';
// let hue = 0;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
// let direction = true;

function draw(e) {
  if (!isDrawing) return; //Stops the fn from running when not moused down
//   ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.strokeStyle="black";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //This is Array Destructuring—see the section below
//   hue++;
//   if (hue >= 360) { hue = 0; }
//   if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
//     direction = !direction;
//   }
//   if (direction) {
//     ctx.lineWidth--;
//   }
//   else {
//     ctx.lineWidth++;
//   }
}

function erase(e) {
    if (!isDrawing) return; //Stops the fn from running when not moused down
  //   ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.strokeStyle="white";
    ctx.lineWidth = 20;
    ctx.beginPath();
    // ctx.strokeStyle = '#ffffff';
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; //This is Array Destructuring—see the section below
  //   hue++;
  //   if (hue >= 360) { hue = 0; }
  //   if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  //     direction = !direction;
  //   }
  //   if (direction) {
  //     ctx.lineWidth--;
  //   }
  //   else {
  //     ctx.lineWidth++;
  //   }
  }
 
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; //This is Array Destructuring—see the section below
});
// canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mousout', () => isDrawing = false);

let brushbtn = document.querySelector(".brush-button");

brushbtn.addEventListener("click",function(e){
    console.log(e.currentTarget.classList);
    if(erasebtn.classList.length==3){
        erasebtn.click();
    }    
    if(e.currentTarget.classList.length == 2){
        
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    }else{
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', () => isDrawing = false);
        canvas.removeEventListener('mouseout', () => isDrawing = false);
    }
    e.currentTarget.classList.toggle("selected");
    canvas.classList.toggle("drawing")
})


//////////////////////ERASE

let erasebtn = document.querySelector(".eraser-button");

erasebtn.addEventListener("click",function(e){
    console.log(e.currentTarget.classList);
    // let arr = brushbtn.classList;
    // console.log(arr);
    if(brushbtn.classList.length==3){
        brushbtn.click();
    }

    if(e.currentTarget.classList.length == 2){
        canvas.addEventListener('mousemove', erase);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mousout', () => isDrawing = false);
    }else{
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', () => isDrawing = false);
        canvas.removeEventListener('mousout', () => isDrawing = false);
    }
    e.currentTarget.classList.toggle("selected");
    canvas.classList.toggle("erasing");
});


////////////////////Delete

let delbtn = document.querySelector(".delete-button");

delbtn.addEventListener("click",function(e){
    let imgs = document.querySelectorAll(".new-element.selected");
    let texts = document.querySelectorAll(".new-text-box.selected");
    let emojis = document.querySelectorAll(".new-emoji-box.selected");
    
    for(let j=0;j<imgs.length;j++){
        imgs[j].remove();
    }
    for(let j=0;j<texts.length;j++){
        texts[j].remove();
    }
    for(let j=0;j<emojis.length;j++){
        emojis[j].remove();
    }
    delbtn.classList.add("selected");
    setTimeout(()=>{
        delbtn.classList.remove("selected");
    },350);
})

/////////////////////////////////////////SAVE
let savebtn = document.querySelector(".save-button");

savebtn.addEventListener("click",function(e){
    html2canvas(center).then(function(c) {
        // console.log(c.toDataURL());
        addMedia(c.toDataURL());
        // let a = document.createElement("a");
        // a.download = "image.jpg";
        //reason for using canvas
        //jo bhi canvas me yeh vo data url me convert ho jaega
        //ab href we can download easily 
        // a.href = c.toDataURL();

        // addMedia("img",c.toDataURL());
        // a.click();
        // a.remove();
        // document.body.appendChild(c);
    });
    savebtn.classList.add("selected");
    setTimeout(()=>{
        savebtn.classList.remove("selected");
    },350);
});


//////////////////////Gallery BTN

let galleryBtn = document.querySelector(".gallery-button")

galleryBtn.addEventListener("click",function(){
    location.assign("gallery.html");
    galleryBtn.classList.add("selected");
    setTimeout(()=>{
        galleryBtn.classList.remove("selected");
    },350);
})



////////////////////////////Download btn

let downloadBtn = document.querySelector(".download-button");

downloadBtn.addEventListener("click",function(e){
    html2canvas(center).then(function(c) {
        // // console.log(c.toDataURL());
        // addMedia(c.toDataURL());
        let a = document.createElement("a");
        a.download = "image.jpg";
        // //reason for using canvas
        // //jo bhi canvas me yeh vo data url me convert ho jaega
        // //ab href we can download easily 
        a.href = c.toDataURL();

        // // addMedia("img",c.toDataURL());
        a.click();
        a.remove();
        // // document.body.appendChild(c);
    });
    downloadBtn.classList.add("selected");
    setTimeout(()=>{
        downloadBtn.classList.remove("selected");
    },350);
})


// let temp = document.querySelector(".url-modal");
// temp.addEventListener("onblur",function(e){
//     temp.remove();
// })