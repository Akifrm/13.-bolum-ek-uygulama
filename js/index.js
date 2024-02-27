const buttons = document.querySelectorAll('.language_button');
import json from "./index.json" assert { type: "json" };

for (const button of buttons) {
    button.addEventListener('click', () => {
        if (!button.classList.value.includes('active')) {
            for (const button of buttons) {
                button.classList.remove('active');
            }
            button.classList.add('active');
        } else {
            for (const button of buttons) {
                button.classList.remove('active');
            }
            button.classList.add('active');
        }
    })
}

const slider = document.querySelector('.slider-img');
const big_img_div = document.querySelector('.big-img-div');
const big_img = document.querySelector('.big-img');
const small_img_div = document.querySelector('.small-img-div');
const small_img = document.querySelector('.small-img');
const button = document.querySelectorAll('.button');
const text = document.getElementsByClassName('text')[0];
const text2 = document.querySelector('.text');
const title = document.querySelector('.banner-title');
const paragraph = document.querySelector('.banner-paragraph');
const left_arrow = document.querySelector('.left-arrow');
const right_arrow = document.querySelector('.right-arrow');

if (big_img) {
    const width = big_img?.width <= 600 ? document.body.clientWidth - big_img.width : null;
    const height = big_img?.width <= 600 ? 600 - small_img.height - text2.clientHeight - big_img.width / 5 : null;

    text.style.width = width + "px";
    text.style.marginTop = height + "px";
}

window.addEventListener('resize', () => {
    const big_img = document.querySelector('.big-img');
    const small_img = document.querySelector('.small-img');
    if (big_img) {
        const width = big_img.width <= 600 ? document.body.clientWidth - big_img.width : null;
        const height = big_img.width <= 600 ? (600 - small_img.height - text2.clientHeight - big_img.width / 5) < 0 ? 0 : small_img.height - text2.clientHeight - big_img.width / 5 : null;

        text.style.width = width + "px";
        text.style.marginTop = height + "px";
    }
});

let animation = false;
document.querySelector('.header-menu-button').onclick = function () {
    if (animation) return;
    this.classList.toggle('header-menu-button-animation');
    setTimeout(() => {
        document.querySelector('.menu').classList.toggle('active');
    }, 1);

    animation = true;
    setTimeout(() => {
        animation = false;
    }, 400);
}

let button_id = 1, first = true;
for (const btn of button) {
    btn.addEventListener('click', () => {
        if (button_id == Number(btn.getAttribute('data-button-id'))) return;

        for (const btn2 of button) {
            btn2.classList.remove('active');
        }
        btn.classList.add('active');

        const data = {
            1: {
                title: 'Thought Leadership',
                paragraph: 'With over 10 years of experience helping businesses to find comprehensive solutions'
            },
            2: {
                title: 'Your Home In Europe',
                paragraph: 'Our institution began projects that its source is European Union in 2014.'
            },
            3: {
                title: 'Teaching Methodologies',
                paragraph: 'The courses are implemented by experts and with collaboration of local educational schools or institutes.'
            },
            4: {
                title: 'Automotive Automotive Automotive Automotive',
                paragraph: 'Globally, the market represents one of the most important pillars of the economy.'
            }
        }

        let data_button_id = Number(btn.getAttribute('data-button-id'));

        title.innerHTML = data[data_button_id].title;
        paragraph.innerHTML = data[data_button_id].paragraph;

        if (first) {
            slider.classList.add('active-slider');
            slider.classList.remove('active-slider2');
            big_img_div.innerHTML = `<img class="rounded-circle object-fit-cover big-img" src="${json[btn.getAttribute('data-button-id')].big_img}" >`;
            small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; transform: translateX(-10%)" src="${json[btn.getAttribute('data-button-id')].small_img}" >
<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: 100%;" src="${json[btn.getAttribute('data-button-id')].small_img}" >`;
            setTimeout(() => {
                const text_move = document.querySelector('.text');
                big_img_div.classList.add('active-big-img');
                big_img_div.classList.remove('active-big-img2');
                small_img_div.classList.add('small-img-animation');
                small_img_div.classList.remove('small-img-animation2');
                text_move.classList.add('text-move');
                text_move.classList.remove('text-move2');
            }, 1)
        } else {
            slider.classList.remove('active-slider');
            slider.classList.add('active-slider2');
            big_img_div.innerHTML = `<img class="rounded-circle object-fit-cover big-img" src="${json[btn.getAttribute('data-button-id')].big_img}" >`;
            small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; transform: translateX(-10%)" src="${json[btn.getAttribute('data-button-id')].small_img}" >
<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: 100%;" src="${json[btn.getAttribute('data-button-id')].small_img}" >`;
            setTimeout(() => {
                const text_move = document.querySelector('.text');
                big_img_div.classList.add('active-big-img2');
                big_img_div.classList.remove('active-big-img');
                small_img_div.classList.remove('small-img-animation');
                small_img_div.classList.add('small-img-animation2');
                text_move.classList.remove('text-move');
                text_move.classList.add('text-move2');
            }, 1);
        }

        button_id = data_button_id;
        first = !first
    });
};

