class Menu {
    constructor(){
        this.startBtn = document.querySelector('.menu__button');
        this.menu = document.querySelector('.menu');
    }

    /**
     * Метод назначает переданную функцию в качестве обработчика
     * события клика на кнопку "Старт".
     * @param {Function} startBtnClickHandler 
     */
    addButtonsClickListeners(startBtnClickHandler) {
        this.startBtn.addEventListener('click', startBtnClickHandler);
    }

    /**
     *Функция скрывает меню
     *
     * @memberof Menu
     */
    hideMenu(){
        this.menu.classList.add('hidden');
    }

     /**
     *Функция показывает меню
     *
     * @memberof Menu
     */
    showMenu(){
        this.menu.classList.remove('hidden');
    }

    


}