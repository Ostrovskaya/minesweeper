'use stript';

window.addEventListener('load', () => {
    const settings = new Settings();
    const mines = new Mines();
    const board = new Board();
    const menu = new Menu();
    const flags = new Flags();
    const game = new Game();
    const score = new Score();
    const numbers = new Numbers();
    const message = new Message();

    flags.init(board);
    board.init(settings);
    mines.init(settings, board);
    numbers.init(settings, board, mines);
    game.init(settings, board, mines, menu, flags, score, numbers, message);
    menu.addButtonsClickListeners(game.start.bind(game));
    message.init(menu, board, score);

    message.addButtonsClickListeners(message.clickOk.bind(message), message.clickNo.bind(message));

  
});