const skills = document.querySelectorAll('.about-us-skill-main');

for (const skill_div of skills) {
    const skill_circles = [...skill_div.children].filter(x => x.classList.value.includes('about-us-skill-circle'));

    let rateStringChilderen = skill_div.children[skill_div.children.length - 1].children[0];
    let rateString = rateStringChilderen.innerText,
        rate = Number(rateString);

    let i = 0;
    function textAnimation(i) {
        if (i > rate) return;
        rateStringChilderen.innerText = i;
        setTimeout(() => textAnimation(++i), 25);
    }
    textAnimation(i);

    const num = skill_circles.length * 10 * rate / 1000,
        numbers = String(num).split('.'),
        numberFlatsToPainted = Number(numbers.shift()),
        littlePainted = numbers[0];

    function skill_func(i = 0) {
        if (i > Math.floor(num)) return;

        numberFlatsToPainted > i
            ? skill_circles[i].classList.add('skill-active')
            : skill_circles[i].style.backgroundColor = `rgba(36, 58, 148, .${littlePainted})`;
        setTimeout(() => skill_func(++i), 200);
    }
    let j = 0;
    skill_func(j);
}

left_arrow?.addEventListener('click', () => {
    if (button_id == 1) {
        document.querySelector('[data-button-id="4"]').click();
        button_id = 4;
    } else document.querySelector(`[data-button-id="${button_id - 1}"]`).click();
});

right_arrow?.addEventListener('click', () => {
    if (button_id == 4) {
        document.querySelector('[data-button-id="1"]').click();
        button_id = 1;
    } else document.querySelector(`[data-button-id="${button_id + 1}"]`).click();
});

const courses_page_right_search_bar_div = document.querySelector('.courses-page-right-search-bar-div');
const courses_page_right_search_bar = document.querySelector('.courses-page-right-search-bar');
courses_page_right_search_bar_div.onclick = function () {
    courses_page_right_search_bar.value += "tEst"
}

const courses_page_right_checkbox_a = document.querySelectorAll('.courses-page-right-checkbox-a');

for (const a of courses_page_right_checkbox_a) {
    a.addEventListener('click', (e) => {
        for (const b of document.querySelectorAll('.courses-page-right-checkbox-active-div')) {
            b.classList.remove('courses-page-right-checkbox-active');
        }
        for (const { children } of a.children) {
            for (const c of children) {
                if (c.classList.value.includes('courses-page-right-checkbox-active-div')) c.classList.add('courses-page-right-checkbox-active');   
            }
        }
    })
}

$('.slick').slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4e3,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    cssEase: 'linear',
    useTransform: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
        }
    ]
})

$('.slick-card').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }
    ]
})

$('.slick-erasmus').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }
    ]
})

$('.courses-page-slider').slick({
    arrows: false,
    dots: true
})