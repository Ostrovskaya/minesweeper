class Score {
    constructor(){
        this.scoreBlock = document.querySelector('.score');
        this.timeEl = document.querySelector('.time__value');
        this.minesCountEl = document.querySelector('.mines__value');
    }

    /** 
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Flags} flags
     * @param {Mines} mines
     */
    init(settings, flags, mines){
        this.settings = settings;
        this.flags = flags;
        this.mines = mines;
    }

    /**
     *Метод показывает окно со счетом игры
     *
     * @memberof Score
     */
    showScoreBlock(){
        this.scoreBlock.classList.remove('hidden');
    }

    /**
     *Метод убирает окно со счетом игры
     *
     * @memberof Score
     */
    hideScoreBlock(){
        this.scoreBlock.classList.add('hidden');
    }

    /**
     *Метод выводи на экран счет игры: время до конца игры и оставшееся количество мин
     *
     * @memberof Score
     */
    setCurrentScore(){
        this.timeEl.innerHTML = this.getTimeInFormat();
        this.minesCountEl.innerHTML = this.getCountRamainsMine();
    }

    /**
     *Возвращает оставшееся количество мин
     *
     * @memberof Score
     */
    getCountRamainsMine(){    
        return this.settings.countMine - this.flags.getCountFlag();
    }



    /**
     *Метод, если число меньше 10,добавляет ноль перед числом
     *
     * @param {Number} i
     * @returns
     * @memberof Score
     */
    checkTime(i) {
        if(i < 10){
            i = '0' + i;
        }
        return i;
    }

    /**
     *Переводит оставшееся до конца игры время в формат mm:ss
     *
     * @returns
     * @memberof Score
     */
    getTimeInFormat(){
        let m = 0;
        let s = this.settings.timeGame;
        while(s >= 60){
            s -= 60;
            m ++;
        }
        m = this.checkTime(m);
        s = this.checkTime(s);
        return `${m}:${s}`;
    }
}