

$(document).ready(()=>{
				
				$("#btn-open-sidebar").click(()=>{
								openSidebar(sidenav_str);
						 INIT_BtnLinkRouting();
				});
				
		INIT_BtnLinkRouting();
});



var o_clr = 'primary-text'
function INIT_BtnLinkRouting(){
    var btns = ("post-link-btn");
    //alert(`Page Links: ${btns.length}`)
    Array.from(btns).forEach((btn)=>{
       btn.addEventListener("click",function(){
           //change text color
           //underline text
           btn.classList = removeClassItem(btn.classList,'w3-text');
           
           txt_color = "w3-text-amber";
           btn.classList.add(txt_color,"underline");
       				
           setTimeout(()=>{
               btn.classList.replace(txt_color,o_clr);
               type = btn.getAttribute("data-link-type");
           		   closeSidebar();
           		   loadViewer(type);
           },300)
       }) 
    });
    //console.log('SETUP PAGE LINK ROUTING!!')
}

function INIT_imageViewEvent(){
		 var btns = getElems("image-link");
    //alert(`Page Links: ${btns.length}`)
    Array.from(btns).forEach((btn)=>{
       btn.addEventListener("click",function(){
                  				
       		  setPreviousPosition(); 
           setTimeout(()=>{
           		    src = btn.getAttribute("src");
           		    caption = btn.getAttribute("data-image-caption")
           		   closeSidebar();
           		   loadImageViewer(src,caption);
           },300)
       }) 
    }); 
}

function removeClassItem(cList,cItem){
    var alt_list = [];
    //console.log(`C-List: ${cList}\n`)
    cList.forEach((item)=>{
       if(item.indexOf(cItem) == -1){
          alt_list.push(item);
       } else{
           o_clr = item;
       }
    }); //console.log(`New C-List: ${alt_list}`)
    return alt_list.join(' ');
}


function loadImageViewer(image,caption){
		  
		  str = ` <span style='' id='btn-exit-image-view' class='fas fa-backspace w3-large w3-left w3-btn'></span><br>
		 <div style='margin:0;margin-top:10px;padding:0;height:100vh;width:100vw;' class='w3-container w3-white'>
		       <img class='' style="" src="${image}" height="100%" width="100%">
		       <div class="w3-black w3-padding w3-left">
		       <span class="w3-tiny w3-text-light-grey bold">${caption}</span>
		       </div>
				</div><br>		`;
		
		     getElem('image-view-page').innerHTML = str;
      openView("image");
      slideToTop();
      getElem('btn-exit-image-view').addEventListener('click',()=>{
         openView("post");
      		  slideToPrevious();
      });
		
}

