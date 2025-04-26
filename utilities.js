
var previous_posX = 0, previous_posY = 0;
var previous_page_view = "";//image, post, main
var page_html = "";

var view_stack = ["main-body"];

function savePageHTML(){
		 page_html = document.getElementsByTagName("html")[0].innerHTML;
		 alert("SAVING PAGE HTML!!!")
		 return page_html;
}

function getElem(id){
  return document.getElementById(id);
}

function getElems(cls){
  return document.getElementsByClassName(cls); 
}

function getElemsAll(query){
  return document.querySelectorAll(query); 
}

function getQuery(query){
    return document.querySelector(query);
}

function getQueryAll(query){
    return document.querySelectorAll(query);
}

function getQueryAllFirst(query){
    return document.querySelectorAll(query)[0];
}

function getInputsByName(name){
    return document.querySelectorAll('input[name="${name}"]'); 
}

function getInputsByAttribute(attr,name){
    return document.querySelectorAll('input[${name}="${name}"]'); 
}

function getByAttributes(attr,val){
    return document.querySelectorAll('[${attr}="${val}"]')
}

function getNames(name){
    return document.getElementsByTagName(name);
}


function removeElem(elem){
    elem.remove();
}


function showElem(id){
  document.getElementById(id).style.display = 'block'; 
}

function showElems(){
  for(var i = 0; i < arguments.length; i++){
   document.getElementById(arguments[i]).style.display = 'block'; 
  }    
}
    
function getDataSection(type){
    return document.querySelector('[data-section-type="${type}"]');
}

function hideElem(id){
  document.getElementById(id).style.display = 'none'; 
}

function hideElems(){
  for(var i = 0; i < arguments.length; i++){
  		console.log('Data: ${arguments[i]}')
   document.getElementById(arguments[i]).style.display = 'none'; 
  }    
}
   
function openSidebar(str){
 hideElem('nav-bar');
 getElem('sidebar-hoist-area').innerHTML = str;
 getElem('sidebar-hoist-area').style.display = 'block'; 
// INIT_linkRouting()
}

function closeSidebar(){
 getElem('sidebar-hoist-area').style.display = 'none'; 
 getElem('sidebar-hoist-area').innerHTML = ''
 showElem('nav-bar');  
}

function openViewAlt(view){
		 switch(view){
		 		case "post-view-page" : 
		 		 view_stack.push(view);
		 		 hideElems("main-body","image-view-page");
		 		 showElem(view);
		 		break;
		 		case "image-view-page" : 
		 		 view_stack.push(view);
		 		 hideElems("main-body","post-view-page");
		 		 showElem(view);
		 		break;
		 }
		if(arguments.length > 1){
				 var data = arguments[1];
		 if(data !== null || data !== ""){
		 		 getElem(view).innerHTML = data;
		 		 
		 		 getElem('btn-exit-post-view').addEventListener('click',function(){
         closeView(); 
		 		 });
		 }
		}
}

function closeView(){
		 //close last view stack element
		 //open next element
		
		 var l_elem = view_stack.pop();
		 var n_elem = view_stack[view_stack.length-1];
		 console.log('Last Elem: ${l_elem}\nNext Elem: ${n_elem}')
		 hideElem(l_elem);
		 showElem(n_elem);
}

		
function openView(view){
		
		switch(view){
				 case "main" :
				    previous_page_view = (getElem("post-view-page").style.display == "block")? "post" : "image";
				    
				    hideElems("post-view-page","image-view-page");
				    showElem("main-body");
				 break;
				 case "post" :
				    previous_page_view = (getElem("main-body").style.display == "block")? "main" : "image";
				
				    hideElems("main-body","image-view-page");
				    showElem("post-view-page");
				 break;
				 case "image" :
				    previous_page_view = (getElem("main-body").style.display == "block")? "main" : "post";

				    hideElems("main-body","post-view-page");
				    showElem("image-view-page");
				 break;
		}
		  console.log('Previous Page View: ${previous_page_view}\n')
}

function INIT_imageViewEvent(){
		 var btns = getElems("image-link");
    //alert('Page Links: ${btns.length}')
    Array.from(btns).forEach(function(btn){
       btn.addEventListener("click",function(){
                  				
       		  setPreviousPosition(); 
           setTimeout(function(){
           		    src = btn.getAttribute("src");
           		    caption = btn.getAttribute("data-image-caption")
           		   closeSidebar();
           		   loadImageViewer(src,caption);
           },300)
       }) 
    }); 
}

function loadImageViewer(image,caption){
		  
		  str = ' <span style='' id='btn-exit-image-view' class='fas fa-backspace w3-large w3-left w3-btn'></span><br>
		 <div style='margin:0;margin-top:10px;padding:0;height:100vh;width:100vw;' class='w3-container w3-white'>
		       <img class='' style="" src="${image}" height="100%" width="100%">
		       <div class="w3-black w3-padding w3-left">
		       <span class="w3-tiny w3-text-light-grey bold">${caption}</span>
		       </div>
				</div><br>		';
		
		     getElem('image-view-page').innerHTML = str;
      openView("image");
      slideToTop();
      getElem('btn-exit-image-view').addEventListener('click',function(){
         openView(previous_page_view);
      		  slideToPrevious();
      });
		
}

