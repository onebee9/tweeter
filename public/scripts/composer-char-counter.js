$(document).ready(function() {
  $(".new-tweet form textarea").on("input", function() {
    var totalLength = $(this).data("maxlength");
    var currentLength = $(this).val().length;
  
    if (currentLength > totalLength){
      $(".counter").css('cssText', 'color:red');
      //$( "textarea" ).parent( ".selected" ).css( "background", "yellow" );
    }
    else{
      $(".counter").css('cssText', 'color:#545149');
    }

    $(".counter").text(totalLength - currentLength);
  });
});