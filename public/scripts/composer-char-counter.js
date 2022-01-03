$(document).ready(function() {
  $(".new-tweet form textarea").on("input", function() {
    var totalLength = $(this).data("maxlength");
    var currentLength = $(this).val().length;
  
    if (currentLength > totalLength){
      $(".counter").css('cssText', 'color:red');
      $('.form-error')
        .html('<i class="fa fa-exclamation-triangle"></i>&nbsp;Tweet is too long. Consider shortening your tweet.</i>&nbsp;<i class="fa fa-exclamation-triangle"></i>')
        .slideDown(400);
    }
    else{
      $('.form-error').slideUp(400);
      $(".counter").css('cssText', 'color:#545149');
    }

    $(".counter").text(totalLength - currentLength);
  });
});