function loadViewer(type){
				
				var meta_data_str = "", meta_data_type = "", str = "";
				
				var image = "",
				    name = "",
		     title = "";
				    
				switch(type){
								case "vc" :  
						 name = "Prof. Nyahudoh U. Ndaeyo"
								title = "Vice Chancellor (Administration)";
								image = "assets/UCSARD/vc.jpg";
								meta_data_str = about_vc;
								break;
								case "dvc" :
						 name = "Prof. Aniekan Essien"
								title = "Deputy Vice Chancellor (Administration)";
								image = "assets/UCSARD/dvc.jpg";
								meta_data_str = about_dvc;
								break;
								case "amb" : 
						 name = "Ambassador Ernest Essien"
							title = "Supervisor, GST Skills Acquisition Center<br>CEO Magvoile Vocational Center";
								image = "assets/UCSARD/amb.jpg";
								meta_data_str = about_amb;	
								break;
						 case "photos" : 
								name = "Events And Pictures";
								image = "assets/photos/csard.jpg";
								meta_data_str = loadPhotos();
								break;
								case "about" : 
								name = "Center For Skills Acquisition And Rural Development";
								image = "assets/photos/csard.jpg";
								meta_data_str = about_csard;
								break;
					 	case "staff" :  
						 name = "Skill Acquisition Instructors"
								title = "Staff And Management of C.S.A.R.D";
								image = "assets/photos/ca3.jpg";
								meta_data_str = loadStaff();
								break;
						 case "contact" :  
						 name = "Contact Information"
								title = "Reaching Out To C.S.A.R.D";
								image = "assets/photos/ca3.jpg";
								meta_data_str = loadContact();
								break;
						 case "depts" :  
						 name = "Skills & Vocational Departments"
								title = "All The Available Vocation Training Departments In C.S.A.R.D";
								image = "assets/photos/ca3.jpg";
								meta_data_str = loadDepartments();
								break;
				}
       
    str = ` <span style='' id='btn-exit-post-view' class='fas fa-backspace w3-large w3-left w3-btn'></span><br>
		 <div style='margin:0;margin-top:10px;padding:0;height:fit-content;' class='w3-container w3-white'>
       <div style="width:100vw;padding:0;" class='w3-container w3-padding w3-black'>
        <img class='image-link' data-image-caption='${title}' style="border-radius:50%;" src="${image}" height="80px" width="80px">
        <span data-link-page="user-profile" data-link-type="user" data-link-href="" class=" w3-medium oregonB">${name} <span class="fas w3-text-blue fa-check-circle"></span></span><br>
		       <span class="w3-tiny w3-text-light-grey bold">${title}</span>
				     </div>
				
				     <div style="margin:0;margin-bottom:5px;padding:8px;" class='w3-container w3-topbar'>
				      <h1 class='w3-medium bold w3-text-grey '>${meta_data_str}</h1>
				     </div>
				</div><br><br>
		 <span style='' id='btn-exit-post-view2' class='fas fa-backspace w3-large w3-left w3-btn'></span><br>

		`;
      
      getElem('post-view-page').innerHTML = str;
      showElem('post-view-page');
      hideElem('main-body');
      slideToTop();
		     INIT_imageViewEvent();
      getElem('btn-exit-post-view').addEventListener('click',()=>{
         exitPostView(); 
      });
		     getElem('btn-exit-post-view2').addEventListener('click',()=>{
         exitPostView(); 
      });
}

function exitPostView(){
    hideElem('post-view-page');
    showElem('main-body');
		   slideToTop();
}


function loadPhotos(){
		var str = "<h1 class='w3-large w3-center underline josefin bold'>Photo Reel Of Events & Activities In U.C.S.A.R.D</h1>";
		 photos.forEach((obj)=>{
		 		descr = obj.description;
		 		img = obj.img;
		 		date = obj.date;
		 		
		 		str += `
		 		   <div style="height:fit-content;" class="w3-display-container w3-panel w3-section w3-round-xxlarge w3-card w3-white w3-padding">
        <span class="w3-xlarge w3-text-green fas fa-check-circle w3-right"></span>
        <h1 class="w3-xlarge underline bold jersey">UCSARD</h1>
        <div class="w3-bottombar">
         <img data-image-caption="${descr}" class="image-link" height="200px" width="100%" src="${img}">
        </div>
        <p class="w3-medium josefinB">
		 		      ${descr}
		 		     </p>
		 		     <span class="w3-tiny w3-right w3-padding bold">${date}</span>
      </div>
      <br>
		 		`;
		 		
		 });
		  return str;
}

function loadStaff(){
			var str = "<h1 class='w3-large w3-center underline josefin bold'>All Staff Of U.C.S.A.R.D</h1>";

		 staff_obj.forEach((obj)=>{
		 		name = obj.name;
		 		pos = obj.position;
		 		dp = obj.dp;
		 		
		 		str += `
		 		  	<div style="height:fit-content;" class="w3-display-container w3-panel w3-section w3-round-xxlarge w3-card w3-white w3-padding">
        <div class="w3-bottombar">
         <img data-image-caption="${name}" class="image-link" height="200px" width="100%" src="${dp}">
        </div>
        <p style="margin-bottom:0;"class="w3-large primary-text bold w3-center josefinB">
        			<span data-link-type="amb" class="post-link-btn">${name}</span>
       </p>
  							  	 <p style="margin:0;width:70%;margin-left:15%;" class="w3-topbar w3-small bold w3-center josefin">
         ${pos} 
        </p>
      </div>	 
      <br>
		 		`;
		 })
		 return str;
}

