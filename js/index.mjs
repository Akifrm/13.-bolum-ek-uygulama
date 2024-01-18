const buttons = document.querySelectorAll('.language_button');
import json from "./index.json" assert { type: "json" };;

buttons[0].addEventListener('click', () => {
    if (!buttons[0].classList.value.includes('active')) {
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    }
    else {
        buttons[1].classList.remove('active');
        buttons[0].classList.add('active');
    }
});

buttons[1].addEventListener('click', () => {
    if (!buttons[1].classList.value.includes('active')) {
        buttons[1].classList.add('active');
        buttons[0].classList.remove('active');
    }
    else {
        buttons[1].classList.remove('active');
        buttons[0].classList.add('active');
    }
});

const slider = document.querySelector('.slider-img');
const big_img_div = document.querySelector('.big-img-div');
const big_img = document.querySelector('.big-img');
const small_img_div = document.querySelector('.small-img-div');
const small_img = document.querySelector('.small-img');

setInterval(() => {
    big_img.classList.add('active-big-img');
    big_img.classList.remove('active-big-img2');
    setTimeout(() => {
        big_img.classList.remove('active-big-img');
        big_img.classList.add('active-big-img2');
    }, 1000);
}, 2000)

const button = document.querySelectorAll('.button');
let button_id = 1;
for (const btn of button) {
    btn.addEventListener('click', () => {
        for (const btn2 of button) {
            btn2.classList.remove('active');
        }
        btn.classList.add('active');

        let data_button_id = Number(btn.getAttribute('data-button-id'));
        let j = Math.abs(button_id - data_button_id);
        console.log(j)
        if (j > 1) {
            let i = 0;
            function run() {
                changebutton(button_id + i).then(() => {
                    i++;
                    if (i == j) return;
                    run();
                })
            }
            run()
        } else {
            changebutton()
        }
        async function changebutton(button_id) {
            if (button_id) return new Promise(res => {
                // console.log(button_id)
                if (button_id % 2 == 0) {
                    slider.classList.add('active-slider');
                    slider.classList.remove('active-slider2');
                    big_img_div.innerHTML = `<img class="position-absolute top-0 img-fluid rounded-circle object-fit-cover z-n1 big-img" style="right: -4%;" src="${json[button_id].big_img}" >`;
                    small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: -2rem;" src="${json[button_id].small_img}" >`;
                } else {
                    slider.classList.remove('active-slider');
                    slider.classList.add('active-slider2');
                    big_img_div.innerHTML = `<img class="position-absolute top-0 img-fluid rounded-circle object-fit-cover z-n1 big-img" style="right: -4%;" src="${json[button_id].big_img}" >`;
                    small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: -2rem;" src="${json[button_id].small_img}" >`;
                }
                setTimeout(() => {
                    res()
                }, 1000);
            })
            else {
                if (Number(btn.getAttribute('data-button-id')) % 2 == 0) {
                    slider.classList.add('active-slider');
                    slider.classList.remove('active-slider2');
                    big_img_div.innerHTML = `<img class="position-absolute top-0 img-fluid rounded-circle object-fit-cover z-n1 big-img" style="right: -4%;" src="${json[btn.getAttribute('data-button-id')].big_img}" >`;
                    small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: -2rem;" src="${json[btn.getAttribute('data-button-id')].small_img}" >`;
                } else {
                    slider.classList.remove('active-slider');
                    slider.classList.add('active-slider2');
                    big_img_div.innerHTML = `<img class="position-absolute top-0 img-fluid rounded-circle object-fit-cover z-n1 big-img" style="right: -4%;" src="${json[btn.getAttribute('data-button-id')].big_img}" >`;
                    small_img_div.innerHTML = `<img class="position-absolute bottom-0 img-fluid rounded-circle object-fit-cover z-n1 small-img" style="width: 320px; height: 320px; left: -2rem;" src="${json[btn.getAttribute('data-button-id')].small_img}" >`;
                }
            }
        }
        button_id = data_button_id;
    })
}