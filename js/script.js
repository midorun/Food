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
        clearInterval(modalTimer);
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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fect ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // getResource('http://localhost:3000/menu')
    //     .then(data => render(data));

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
            e.preventDefault();

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
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
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
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 10000);
        }
    }

    /**
     * Slider
     */
    let index = 1,
        offset = 0;
    const total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesInner = document.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(slidesWrapper).width;

    /** 1 Вариант
     * showSlide(index);

        total.textContent = getZero(+total.textContent);

        function showSlide(n) {
            if (n > slides.length) {
                index = 1;
            }
            if (n < 1) {
                index = slides.length;
            }
            slides.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hide');
            });

            slides[index - 1].classList.remove('hide');
            slides[index - 1].classList.add('show');

            current.textContent = getZero(+index);
        }

        next.addEventListener('click', () => {
            showSlide(++index);
        });

        prev.addEventListener('click', () => {
            showSlide(--index);
        });
        
    */

    /** 2 Вариант */
    slidesInner.style.cssText = `
        width: ${100 * slides.length}%;
        display: flex;
        transition: 0.5s all;
    `;

    slidesWrapper.style.cssText = `overflow: hidden`;

    slides.forEach(slide => {
        slide.style.width = slideWidth;
    });

    next.addEventListener('click', () => {
        if (offset == +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +slideWidth.slice(0, slideWidth.length - 2)
        }
        slidesInner.style.transform = `translateX(-${offset}px)`;
        changeCounter(1);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1);
        } else {
            offset -= +slideWidth.slice(0, slideWidth.length - 2);
        }
        slidesInner.style.transform = `translateX(-${offset}px)`;
        changeCounter(-1);
    });

    total.textContent = getZero(+total.textContent);

    function changeCounter(n = 0) {
        console.log('call');
        index += n;
        if (index > slides.length) {
            index = 1;
        }
        if (index < 1) {
            index = slides.length;
        }

        current.textContent = getZero(+index);
    }

    changeCounter();
});