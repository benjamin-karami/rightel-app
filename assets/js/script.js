//modal script
// Get the modal
var modal = document.getElementById("Modalcontent");

// Get the button that opens the modal
var btn = document.getElementById("modalTrigger");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
modal.onclick = function() {
  modal.style.display = "none";
};

// end modal script

// number script

$(document).ready(function() {
  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g
    ],
    fixNumbers = function(str) {
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };
  $("#msisdn-submit").click(function(e) {
    e.preventDefault();
    var checkbox = $("#cbx");
    var identity = $("#identity-number").val();
    var msisdn = $("#cellPhone-number").val();
    msisdn = msisdn.replace("_", "");
    msisdn = fixNumbers(msisdn);
    var ussdMtn = /(\+989|9|09)(30|33|35|36|37|38|39|01|02|03|04|05)\d{7}/.test(
      msisdn
    );
    var ussdRigh = /(\+989|9|09)(21|22|23|24|25|26|27|28|29)\d{7}/.test(msisdn);

    var ussdMci = /(^(\+989|9|09)(90|91|92)\d{7}$)|(^(\+9891|91|091)[0-9]\d{7}$)/.test(
      msisdn
    );
    if (
      (ussdMci && identity.length === 10 && checkbox.is(":checked")) ||
      (ussdMtn && identity.length === 10 && checkbox.is(":checked")) ||
      (ussdRigh && identity.length === 10 && checkbox.is(":checked"))
    ) {
      // $("#numberSend-form").submit();if
      console.log("every thing is ok");
    } else {
      if (!(identity.length === 10)) {
        $("#error-message").css("display", "flex");
        $("#error-message").addClass("slide-in-top");
        $(".error-message").html("کد ملی خود را کامل وارد کنید");
        setTimeout(function() {
          $("#error-message").removeClass("slide-in-top");
          $("#error-message").addClass("slide-out-top");
          setTimeout(function() {
            $("#error-message").css("display", "none");
            $("#error-message").removeClass("slide-out-top");
          }, 10);
        }, 3000);
        console.log("کد ملی خود را کامل وارد کنید");
      } else if (msisdn.length < 11 && identity.length === 10) {
        $("#error-message").css("display", "flex");
        $("#error-message").addClass("slide-in-top");
        console.log("شماره کامل وارد کنید");
        $(".error-message").html("شماره ات رو کامل وارد کن");
        setTimeout(function() {
          $("#error-message").removeClass("slide-in-top");
          $("#error-message").addClass("slide-out-top");
          setTimeout(function() {
            $("#error-message").css("display", "none");
            $("#error-message").removeClass("slide-out-top");
          }, 10);
        }, 3000);
      } else if (!checkbox.is(":checked")) {
        $("#error-message").css("display", "flex");
        $("#error-message").addClass("slide-in-top");
        $(".error-message").html("لطفا شرایط و قوانین را تیک بزنید");
        setTimeout(function() {
          $("#error-message").removeClass("slide-in-top");
          $("#error-message").addClass("slide-out-top");
          setTimeout(function() {
            $("#error-message").css("display", "none");
            $("#error-message").removeClass("slide-out-top");
          }, 10);
        }, 3000);
        console.log("لطفا شرایط و قوانین را تیک بزنید");
      } else if (msisdn.length === 11 && identity.length === 10) {
        if (!ussdMci || !ussdMtn || !ussdRigh) {
          $("#error-message").css("display", "flex");
          $("#error-message").addClass("slide-in-top");
          $(".error-message").html("شماره همراه صحیح وارد نمایید");
          setTimeout(function() {
            $("#error-message").removeClass("slide-in-top");
            $("#error-message").addClass("slide-out-top");
            setTimeout(function() {
              $("#error-message").css("display", "none");
              $("#error-message").removeClass("slide-out-top");
            }, 10);
          }, 3000);
          console.log("شماره صحیح وارد کنید");
        }
      }
    }
  });
});
