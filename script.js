let bookStock = [];
let libraryBookStock = [];
let bookQueryInput = $('#bookQueryInput').val ();
let bookQueryStartIndex = 0; //this will set the first start item to get from the api result
let downloadBookMax = 6; //number of book will download from each fetch to google book api


//detect if two objects are collided 
function twoObjectTouching (div1Rect, div2Rect) {
  const isTouching = !(div1Rect.right < div2Rect.left || 
  div1Rect.left > div2Rect.right || 
  div1Rect.bottom < div2Rect.top || 
  div1Rect.top > div2Rect.bottom);

  return isTouching;
}






//GOOGLE BOOK FUNCTIONS

//update book query
function googleBooksDownload () {

  bookQueryInput = $('#bookQueryInput').val ();
  bookQueryStartIndex = bookQueryStartIndex + downloadBookMax;
  searchGoogleBooks (bookQueryInput);

  $('#bookQueryUpdate').html ('Downloading...');
  
  $('#googleBooksDownloading').show();
  
  



  setTimeout (() => {
    $('#bookQueryUpdate').html ('');
    $('#googleBooksDownloading').hide();
  }, 3000);
}


// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
async function searchGoogleBooks (query) {
  console.log ('search for: ' + query);
  if (query.trim ().length > 0)
  {
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${downloadBookMax}&startIndex=${bookQueryStartIndex}`)
    .then(response => {
      
      $('#googleBooksStatus').html ('Downloading...');
      return response.json();
    })
    .then(data => {
      console.log(data); // logs the book data
      bookStock = [...bookStock, ...data.items];
      $('#googleBooksStatus').html ('Downloaded: ' + bookStock.length);
      $('#googleBooksStatus').addClass("googleBooksStatusRed"); //change the color to red to make user know it's updated


      setTimeout (() => {
        $('#googleBooksStatus').removeClass("googleBooksStatusRed");
      }, 3000);

      console.log(bookStock);
    })
    .catch(error => {
      console.error(error); // logs any errors that occurred
    });
 
  }
};


//load the first item to the ferris capsult
function googleBooksLoadFirstItem (capsuleId) {

  capsule[capsuleId].carryBook = bookStock[0]; //assign the first book item into the capsult
  bookStock.shift(); //push out first item of the array bookStock;


  

  if (bookStock.length > 0)
  {
    $('#googleBooksStatus').html ('Downloaded: ' + bookStock.length); //update book count
  }
  else
  {
    $('#googleBooksStatus').html ('NO MORE BOOK');
    $('#googleBooksStatus').addClass("googleBooksStatusRed"); 
  }

  console.log (capsule[capsuleId].carryBook);
}






//LIBRARY FUNCTIONS
function libraryLoadBook (capsuleId) {

  if (capsule[capsuleId].carryBook)
  {
    const thisBook = capsule[capsuleId].carryBook;
    libraryBookStock.push (thisBook);

    const bookdivId = libraryBookStock.length - 1;
    //update library stock UI
    const bookDiv = `<div id="lb${bookdivId}" class="bookDiv">
      <div class="remove" onClick="libraryBookRemove('lb${bookdivId}')">X</div>
      <div class="bookimg"><img src="${thisBook.volumeInfo.imageLinks.thumbnail}"/></div>
      <div class="info">
        <div class="title"><a href="${thisBook.volumeInfo.canonicalVolumeLink}" target="_blank">${thisBook.volumeInfo.title}</a></div>
        <div class="author">${thisBook.volumeInfo.authors[0]}</div>
        <div class="categories">${thisBook.volumeInfo.categories}</div>
      </div>
      
      
    </div>`;

    $("#libraryBookStock").append(bookDiv);

    $("#libraryBookCount").html(` (${libraryBookStock.length})`);
    
  }
}


function libraryBookRemove (bookDivId) {

  const keyToRemove = bookDivId.substr(2);
  console.log (libraryBookStock);
  console.log (keyToRemove, libraryBookStock[keyToRemove] );
  if (libraryBookStock[keyToRemove] !== undefined)
  {
    
    console.log ('remove book: ' + keyToRemove);
    libraryBookStock = libraryBookStock.filter(item => item.key !== keyToRemove);

    $("#" + bookDivId).remove();
  }

}



//FERRIS WHEEL CODE
//get the html element "ferrisWheel" from the DOM
const fw = document.getElementById('ferrisWheel');

//constructing ferris wheel base
const ferrisWheelBasePoleLeft = document.createElement("div");
ferrisWheelBasePoleLeft.classList.add ('poleLeft');
fw.appendChild(ferrisWheelBasePoleLeft);



const ferrisWheelBasePoleRight = document.createElement("div");
ferrisWheelBasePoleRight.classList.add ('poleRight');
fw.appendChild(ferrisWheelBasePoleRight);




//construct the center point of the ferris wheel
const ferrisWheelCenterPoint = document.createElement("div");
fw.appendChild(ferrisWheelCenterPoint);
ferrisWheelCenterPoint.setAttribute("id", "ferrisWheelCenterPoint");


ferrisWheelCenterPoint.style.left = `700px`;
ferrisWheelCenterPoint.style.top = `400px`;
ferrisWheelCenterPoint.innerHTML = `DRAG ME`;
ferrisWheelCenterPoint.classList.add ('ferrisWheelCenter');

const ferrisWheelCenterPointX = ferrisWheelCenterPoint.offsetLeft + ferrisWheelCenterPoint.offsetWidth / 2;
const ferrisWheelCenterPointY = ferrisWheelCenterPoint.offsetTop + ferrisWheelCenterPoint.offsetHeight / 2;





//adjust the position of the pole base on the center of the ferris wheel
ferrisWheelBasePoleLeft.style.left = `${ferrisWheelCenterPointX - 110}px`;
ferrisWheelBasePoleLeft.style.top = `${ferrisWheelCenterPointY}px`;

ferrisWheelBasePoleRight.style.left = `${ferrisWheelCenterPointX + 80}px`;
ferrisWheelBasePoleRight.style.top = `${ferrisWheelCenterPointY}px`;




//define googleCloud and set the cloud position 
const googleCloud = document.getElementById('googleCloud');
googleCloud.style.left  = `${ferrisWheelCenterPointX + 250}px`;
googleCloud.style.top = `${ferrisWheelCenterPointY - 400}px`;



//define library and set it's position
const library = document.getElementById('library');
library.style.left = `${ferrisWheelCenterPointX - 400}px`;
library.style.top = `${ferrisWheelCenterPointY + 280}px`;


//make the following items draggable using jQuery UI: ferris wheel, google cloud, library
$(fw).draggable();
$(googleCloud).draggable();
$(library).draggable();



//constructing ferris wheel capsult
const capsule = [];

for (let i = 0; i < 6; i++) {
  capsule[i] = document.createElement("div");
  capsule[i].classList.add ('capsult');
  capsule[i].angle = 0;

  fw.appendChild(capsule[i]);
}



//rotate the capsults around "ferrisWheelCenterPoint"
i = 0;
count = 0;
numOfMovingCapsule = 1;

let angle = 0;
let distanceFromCenter = 350;

setInterval(() => {
  for (let i = 0; i < numOfMovingCapsule; i++) {
    
    capsule[i].x = ferrisWheelCenterPointX + Math.sin(capsule[i].angle) * distanceFromCenter;
    capsule[i].y = ferrisWheelCenterPointY + Math.cos(capsule[i].angle) * distanceFromCenter;
    capsule[i].style.left = `${capsule[i].x - 50}px`;
    capsule[i].style.top = `${capsule[i].y - 50}px`;

    capsule[i].angle += 0.05;


    //check if capsule is touching the google cloud
    const googleCloudRect = googleCloud.getBoundingClientRect();
    const libraryRect = library.getBoundingClientRect();
    
    capsule[i].div2Rect = capsule[i].getBoundingClientRect();


    //if they touches, get a book from google book api
    if (capsule[i].gotBook === true)
    {

      if (twoObjectTouching (capsule[i].div2Rect, libraryRect)) //check if capsult touchs the google cloud
      {
        console.log("The capsult touching the library");
        if (capsule[i].gotBook) //unload book to the libary stock if capsult carried a book
        {
          
          capsule[i].innerHTML = ''; //reset carry book image

          capsule[i].gotBook = false; //reset got book to false
          
          libraryLoadBook (i); //load the carried book to the library

        }
      }
    }
    else
    {
      if (twoObjectTouching (capsule[i].div2Rect, googleCloudRect)) //check if capsult touchs the google cloud
      {
        console.log("The capsult touching the cloud");
        if (bookStock.length > 0)
        {
          capsule[i].gotBook = true;

          randBookId = Math.ceil(Math.random() * 4); //random a number between 1 to 4
          //load the book into the capsult
          capsule[i].innerHTML = '<img src="./img/book-icon' + randBookId + '.png">';


          //get book from bookStock
          googleBooksLoadFirstItem (i);
        }
      }

    }
    


  }
  
  
  if (count > 20)
  {
    if (numOfMovingCapsule < capsule.length)
      numOfMovingCapsule++;



    count = 0;
  }

  count++;


}, 60);




//construct the component of the wheel
const ferrisWheelComponent = document.createElement("div");
fw.appendChild(ferrisWheelComponent);
ferrisWheelComponent.classList.add ('ferrisWheelComponent');

const ferrisWheelComponentWidth = (distanceFromCenter) * 2 + 16;
const ferrisWheelComponentHeight = ferrisWheelComponentWidth;


ferrisWheelComponent.style.width = `${ferrisWheelComponentWidth}px`;
ferrisWheelComponent.style.height = `${ferrisWheelComponentHeight}px`;

ferrisWheelComponent.style.left = `${ferrisWheelCenterPointX - (ferrisWheelComponent.offsetWidth / 2)}px`;
ferrisWheelComponent.style.top = `${ferrisWheelCenterPointY - (ferrisWheelComponent.offsetHeight / 2)}px`;





//create google cloud image
ferrisWheelComponent.style.left = `${ferrisWheelCenterPointX - (ferrisWheelComponent.offsetWidth / 2)}px`;
ferrisWheelComponent.style.top = `${ferrisWheelCenterPointY - (ferrisWheelComponent.offsetHeight / 2)}px`;


//get book data from google book api
searchGoogleBooks (bookQueryInput);