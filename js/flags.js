class Flags{

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Board} board
     */

    init(board) {
        this.board = board;
    }

    /**
     *Возвращает количество флагов
     *
     * @returns
     * @memberof Flags
     */
    getCountFlag(){
        return document.querySelectorAll('.flag').length;
    }

    /**
     *Возвращает количество флагов вокруг клетки с заданными координатами
     *
     * @param {number} x координата клетки по оси х.
     * @param {number} y координата клетки по оси y.
     * @returns
     * @memberof Flags
     */
    getCountFlagAround(x,y){
        let count = 0; 
        let cells = this.board.getCellsAround(x, y);
        cells.forEach((cell)=>{
            if(cell.classList.contains('flag')){
                count++;
            }
        })
        return count; 
    }

}