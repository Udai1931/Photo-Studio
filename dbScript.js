let dbAccess;
let container = document.querySelector(".container");
let request = indexedDB.open("Studio",1);
let backBtn = document.querySelector("#back");

if(backBtn!=null){
    backBtn.addEventListener("click",function(e){
        location.assign("index.html");
    });
}


request.addEventListener("success",function(){
    //when db opening is successful give acces to a global variable
    dbAccess = request.result;
});

request.addEventListener("upgradeneeded",function(){
    let db = request.result;
    //new object store, will automatically be called for 1st time while opening db
    db.createObjectStore("gallery",{keyPath:"mId"});
});

request.addEventListener("error",function(){
    alert("Some error occured");
});

function addMedia(media){
    //assuming it runs after dbAccess
    //opens a transaction => some work in DB
    let tx = dbAccess.transaction("gallery","readwrite");
    //Taking specific data store
    let galleryObjectStore = tx.objectStore("gallery");
    //Nature of object in a object store
    let data = {
        mId : Date.now(),
        media,
    };
    //add object to store
    galleryObjectStore.add(data);
}

function viewMedia() {
    console.log("hi");
    let tx = dbAccess.transaction("gallery","readonly");
    let galleryObjectStore = tx.objectStore("gallery");
    //req will get the cursor and will call its success event
    let req = galleryObjectStore.openCursor();
    req.addEventListener("success",function(){
        let cursor = req.result;
        //for all items
        if(cursor){
            //Making Card for each item
            console.log("item");
            let div = document.createElement("div");
            div.classList.add("media-card");

            div.innerHTML = `<div class="media-container">
                            </div>
                            <div class="action-container">
                                <button class="media-download">Download</button>
                                <button class="media-delete" data-id="${cursor.value.mId}">Delete</button>
                            </div>`;

            let downloadBtn = div.querySelector(".media-download");
            let deleteBtn = div.querySelector(".media-delete");
            
            deleteBtn.addEventListener("click",function(e){
                let mId = e.currentTarget.getAttribute("data-id");
                e.currentTarget.parentElement.parentElement.remove();
                deleteMediaFromDB(mId);
            });

            let img = document.createElement("img");
            img.classList.add("media-gallery");
            img.src = cursor.value.media;
            let mediaContainer = div.querySelector(".media-container");
            mediaContainer.appendChild(img);

            downloadBtn.addEventListener("click",function(e){
                let a = document.createElement("a");
                a.download = "image.jpg";
                a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                a.click();
                a.remove();
            });
            container.appendChild(div);
            cursor.continue();
        }
    });
}

function deleteMediaFromDB(mId){
    let tx = dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    galleryObjectStore.delete(Number(mId));
}