function loadContact(){
		str = `<h1 class="w3-large bold josefin underline">For Further Enquiries And Information<br>Reach Us On All Our Contact Platforms</h1>
		<ul class="w3-ul">
		 <li> Phone <br>
		 <span class="w3-small fas bold fa-phone">: 0801-111-1111</span>
		</li>
		  <li> Email <br>
		 <span class="w3-small fas bold fa-at">: UCSARD@gmail.com</span>
		</li>
		 <li> Facebook <br>
		 <span class="w3-small fab bold fa-facebook">: Center for Skills Acquisition/Magvoile </span>
		</li>
		 <li> LinkedIn <br>
		 <span class="w3-small fab bold fa-linkedin">: Center for Skills Acquisition/Magvoile </span>
		</li>
		  <li> Twitter <br>
		 <span class="w3-small fab bold fa-twitter">: Center for Skills Acquisition/Magvoile </span>
		</li>
		</ul><br><br>`;
		
		return str;
}

function loadDepartments(){
		var str = "<h1 class='w3-large w3-center underline josefin bold'>List Of All Available Skills Training Courses In U.C.S.A.R.D</h1>";
		 departments_obj.forEach((obj)=>{
		 		dept = obj.dept;
		 		info = obj.info;
		 		dp1 = obj.dp;
		 		dp2 = obj.dp2;
		 		
		 		dp = (Math.floor(Math.random()*2) == 0)? dp1 : dp2;
		 		
		 		str += `
		 		   <div style="height:fit-content;" class="w3-display-container w3-panel w3-section w3-round-xxlarge w3-card w3-white w3-padding">
        <span class="w3-xlarge w3-text-green fas fa-check-circle w3-right"></span>
        <h1 class="w3-xlarge underline bold josefin">${dept}</h1>
        <div class="w3-bottombar">
         <img data-image-caption="${info}" class="image-link" height="200px" width="100%" src="${dp}">
        </div>
        <p class="w3-medium josefinB">
		 		      ${info}
		 		     </p>
      </div>
      <br>
		 		`;
		 		
		 });
		  return str;
}





var photos = [
{
		"description" : "Trainees of the ICT department",
		"img" : "assets/UCSARD/events/event16.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Female trainees of the ICT departmemt",
		"img" : "assets/UCSARD/events/event17.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "ICT department trainees at work",
		"img" : "assets/UCSARD/events/event15.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A male trainee of the ICT department having a good time",
		"img" : "assets/UCSARD/events/event18.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "ICT department trainees engaged on a task",
		"img" : "assets/UCSARD/events/event19.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A male trainee of the ICT department at work on a project",
		"img" : "assets/UCSARD/events/event20.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Amb. Essien addressing trainees of the Fashion Designing department",
		"img" : "assets/UCSARD/events/event1.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A trainee of the Fashion Design department",
		"img" : "assets/UCSARD/events/event2.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A male trainee of the Fashion Design department",
		"img" : "assets/UCSARD/events/event3.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Amb. Essien interacting with trainees of the Fashion Design department",
		"img" : "assets/UCSARD/events/event4.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A female trainee of the Fashion Design department",
		"img" : "assets/UCSARD/events/event14.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Male trainees of the Fashion Design department",
		"img" : "assets/UCSARD/events/event10.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Fashion Design trainees at work",
		"img" : "assets/UCSARD/events/event11.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Trainees of the Barbing/Hair Styling department at work",
		"img" : "assets/UCSARD/events/event6.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "A female trainee of the Barbing/Hair Styling Department",
		"img" : "assets/UCSARD/events/event5.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Male trainees of the Barbing/Hair Styling department",
		"img" : "assets/UCSARD/events/event7.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Trainees of the Catering department",
		"img" : "assets/UCSARD/events/event9.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Male trainee of the Catering department at work",
		"img" : "assets/UCSARD/events/event8.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Trainees of the Hair Styling department",
		"img" : "assets/UCSARD/events/event12.jpg",
		 "date" : "23/05/2024"
},
{
		"description" : "Trainees of the Hair Styling department",
		"img" : "assets/UCSARD/events/event13.jpg",
		 "date" : "23/05/2024"
}
];



