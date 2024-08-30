const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
// el refers to element that contains our website ->
// which is our top div = main here

var timeout;

function firstPageAnim(){
    var tl=gsap.timeline();
    tl.from("#nav",{
         y:'-10',
         opacity: 0,
         duration: 2,
         ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
        // stagger is used when elements are to be displayed 
        // one by one
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}
// skew the mouse when it moves and define max and min skew
// mouse gets skewed when it moves and restores to original shape when it stops moving
function ellipseCircle(){
    // define default scale value
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff=dets.clientX - xprev;
        var ydiff=dets.clientY - yprev;
        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);
        xprev=dets.clientX;
        yprev=dets.clientY;

        circleMouseFollower(xscale,yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);

        
    });
}
// the function specified inside setTimeout works after a few ms

// value of the  default position of object(x,y) is 1. and when
// it squeezes horizontally and vertically its value decreases from 1

firstPageAnim();

// for cursor on the website
function circleMouseFollower(xscale,yscale){
     window.addEventListener("mousemove",function(dets){
        // console.log(dets);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
     })
}
// window refers to screen here
// when the mouse moves on the screen provide certain details

// circleMouseFollower();
ellipseCircle();

// ClientX = move backwards in x direction -> value of clientx dec
// ClientY = move backwards in y direction -> value in clienty dec
// top left = clientx, clienty =(0,0)
// transform is a technique to move the circle 

//  select the 3 elements initially, use mousemove on the 3 elements,
// when the mouse moves -> identify over which element is it hovering,
// i.e identifu the position of mouse (x,y), then instead of (x,y) position of mouse 
// display the respective images and rotate the image simultaneously 
// and with the pace of the rotation of mouse -> the  pace of rotation of mouse increases

document.querySelectorAll(".elem").forEach(function (elem) {
    var  rotate=0;
    var d=0;
    elem.addEventListener("mouseleave", function(details){
        
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power1,
            duration: .5,
        });
    });
    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        d=details.clientX - rotate;
        rotate = details.clientX;
        // console.log(diff);
       
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power1,
            top: diff,
            left: details.clientX,
            rotate:  gsap.utils.clamp(-20,20,d*0.2),
        });
    });
});


