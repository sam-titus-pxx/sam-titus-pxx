var services = ["Marketing","Manufacturing","Production","Agro-Allied Venture","Exportation","Importation","Delivery Services","Warehousing","Storage","Packaging","Communications","Distribution","Fisheries","Hospitality","Event Management","General Contracts","Consultancy Services","Conference Organizing"];
var contact_address = "165 Edet Akpan Avenue. Four-Lanes, Uyo, Akwa Ibom State, Nigeria";
var contact_phone = ["+234-814-713-1602","+234-7039-465-477"]
var contact_mail = ["ifiok2018ti@gmail.com","ifioktitus1@gmail.com"]

var PRODUCTS_LIST = [];
var CART_ITEM = {}
var PURCHASE_OBJ = {
   item:"",amount:1,price:0,total:0
};

var pg1_hid = false;
var pg2_hid = false;

$(document).ready(function(){
   
   loadTexts("about");
   loadTexts("contact");
   loadTexts("services");
   loadTexts("support");
   loadTexts("policy");
   
   loadTestimonials()
   
   setTimeout(function(){
      //loadProducts();
      INIT_BtnCartRouting();
      INIT_BtnLinkRouting();
      //setLoadAdvert(link,img,text)
   },1000);
   
   $('#btn-open-sidebar').click(function(){
      openSidebar();
    });
   
   console.log("THE STUDENT FARMER BLOG")
    
   $("#btn-modal-display").click(function(){
      document.getElementById("page-modal").style.display = "none";
   })
   
    $("#btn-purchase-modal-display").click(function(){
      document.getElementById("purchase-page-modal").style.display = "none";
   })
   
   $("#btn-purchase-modal-purchase").click(function(){
      //document.getElementById("purchase-page-modal").style.display = "none";
      GE("purchase-confirm-item").innerText = PURCHASE_OBJ.item
      GE("purchase-confirm-amount").innerText = PURCHASE_OBJ.amount
      GE("purchase-confirm-price").innerText = PURCHASE_OBJ.price
      GE("purchase-confirm-total").innerText = PURCHASE_OBJ.total
      
      HE("purchase-page-modal")
      SE("purchase-confirm-modal")
   })
   
   $("#btn-purchase-cancel").click(function(){
      SE("purchase-page-modal")
      HE("purchase-confirm-modal")
   })

   
    $("#btn-increment-amount").click(function(){
       stock = parseInt(GE("purchase-modal-stock").innerText)
       
       item_amnt = parseInt(GE("purchase-modal-amount").innerText) ;
       if((item_amnt+1) <= stock){
          cost = parseInt(GE("purchase-modal-cost").innerText);
          price = parseInt(GE("purchase-modal-price").innerText);
          
          PURCHASE_OBJ.amount += 1;
          PURCHASE_OBJ.total += price;
          
          GE("purchase-modal-amount").innerText = item_amnt+1;
          GE("purchase-modal-cost").innerText = cost+price
          HE("purchase-modal-alert") 
       }else if((item_amnt+1) > stock){
          GE("purchase-modal-alert").innerText = "Item Inventory Exceeded!"
          SE("purchase-modal-alert") 
          HE("btn-increment-amount") 
          setTimeout(function(){
             HE("purchase-modal-alert") 
             SE("btn-increment-amount") 
          },1500)
       }
    })
   
    $("#btn-decrement-amount").click(function(){
       stock = parseInt(GE("purchase-modal-stock").innerText)
       
       item_amnt = parseInt(GE("purchase-modal-amount").innerText) ;
       if((item_amnt-1) >= 1){
          cost = parseInt(GE("purchase-modal-cost").innerText);
          price = parseInt(GE("purchase-modal-price").innerText);
          
          PURCHASE_OBJ.amount -= 1;
          PURCHASE_OBJ.total -= price;
          
          GE("purchase-modal-amount").innerText = item_amnt-1;
          GE("purchase-modal-cost").innerText = cost-price
          HE("purchase-modal-alert") 
       }else if((item_amnt-1) < 1){
          GE("purchase-modal-alert").innerText = "Purchase Order Must Be Greater Than Zero!"
          SE("purchase-modal-alert") 
          HE("btn-decrement-amount") 
          setTimeout(function(){
             HE("purchase-modal-alert") 
             SE("btn-decrement-amount") 
          },1500)
       }
    })
   //===================================================
   
   $("#side-link-testimonials").click(function(){
      viewTestimonials()
      //document.getElementById("page-modal").style.display = "none";
   })
   
});


