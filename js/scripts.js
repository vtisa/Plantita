$(document).ready(function(){
    // Inicializar el carrusel
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        fade: true,
        cssEase: 'linear'
    });

    // Manejar la bienvenida
    $('#enter-site').on('click', function() {
        $('.welcome-overlay').fadeOut();
    });

    // Efecto de parallax para el fondo
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('body').css('background-position-y', -(scrolled * 0.2) + 'px');
    });

    // Manejar el efecto de las tarjetas en dispositivos móviles
    if (window.innerWidth <= 768) {
        $(window).on('scroll', function() {
            $('.card').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('in-view');
                } else {
                    $(this).removeClass('in-view');
                }
            });
        });
    }
});

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}