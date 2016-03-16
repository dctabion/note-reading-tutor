$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  // $('.modal-instructions-trigger').leanModal(
  //   {
  //
  //   });
  //
    var url = $(".video-container iframe").attr('src');
    // var url;
    console.log('url: ', url);

    $('.modal-instructions-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() {
          console.log('Ready');
          $(".video-container, iframe").attr('src', url);

        }, // Callback for Modal open
        complete: function() {
          console.log('Closed');
          $(".video-container, iframe").attr('src', '');
        } // Callback for Modal close
      }
    );

  var page = $('#page').html();

  if ( page == "index" ) {
    if(sessionStorage.getItem('popState') != 'shown'){
      console.log('got index!!');
      $('#modal-instructions').openModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() {
          console.log('Ready');
          $(".video-container, iframe").attr('src', url);

        }, // Callback for Modal open
        complete: function() {
          console.log('Closed');
          $(".video-container, iframe").attr('src', '');
        } // Callback for Modal close
      });
      sessionStorage.setItem('popState','shown')
    }
  }

  // $('#modal-instructions').openModal();

 });
