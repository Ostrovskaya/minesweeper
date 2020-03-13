class Settings {

    /**
     *Метод инициальзирует начальные настройки игры
     *
     * @param {Object} params
     * @memberof Settings
     */
    init(params) {
        this.rowsCount = params.row;
        this.colsCount = params.col;
        this.timeGame = params.time;
        this.countMine = params.count;
    }

    /**
     *Метод возвращает начальные настройки игры в зависимости от выбранного режима сложности
     *
     * @returns - объект, содержащий количество строк, столбцов, время игры и количество мин
     * @memberof Settings 
     */
    getSettings(){
        let levelDifficulty = document.querySelector('.radio:checked').id;
        switch (levelDifficulty) {
            case "easy":
                return {row:9 , col: 9, time: 600,  count: 10}
            case "middle":
                return {row:16 , col: 16, time: 2400,  count: 40}
            case "hard":
                return {row:16 , col: 30, time: 5940,  count: 99}
        }

    }
}