var board, game = new Chess();

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' 
    });

    if (move === null) return 'snapback';

    updateStatus();
}

function onSnapEnd() {
    board.position(game.fen());
}

function updateStatus() {
    var status = 'Game in progress...';
    if (game.in_checkmate()) {
        status = 'Checkmate! ' + (game.turn() === 'w' ? 'Black' : 'White') + ' wins!';
    } else if (game.in_draw()) {
        status = 'Draw!';
    } else if (game.in_check()) {
        status = 'Check!';
    }
    document.getElementById('status').innerText = 'Status: ' + status;
}

function resetGame() {
    game.reset();
    board.position('start');
    updateStatus();
}

board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
});

updateStatus();
