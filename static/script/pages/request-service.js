document.addEventListener('DOMContentLoaded', () => {

    // Counter Inputs
    document.querySelectorAll('.counter').forEach(card => {
        const increment = card.querySelector('.incrementBtn');
        const decrement = card.querySelector('.decrementBtn');
        const input = card.querySelector('.count');

        increment.addEventListener('click', () => {
            input.value = parseInt(input.value) + 1;
        });

        decrement.addEventListener('click', () => {
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

   

});