
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    clickButton();
}

function clickButton() {
	document.getElementById("findRecipe").click();
    $("#findRecipe").html("Getting instructions...");
    window.location.href = "/getrecipe";
}

function removeAll(){
    console.log("hi");
    document.getElementById("pie_button").style.display="none";
 
 
  
    document.getElementById("saveForm").style.display="none";
}
