window.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalTimer = setInterval(openModal, 60000);

    function closeModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.key == 'Escape'){
            closeModal();
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }    
    window.addEventListener('scroll', showModalByScroll);
});