function setLoadAdvert(link,img,text){
   GE("ad-image-link").setAttribute("href",link);
   GE("ad-text-link").setAttribute("href",link);
   
   GE("ad-image-link").setAttribute("src",img);
   GE("ad-text-link").innerText = text;
}
   

function setPurchaseObject(item,amnt,price,total){
   PURCHASE_OBJ.item = item;   
   PURCHASE_OBJ.amount = amnt;
   PURCHASE_OBJ.price = price;
   PURCHASE_OBJ.total = total;
}
   

function loadTestimonials(){
   $.get("scripts/files/testimonials.txt",function(data,status){
         if(status == "success"){
            testimonials_text = data;
            //console.log("TESTIMONIALS LOADED!")
         }
   })
}

function loadTexts(text){
   str = "";
      $.get("scripts/files/"+text+".txt",function(data,status){
         if(status == "success"){
            switch(text){
                        case "about" :
                         about_text = data;
                        break;
                        case "services" :
                        services_text = data;
                        break;
                        case "contact" :
                        contact_text = data;
                        break;
                        case "policy" :
                        policy_text = data;
                        break;
                        case "support" :
                        support_text = data;
               break;
            }
            str = data
            //console.warn(text.toUpperCase()+" Text Loaded Successfully!");
         }
      });
      return str;
}
   
//♦
function loadProducts(){
   
  for(i = 0; i < PRODUCTS_LIST.length; i++){
     
     batch_obj  = PRODUCTS_LIST[i];
     
     batch = batch_obj.batch;
     batch_list = batch_obj.products;
     slider = "slider"+batch;
     
     for(j = 0; j < batch_list.length; j++){
          item_obj = batch_list[j];  
          id = item_obj.id
          item = item_obj.item
          price = parseInt(item_obj.price)//numberFormat(item_obj.price)
          stock = item_obj.stock
          img = item_obj.img
        
          //price = numberFormat(price);
        
         str ='<div class=""><div class="w3-display-container" style="height:fit-content;width:100%;padding:0;margin:0;"><span class=" w3-large bold josefinB underline">'+item.toUpperCase()+'</span>'+
         '<img src="assets/'+img+'" height="80%" width="100%" sizes="100%" class="w3-center"></div>'+
         '<div class="w3-container" style="height:20%;margin:0;margin-top:2px;"> '+
         '<p class="w3-small w3-panel josefinB" style="margin:0;"><span class="w3-round-xlarge MBZ-bg w3-right pd-sm">In Stock: <span class="">'+stock+'</span></span></p>'+
         '<div class="w3-topbar"><span class="MBZ-bg w3-button btn-add-cart mg-sm w3-left w3-large fas fa-cart-plus" data-item-id="'+id+'" data-item-batch="'+batch+'"></span> <span class="w3-right franklin w3-xlarge MBZ mg-sm">N '+price+'</span></div></div></div>';
      
      //GE("s"+(batch+1)+"-p"+index).innerHTML = str;
      GE(slider).innerHTML += str;
     }
     $("."+slider).slick({
        dots: true,infinite: false,vertical: false,adaptiveHeight:true,
        responsive: [{breakpoint: 1024,settings: {slidesToShow: 1,infinite: true}},
        {breakpoint: 600,settings: {slidesToShow: 1,dots: true}}]
      });
  }
}


function loadList(list,id){
   list.sort();
   str = ""
   list.forEach(function(l){
      str += '<span class="w3-bar-item w3-text-white w3-border-white w3-border w3-padding w3-margin w3-card w3-tiny bold w3-round-medium josefin">'+l+'</span>'
   });
   GE(id).innerHTML = str;
}

function loadProductsList(){
   $.get("scripts/files/products_list.txt",function(data,status){
         if(status == "success"){
            //console.log(data)
            
            PRODUCTS_LIST = JSON.parse(data);
            
            console.warn("\t★ Products Inventory Loaded !\n");
         }
   })
}

