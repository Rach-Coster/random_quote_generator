// Code here will be linted with JSHint.
/* global $ */
/* global window */ 
/* global document */

var colors = ["#0074D9", "#85144b", "#FF851B", "#FF4136"];
var priorColor = ""; 
var quote; 
var author; 

function randomColor(){ 
    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    while(randomColor === priorColor){
        randomColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    priorColor = randomColor;
    
    return randomColor; 
}

function changeColor(){
    var newColor = randomColor(); 
    $('#new-quote').css({backgroundColor: newColor});
    $('body').animate({backgroundColor: newColor});
}

function getQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        success: function( response ) {
            $("#quote-text").html("<p id='quote-text'>" + "<i class='fa fa-quote-left'>" + "</i>" + "  " + response.quoteText + "</p>");
            if(response.quoteAuthor === '') {
                $("#quote-author").html("<p id = quote-author>" + " - Unknown" + "</p>");
            }
        
            else {
                    $("#quote-author").html("<p id = quote-author>" + "- " + response.quoteAuthor + "</p>");
               }
        
            quote = response.quoteText; 
            author = response.quoteAuthor; 
        }
    });
}

$(document).ready(function(){
    randomColor();
    
    changeColor();
    getQuote();
});

$(document).on('click', "#new-quote", function(){
    changeColor();
    getQuote();
});

$(document).on('click', "#tweet", function(){
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '"' + " " + author));
});