var staff_obj = [{
		"name" : "Ambassador Ernest Essien",
		"position" : "Supervisor, Skills Acquisition Center",
		"dp" : "assets/UCSARD/amb.jpg"
},
{
		"name" : "Ambassador Ernest Essien",
		"position" : "Secretary, Skills Acquisition Center",
		"dp" : "assets/UCSARD/ict2.jpg"
},
]



var departments_obj = [
{
		"dept":"ICT",
		"info":"Information and communication technology, abbreviated as ICT, covers all technical means used to handle information and aid communication. This includes both computer and network hardware, as well as their software.",
		"dp":"assets/UCSARD/ict.jpg",
		"dp2":"assets/UCSARD/ict2.jpg"
},
{
		"dept":"Carpentry",
		"info":"Carpentry is the skill or work of making or fixing wooden objects or wooden parts of buildings : the skill of a carpenter or the work done by a carpenter.",
 "dp":"assets/UCSARD/carpentry.jpg",
		"dp2":"assets/UCSARD/carpentry2.jpg"
},
{
		"dept":"Fashion Designing",
		"info":"Fashion design is the art of applying design, aesthetics, clothing construction and natural beauty to clothing and its accessories.",
 "dp":"assets/UCSARD/fashion.jpg",
		"dp2":"assets/UCSARD/fashion2.jpg"
},
{
		"dept":"Fashion Accessories",
		"info":"A fashion accessory is a decorative item worn to complement one's attire or look. Jewellery, hats, purses, scarves, belts, watches, sunglasses, beads, etc.",
 "dp":"assets/UCSARD/accessory.jpg",
 "dp2":"assets/UCSARD/accessory3.jpg",
},
{
		"dept":"Catering",
		"info":"A caterer is a person or business that prepares, cooks, and serves food and beverages to clients at remote locations and events.<br>Catering is the activity of providing food and drink for a large number of people, for example at weddings and parties.<br>A caterer is a person or business that prepares, cooks, and serves food and beverages to clients at remote locations and events.",
 "dp":"assets/UCSARD/catering.jpg",
		"dp2":"assets/UCSARD/catering2.jpg"
},
{
		"dept":"Shoe Making",
		"info":"Shoemaking is the process or craft of designing, manufacturing, or repairing shoes.<br>A shoemaker is a person whose job is making shoes and boots.",
 "dp":"assets/UCSARD/cobbler.jpg",
		"dp2":"assets/UCSARD/cobbler.jpg"
},
{
		"dept":"Cosmetology",
		"info":"Cosmetology is the practice of applying expert beauty treatment, whether it's hair care, nail treatment or skin care.<br>A Cosmetologist is a trained person whose job is to improve the appearance of a customer's face, hair, or skin using make-up and beauty treatments",
 "dp":"assets/UCSARD/cosmetology.jpg",
		"dp2":"assets/UCSARD/cosmetology2.jpg"
},
{
		"dept":"Photography",
		"info":"Photography is the art or process of taking pictures using a camera.Photography is the skill, job, or process of producing photographs.",
 "dp":"assets/UCSARD/photography.jpg",
		"dp2":"assets/UCSARD/photography2.jpg"
},
{
		"dept":"Barbing / Hair Styling",
		"info":"Barbering is the craft of cutting, styling, and coloring short hair, as well as shaving or grooming facial hair.<br>A barber is a person whose occupation is mainly to cut, dress, groom, style and shave hair or beards. ",
 "dp":"assets/UCSARD/barbing.jpg",
		"dp2":"assets/UCSARD/barbing2.jpg"
},
];


