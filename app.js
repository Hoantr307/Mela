const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const navCart = $('.header-navbar__cart')
const btn = $$('.header-menu .btn')
const cartNode = $('.cart-drawer')
const slides = $$(".featured-swiper-item");
const btnPrev = $(".button-prev.featured-btn")
const btnNext = $(".button-next.featured-btn")
const slickTrack = $(".slick-track")
const slickItem = $$(".slick-item")
const btnProductPrev = $(".btn-product-prev")
const btnProductNext = $(".btn-product-next")
const dots = $$(".swiper-pagination-bullet");


let slideIndex = 1;
let currentIndex = -1;
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const app = {
    product: [{
            name: 'The Original Watermelon',
            price: 33.99,
            image: './assets/img/...'
        },
        {
            name: 'The Original Watermelon',
            price: 33.99,
            image: './assets/img/...'
        },
        {
            name: 'The Original Watermelon',
            price: 33.99,
            image: './assets/img/...'
        },
        {
            name: 'The Original Watermelon',
            price: 33.99,
            image: './assets/img/...'
        },

    ]
}



function handleEvent() {

    // Su kien click cua menu
    btn.forEach((item) => {
        let menu = [
            'shop',
            'learn',
            'findus',
            'contact',
        ]
        item.onclick = function (e) {
            const itemNode = e.target.closest('.btn:not(.btn--active)')

            if (itemNode) {
                currentIndex = Number(itemNode.dataset.index)
            }

            // Them class btn--active
            e.target.classList.add('btn--active')
            if (currentIndex !== 2) {
                document.querySelector('.nav-container[name="' + menu[currentIndex] + '"]')
                    .classList.add('visible')
            }

            // Xóa Active cũ
            if (currentIndex !== -1) {
                const btnOldActive = document.querySelector('.btn--active:not([data-index="' + currentIndex + '"])')
                if (btnOldActive !== null) {
                    btnOldActive.classList.remove('btn--active')
                }
            }
        }

        // Su kien blur cua menu
        item.onblur = function () {
            const visibleNode = document.querySelector('.nav-container.visible');
            if (visibleNode !== null) {
                visibleNode.classList.remove('visible')
                document.querySelector('.btn.btn--active').classList.remove('btn--active')
            }
        }

    })

    // Su kien click nut nav cart
    navCart.onclick = function (e) {
        cartNode.style.width = "500px"
        $('.overlay').style.display = "block"
    }

    cartNode.onclick = (e) => {
        if (e.target.closest('.cart-drawer .close-drawer')) {
            cartNode.style.width = "0"
            $('.overlay').style.display = "none"
        }
    }

    $('.overlay').onclick = function (e) {
        cartNode.style.width = "0"
        e.target.style.display = "none"
    }

    btnPrev.onclick = function (e) {
        plusSlides(-1)
    }

    btnNext.onclick = function (e) {
        plusSlides(1)
    }

    btnProductNext.onclick = function () {
        slickTrack.scrollLeft  += slickItem[0].clientWidth
    }
    btnProductPrev.onclick = function () {
        
        slickTrack.scrollLeft  -= slickItem[0].clientWidth
    }

    dots.forEach((item, index) => {
        item.onclick = function() {
            currentSlide(index + 1)
        }
    })
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
  

function plusSlides(n) {
    showSlides(slideIndex += n);
}


function showSlides(n) {
    let i;
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) { 
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" swiper-pagination-bullet-active", "");
    }
    slides[slideIndex - 1].style.display = "block"
    dots[slideIndex-1].className += " swiper-pagination-bullet-active";
}

showSlides(slideIndex);

handleEvent();
