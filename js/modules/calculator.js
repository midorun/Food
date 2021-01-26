function calculator() {
    let calculatingResult = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');

    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);

    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.2;
        localStorage.setItem('ratio', ratio);
    }


    function initLocalSettings(selector, activityClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activityClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activityClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activityClass);
            }
            if (element.getAttribute('id') === 'height') {
                height = +localStorage.getItem('height');
                element.value = localStorage.getItem('height');
            }
            if (element.getAttribute('id') === 'weight') {
                weight = localStorage.getItem('weight');
                element.value = localStorage.getItem('weight');
            }
            if (element.getAttribute('id') === 'age') {
                age = localStorage.getItem('age');
                element.value = localStorage.getItem('age');
            }
        });


    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calculateTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            calculatingResult.textContent = '___';
            return;
        }

        if (sex === 'male') {
            calculatingResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            calculatingResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calculateTotal();

    function getStaticInformation(selector, activityClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activityClass);
                });

                e.target.classList.add(activityClass);

                calculateTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.cssText = `box-shadow: 0 4px 20px rgba(161, 17, 17, 0.9)`;
            } else {
                input.style.cssText = ``;
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
            }

            calculateTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calculator;