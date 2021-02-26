$(document).ready(function() {
	initializePage();
})

function initializePage() {

    $("#saverecipe").click(saveRecipe);
}

function saveRecipe(e) {
	// Prevent following the link
    e.preventDefault();

    var recipeName = $("#recipeName").text();
    var serving = $("#serving").text();
    var ingredients = $(".ingredients").text();
    var instructions = $(".instructions").text();
    var url = $("#url").get_attribute('href');
    
    window.location.href = "/sendRecipe";

    
}