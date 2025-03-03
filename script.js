document.getElementById('startPuzzle').addEventListener('click', function() {
    const imageUpload = document.getElementById('imageUpload');
    const puzzleSize = document.getElementById('puzzleSize').value;

    if (imageUpload.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    const file = imageUpload.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            createPuzzle(img, puzzleSize);
        };
    };
    
    reader.readAsDataURL(file);
});

function createPuzzle(image, size) {
    const puzzleContainer = document.getElementById('puzzleContainer');
    puzzleContainer.innerHTML = '';
    const pieces = [];
    const rows = Math.sqrt(size);
    const cols = size / rows;

    puzzleContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    puzzleContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const pieceWidth = image.width / cols;
    const pieceHeight = image.height / rows;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
            pieces.push({ canvas, row, col });
        }
    }

    // Shuffle pieces
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(piece => {
        piece.canvas.classList.add('puzzlePiece');
        piece.canvas.style.backgroundImage = `url(${piece.canvas.toDataURL()})`;
        piece.canvas.dataset.row = piece.row;
        piece.canvas.dataset.col = piece.col;
        piece.canvas.addEventListener('click', () => movePiece(piece.canvas));
        puzzleContainer.appendChild(piece.canvas);
    });
}

function movePiece(piece) {
    // Logic to move pieces around
    // This is a placeholder for the actual move logic
    alert(`Piece at row ${piece.dataset.row}, col ${piece.dataset.col} clicked!`);
}
