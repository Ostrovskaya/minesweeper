class Game {
    constructor(){
        this.tickId= null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     *
     * @param {Settings} settings
     * @param {Board} board
     * @param {Mines} mines
     * @param {Menu} menu
     * @param {Flags} flags
     * @param {Score} score
     * @param {Numbers} numbers
     * @param {Message} message
     * @memberof Game
     */
    init(settings, board, mines, menu, flags, score, numbers, message) {
        this.settings = settings;
        this.board = board;
        this.menu = menu;
        this.score = score;
        this.flags = flags;
        this.mines = mines;
        this.numbers = numbers;
        this.message = message;
    }


    /**
     *Метод, запускающий игру
     *
     * @memberof Game
     */
    start(){
        this.menu.hideMenu();
        this.settings.init(this.settings.getSettings());
        this.board.renderBoard();
        this.board.initEventHandlers(this.leftBtnClick.bind(this), this.rightBtnClick.bind(this), this.doubleBtnClick.bind(this));
        this.score.init(this.settings, this.flags, this.mines);
        this.score.showScoreBlock();  
        this.score.setCurrentScore();
        this.mines.setMinesOnBoard();
        this.numbers.createAllNumber();  
        this.tickId = setInterval(this.doTick.bind(this), 1000); 
    }

    /**
     *Обработчик события нажатия на левую кнопку мыши
     *
     * @param {MouseEvent} evt
     * @memberof Game
     */
    leftBtnClick(evt){
        if(evt.target.classList.contains('mine')){
            this.gameOver(evt.target);
        }
        else{
            this.handlerClickOnCell(evt.target);
        }
    }

    /**
     *Обработчик события нажатия правой кнопкой мыши
     *
     * @param {MouseEvent} evt
     * @memberof Game
     */
    rightBtnClick(evt){
        evt.preventDefault();
        if (evt.target.classList.contains('close')) {
            evt.target.classList.toggle('flag');
            this.score.setCurrentScore();
        }
    }
    /**
     *Обработчик события при нажатии двойного клика мышкой
     *
     * @param {MouseEvent} evt
     * @memberof Game
     */
    doubleBtnClick(evt){
        let el = evt.target.parentNode;
        if(el.classList.contains('number')){
            let countFlag = this.flags.getCountFlagAround(+el.dataset.col, +el.dataset.row);
            let countMine = this.mines.getCountMineAround(+el.dataset.col, +el.dataset.row);
            if(countFlag != countMine){
                return;
            }
            let cells = this.board.getCellsAround(+el.dataset.col, +el.dataset.row);
            cells.forEach((cell)=> this.handlerClickOnCell(cell));

        } 
    }

    /**
     *Проверяет найдены ли все мины вокруг выбранной клетки
     *
     * @param {Element} el
     * @returns
     * @memberof Game
     */
    isAllMinesFound(el){
        let result = true;
        let cells = this.board.getCellsAround(+el.dataset.col, +el.dataset.row);
        cells.forEach((cell)=>{
            if (cell.classList.contains('mine')) {
                if (!cell.classList.contains('flag')) {
                    result = false;
                }
            }
        })
        return result;
    }


    /**
     *Метод, обрабатывающий проигрыш в игре
     *
     * @memberof Game
     */
    gameOver(el){
        if(el){
            el.style.backgroundColor = "red";
        }
        clearInterval(this.tickId);
        this.mines.showMines();
        this.board.removeEventsListener();
        this.message.showMessage("Вы проиграли!");
    }


    /**
     *Метод, обрабатывающий победу в игре
     *
     * @memberof Game
     */
    victory(){
        clearInterval(this.tickId);
        this.message.showMessage("Победа!!!");
    }

    /**
     *Метот обрабатывает клик по закрытой клетке, если там не бомба и не флаг    
     *Если на клетке номер открывает клетку и показывает цифру      
     *Если на клетке ничего нет - получает клетки вокруг и для каждой вызывает рекурсию этого метода      
     * @param {Element} el
     * @memberof Game
     */
    handlerClickOnCell(el){
        if(el.classList.contains('flag')){
            return;
        }
        if(el.classList.contains('mine')){
            this.gameOver(el);
            return;
        }
        if(el.classList.contains('close')){
            el.classList.remove('close');
            if(this.isGameWon()){
                this.victory();
            }
            if(el.classList.contains('number')){
                el.firstChild.classList.remove('hidden');
            }
            else{
                let cells = this.board.getCellsAround(+el.dataset.col, +el.dataset.row);
                cells.forEach((cell)=> this.handlerClickOnCell(cell));
            }  

        } 
    }

    /**
     *Метод проверяет является ли ситуация выйграшной
     *
     * @returns
     * @memberof Game
     */
    isGameWon(){
        let closeCells = document.querySelectorAll('.close');
        return closeCells.length == this.settings.countMine;
    }

    
    /**
     *Обработка тика таймера, срабатывающего каждую секунду     
     *Уменьшает оставшееся время и выводит его на экран   
     *Проверяет не закончилось ли время     
     * @memberof Game
     */
    doTick() {
        this.settings.timeGame--;
        this.score.setCurrentScore();
        if(this.isTimeOver()){
            this.gameOver();
        }
    }

    /**
     *Проверяет не вышло ли время игры  
     *Если время вышло - true   
     *Если время ещё осталось - false
     * @returns
     * @memberof Game
     */
    isTimeOver(){
        return this.settings.timeGame == 0;
    }

}