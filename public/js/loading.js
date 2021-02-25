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
    $("#findRecipe").html("Calculating...");
    window.location.href = "/getinstructions";
}
