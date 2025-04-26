
function LG(text){
    console.log(text);
}


function getElem(id){
    return document.getElementById(id);
}

function getElems(cls){
  return document.getElementsByClassName(cls); 
}

function GE(id){ //Get element by id
    return document.getElementById(id);
}

function GC(cn){ //Get elements list by class name
    return document.getElementsByClassName(cn);
}

function GQ(query){ //Get elements by query selector
    return document.querySelector(query);
}

function InText(id,text){//set the inner text of this html element by id
    console.log("Setting Inner Text")
    document.getElementById(id).innerText = text;
}


function SE(id){//Display:block element by id
    document.getElementById(id).style.display = "block";
}

function HE(id){//Display:none element by id
    document.getElementById(id).style.display = "none";
}

function OM(modal_id){//Open/show modal
    
}