const sidenav_str = ` <div style="display:block;padding-right:0;" id="sidebar" class="w3-sidebar w3-border-blue influenza w3-bar-block w3-rightbar header">
    <span onclick="closeSidebar()" class="w3-text-white w3-margin w3-right w3-large fas fa-times-circle"></span>

   <div style="margin:0;padding:0;height:100px;" class="w3-panel w3-section">
    <!-- <img src="assets/logos/uniuyo2.jpg" height="100%" width="100%"> -->
    <span class="w3-bar-item w3-medium w3-text-white bold josefinB w3-bottombar">
     CENTRE FOR <br>SKILLS AQUISITION AND <br>RURAL DEVELOPMENT
    </span>
   </div>

    <ul style="padding:0;padding-left:5px;margin-top:40%;" class="w3-ul w3-bar-item oregonB w3-text-white">
      <li class="list-item">
       <button data-link-type="photos" style="width:100%;" class="post-link-btn w3-button">Photos</button>
      </li> 
     <li class="list-item">
       <button data-link-type="about" style="width:100%;" class="post-link-btn w3-button">About</button>
      </li>
      <li class="w3-list-item">
        <button data-link-type="depts" style="width:100%;" class="post-link-btn w3-button">Departments</button>
      </li>
      <li class="w3-list-item">
        <button data-link-type="staff" style="width:100%;" class="post-link-btn w3-button">Staff</button>
      </li>
      <li class="w3-list-item">
        <button data-link-type="contact" style="width:100%;" class="post-link-btn w3-button">Contact</button>
      </li>
      </ul>   
   </div>`;

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const about_vc = `
Professor Nyaudoh Ukpabio Ndaeyo was born on March 25, 1961. He attended the Cross River State School of Agriculture, Obubra for his Ordinary National Diploma, OND, in Agriculture which he passed at distinction level in 1986. He also attended the erstwhile University of Cross River State now University of Uyo in 1987 to study Agronomy in the Faculty of Agriculture and graduated with first class honours division in 1991.
<br><br>
Nyaudoh Ndaeyo also earned a Master of Science (M.Sc.) degree in Agronomy in 1994 and a Doctorate (Ph.D) degree in Farming Systems in 2000 both from the University of Ibadan, Nigeria.
The new Vice-Chancellor, was first employed on November 06, 1992 as Graduate Assistant with the University of Uyo, 18 years later, he grew through the ranks and became a Professor of Farming Systems in the Department of Crop Science, Faculty of Agriculture on October 01, 2010.
<br><br>
Prof. Nyaudoh Ndaeyo is a seasoned teacher and researcher. He has taught over thirty courses at both the undergraduate and graduate levels and has also supervised over 68 undergraduate projects and 54 graduate theses including doctoral degree students.
During his career in the University, Prof. Nyaudoh Ndaeyo has served as a lecturer, researcher, examinations officer, co-ordinator of several academic activities and programmes in the Department of Crop Science, as well as chairman of several committees in the department.
He had served as adviser to students of the Faculty of Agriculture. Nyaudoh Ndaeyo was appointed Head of Department, 2006 – 2009 and also appointed Dean of the Faculty of Agriculture in 2016 and in 2018 was appointed Chairman, Committee of Deans. He has served either as Chairman or member of Faculty and University Committees. In his services which spans beyond the University of Uyo, Prof. Ndaeyo is a renowned resource person and consultant to both government and private sectors. He is a facilitator and external examiner to other Universities.
<br><br>
He is a member of several professional bodies including Crop Science Society of Nigeria, CSSN; Farm Management Association of Nigeria, FMAN; Nigerian Rural Sociological Association, NRSA and Agricultural Society of Nigeria, ASN, among others.
Prof. Nyaudoh Ndaeyo is a prolific publisher of books, book chapters and articles in learned journals and proceedings of conferences. He has 21 conference papers and 152 journal articles and numerous book chapters to his credit.
<br><br>
Until his appointment as the Vice-Chancellor, he was the Deputy Vice-Chancellor, Administration
He is married with two children.`;

