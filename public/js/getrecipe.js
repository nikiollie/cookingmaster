// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})
var check = false;
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    document.getElementById("patient").style.display = "none";
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
    console.log(check)
    if (check) {
      $("#findRecipe").html("Getting ingredients...");
      document.getElementById("patient").style.display = "block";
      window.location.href = "/dishname/" + dish + "/serving/" + serving + "/optional/" + optional;
    }
}

function validateForm() {
  var x = document.forms["myForm"]["dish"].value;
  var y = document.forms["myForm"]["serving"].value;
  console.log(x)
  if (x == "" || y == "") {
    alert("Dish/Serving Size must be filled out");
    check = false;
    return false;
  }
  check = true;

}