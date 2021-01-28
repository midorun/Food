import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

function forms(formsSelector, modalTimerId) {
    const forms = document.querySelectorAll(formsSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'success',
        failure: 'failure'
    };

    forms.forEach(item => bindPostData(item));

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
            openModal('.modal', modalTimerId);

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
                closeModal('.modal');
            }, 10000);
        }
    }
}

export default forms;