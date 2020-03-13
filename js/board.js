class Board {
    constructor() {
        this.boardEl = document.querySelector('.table');
        this.leftBtnClick = null;
        this.rightBtnClick = null;
        this.doubleBtnClick = null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек.
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод отрисовывает игровое поле.
     */
    renderBoard() {
        for (let row = 1; row <= this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 1; col <= this.settings.colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('close');
                td.dataset.row = row;
                td.dataset.col = col;
                tr.appendChild(td);
            }
        }
    }

    /**
     *Удаляет игровое поле
     *
     * @memberof Board
     */
    removeBoard(){
        this.boardEl.innerHTML = "";
    }

    removeEventsListener(){
        this.boardEl.removeEventListener('click', this.leftBtnClick);
        this.boardEl.removeEventListener('contextmenu', this.rightBtnClick);
        this.boardEl.removeEventListener('dblclick', this.doubleBtnClick);
    }

    /**
     * Получаем ячейку таблицы.
     * @param {number} x координата по оси х.
     * @param {number} y координата по оси y.
     * @returns {HTMLTableCellElement} тег td
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    /**
     *Метод возвращает массив клеток вокруг заданной клетки
     *
     * @param {Number} x координата по оси x
     * @param {Number} y координата по оси y
     * @returns
     * @memberof Board
     */
    getCellsAround(x, y){
        let cells = [];
        for (let i = (x-1); i <= (x+1); i++) {     
            for (let j = (y-1); j <= (y+1); j++) {
                if(!this.isCellTrue(i,j,x,y)){
                    continue;
                }
                cells.push(this.getCellEl(i, j));
            }      
        }
        return cells;
    }

    /**
     *Метод проверяет, подходит ли нам данная клетка:   
     *Клетка подходит, если она не выходит за границу поля и не равна изначальной клетке,
     *относительно которой мы ищем клетки вокруг
     * @param {number} i координаты новой клетки по оси х.
     * @param {number} j координаты новой клетки по оси y.
     * @param {number} x координата клетки по оси х.
     * @param {number} y координата клетки по оси y.
     * @returns
     * @memberof Board
     */
    isCellTrue(i,j,x,y){
        if( i == 0 || i > this.settings.colsCount ||  j == 0 || j > this.settings.rowsCount || ((x == i) && (y == j))){
            return false;
        }
        return true;
    }

    /**
     *Устанавливает цифру на доску
     *
     * @param {number} x координата по оси х.
     * @param {number} y координата по оси y.
     * @param {*} count
     * @memberof Board
     */
    setMineOnBord(x,y, count){
        let cell = this.getCellEl(x, y);
        cell.classList.add("number");
        cell.innerHTML = `<span class= 'hidden'>${count}</span>`;
        cell.style.color = this.chooseColorNumber(count);
    }

    /**
     *В зависимости от того, какая у нас цифра, возвращает цвет
     *
     * @param {Number} count
     * @returns
     * @memberof Board
     */
    chooseColorNumber(count){
        switch (count) {
            case 1:
                return  '#3e50bd'; 
            case 2:
                return  '#1e6702'; 
            case 3:
                return  '#ab0605'; 
            case 4:
                return  '#000285'; 
            case 5:
                return  '#7d0200'; 
            case 6:
                return  '#4ed5da'; 
            case 7:
                return  '#ebad3c'; 
            case 8:
                return  '#e265e2';  
        }
    }

    /**
     * Инициализация обработчиков событий.
     */
    initEventHandlers(leftBtnClick, rightBtnClick, doubleBtnClick) {
        this.leftBtnClick = evt => leftBtnClick(evt);
        this.rightBtnClick = evt => rightBtnClick(evt);
        this.doubleBtnClick = evt => doubleBtnClick(evt);
        this.boardEl.addEventListener('click', this.leftBtnClick);
        this.boardEl.addEventListener('contextmenu', this.rightBtnClick);
        this.boardEl.addEventListener('dblclick', this.doubleBtnClick);
    }
}