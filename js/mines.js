class Mines {

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Board} board
     */
    init(settings, board) {
        this.settings = settings;
        this.board = board;
    }

    /**
     *Устанавливает мины на поле
     *
     * @memberof Mines
     */
    setMinesOnBoard(){
        for (let i = 0; i < this.settings.countMine; i++) {
            let cell =  this.getRandomMineCell();
            cell.classList.add('mine');  
        }
    }

    
    /**
     *Метод отображает ми ны на поле
     *
     * @memberof Mines
     */
    showMines(){
        let cells= document.querySelectorAll('.mine');
        cells.forEach((cell)=>cell.classList.add('explode'));
    }

    /**
     *Возвращает количество мин вокруг клетки с заданными координатами
     *
     * @param {number} x координата клетки по оси х.
     * @param {number} y координата клетки по оси y.
     * @returns
     * @memberof Mines
     */
    getCountMineAround(x,y){
        let count = 0; 
        let cells = this.board.getCellsAround(x, y);
        cells.forEach((cell)=>{
            if(cell.classList.contains('mine')){
                count++;
            }
        })
        return count;
    }

    /**
     * Метод рандомно выбирает клетку, на которой будет расположена мина
     * 
     * @returns {HTMLTableCellElement}  возвращает клетку, на которой будет расположена мина
     */
    getRandomMineCell() {
        let closeCells = document.querySelectorAll('.close:not(.mine)');
        return closeCells[Math.floor(Math.random() * (closeCells.length - 1))]
    }

    /**
     *Проверяет есть ли на клетке мина
     *
     * @param {number} x координата клетки по оси х.
     * @param {number} y координата клетки по оси y.
     * @returns
     * @memberof Numbers
     */
    isCellContainMine(x,y){
        let cell = this.board.getCellEl(x, y);
        return cell.classList.contains('mine');
    }
    
}