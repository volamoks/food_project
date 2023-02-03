const buttons = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const tabHeader = document.querySelector('.tabheader__items');
const tab = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');
const timer = document.querySelectorAll('.timer__block');

// Modal Section
function modalSection() {
    const showModal = () => {
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    buttons.forEach(item => item.addEventListener('click', () => showModal()));

    modalClose.addEventListener('click', () => closeModal());

    const showModalByTime = () => {
        const showModalByInterval = setInterval(showModal, 3000);
        modalClose.addEventListener('click', () =>
            clearInterval(showModalByInterval),
        );
    };
    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            showModal();
            document.removeEventListener('scroll', showModalByScroll);
        }
    }
    document.addEventListener('scroll', showModalByScroll);

    document.addEventListener('keydown', e => {
        if ((e.code = 'Escape')) closeModal();
    });

    document.addEventListener('click', e => {
        if (e.target == modal) closeModal();
    });
    // showModalByTime();
}

// TAB Section
const tabSection = function () {
    const hidePics = () =>
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');

            tab.forEach(item =>
                item.classList.remove('tabheader__item_active'),
            );
        });

    const showPics = (_, i = 0) => {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tab[i].classList.add('tabheader__item_active');
    };

    tabHeader.addEventListener('click', e => {
        if (e.target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (e.target == item) {
                    hidePics(tabContent);
                    showPics(tabContent, i);
                }
            });
        }
    });
    hidePics();
    showPics(tabContent, (i = 0));
};

//timer
function setTimer() {
    const finalDate = new Date('2024-03-01');

    const timeRemaining = finaldate => {
        const timeDiff = finaldate - new Date();

        const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
        const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        return { days, hours, minutes, seconds, timeDiff };
    };

    const timer = document.querySelector('.timer'),
        days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    const addZero = function (time) {
        if (time >= 0 && time < 10) {
            return '0' + time;
        } else return time;
    };

    updateTimer = setInterval(update, 1000);

    update();

    function update() {
        t = timeRemaining(finalDate);
        days.innerHTML = addZero(t.days);
        hours.innerHTML = addZero(t.hours);
        minutes.innerHTML = addZero(t.minutes);
        seconds.innerHTML = addZero(t.seconds);
    }

    if (t.timeDiff < 0) {
        days.innerHTML = 0;
        hours.innerHTML = 0;
        minutes.innerHTML = 0;
        seconds.innerHTML = 0;

        clearInterval(updateTimer);
    }
}

(init = () => {
    setTimer();
    tabSection();
    modalSection();
    setTimer();
})();
