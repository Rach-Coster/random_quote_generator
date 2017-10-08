var colors = ['#0074D9', '#85144b', '#FF851B', '#FF4136'];
var priorColor; 
var quote; 
var author; 

function changeColor(){
   var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
  while(randomColor == priorColor){
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  }
  priorColor = randomColor;
  $('#new-quote').css({backgroundColor: randomColor});
 $('body').animate({backgroundColor: randomColor});
}

function initColor(){
   var randomColor = colors[Math.floor(Math.random() * colors.length)];
  $('body').css({'background-color': randomColor});
  $('#new-quote').css({'background-color': randomColor});
  priorColor = randomColor; 
  
}

function getQuote() {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) {
        $("#quote-text").html("<p id='quote-text'>" + "<i class='fa fa-quote-left'>" + "</i>" + "  " + response.quoteText + "</p>");
        if(response.quoteAuthor == '') {
          $("#quote-author").html("<p id = quote-author>" + " - Unknown" + "</p>")
        }
        
        else {
            $("#quote-author").html("<p id = quote-author>" + "- " + response.quoteAuthor + "</p>")
        }
        
        quote = response.quoteText; 
        author = response.quoteAuthor; 
      }
  });
}

$(document).ready(function(){
  initColor();
  getQuote();
});

$("#new-quote").click(function(){
  changeColor();
  getQuote();
});

 $('#tweet').click(function(){
   window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote +'"' + " " + author));
 });