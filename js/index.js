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

let button_id = 1;
let first = true;

const width = document.body.clientWidth - big_img.width;
const height = 600 - small_img.height - text2.clientHeight - big_img.width / 5;

text.style.transform = `translateX(0)`;

text.style.width = width + "px";
text.style.marginTop = height + "px";

window.addEventListener('resize', () => {
    const big_img = document.querySelector('.big-img');
    const small_img = document.querySelector('.small-img');

    const width = document.body.clientWidth - big_img.width;

    text.style.transform = `translateX(0)`;
    text.style.width = width + "px";

    const width2 = document.body.clientWidth - big_img.width;
    const height = (600 - small_img.height - text2.clientHeight - big_img.width / 5) < 0 ? 0 : small_img.height - text2.clientHeight - big_img.width / 5;

    text.style.width = width2 + "px";
    text.style.marginTop = height + "px";
})

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

left_arrow.addEventListener('click', () => {
    if (button_id == 1) {
        document.querySelector('[data-button-id="4"]').click();
        button_id = 4;
    } else document.querySelector(`[data-button-id="${button_id - 1}"]`).click();
});

right_arrow.addEventListener('click', () => {
    if (button_id == 4) {
        document.querySelector('[data-button-id="1"]').click();
        button_id = 1;
    } else document.querySelector(`[data-button-id="${button_id + 1}"]`).click();
});

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