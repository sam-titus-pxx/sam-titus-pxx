
var __DASH = {
    administrative: {
    },
    users: [], //[{}]
    activities: {
     user_activities: [], //[{}] 
     admin_activities: [], //[{}]
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  $(document).ready(()=>{
  		
  		
     
    INIT_dashboardNavButtons();
    INIT_dashboardActivityData();
   /* 
    INIT_columnChart();
    INIT_columnChart2();
    INIT_columnChart3();
    INIT_pieChart();*/
    
    generateActivity();
    
    INIT_analyticsCarousel();
    
  		INIT_dashLinkEvent();
  		generateAdverts();
    
    $('#btn-view-activities').click(()=>{
      displayActivities('full');
    });
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
// On swipe event
$('.main-scroll-slider').on('swipe', function(event, slick, direction){
  //console.log(direction);
  crrnt_index = slider.slick('slickCurrentSlide');
 // console.log(crrnt_index);
  setActiveLinkByIndex(crrnt_index);
		 slideToTop();
});  

slider = $('.main-scroll-slider').slick({
  speed: 300,
  arrows: false,
  dots: false,
  swipe: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 4000,
  responsive: [
    {breakpoint: 1024, 
      settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}
    },
    {breakpoint: 600,
      settings: {slidesToShow: 2,slidesToScroll: 2}
    },
    {breakpoint: 480,
      settings: {slidesToShow: 1,slidesToScroll: 1}
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
 
      
      
 $('.communities-slider').slick({
  speed: 300,
  arrows: false,
  dots: false,
  swipe: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {breakpoint: 1024, settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},
    {breakpoint: 600,settings: {slidesToShow: 2,slidesToScroll: 2}},
    {breakpoint: 480,settings: {slidesToShow: 1,slidesToScroll: 1}}
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
      
  $('.users-slider').slick({
  speed: 300,
  arrows: false,
  dots: false,
  swipe: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {breakpoint: 1024, settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},
    {breakpoint: 600,settings: {slidesToShow: 2,slidesToScroll: 2}},
    {breakpoint: 480,settings: {slidesToShow: 1,slidesToScroll: 1}}
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
      
      
   $('#dash-section2 #sub-section3 .events-slider').slick({
  speed: 300,
  arrows: false,
  dots: false,
  swipe: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {breakpoint: 1024, settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},
    {breakpoint: 600,settings: {slidesToShow: 2,slidesToScroll: 2}},
    {breakpoint: 480,settings: {slidesToShow: 1,slidesToScroll: 1}}
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
      
  
    INIT_sectionsLinkMapperEvent();
    //INIT_imageLinkMapper();
  
    $('#btn-enter').click(()=>{
      formatDisplayData();
    });
    
    $('#btn-open-sidebar').click(()=>{
      openSidebar();
    });
    
 });

function INIT_dashLinkEvent(){
		var btn_links = getElems("btn-dash-link");
        
    Array.from(btn_links).forEach((btn)=>{
      btn.addEventListener("click",()=>{
       type = btn.getAttribute("data-link-type");
       //pid = btn.getAttribute("data-link-id");
      		//post_object = getPostData(pid);
        alert(type);
       loadDashPageView(type);
      });
    });
}

function loadDashPageView(type){
		 // advert | posts | communities | 
		
		var str = "" , post_meta_data = "";
		
		switch (type){
				case "advert" :
				post_meta_data = `<div style='padding:0;padding-top:5px;padding-bottom:5px;height:fit-content;margin-bottom:30px;' class='w3-container w3-round-xlarge w3-white'>
      <div style="margin:0;padding:0;padding-left:5px;padding-bottom:8px;" class="w3-bottombar">
        <h1 style="margin:0;" class="w3-small oregonB ">ADVERTS</h1>
      </div>
     </div>`;
				break;
				case "posts" :
    post_meta_data = `<div style='padding:0;padding-top:5px;padding-bottom:5px;height:fit-content;margin-bottom:30px;' class='w3-container w3-round-xlarge w3-white'>
      <div style="margin:0;padding:0;padding-left:5px;padding-bottom:8px;" class="w3-bottombar">
        <h1 style="margin:0;" class="w3-small oregonB ">POSTS</h1>
      </div>
     </div>`;
				break;
				case "users" :
				 post_meta_data = `<div style='padding:0;padding-top:5px;padding-bottom:5px;height:fit-content;margin-bottom:30px;' class='w3-container w3-round-xlarge w3-white'>
      <div style="margin:0;padding:0;padding-left:5px;padding-bottom:8px;" class="w3-bottombar">
        <h1 style="margin:0;" class="w3-small oregonB ">USERS</h1>
      </div>
     </div>`;
				break;
		}  base_sound = ``;
		
		str = ` <span style='' id='btn-exit-post-view' class='fas fa-arrow-left w3-large w3-left w3-btn'></span><br>
		      <div style='margin:0;margin-top:10px;padding:0;height:fit-content;' class='w3-container w3-white'>
      
           <div style="margin:0;margin-bottom:5px;padding:0;" class='w3-container w3-topbar'>
            <h1 class='w3-small josefin bold w3-text-grey w3-center w3-wide underline'>${type}</h1>
            <div class='w3-container' id='post-page-meta-data'>${post_meta_data}</div>
           </div>
        </div>`;
      
      
      openViewAlt("post-view-page",str);
		
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function INIT_sectionsLinkMapperEvent(){
  console.log('Init Link Mapper Event')
  Array.from(getElems('btn-page-link')).forEach((btn)=>{
    btn.addEventListener('click',function(){
      index = this.getAttribute('data-link-index');
      slider.slick('slickGoTo',index);
      setActiveLink(this);
    		 this.blur;
    		 slideToTop();
    });
  });
}

function setActiveLink(link){
 //set the link button that is currently active 
  //and the others that are not 
  
  //get current active
   actv = getByAttributes('data-link-stat','true')[0];
   actv.setAttribute('data-link-stat','false');
   actv.classList.replace('w3-text-purple','w3-text-black');
  
   //configure new active link
   link.setAttribute('data-link-stat','true');
   link.classList.replace('w3-text-black','w3-text-purple');
}


function setActiveLinkByIndex(index){
 //set the link button that is currently active 
  //and the others that are not 
  
  //get current active
   actv = getByAttributes('data-link-stat','true')[0];
   actv.setAttribute('data-link-stat','false');
   actv.classList.replace('w3-text-purple','w3-text-black');
  
   //configure new active link
   link = getByAttributes('data-link-index',index)[0];
   link.setAttribute('data-link-stat','true');
   link.classList.replace('w3-text-black','w3-text-purple');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateAdverts(){
		console.log(`Generating Adverts....`)
		 var type1 = Math.floor(Math.random()*900)+1,
		     type2 = Math.floor(Math.random()*900)+1;
		
		 var total_ads = type1 + type2,
		     running = Math.floor(total_ads*0.6),
		     pending = Math.floor((total_ads-running)*0.5),
		     concluded = total_ads-pending;
		
		 var ad_interacts = Math.floor(Math.random()*10000);
		
		 var total_value = ((type1*30000)+(type2*60000));
		 
		 console.log("Total Paid Ads: "+total_ads);
		 getElem("dashboard-data-paid-ads").innerText = numberFormat(total_ads);
  getElem("dashboard-data-running-ads").innerText = numberFormat(running);
		 getElem("dashboard-data-pending-ads").innerText = numberFormat(pending);
  getElem("dashboard-data-concluded-ads").innerText = numberFormat(concluded);

		 getElem("dashboard-data-ads-interactions").innerText = numberFormatAlt(ad_interacts);
  getElem("dashboard-data-ads-value").innerText = numberFormatAlt(total_value);
  getElem("dashboard-data-total-monetary-value").innerText = `₦ ${numberFormatAlt(total_value)}`;

		
}


function generateActivity(){
  
 const users = ['johnny32','sarahLee88','missYouMore_21','petersonAndres','uduakBaymora_84','DoomSlayer_physco','jennySylvy721','miraImira'];
 const admins = ['An Admin','Admin Mother','AdminEx','Holy_Mod'];
 const user_activities = ['uploaded a new post','reacted to a post by another user','logged in to their account','logged out of their account','reacted to an event','voted in a ballot event','hit a new milestone','got their green badge','got their blue badge','got their golden comrade badge'];
 const admin_activities = ['hosted a new event','gained access to admin panel','made an announcement','gained access to finances panel','tagged a post for review by admins','took down a post','removed a user','blocked a user account','exited admin panel','exited finances panel'];
  
  var activity_str = '<ul class="w3-ul w3-tiny w3-text-black">';
  
 for(let i = 0; i < 10; i++){
   activity_type = Math.floor(Math.random()*2);
   
   if(activity_type >= 1){
     //user activity
     usrlen = users.length;
     usract = user_activities.length;
     
     username = users[Math.floor(Math.random()*usrlen)];
     activity = user_activities[Math.floor(Math.random()*usract)];
     acty = `<b><q>${username}</q></b> ${activity}`;
     
     acty_obj = {activity: acty,date: getDate()}
     __DASH.activities.user_activities.push(acty_obj);
   }else{
     //admin activity
     admlen = admins.length;
     admact = admin_activities.length;
     
     admin_name = admins[Math.floor(Math.random()*admlen)];
     activity = admin_activities[Math.floor(Math.random()*admact)];
     acty = `<b><q>${admin_name}</q></b> ${activity}`
     
     acty_obj = {activity: acty,date: getDate()}
     __DASH.activities.admin_activities.push(acty_obj);
   }
 }  
   
   //console.log(JSON.stringify(__DASH))
    displayActivities('prev');
   
  
  /*
 const cstm_activities = {
   users_activities: [{
   user_id:'',
   user_username:'',
   activity:'',
   fig:0,
   date:''
 }],
 admin_activies: [{
   admin_id:'',
   admin_name:'',
   activity:''
 }],
 }*/
  
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function displayActivities(opt){
 u_activities = __DASH.activities.user_activities;
 a_activities = __DASH.activities.admin_activities;
  
 switch(opt){
  case 'prev' : show = 3; break;
  case 'full' : show = u_activities.length; break;
 }   
  
  var acty_str = '<ul class="w3-ul w3-tiny">'
 
  for(let i = 0; i < show; i++){
    uacty = u_activities[i];
    aacty = a_activities[i];
    
   if(typeof(uacty) !== 'undefined'){
    acty_str += `<li class="w3-text-green">${uacty.activity}</li>`;
   }if(typeof(aacty) !== 'undefined'){
    acty_str += `<li class="w3-text-red">${aacty.activity}</li>`;
   }
  }
    acty_str += '</ul>';
    
    getElem('admin-dashboard-recent-activity').innerHTML = acty_str;

}

function INIT_dashboardNavButtons(){
  nav_btns = getElems('dashboard-nav-btn');
  Array.from(nav_btns).forEach((btn)=>{
    btn.addEventListener('click',function(){
     id = this.getAttribute('id');     
     //alert(id);      
     this.classList.replace('w3-text-white','w3-text-amber');
     deactivate(id);
    });
  });
  
}

function deactivate(id){
  nav_btns = getElems('dashboard-nav-btn');
  Array.from(nav_btns).forEach((btn)=>{
     b_id = btn.getAttribute('id');  
     stat = btn.getAttribute('data-status');    
     //alert(id);      
     if(b_id !== id){
       btn.classList.replace('w3-text-amber','w3-text-white');
     }

  });
}
  
  function INIT_dashboardActivityData(){
    dtas = getElems('dashboard-activity-data-display');
    Array.from(dtas).forEach((dta)=>{
      seed = Math.floor(Math.random()*15)+5; 
      dta.innerHTML = generateData(seed);
    });
  }
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function INIT_analyticsCarousel(){
 $('.slick-slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
}


function INIT_columnChart() {
  
  //console.log('Initializing Column Chart');

var chart = new CanvasJS.Chart("chart1", {
	animationEnabled: true,
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Weekly Activity Traffic"
	},
	axisY: {
		title: "Activity"
	},
axisX: {
 title: 'Days of the Week' 
},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "Platform Traffic In 6 Days",
		dataPoints: [      
			{ y: generateData(10), label: "Mon" },
			{ y: generateData(20),  label: "Tue" },
			{ y: generateData(15),  label: "Wed" },
			{ y: generateData(10),  label: "Thur" },
			{ y: generateData(15),  label: "Fri" },
			{ y: generateData(10), label: "Sat" },
			{ y: generateData(18),  label: "Sun" }
		]
	}]
});
chart.render();

}

function INIT_columnChart2() {
  
  //console.log('Initializing Column Chart');

var chart = new CanvasJS.Chart("chart2", {
	animationEnabled: true,
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Weekly Posts Creation Stats"
	},
	axisY: {
		title: "#no. Posts"
	},
axisX: {
 title: 'Days of the Week' 
},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "Content Posted on Platform Traffic weekly",
		dataPoints: [      
			{ y: generateData(5), label: "Mon" },
			{ y: generateData(3),  label: "Tue" },
			{ y: generateData(2),  label: "Wed" },
			{ y: generateData(4),  label: "Thur" },
			{ y: generateData(5),  label: "Fri" },
			{ y: generateData(3), label: "Sat" },
			{ y: generateData(2),  label: "Sun" }
		]
	}]
});
chart.render();
}


function INIT_columnChart3() {
  
  //console.log('Initializing Column Chart');

var chart = new CanvasJS.Chart("chart3", {
	animationEnabled: true,
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "New Platform Membership"
	},
	axisY: {
		title: "New Users"
	},
axisX: {
 title: 'Days of the Week' 
},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "Platform Traffic In 6 Days",
		dataPoints: [      
			{ y: generateData(50), label: "Mon" },
			{ y: generateData(32),  label: "Tue" },
			{ y: generateData(46),  label: "Wed" },
			{ y: generateData(33),  label: "Thur" },
			{ y: generateData(50),  label: "Fri" },
			{ y: generateData(72), label: "Sat" },
			{ y: generateData(19),  label: "Sun" }
		]
	}]
});
chart.render();
}


function INIT_pieChart() {

var chart = new CanvasJS.Chart("chart4", {
	animationEnabled: true,
theme:'dark1',
	title: {
		text: "Users Popularity Rating"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.0'%'",
		indexLabel: "{label} {y}",
		dataPoints: [
			{y: 5, label: "johnnyCarlo32"},
			{y: 20, label: "umanaClements"},
			{y: 35, label: "barryUmoh99"},
			{y: 40, label: "patriciaSia"},
		]
	}]
});
chart.render();

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function generateData(avg){
  val = 0;
  for(i = 0; i < avg; i++){
     val += i*avg*Math.floor(Math.random()*5); 
  }
  return val;
}

function getElems(cls){
  return document.getElementsByClassName(cls);  
}

function getElem(id){
  return document.getElementById(id);  
}

//////////////////////////////////////////////////////////////////////
//Functions to handle copying of text to clipboard(tested and working)
function handleCopy(id) {
  const area = getElem(id)
  area.select();
  document.execCommand('copy')
}

function triggerCopy(id) {
  const element = getElem(id);
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
}


function getDate(){
    mnths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var d = new Date();
    var df = `${d.getDate()}/${mnths[d.getMonth()]}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;//  [dd/mm/yyyy]
    return df;
}

