$(document).ready(function() {

  $("a[data-toggle='tooltip']").tooltip();
  $("[data-toggle='tooltip']").tooltip();
  $("i[data-toggle='tooltip']").tooltip();
  $("i[data-toggle='popover']").popover();
});
function formSubmit(form)
{

    var submit = $("input[type=submit]",form);;
    var oldButtonValue = submit.html()
    submit.html("Processing <i class='fa fa-spinner fa-spin'></i>");
    submit.attr("disabled", "true");
    $.ajax({
      type: 'POST',
        url: form.attr("action"),
        data: form.serialize(),
        dataType: 'json',
        success: function(data)
        {
         console.log(data)
          if(data.success)
          {
            if(data.goURL){ 
            window.location.href = data.goURL;
            } 

            if(data.reload){

               location.reload();

            }
            if(data.message) {
               
            $('.message').hide();
            $('.message').html("<div class='alert alert-success'>"+data.message+"</div>");
            $('.message').fadeIn();
            submit.html(oldButtonValue);
            submit.removeAttr("disabled")
            form[0].reset();

            } 

            if(data.show) {
               
               $(form).slideUp();
               $('#'+data.show).slideDown();


            }     
           }
         else {
            submit.html(oldButtonValue);
            submit.removeAttr("disabled")
            $('.message').hide();
            $('.message').html("<div class='alert alert-danger'>"+data.message+"</div>");
            $('.message').fadeIn();
         }
        }
  });
    return false;
}