const about_dvc = `Professor Aniekan Offiong is  currently the Deputy Vice-Chancellor (Administration), University of Uyo, Nigeria.   He is a Professor of Mechanical Engineering who served as the Dean of Faculty of Engineering between 2017 and 2021.   Earlier in his career, he served as the Head, Department of Mechanical Engineering beween 1998 and 2002.
<br><br>
Prof. Aniekan Offiong  started  his teaching career in February 1994, when he was employed as Lecturer II in the Department of Mechanical Engineering, University of Nigeria, Nsukka. On March 17, 1998, he accepted appointment as Lectuer I, in the Department of Mechanical Engineering, University of Uyo, Nigeria. He rose through the ranks to become a full Professor in October 1, 2014.  The work experience of Prof. Aniekan Offiong does not just end in the University of Uyo, Nigeria  and the University of Nigeria, Nsukka, but span through other Universities in Nigeria.  He has been on Sabbatical Leave at  the Federal University of  Technology, Owerri (2004 – 2005); Cross River  University of Technology, Calabar,  (2012 – 2013) and the Federal University of Agriculture, Abeokuta (2021 – 2022).  He has been a Visiting Professor  or Adjunct Professor to the University of Calabar; Federal University, Otueke; Akwa Ibom State University, Ikot Akpaden; Delta State University, Abraka; and Rivers State University of Science and Technology, Port Harcourt. He has been External Examiner for the University of Nigeria, Nsukka; Michael Okpara University of Agriculture, Umudike; University  of Ibadan; Chukwuemeka Odumegwu Ojukwu University, Uli; University of Port Harcourt and others.
Prof. Aniekan Offiong attended several primary schools between 1978 – 1999 including  Lutheran  Practising School, Ibakachi – Ikono, Saint Ann Catholic Primary School, Ifoho – Ikot Ekpene and Lutheran Primary School, Itak Ikot Udo, Ikot Ekpene where he sat for  First School Leaving Certifcate Examination in 1979. Between 1979  – 1984, he attended Federal Government College, Ikot Ekpene where he received his General Certificate of Education. Between 1984 – 1997, he attended the University of Nigeria, Nsukka where he obtained a Bachelor, Master and Doctorate degrees in Mechanical Engineering in 1989, 1993 and 1997 respectively. His area of specializtion is Industrial Engineering and Management. Prof. Aniekan Offiong served the nation in the National Youth Service Corps Scheme in  Enugu and was certified in 1991.
<br><br>
Prof. Aniekan Offiong has published written six (6)  Research Books, Seventy (70) Journal Articles and over ten (10) Conference Papers.  He has  attended over fifty (50) National and International Conferences. He has been Editor to many reputable Journals and proceedings including  Editor-in-Chief of the Journal of the Nigerian Institution of Mechanical Engineers (2020 – date).  Prof. Aniekan Offiong is a registered Engineer with Council for the Regulation of Engineering in Nigeria (COREN). He is a Fellow of the Nigerian Institution of Mechanical Engineers (FMIMechE); Member of the Nigerian Institution of Production Engineers (MNIProdE) and Member of the Nigerian Society of Engineers (NSE).
Prof. Aniekan Offiong is a Christian and a Member of the Lutheran Church of Nigeria.  In 2009, he was appointed a member of Governing Council of the  Lutheran Hour Ministry,  the evangelical arm of the Lutheran Chrch of Nigeria. Prof. Aniekan Offiong is  well known for his campaign to enhance sustainable development through his activities as President of the International Research and Development Institute, who among  other things, are the Publisher of several Journal Titles, Research Books, Educational Books and Books of  general interest.    With the help of this organization and other partners, he has been able to  provide serveral thousands of Educational books and   journals to several institutions across the country free of charge or at reduced rate. Prof. Aniekan Offiong loves education and is the President of the Deltona International Schools, a well known provider of quality Nursery, Primary and Secondary Education in Akwa Ibom State, Nigeria. During the transition to civil rule in 1999, Prof. Aniekan Offiong served as a member of the Akwa Ibom State Transition Committee on Public Utility.
<br><br>
Prof. Aniekan Offiong was born on June 26, 1969 into the family of Mr. Offiong Etim Akpan and Mrs. Akon Offiong Akpan  in the Royal Family of Nung Ayan in Afaha Ikot Obio Nkan, Ibesikpo in  Ibesikpo Asutan Local Government Area of Akwa Ibom State, Nigeria.   Prof. Aniekan Offiong is a person of amiable character. He is happily married to the wife of his youth, Mrs. Janet Aniekan Offiong and  together they have six lovely and adorable children:: Jaequeline Datimfonabasi, Josephine Dianabasi, Alexander Abasiodiong, Emmanuel Sinede, Emmanuela Daramfonabasi and Anita Anietienteabasi.
`;

