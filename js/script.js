'use strict';

window.addEventListener('DOMContentLoaded', () => {

    /** Tabs */
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
         
         
    function hideTabContent(){
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }  

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
        // POST request
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'success',
        failure: 'failure'
    };

    forms.forEach(item => postData(item));

    function postData(form) {
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

            const object = {};
            formData.forEach(function(value, key){
                object[key]=value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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

        function showThanksModal(message){
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

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));
});

