// Default JavaScript Functions and Initiations

// Setup WOW.js
var wow = new WOW({
  boxClass:     'animate-block',
  animateClass: 'active',
  offset:       1,
  mobile:       true,
  live:         true
});
// Initiate WOW.js
wow.init();

// Load Custom Google Font
WebFont.load({
  google: {
    families: ['Open Sans:400,700', 'Montserrat:400, 700']
  }
});

$(document).ready(function() {

  // Smooth Scroll Links - https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#]):not(.terms-link):not(.modal-close)').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  // Close Lightbox with ESC
  $(document).keyup(function(e) { 
    if (e.keyCode == 27) {
      if ( $('.modal').is(':visible') ) {
        window.location.href="#test-packages";
      }
    }
  });

  // Package Selection
  $('.button-package').on('click', function(e) {
    var $this = $(this),
        $link = $this.attr('href');
        $splitLink = $link.split("#");
        $option = $splitLink[1];

    e.preventDefault;

    $('#package option[data-package="' + $option + '"]').prop('selected', true);

    $('html, body').animate({
      scrollTop: $("#contact").offset().top
    }, 500);
  });

  // Form Submission
  $('.contact-form').on('submit', function(e) {
    var $this = $(this);
    var url = $this.attr("action");
    e.preventDefault();
    $this.before('<span class="loading contact-form-loading">Submitting, please wait...</span>');
    $this.addClass('disabled');
    // console.log('submit', e.target.value)
    var contactErrorMessage = "Whoops. There was an issue sending your enquiry / booking - please fill out the form and try again."
    var contactSuccessMessage = "One of our representatives will get in touch with you to confirm your booking."
    var contactSuccessHeading = "Your enquiry / booking was successfully sent", contactSuccessMessage = "One of our representatives will get in touch with you to confirm your booking."
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: url,
      data: $this.serialize(),
      beforeSend: function() {
        $this.prop("disabled", !0)
        $this.find(".contact-submit").attr("value", "Sending...")
        $this.find(".form-error").remove()
      },
      success: function (data) {
        $this.prop("disabled", !1)
        $this.find(".contact-submit").attr("value", "Submit Enquiry")
        $this.html('<div class="form-success text-center"><h2 class="heading-white heading-thank-you">' + contactSuccessHeading + "</h2><p>" + contactSuccessMessage + "</p></div>")
      },
      error: function (e) {
        $this.prop("disabled", !1)
        $this.find(".contact-submit").attr("value", "Submit Enquiry")
        $this.find("legend").after('<div class="form-error text-center">' + contactErrorMessage + "</div>")
        $("html,body").stop(!0, !0).animate({
          scrollTop: $("#contact").offset().top
        }, 500)
      },
      complete: function () {
        $('.contact-form-error').remove();
        $('.contact-form-loading').remove();
        $this.removeClass('disabled');        
      }
    });
  });
});