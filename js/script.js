const buttons = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const tabHeader = document.querySelector('.tabheader__items');
const tab = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');
const timer = document.querySelectorAll('.timer__block');

const itemDesc = document.querySelector('.menu__item-descr');
const itemPrice = document.querySelector('.menu__item-total');
const itemSubtitle = document.querySelector('.menu__item-subtitle');
const itemPic = document.querySelector('.menu__item');
const menuContainer = document.querySelector('.menu__field .container');

// Modal Section

init = () => {
    setTimer();
    tabSection();
    calorieCalculation();
    modalSection();
};

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
        clearInterval(updateTimer);
    }
}

class PromoCard {
    constructor(subtitle, descr, price) {
        this.subtitle = subtitle;
        this.descr = descr;
        this.price = price;
        this.transfer = 70;
        this.convertUSdtoRub();
    }
    convertUSdtoRub = () =>
        new Intl.NumberFormat('ru-RU').format(this.price * this.transfer);
    markup() {
        return `
            <div class="menu__item">
                <img
                    src="img/tabs/vegy.jpg"
                    alt="vegy"
                />
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                        <span>${this.convertUSdtoRub()}</span> руб/день
                    </div>
                </div>
            </div>
        `;
    }
}

const descr1 =
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';

const subtitle1 = 'Меню "Фитнес" ';
const price1 = '269';

const card1 = new PromoCard(subtitle1, descr1, price1);

// console.log(card1.markup());

menuContainer.insertAdjacentHTML('afterbegin', card1.markup());
menuContainer.insertAdjacentHTML('afterbegin', card1.markup());
menuContainer.insertAdjacentHTML('afterbegin', card1.markup());

const calcChoose = document.querySelectorAll('.calculating__choose');
const calcChooseItem = document.querySelector('.calculating__choose-item');
const calcGender = document.querySelector('.calculating__choose_small');
const calcParam = document.querySelector('.calculating__choose_medium');
const calcHeight = document.querySelector('#height');
console.log(calcHeight);
const calcGenderItem = document.querySelectorAll(
    '.calculating__choose_small .calculating__choose-item',
);

const calcActivity = document.querySelector('.calculating__choose_small');
const calcActivityItem = document.querySelectorAll(
    '.calculating__choose_big .calculating__choose-item',
);

// console.log(calcActivityItem);
// console.log(tabHeader);

const calorieCalculation = () => {
    let sex = 'female',
        height,
        weight,
        age,
        ratio = 1.375,
        result = '2700';

    result = document.querySelector('.calculating__result span');
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
            );
        }
    }

    calcTotal();
    function getInfo(parentSelector, activeClass) {
        const elem = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', e => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                sex = e.target.getAttribute('id');
            }

            elem.forEach(item => {
                item.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);
            calcTotal();
        });
    }
    function getInput(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getInput('#height');
    getInput('#weight');
    getInput('#age');
    getInfo('.calculating__choose_small', 'calculating__choose-item_active');
    getInfo('.calculating__choose_big', 'calculating__choose-item_active');

    console.log(sex, height, weight, age, ratio);
};

// calorieCalculation();

init();
