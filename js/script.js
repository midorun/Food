window.addEventListener('DOMContentLoaded', () => {

    /**
     * Modal
     */

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalTimer = setInterval(openModal, 60000);

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimer);
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    /**
     * Tabs
     */

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /**
     * MenuCard
     */

    class MenuCard {

        constructor(img, alt, title, description, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }

        convertCurrency() {

        }

        render() {
            let card = document.createElement('div');
            if (this.classes.length) {
                this.classes.forEach(item => card.classList.add(item));
            } else {
                card.classList.add('menu__item');
            }
            card.innerHTML = `
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

            this.parentSelector.append(card);
        }
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    /** Alternative rendering of menu    
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fect ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    getResource('http://localhost:3000/menu')
        .then(data => render(data));

    function render(data) {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            let card = document.createElement('div');
            card.classList.add('menu__item');
            card.innerHTML = `
            <img src="${img}" alt="${altimg}">
            <h3 class="menu__item-subtitle">Меню "${title}"</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
        `;

            document.querySelector('.menu .container').append(card);
        });
    }
    */

    /**
     * PromoTimer
     */

    const deadline = '2021-3-24';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function changePromoTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    changePromoTimer('.timer', deadline);

    /**
     * Backend
     */

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'success',
        failure: 'failure'
    };

    forms.forEach(item => bindPostData(item));

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.offerSliderPreventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMsg);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMsg.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });


        });

        function showThanksModal(message) {
            const offerSliderPrevModalDialog = document.querySelector('.modal__dialog');

            offerSliderPrevModalDialog.classList.add('hide');
            openModal();

            const thanksModalDiv = document.createElement('div');
            thanksModalDiv.classList.add('modal__dialog');
            thanksModalDiv.innerHTML = `
            <div class="modal__content">
                    <div class="modal__close data-close">×</div>
                    <div class="modal__title">${message}</div>
            </div>
            `;

            document.querySelector('.modal').append(thanksModalDiv);

            setTimeout(() => {
                thanksModalDiv.remove();
                offerSliderPrevModalDialog.classList.add('show');
                offerSliderPrevModalDialog.classList.remove('hide');
                closeModal();
            }, 10000);
        }
    }

    /**
     * Slider
     */

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
        if (offset == +slideWidth.slice(0, slideWidth.length - 2) * (offerSlides.length - 1)) {
            offset = 0;
        } else {
            offset += +slideWidth.slice(0, slideWidth.length - 2);
        }
        changeInnerOffset();
        changeCounter(1);
        highlightDot(index);
    });

    offerSliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +slideWidth.slice(0, slideWidth.length - 2) * (offerSlides.length - 1);
        } else {
            offset -= +slideWidth.slice(0, slideWidth.length - 2);
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

                offset = +slideWidth.slice(0, slideWidth.length - 2) * (+index - 1);
                changeInnerOffset();
            }
        });
    });

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

    highlightDot();


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


    /** Personal customisation */

    // Отключение выделения счетчика и стрелок у слайдера
    const offerSliderCounter = document.querySelector('.offer__slider-counter');

    offerSliderCounter.addEventListener('mousedown', (e) => {
        e.offerSliderPreventDefault();
    });

});