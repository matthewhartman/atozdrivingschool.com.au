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
    e.preventDefault();
    $this.before('<span class="loading contact-form-loading">Submitting, please wait...</span>');
    $this.addClass('disabled');
    $.ajax({
      type: 'post',
      dataType: 'html',
      url: 'submit.php',
      data: $this.serialize(),
      success: function (data) {
        $this.remove('.loading');
        $this.html(data);
      },
      error: function () {
        $this.before('<span class="error contact-form-error">An error occurred while trying to submit your form. Please try again later.</span>')
      },
      complete: function () {
        $('.contact-form-error').remove();
        $('.contact-form-loading').remove();
        $this.removeClass('disabled');        
      }
    });
  });
});