function slider() {
    const total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        offerSliderPrev = document.querySelector('.offer__slider-prev'),
        offerSliderNext = document.querySelector('.offer__slider-next'),
        offerSlides = document.querySelectorAll('.offer__slide'),
        offerSliderWrapper = document.querySelector('.offer__slider-wrapper'),
        offerSliderInner = document.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(offerSliderWrapper).width,
        offerSlider = document.querySelector('.offer__slider');

    let index = 1,
        offset = 0;

    total.textContent = getZero(offerSlides.length);

    offerSlider.style.position = 'relative';
    offerSliderInner.style.width = `${100 * offerSlides.length}%`;
    offerSliderWrapper.style.overflow = `hidden`;

    offerSlides.forEach(slide => {
        slide.style.width = slideWidth;
    });

    offerSliderNext.addEventListener('click', () => {
        if (offset == valueToNumber(slideWidth) * (offerSlides.length - 1)) {
            offset = 0;
        } else {
            offset += valueToNumber(slideWidth);
        }
        changeInnerOffset();
        changeCounter(1);
        highlightDot(index);
    });

    offerSliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = valueToNumber(slideWidth) * (offerSlides.length - 1);
        } else {
            offset -= valueToNumber(slideWidth);
        }
        changeInnerOffset();
        changeCounter(-1);
        highlightDot(index);
    });

    changeCounter();

    let carouselIndicators = document.createElement('ol');
    carouselIndicators.classList.add('carousel-indicators');
    offerSlider.append(carouselIndicators);

    offerSlides.forEach((item, i) => {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('index', i + 1);
        carouselIndicators.append(dot);
    });

    let dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            dots.forEach(dot => dot.classList.remove('dot-active'));
            if (e.target && e.target.classList.contains('dot')) {
                e.target.classList.add('dot-active');

                index = e.target.getAttribute('index');
                current.textContent = getZero(index);

                offset = valueToNumber(slideWidth) * (+index - 1);
                changeInnerOffset();
            }
        });
    });

    highlightDot();

    function valueToNumber(value) {
        return +value.replace(/\D/g, '');
    }

    function changeInnerOffset() {
        offerSliderInner.style.transform = `translateX(-${offset}px)`;
    }

    function changeCounter(n = 0) {
        index += n;
        if (index > offerSlides.length) {
            index = 1;
        }
        if (index < 1) {
            index = offerSlides.length;
        }

        current.textContent = getZero(+index);
    }

    function highlightDot(index = 1) {
        dots.forEach(dot => dot.classList.remove('dot-active'));
        dots[index - 1].classList.add('dot-active');
    }

    /** 1 Вариант
     * showSlide(index);

        total.textContent = getZero(+total.textContent);

        function showSlide(n) {
            if (n > offerSlides.length) {
                index = 1;
            }
            if (n < 1) {
                index = offerSlides.length;
            }
            offerSlides.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hide');
            });

            offerSlides[index - 1].classList.remove('hide');
            offerSlides[index - 1].classList.add('show');

            current.textContent = getZero(+index);
        }

        offerSliderNext.addEventListener('click', () => {
            showSlide(++index);
        });

        offerSliderPrev.addEventListener('click', () => {
            showSlide(--index);
        });
        
    */
}

export default slider;