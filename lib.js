var visitor = null


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

function InHTML(id,text){//set the inner text of this html element by id
    console.log("Setting Inner Text")
    document.getElementById(id).innerHTML  = text;
}

function SE(id){//Display:block element by id
    document.getElementById(id).style.display = "block";
}

function HE(id){//Display:none element by id
    document.getElementById(id).style.display = "none";
}


function setPreviousPosition(){
		previous_posX = window.pageXOffset;
		previous_posY = window.pageYOffset;
}

//set window screen to the top
function slideToTop(){
 window.scrollTo(1,1); 
}

function slideToPos(x,y){
 window.scrollTo(x,y); 
}


function openSidebar(){
 //hideElem('nav-bar');
 //getElem('sidebar-hoist-area').innerHTML = nav_str;
 getElem('sidebar-hoist-area').style.display = 'block'; 
 //INIT_linkRouting()
}

function closeSidebar(){
 getElem('sidebar-hoist-area').style.display = 'none'; 
 //getElem('sidebar-hoist-area').innerHTML = ''
 //showElem('nav-bar');  
}

function popupCookiesPrompt(){
    SE("cookie-prompt-bar")
}

function cookiePromptResponse(res){
    HE("cookie-prompt-bar")
    
    if(res == "accept"){
        alert("USER HAS ACCEPTED TO HAVE COOKIE DATA STORED!")
    }else{
        alert("USER HAS REJECTED TO HAVE COOKIE DATA STORED!")
    }
}

//========= Manipulating Elements ClassList Items ===================

function addElementClassItem(id,item){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    classList.add(item);
}

function AdECI(id,item){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    classList.add(item);
}

function replaceElementClassItem(id,item,nwitem){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    if(classList.contains(item)){
      classList.replace(item,nwitem);
    }else{
        classList.add(nwitem)
    }
}

function RpECI(id,item,nwitem){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    if(classList.contains(item)){
      classList.replace(item,nwitem);
    }else{
        classList.add(nwitem)
    }
}

function removeElementClassItem(id,item){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    classList.remove(item);
}

function RmECI(id,item){
    var elem = document.getElementById(id);
    var classList = elem.classList;
    
    classList.remove(item);
}



/*
 *  Owned By Fatherly 'Sam' P. Titus • 2022© 
 */