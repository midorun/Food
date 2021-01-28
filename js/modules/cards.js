function cards() {
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
}

export default cards;