function INIT_BtnCartRouting(){
   var btns = getElems("btn-add-cart");
    //alert(`Page Links: ${btns.length}`)
    //btn_arr = Array.from(btns);
   for(i = 0; i < btns.length; i++){
      btn = btns[i]
       btn.addEventListener("click",function(){
          id = this.getAttribute("data-item-id");
          batch = this.getAttribute("data-item-batch");
          
          item_obj = getProductItemByID(id);
          CART_ITEM = item_obj;
          
          loadPurchaseModal(item_obj);
          //SE("purchase-page-modal")
       })
   }   
}
   
function loadPurchaseModal(item_obj){
   
   item = item_obj.item
   price = parseInt(item_obj.price)
   stock = item_obj.stock
   img = item_obj.img
   
   GE("purchase-modal-image").setAttribute("src","assets/"+img)
   GE("purchase-modal-title").innerText = item  
   GE("purchase-modal-stock").innerText = stock
   GE("purchase-modal-price").innerText = price
   GE("purchase-modal-amount").innerText = 1
   GE("purchase-modal-cost").innerText = price
   
   SE("purchase-page-modal");
   setPurchaseObject(item,1,price,price)
}

function getProductItemByID(q_id){
   
   product_obj = {}
   
   for(i = 0; i < PRODUCTS_LIST.length; i++){
      batch_obj  = PRODUCTS_LIST[i];
     
     batch = batch_obj.batch;
     batch_list = batch_obj.products;
     
     for(j = 0; j < batch_list.length; j++){
          item_obj = batch_list[j];  
          id = item_obj.id
        
          if(id == q_id){
             product_obj = item_obj;
          }
     }
   } return product_obj;
}
   
function INIT_BtnLinkRouting(){
    var btns = getElems("side-link-btn");
    //alert(`Page Links: ${btns.length}`)
    //btn_arr = Array.from(btns);
   for(i = 0; i < btns.length; i++){
      btn = btns[i]
       btn.addEventListener("click",function(){
               type = this.getAttribute("data-link-type");
           		   closeSidebar();
           		   loadViewer(type);
       }) 
    }
    //console.log('SETUP PAGE LINK ROUTING!!')
}

function removeClassItem(cList,cItem){
    var alt_list = [];
    //console.log(`C-List: ${cList}\n`)
    cList.forEach(function(item){
       if(item.indexOf(cItem) == -1){
          alt_list.push(item);
       } else{
           o_clr = item;
       }
    }); //console.log(`New C-List: ${alt_list}`)
    return alt_list.join(' ');
}

function loadViewer(type){
				var meta_data_str = "", meta_data_type = "", str = "";
				
				var image = "",
				    name = "",
		     title = "";
				    
				switch(type){
								case "about" :  
						 name = "ABOUT US"
								title = "";
								image = "assets/logo2.png";
								meta_data_str = about_text;
								break;
								case "contact" :
						 name = "Contact Us"
								title = "";
								image = "assets/logo2.png";
								meta_data_str = contact_text;
								break;
								case "services" : 
						 name = "Our Services"
							title = "";
								image = "assets/logo2.png";
								meta_data_str = services_text;	
								break;
						 case "support" : 
								name = "Support Us";
								image = "assets/logo2.png";
								meta_data_str = support_text;
								break;
								case "policy" : 
								name = "Our Terms & Privacy Policy";
								image = "assets/logo2.png";
								meta_data_str = policy_text;
								break;
				}
   
   loadPostView(name,title,image,meta_data_str);
				}

function exitPostView(){
    HE('post-view-page');
    SE('main-body');
		   //slideToTop();
}

 function viewTestimonials(){
    title = ""
    name = ""
    str = '<div class="w3-animate-zoom"><span style="" id="btn-exit-post-view" class="fas fa-backspace w3-xlarge w3-left w3-btn"></span><br>'+
   '<div style="margin:0;margin-top:10px;padding:0;height:fit-content;" class="w3-container w3-white">'+
   '<div style="width:100vw;padding:0;" class="w3-container w3-black w3-xxlarge franklin">'+
    '<span data-link-page="user-profile" data-link-type="user" data-link-href="" class=" w3-xlarge franklin">'+name+' <span class="fas w3-text-blue fa-check-circle"></span></span><br><span class="w3-large w3-text-light-grey bold">'+title+'</span>'+
    '</div><div style="margin:0;margin-bottom:5px;padding:8px;" class="w3-container w3-topbar">'+testimonials_text+'</div></div><br><br><span style="" id="btn-exit-post-view2" class="fas fa-backspace w3-xlarge w3-left w3-btn"></span><br></div>';

   getElem('post-view-page').innerHTML = str;
   $('#post-view-page').fadeIn();
    
    HE('main-body');
      slideToTop();
      GE('btn-exit-post-view').addEventListener('click',function(){
         exitPostView(); 
      });GE('btn-exit-post-view2').addEventListener('click',function(){
         exitPostView(); 
      });
 }
   