const about_amb = `
Ambassador of Goodwill, Arkansas Little Rock, USA.
Africa's Most Sought After Skills Developer.
President Of Magvoile College Of Arts, Science, And Vocational Studies.
<br><br>
Ambassador Ernest Essien is a opportunistic development visionary  
His sole-driving vision is to see that youths are empowered and eqquiped with the relevant skills and vocational aptitude required to make them change agents in whatever community the find themselves,
He is driven by a strong enthusiastic desire to see that youths are not dependent on anyone but themselves and the skills of their hands thereby making them vessels of positive impact in society amd the world at large.
<br><br>
From early humble beginnings of a small-time Art Collector, buying off cheap art works from undergraduate student artist to sell at second-hand markets, he was determined that despite all odds against him, he would make a name for himself and become a source of inspiration and motivation to youths.
<br><br>
He is now the <b>Founder and President of Magvoile Vocational Training Center</b> and currently the Supervisor-In-Charge of the University of Uyo Center for Skills Acquisition and Rural Development</b>.
<br><br>
Ambassador Ernest Essien has helped and trained several hundred youths in acquiring skills and developing their potentials.
<br>
He is also a mentor of dozens of youths whom he took under his wings and some of whom now own and run their respective businesses and some of whom also hold good standing positions in society.
<br>
All these lofty achievements are what have earned him the call-card <b>Africa's Most Sought After Skills Developer</b>
`;

const about_csard = `
The <b>University of Uyo Center For Skills Acquisition and Rural Development</b> is a skills building project initiative by the prestigious University of Uyo headed by the leadership of <b>Ambassador Ernest Essien</b>.

The center was established with the main purpose and intension on aiding young men and women to build helpful vocational skills and develop their potentials and giftings through intensive practical and technical trainings geared to equipping them with the needed tools and know-how to live rich, productive, impactful lives.
`;

const depts_str = `
      <div style="height:fit-content;" class="w3-display-container w3-panel w3-section w3-round-xxlarge w3-card w3-white w3-padding">
        <span class="w3-xlarge w3-text-green fas fa-check-circle w3-right"></span>
        <h1 class="w3-small underline bold josefin">Car</h1>
        <div class="w3-bottombar">
         <img height="200px" width="100%" src="assets/ci3.jpg">
        </div>
        <p class="w3-xlarge magnolia">
         The #1 Social Network Platform for university undergraduates and graduates
        </p>
      </div>
`;
