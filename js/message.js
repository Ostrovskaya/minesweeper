class Message{
    constructor(){
        this.messageBlock = document.querySelector('.message');
        this.okBtn = document.querySelector('.ok');
        this.noBtn = document.querySelector('.no');
        this.info = document.querySelector('.info');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Menu} menu объект настроек.
     * @param {Board} board объект настроек.
     * @param {Score} score
     */
    init(menu, board, score) {
        this.menu = menu;
        this.board = board;
        this.score = score;
    }



    /**
     *Выводит ссобщение с результатом игры
     *
     * @param {String} text
     * @memberof Message
     */
    showMessage(text){
        this.messageBlock.classList.remove('hidden');
        this.info.innerText = text;
    }

    /**
     *Назначает обработчик собвытий на кнопки Да и Нет
     *
     * @param {Function} clickOk
     * @param {Function} clickNo
     * @memberof Message
     */
    addButtonsClickListeners(clickOk,clickNo){
        this.okBtn.addEventListener('click',clickOk );
        this.noBtn.addEventListener('click',clickNo );
    }

    /**
     *Обработчик события на кнопку Да
     *
     * @memberof Message
     */
    clickOk(){
        this.messageBlock.classList.add('hidden');
        this.board.removeBoard();
        this.menu.showMenu();
        this.score.hideScoreBlock();
    }

    /**
     *Обработчик события на кнопку Нет
     *
     * @memberof Message
     */
    clickNo(){
        this.messageBlock.classList.add('hidden');
    }

}