// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#findRecipe').click(findRecipe);
}

function findRecipe(e) {
	// Prevent following the link
	e.preventDefault();

    var dish = $("#dish").val();
    var serving = $("#serving").val();
    var optional = $("#optional").val();

	$.get("http://", callBackFn(dish, serving, optional));
}

function callBackFn(dish, serving, optional) {
    $("#findRecipe").html("Searching...");
    window.location.href = "/dishname/" + dish + "/serving/" + serving + "/optional/" + optional;
}