

function LocomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---





// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
  
function page1Text(){
  var allText = document.querySelectorAll(".page1-text h1 ")
allText.forEach(function(elem){
  var splittedText = elem.textContent.split("") ;
 clutter = " "
 splittedText.forEach(function(e){
  clutter += `<span>${e}</span>`
 })

 elem.innerHTML = clutter
})

gsap.from(".page1 h1 span",{
  y:600 ,
  duration : 1 ,
  delay :0.5 ,
  stagger : 0.1
})
}

function cursorAnimation(){
 
  var crsr  = document.querySelector("#cursor")
  document.addEventListener( "mousemove",function(dets){
    gsap.to( crsr,{
      x : dets.x ,
    y: dets.y 
  
    })
  })
  var allImg = document.querySelectorAll(".image-div")
  var text = ""
  allImg.forEach(function(elem){
  
   elem.addEventListener("mouseenter",function(){
    text = elem.getAttribute("data-text")
    gsap.to(crsr,{
      width : "160px"
    })
    gsap.from("cursor h5",{
      opacity:0
    })
  crsr.innerHTML = `<h5>${text}</h5> <h5>${text}</h5> <h5>${text}</h5>`
   })
  elem.addEventListener("mouseleave",function(){
  gsap.to(crsr,{
   width : "16px"
  })
    crsr.innerHTML = "<h5></h5>"
  })
  
  })
}

function curveAnimation(){
  var path = `M 10 80 Q 500 80 990 80` 
var finalpath = `M 10 80 Q 500 80 990 80`
var string = document.querySelector("#string")
string.addEventListener("mousemove",function(dets){
  path =`M 10 80 Q ${dets.x} ${dets.y} 990 80` 
  gsap.to(".page2 svg path",{
    attr :{d:path},
  })
})
string.addEventListener("mouseleave",function(){
  gsap.to(".page2 svg path",{
    attr:{d:finalpath},
    ease: "elastic.out(1,0.2)",
    duration :1
  })
})

}
  
function imageAnime1() {
  
 var  elemContainer = document.querySelector("#elem-container")
 elemContainer.addEventListener("mouseenter" , function(){
   gsap.to("#moving-image",{
     opacity : 1 
   })
 })
 elemContainer.addEventListener("mouseleave" , function(){
   gsap.to("#moving-image",{
     opacity : 0
   })
 })
 
 var movingImg_div =  document.querySelector("#moving-image")
 var moveImg = document.querySelector("#moving-image img")
 
 var allElems = document.querySelectorAll(".elem")
 allElems.forEach(function(dets){
   dets.addEventListener("mouseenter", function(){
     var img = dets.getAttribute("data-image")
 //  moveImg.setAttribute("src",img)
  gsap.to(moveImg ,{
   duration : 3 ,
   attr : {src:img}
  })
   })
  
 })
 
 elemContainer.addEventListener("mousemove", function(dets){
   gsap.to("#moving-image" ,{
     left : `${dets.x - elemContainer.getBoundingClientRect().x}` ,
  top : `${dets.y - elemContainer.getBoundingClientRect().y}` ,
  duration : 3 ,
  ease : "power1.out" 
   })
 })
}

function imageAnime2(){
  
}

function marqueAnimation(){

  window.addEventListener("wheel", function(dets){
    if(dets.deltaY > 0){
      gsap.to("#move .marque",{
        transform : "translateX(-200%)" ,
        ease : "none" ,
        repeat : -1 ,
        duration : 5 
      })
      gsap.to("#move .marque img",{
      rotate : 180 
      })
  
    }
    else{
      gsap.to("#move .marque",{
        transform : "translateX(0%)" ,
        ease : "none" ,
        repeat : -1 ,
        duration : 5
      })
      gsap.to("#move .marque img",{
        rotate : 0
        })
    }
  })
  
  
  
}

function page6Animation(){


  var box1 = document.querySelector(".page6 #box1")
  var box2 = document.querySelector(".page6 #box2")
  var page6 = document.querySelector(".page6")
  var movingimgDiv = document.querySelector(".page6 #moving-img ")
  var moveimg = document.querySelector(".page6 #moving-img img")
  
  box1.addEventListener("mouseenter" , function(){
    page6.style.backgroundColor = "#FFD7E7"
    box2.style.opacity = "0.6"
  
  })
  box1.addEventListener("mouseleave" , function(){
    page6.style.backgroundColor = "#F9F7F4"
    box2.style.opacity = "1"
  
  
  })
  
  box2.addEventListener("mouseenter" , function(){
    page6.style.backgroundColor = "#BAC4E2"
    box1.style.opacity = "0.6"
  })
  box2.addEventListener("mouseleave" , function(){
    page6.style.backgroundColor = "#F9F7F4"
    box1.style.opacity = "1"
    
  })
  
  
}
LocomotiveAnimation()
page1Text()
cursorAnimation()
curveAnimation()
imageAnime1()
marqueAnimation()
page6Animation()