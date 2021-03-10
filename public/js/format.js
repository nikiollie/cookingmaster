// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    reformatIngredients();
    reformatInstructions();
}

function reformatIngredients() {

    var ingredients = $("#ing").text();
    ingredients = ingredients.split("<br>");
    for (var i = 0; i < ingredients.length; i++) {
        if (i > 4 && ingredients[i] != "" && ingredients[i] != " ") {
            $(".ingredients").append("<li>" + ingredients[i] + "</li>");
        }
    }

}

function reformatInstructions() {
  
    var instructions = $("#instr").text();
    instructions = instructions.split("<br>");
    for (var i = 0; i < instructions.length; i++) {
        $(".instructions").append("<li>" + instructions[i] + "</li>");
    }

}



