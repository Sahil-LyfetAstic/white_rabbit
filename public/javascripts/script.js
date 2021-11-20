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
            alert("user exist");
            form.reset();
          } else if (response.added === true) {
            alert("user addedd successfully");
            form.reset();
            $("#user-details").load(location.href + " #user-details");
          } else {
            alert("something went wrong");
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