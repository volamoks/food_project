const buttons = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const tabHeader = document.querySelector('.tabheader__items');
const tab = document.querySelectorAll('.tabheader__item');
const tabContent = document.querySelectorAll('.tabcontent');
const timer = document.querySelectorAll('.timer__block');

// Modal Section

init = () => {
    setTimer();
    tabSection();
    calorieCalculation();
    // modalSection();
    slider();
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
    showModalByTime();
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
        if (e.target.classList.contains('tabheader__item'))
            tab.forEach((item, i) => {
                if (e.target == item) {
                    hidePics(tabContent);
                    showPics(tabContent, i);
                }
            });
    });
    hidePics();
    showPics(tabContent, (i = 0));
};

const addZero = time => {
    return time >= 0 && time < 10 ? '0' + time : time;
};

//timer
function setTimer() {
    const finalDate = new Date('2023-03-01');

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

//cards section

const itemDesc = document.querySelector('.menu__item-descr');
const itemPrice = document.querySelector('.menu__item-total');
const itemSubtitle = document.querySelector('.menu__item-subtitle');
const itemPic = document.querySelector('.menu__item');
const menuContainer = document.querySelector('.menu__field .container');

const getData = async url => {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status}`);

    return await res.json();
};

getData('http://localhost:3000/menu').then(data =>
    data.forEach(({ img, altimg, title: subtitle, descr, price }) => {
        console.log(img, altimg, subtitle, descr, price);
        new PromoCard(
            img,
            altimg,
            subtitle,
            descr,
            price,
            menuContainer,
        ).render();
    }),
);

class PromoCard {
    constructor(img, altimg, subtitle, descr, price, selector) {
        this.img = img;
        this.altimg = altimg;
        this.subtitle = subtitle;
        this.descr = descr;
        this.price = price;
        this.transfer = 17;
        this.convertUSdtoRub();
        this.parent = selector;
    }

    convertUSdtoRub = () =>
        new Intl.NumberFormat('ru-RU').format(this.price * this.transfer);

    render() {
        // const element = document.createElement('div');

        let markup = `
            <div class="menu__item">
                <img
                    src="${this.img}"
                    alt="${this.altimg}"
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
        this.parent.insertAdjacentHTML('beforeend', markup);
    }
}

const calcChoose = document.querySelectorAll('.calculating__choose');
const calcChooseItem = document.querySelector('.calculating__choose-item');
const calcGender = document.querySelector('.calculating__choose_small');
const calcParam = document.querySelector('.calculating__choose_medium');
const calcHeight = document.querySelector('#height');
// console.log(calcHeight);
const calcGenderItem = document.querySelectorAll(
    '.calculating__choose_small .calculating__choose-item',
);

const calcActivity = document.querySelector('.calculating__choose_small');
const calcActivityItem = document.querySelectorAll(
    '.calculating__choose_big .calculating__choose-item',
);

const calorieCalculation = () => {
    let sex =
            localStorage.getItem('sex') ||
            localStorage.setItem('sex', 'female'),
        height,
        weight,
        age,
        ratio =
            localStorage.getItem('ratio') ||
            localStorage.setItem('ratio', 1.35);

    let result = document.querySelector('.calculating__result span');

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

    function getInfo(selector, activeClass) {
        const elem = document.querySelectorAll(selector);

        elem.forEach(item =>
            item.addEventListener('click', e => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem(
                        'ratio',
                        +e.target.getAttribute('data-ratio'),
                    );
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elem.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            }),
        );
    }

    getInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getInput(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
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
    getInfo(
        '.calculating__choose_small div',
        'calculating__choose-item_active',
    );

    function initCalc(selector, activeClass) {
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            item.classList.remove(activeClass);

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (
                item.getAttribute('data-ratio') ===
                localStorage.getItem('ratio')
            ) {
                item.classList.add(activeClass);
            }
        });
    }

    initCalc(
        '.calculating__choose_small div',
        'calculating__choose-item_active',
    );
    initCalc('.calculating__choose_big div', 'calculating__choose-item_active');
};

//slider

const slider = () => {
    const sliderContent = document.querySelector('.offer__slider-wrapper'),
        slides = document.querySelectorAll('.offer__slide'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slidesWraper = document.querySelector('.offer__slider'),
        slidesWindow = document.querySelector('.slider_inner'),
        width = window.getComputedStyle(slidesWraper).width;

    slidesIndex = 1;
    offset = 0;
    numOfSlide = slides.length;
    finalSlide = width.replace(/\D/g, '') * (numOfSlide - 1);

    total.textContent = addZero(numOfSlide);
    current.textContent = addZero(slidesIndex);

    slidesWindow.style.display = 'flex';
    slidesWindow.style.width = 100 * numOfSlide + '%';
    slidesWindow.style.transition = '0.5s all';
    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => (slide.style.width = width));

    next.addEventListener('click', () => {
        offset == +finalSlide
            ? (offset = 0)
            : (offset += +width.replace(/\D/g, '')),
            (slidesWindow.style.transform = `translateX(-${offset}px)`);

        slidesIndex == numOfSlide ? (slidesIndex = 1) : slidesIndex++;
        current.textContent = addZero(slidesIndex);
    });

    prev.addEventListener('click', () => {
        offset == 0
            ? (offset = finalSlide)
            : (offset -= +width.replace(/\D/g, '')),
            (slidesWindow.style.transform = `translateX(-${offset}px)`);

        slidesIndex == 1 ? (slidesIndex = numOfSlide) : slidesIndex--;
        current.textContent = addZero(slidesIndex);
    });
};

init();
