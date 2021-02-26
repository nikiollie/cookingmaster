// function initializePage() {
// 	console.log("Page ready");
//  	initRSVPForm();
// }

// function initRSVPForm() {
//   // add your code here
//   $('#addAcountForm').submit(function(e) {
//   	e.preventDefault();
//   	console.log("submitting form ...")
//   	var name = $("#name").val();
//   	var description = $("#description").val();
//   	$.post('addRSVP', {name: name, description:description}, postCallback);  
//   });
//   function postCallback(res) {
//   	alert("RSVP form successfully submitted");
//   	$('#name').val('');
//   	$('#description').val('');
//   }
// }