const gameBoard = [
    ['♠', '♠', '♣', '♦️', '♦️', '♦️'],
    ['♠', '♣', '♣', '♦️', '♦️', '♦️'],
    ['♠', '♠', '♣', '♦️', '♣', '♣'],
    ['♣', '♣', '♣', '♣', '♣', '♦️'],
    ['♥️', '♣', '♣', '♣', '♥️', '♥️'],
    ['♥️', '♥️', '♣', '♣', '♦️', '♣'],
    ['♥️', '♥️', '♥️', '♠', '♠', '♣']
];
function handleClick(element, rowIndex, colIndex) {
    console.log(`Clicked element: ${element} at row ${rowIndex + 1}, col ${colIndex + 1}`);
    const checked = new Set();
    checkedGroup(element, rowIndex, colIndex, checked);

    renderBoard(gameBoard);

}
function checkedGroup(element, row, col, checked) {
    const key = `${row}-${col}`;
    if (row < 0 || row >= gameBoard.length || col < 0 || col >= gameBoard[0].length || gameBoard[row][col] !== element || checked.has(key)) {
        return;
    }//перевіряємо чи не є елемент поза межами таблиці, чи е елемент схожий з вибраним елементом та чи був він раніше до цього оброблений
    checked.add(key);
    // // Змінюємо колір кнопки щоб було видно обраний елемент 
    //!не є помітним
    // const button = document.querySelectorAll('table tr')[row]
    //     .children[col].querySelector('button');
    // button.style.backgroundColor='yellow'; 
    // gameBoard[row].splice(col, 1);//видаляємо елемент інший варіант
    gameBoard[row][col] = '';

    // перевіряє всі елементи навколо обраного елемента, метод flood fill 
    checkedGroup(element, row - 1, col, checked);
    checkedGroup(element, row + 1, col, checked);
    checkedGroup(element, row, col - 1, checked);
    checkedGroup(element, row, col + 1, checked);

}
function renderBoard(board) {
    const container = document.getElementById('game-container');
    const table = document.createElement('table');

    board.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const td = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = cell;
            // button.style.backgroundColor = 'lightblue';
            button.addEventListener('click', () => handleClick(cell, rowIndex, colIndex));
            td.appendChild(button);
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
    container.innerHTML = '';
    container.appendChild(table);
}

renderBoard(gameBoard);
