$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-instructions-trigger').leanModal();

  var page = $('#page').html();

  if ( page == "index" ) {
    if(sessionStorage.getItem('popState') != 'shown'){
      console.log('got index!!');
      $('#modal-instructions').openModal();
      sessionStorage.setItem('popState','shown')
    }
  }

  // $('#modal-instructions').openModal();

 });
