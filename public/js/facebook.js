
$(document).ready(function() {
	initializePage();
})

function initializePage() {
    $('#signin').hide();

}


function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  function statusChangeCallback(response) {
    console.log('Facebook login status changed.');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.

        // data_file.user.accessToken = response.authResponse.accessToken;
        // data_file.user.signedRequest = response.authResponse.signedRequest;

          console.log('Successfully logged in with Facebook');
           FB.api('/me?fields=name,first_name,picture.width(480)', changeUser);
    }
  }

  function changeUser(response) {
    //Add code to change name and image 
    $('#signin').show();
    $('.facebookLogin').hide();
    $('.fbloginbutton').hide();
    $('.loginLogo').hide();
    $('.loginTitle').hide();
    $('#name').text(response.name);
    $('#photo').attr("src", response.picture.data.url);


    $('#signin').click(sendAccountData);

    function sendAccountData(e) {
        // Prevent following the link
        e.preventDefault();
    
        window.location.href = '/index/user/' + response.name;
        
    }

  }
  