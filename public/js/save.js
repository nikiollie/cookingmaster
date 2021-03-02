// var saved = require('../saved.json');
// import saved  from '/app.js';
// import fs from 'fs';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('.recipe #remove').click(remove_recipe);

}

function removeAll(){
    document.getElementById("pie_button").style.display="none";
    document.getElementById("saveForm").style.display="none";
}


function remove_recipe(e) {
    e.preventDefault();
    var recipeName = $(this).closest('.recipe').attr('id');
    $(this).closest('.recipe').hide();
    $(this).hide();
    console.log("User clicked on recipe: " + recipeName);
    
    window.location.href = "/removerecipe/" + recipeName;
}