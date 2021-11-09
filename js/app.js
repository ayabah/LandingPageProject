let sections = document.querySelectorAll('section');
let container = document.querySelector('ul');
let myMain = document.querySelector('main');
let upButton= document.createElement('button');
let myButton= document.createElement('button')

/*
 creating the li elements with the data-nav as innerhtml
 adding classes to the li to have style 
 adding the matching section's id to the li 
 addding an eventlistner to scroll smoothly to the matching section
 */

function viewItems(){
 for(let i=0;i<sections.length;i++){
let list= sections[i].getAttribute('data-nav');
let items= document.createElement('li');
items.innerText=list;
items.classList.add('menu__link')
items.id= sections[i].id
items.addEventListener('click',()=>{
 sections[i].scrollIntoView({behavior: "smooth"}) 
})

container.appendChild(items);

}
}
viewItems()

/* activating the section on the view when entering the viewport
 using the Intersection observer API 
 after searching about it on MDN
 and here is the application */

 /* an object of options that can be adjusted
 to tell when exactely you want to excute your function 
 from the time the element entered the viewPort
 */

 const options = {
root: null,
threshold: 0.25,
/* the right has been added to the rootMargin 
to be adjusted to work with small screened devices 
as recommended by the reviewer */

rootMargin: '-150px 20px'
};

 /*
  a function to be excuted when the section enters the viewPort
    to add the "your-active-class" & "active-link"
    when in the viewPort and remove when outta the viewPort 
  */

    const activation= ()=>{
   const observer = new IntersectionObserver((entries,observer)=>{
    
    entries.forEach((entry)=>{
      
      let myActiveItem= document.querySelector(`#${entry.target.id}`)
      
      if(entry.isIntersecting){
    
        entry.target.classList.add('your-active-class')
        myActiveItem.classList.add('active-link')
      }
     else{

        entry.target.classList.remove('your-active-class')
        myActiveItem.classList.remove('active-link')
     
    }
    })
   },options);

 sections.forEach((section)=>{
   observer.observe(section)
 
  })
 }
 window.addEventListener("scroll",activation)

/*
adding a button to go up the page anytime clicked
using the scrollTo() method after searching on the MDN
and here is the application 
*/

container.appendChild(upButton)
upButton.innerHTML=`<strong>'Up'</strong>`
upButton.classList.add('menu__link')
upButton.addEventListener('click',()=>{
  window.scrollTo({top:0,left:100,behavior:'smooth'})
})

/*
 a function to change style to dark to help people with 
vision proplems using toggle() method and an icon that 
i used after reading a tutorial on w3schools and added 
an event listner to it 
*/

  myButton.innerHTML=`<i class='fas fa-moon' style='font-size:20px; color: black'></i>`
  container.appendChild(myButton)

  function darkMood(){

  let myBody = document.body
  myBody.classList.toggle('dark-mood')
  if(myBody.classList.contains('dark-mood')){
    myButton.innerHTML=`<i class='fas fa-sun' style='font-size: 20px; color: white'></i>`
  }
  else{
    myButton.innerHTML=`<i class='fas fa-moon' style='font-size:20px ; color: black'></i>`
  }
  }
  
  myButton.addEventListener("click",darkMood)
  
  /* a function to add an icon
   to serve as a button that will be used later */
 
   function addSecButton(){
let addButton= document.createElement('button')
addButton.innerHTML=`<i class="fas fa-plus"style='font-size:20px; color: black'></i>`
container.appendChild(addButton)
  }
  addSecButton();

  /* a function to add a counter starting from 0 
and increase by one every click */

function countSections(){

  let Counter = document.createElement('div') 
  Counter.innerHTML='0'
  Counter.id='counter'
  Counter.classList.add('menu__link')
container.appendChild(Counter)
}
countSections();

let myAddButton = document.querySelector('.fas.fa-plus')
 
/* a function to clone a new section every click 
 using the Node.cloneNode method after reading about it on MDN
 to clone any existing section and then manipulated it as i wanted
 also used parseInt() function to convert the string to a num
  and then return it to use it to increase by one  every time the user click 
  on the addSecButton */

function addSections(){
 let  myOriginal= document.querySelector('section')
 let  myClone = myOriginal.cloneNode(true)
      myClone.id='NewSection'
      myClone.dataset.nav='New Section'
      myClone.innerHTML=` <div class="landing__container">
      <h2>${myClone.dataset.nav}</h2>
      </div>`
  
      myMain.appendChild(myClone)
      let myCounter= document.querySelector('#counter')
      myCounter.innerHTML=parseInt(myCounter.innerHTML)+1
}

 
myAddButton.addEventListener("click",addSections)



