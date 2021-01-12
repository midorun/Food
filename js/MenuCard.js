'use strict';

window.addEventListener('DOMContentLoaded', () => {
    class MenuCard{

        constructor(img, alt, title, description, price, parentSelector, ...classes){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.render();
        }
    
        convertCurrency(){
            
        }
    
        render(){
            let card = document.createElement('div');
            this.classes.forEach(item => card.classList.add(item));
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
    
    const cardOne = new MenuCard('img/tabs/vegy.jpg', 
                                'vegy',
                                'Фитнес',
                                'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                                229,
                                '.menu .container',
                                'menu__item')
                                ;
    
    const cardTwo = new MenuCard('img/tabs/elite.jpg', 
                                'premium',
                                'Премиум',
                                'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                                550,
                                '.menu .container',
                                'menu__item');
    
    const cardThree = new MenuCard('img/tabs/post.jpg', 
                                'post',
                                'Постное',
                                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                                430,
                                '.menu .container',
                                'menu__item');
    
    
    
    
});