function dataBadge(){
  //args[0] => badge icon
  //args[1] => badge value
  //args[2] => value color
 var badge = 'comment'; var value = 0; var color = 'red'; var len = arguments.length; 
  
  if(len == 2){badge = arguments[0];value = arguments[1];
  }else if(len == 1){value = arguments[0];    
  }else if(len == 3){ badge = arguments[0]; value = arguments[1];  color = arguments[2];  
  }
  
  var str = '
  <span class="fa-stack ">
    <i class="fas fa-${badge} fa-stack-2x w3-text-black"></i>
    <span class="w3-tiny fa-stack-1x w3-text-${color} bold">${value}</span>
  </span>';
  return str;
}


function getIconCircle(icon,color){
  var str = '
  <span class="fa-stack ">
    <i class="fas fa-circle fa-stack-2x w3-text-white"></i>
    <i class="fas fa-${icon} fa-stack-1x w3-text-${color}"></i>
  </span>
  '
return str;  
}


function getHalfStar(){
  str = '
  <span class="fa-stack ">
    <i class="fas fa-star fa-stack-2x w3-text-white"></i>
    <i class="fas fa-star-half fa-stack-2x w3-text-amber"></i>
  </span>
  '
return str;  
}

function getFullStar(){
  str = '
  <span class="fa-stack ">
    <i class="fas fa-star fa-stack-2x w3-text-amber"></i>
    <i class="fas fa-star-half fa-stack-2x w3-text-amber"></i>
  </span>
  '
return str;  
}

function getStar(color){
  str = '
  <span class="fa-stack ">
    <i class="fas fa-star fa-stack-2x w3-text-${color}"></i>
    <i class="fas fa-star-half fa-stack-2x w3-text-${color}"></i>
  </span>
  '
return str;  
}


function capFirsts(str){
    var wrd_arr = [], wrd_len = 0, str_arr = [], nw_wrd, nw_str = '', fltr = '';
    
    if(str.indexOf(" ") > -1){
       str_arr = str.split(" ");
        wrd_len = str_arr.length;
       
       str_arr.forEach(function(wrd,i){
           wrd_arr = wrd.split("");
           
          fltr = wrd_arr[0].toUpperCase();           
          wrd_arr[0] = fltr;
          nw_wrd = wrd_arr.join("")+((i < wrd_len)? " ":"");
          nw_str += nw_wrd; 
       });
    }else if(str.indexOf(" ") == -1){
        wrd_arr = wrd.split("");
        
        fltr = wrd_arr[0].toUpperCase();
        wrd_arr[0] = fltr;
        nw_wrd = wrd_arr.join("");
        nw_str = nw_wrd;
    }
    
    return nw_str;
}

////////////////////////////////////////////////////////////////
function numberFormat(num_str){
  
  var num_arr = ""+num_str+"".split("");
		 var len = num_arr.length, index = -1,index2=-1;
  var str = "";
  
  switch(len){
    case 4: index = 0; break;
    case 5: index = 1; break;
    case 6: index = 2; break;
  		 case 7: index = 0; index2 = 3; break;
  		 case 8: index = 1; index2 = 4; break;
  		 case 9: index = 2; index2 = 5; break;
  }
		if(len <= 6){
  for(var i = 0; i < len; i++){
      str += (i == index)? '${num_arr[i]},' : num_arr[i];
  }
		}else if(len > 6){
				for(var i = 0; i < len; i++){
      str += ((i == index) || (i == index2))? '${num_arr[i]},' : num_arr[i];
  }
		}
		return str;
}


function numberFormatAlt(num_str){
  
  var num_arr = ""+num_str+"".split("");
		 var len = num_arr.length,
		     index = -1,
		     index2=-1;
		
  var str = "";
  
		if(len >= 4){
  switch(len){
    case 4: index1 = 0; index2 = 1; break;
    case 5: index1 = 1; index2 = 2; break;
    case 6: index1 = 2; index2 = 3; break;
  		 case 7: index1 = 0; index2 = 1; break;
  		 case 8: index1 = 1; index2 = 2; break;
    case 9: index1 = 2; index2 = 3; break;

  }
		
		for(var i = 0; i <= index2; i++){
				  //str += (i <= index1)? num_arr[i]:'${num_arr[i]}.'
				  str += num_arr[i];
				  		 if((i == index1) && (num_arr[index2] !== "0")){
				  		 		 str += ".";
				  		 }if((i == index2) && (num_arr[index2] == "0")){
				  		 		  continue;
				  		 }
		}  return str+"k";
		}else{
				return num_str;
		}
		
		
}