function loadPostView(name,title,image,data){
   str = '<div class="w3-animate-zoom"><span style="" id="btn-exit-post-view" class="fas fa-backspace w3-xlarge w3-left w3-btn"></span><br>'+
   '<div style="margin:0;margin-top:10px;padding:0;height:fit-content;" class="w3-container w3-white">'+
   '<div style="width:100vw;padding:0;" class="w3-container w3-padding w3-black w3-xxlarge franklin">'+
   '<img class="image-link" data-image-caption="'+title+'" style="border-radius:50%;" src="'+image+'" height="80px" width="80px"><span data-link-page="user-profile" data-link-type="user" data-link-href="" class=" w3-xlarge franklin">'+name+' <span class="fas w3-text-blue fa-check-circle"></span></span><br><span class="w3-large w3-text-light-grey bold">'+title+'</span></div><div style="margin:0;margin-bottom:5px;padding:8px;" class="w3-container w3-topbar"><h1 class="w3-large ">'+data+'</h1></div></div><br><br><span style="" id="btn-exit-post-view2" class="fas fa-backspace w3-xlarge w3-left w3-btn"></span><br></div>';

   getElem('post-view-page').innerHTML = str;
   $('#post-view-page').fadeIn();
   
   HE('main-body');
      slideToTop();
      GE('btn-exit-post-view').addEventListener('click',function(){
         exitPostView(); 
      });GE('btn-exit-post-view2').addEventListener('click',function(){
         exitPostView(); 
      });
}


function INIT_imageViewEvent(){
		 var btns = getElems("image-link");
    //alert(`Page Links: ${btns.length}`)
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
		  
		  str = '<span style="" id="btn-exit-image-view" class="fas fa-backspace w3-large w3-left w3-btn"></span><br><div style="margin:0;margin-top:10px;padding:0;height:100vh;width:100vw;" class="w3-container w3-white"><img style="" src="${image}" height="100%" width="100%"><div class="w3-black w3-padding w3-left"><span class="w3-tiny w3-text-light-grey bold">${caption}</span></div></div><br>';
   
     getElem('image-view-page').innerHTML = str;
     openView("image");
     slideToTop();
     getElem('btn-exit-image-view').addEventListener('click',function(){
         openView("post");
      		  slideToPrevious();
      });
		
}



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
  for(i = 0; i < len; i++){
      str += (i == index)? num_arr[i]+"," : num_arr[i];
  }
		}else if(len > 6){
				for(i = 0; i < len; i++){
      str += ((i == index) || (i == index2))? num_arr[i]+"," : num_arr[i];
  }
		}
		return str;
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

/*var sample_text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porta risus sed urna congue mattis.
Integer a sem ac urna ultricies dapibus sit amet ac quam.
Aenean condimentum libero quis dolor ullamcorper facilisis.
Morbi faucibus mauris ac felis interdum, eget bibendum magna tristique.
Duis efficitur tortor vitae mollis mollis.
Aliquam mattis felis vel urna pellentesque sodales.
Donec cursus urna et lacinia euismod.
Phasellus ac orci nec odio pretium fermentum.
Nam ut lacus at tortor egestas aliquet.`;
*/

about_text = "We are the #1 reliable producers, marketers, and distributors of pure water satchet bags, and bottled water and water dispensers"
   
contact_text = "For further enquiries please reach us on our various available contact platforms."+
'<div class="bold w3-medium"><p class="underline"> Our Office Address:<h1 class="w3-xlarge" id="address">'+contact_address+'</h1></p>'+
   '<p class="underline">Our Phone Lines:<h1 id="contacts" class="w3-xlarge">• '+contact_phone[0]+'<br>• '+contact_phone[1]+'</h1></p>'+
   '<p class="underline">Our Email Addresses<h1 id="emails" class="w3-xlarge ">• '+contact_mail[0]+'<br>• '+contact_mail[1]+'</h1></p></div>' ;
   
services_text = ""

policy_text = ""

support_text = ""