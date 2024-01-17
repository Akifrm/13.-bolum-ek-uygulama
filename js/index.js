const buttons = document.querySelectorAll('.language_button');


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