function formatDate(date){
 mnths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
 dsplit = date.split("-");
 dday = dsplit[2];
 dmonth = parseInt(dsplit[1])-1;
 dyear = dsplit[0];
  
 return '${dday}/${mnths[dmonth]}/${dyear}'; //  [dd/mm/yyyy]
}

function compareDate(date){
  var m_compare = "", d_compare = "";
  var date_status = ""//recent,older,ongoing,upcoming
  
 var dsplit = date.split("/"),
 dday = parseInt(dsplit[0]),
 dmonth = getMonthIndex(dsplit[1]),
 dyear = parseInt(dsplit[2]);
  
 crrnt_date = getDateAlt();
 var dsplit2 = crrnt_date.split("/"),
 dday2 = parseInt(dsplit2[0]),
 dmonth2 = getMonthIndex(dsplit2[1]),
 dyear2 = parseInt(dsplit2[2]);
   
  //Month Day Compare
if(dmonth2 > dmonth){
  d_compare = m_compare = "Past";
  date_status = "old";
}else if(dmonth2 == dmonth){
  m_compare = "Present";
 if(dday2 == dday){
   d_compare = "Present";
   date_status = "ongoing";
 }else if(dday2 > dday){
   d_compare = "Past";
   if((dday >= (dday2-10))&&(dday <= dday2)){
      date_status = "recent";
   }
   if(dday < (dday2-10)){
      date_status = "old"; 
   }
 }else if(dday2 < dday){
   d_compare = "Future";  
   date_status = "upcoming";
 }
}else if(dmonth2 < dmonth){
  d_compare = m_compare = "Future";
  date_status = "upcoming"
}
  
  console.log('Comparing Months: (${dmonth} ~ ${dmonth2}) = ${m_compare}')
  console.log('Comparing Days: (${dday} ~ ${dday2}) = ${d_compare}')
  console.log('Date Status: ${date_status}');
  return date_status;
}

function getDate(){
    mnths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var d = new Date();
    var df = '${d.getDate()}/${mnths[d.getMonth()]}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}';//  [dd/mm/yyyy]
    return df;
}

function getTime(){
    var d = new Date();
    var df = '${d.getHours()}:${d.getMinutes()}';//  [dd/mm/yyyy]
    return df;
}

function getDateAlt(){
    mnths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var d = new Date();
    var df = '${d.getFullYear()}-0${d.getMonth()}-${d.getDate()}';//  [dd/mm/yyyy]
    return df;
}

function sortDateByRecent(dates,offset){
    //takes in an array of dates
    //date format: "dd/mm/yyyy"
    
    //match date day to current date day
    //if day is within range( >= ) of (crrnt_date - offset)
      //add date to recents
    //else if day is outside of the range( < ) of (crrnt_date - offset)
      //add to older
    
    var crrnt_date = getDate();
    var crrnt_day = parseInt(crrnt_date.split("/")[0]);    
    
    var sorted = {"recents":[],"older":[]}
    dates.forEach(function(date){
        strarr = date.split("/");
        day = parseInt(strarr[0]);
        
        if(day >= (crrnt_day-offset)){
            sorted.recents.push(date);
        }else if(day < (day-offset)){
            sorted.older.push(date);
        }
        
    })
}


function generateID(){
    var id = "id-#";
    for(var i = 0; i < 6;i++){
        id += Math.floor(Math.random()*9);
    } return id;
}

function generateSpecID(prefix='ID-',len){
    var id = prefix;
    for(var i = 0; i < len;i++){
        id += Math.floor(Math.random()*9);
    } return id;
}

function createTag(type){
    obj = document.createElement(type);
    //console.log("Created Tage Object:=> "+type);
    return obj
}

function getElemById(id){
    return document.getElementById(id);
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

function slideToPrevious(){
		window.scrollTo(previous_posX,previous_posY);
}

function showSection(section){
    var sec_index = -1;
    switch(section){
        case "public" :
         getElems('section')[1].style.display = 'none';
         getElems('section')[2].style.display = 'block';
        break;
        case "form" :
         sec_index = 2;
        getElems('section')[1].style.display = 'none';
        getElems('section')[3].style.display = 'block';
        break;
        case "access" :
        console.log('Switching To Access Section')
         sec_index = 1;
        getElems('section')[0].style.display = 'none';
        getElems('section')[1].style.display = 'block';
        break;
        case "splash" :
         sec_index = 0;
        break;
    }
}
   
function getUtilities(){
    return {
        'getElem' : getElem,
        'getElems' : getElems,
        'hideElem' : hideElem,
        'showElem' : showElem,
        'showElems' : showElems,
        'hideElems' : hideElems,
        'getDataSection' : getDataSection,
        'getDate' : getDate,
        'createTag' : createTag,
        'getElemById' : getElemById,
        'slideToTop' : slideToTop,
        'createTag': createTag        
    }
}

