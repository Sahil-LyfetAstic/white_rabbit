$("#add-user").on("click", () => {
  $("#add-user").validate({
    rules: {
      fname: {
        required: true,
      },
      lname: {
        required: true,
      },
      email: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 10,
        maxlength: 10,
      },
      Introduction: {
        required: true,
      },
      Achievements: {
        required: true,
      },
      Experience: {
        required: true,
        minlength: 1,
        maxlength: 2,
      },
    },
    highlight: function (element) {
      $(element).css("border-color", "red");
      $(element).parent().addClass("error");
    },
    unhighlight: function (element) {
      $(element).css("border-color", "green");
      $(element).parent().removeClass("error");
    },

    submitHandler: (form) => {
      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        success: (response) => {
          if (response.user === true) {
            $('#error-msg').html('user already exist').css('color','red').show().delay(1000).hide(0)
            form.reset();
          } else if (response.added === true) {
            $('#error-msg').html('successfully addedd').css('color','green').show().delay(1000).hide(0)
            form.reset();
            $("#user-details").load(location.href + " #user-details");
          } else {
            $('#error-msg').html('something went wrong').css('color','red').show().delay(1000).hide(0)
            form.reset();
          }
        },
      });
    },
  });
});


$(document).ready(function () {
    $('#user-table').DataTable();
  });