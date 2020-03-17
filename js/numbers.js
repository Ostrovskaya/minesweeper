class Numbers {
    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Board} board
     * @param {Mines} mines
     */
    init(settings, board, mines) {
        this.settings = settings;
        this.board = board;
        this.mines = mines;
    }

    /**
     *Создает для каждой клетки число, отображающее количество мин рядом 
     *
     * @memberof Numbers
     */
    createAllNumber(){
        for (let i = 1; i <= this.settings.colsCount; i++) {
            for (let j = 1; j <= this.settings.rowsCount; j++) {
                if(!this.mines.isCellContainMine(i, j)){
                    let count = this.mines.getCountMineAround(i, j);
                    if(count > 0){
                        this.board.setMineOnBord(i,j, count);
                    }
                }    
            }   
        }
    }
}