document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#resetBtn");
    const newGameBtn = document.querySelector("#newGameBtn");
    const msgContainer = document.querySelector(".msgContainer");
    const msg = document.querySelector("#msg");

    let turnO = true;
    let clickCount = 0;

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    function resetGame() {
        turnO = true;
        clickCount = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    }

    function togglePlayer() {
        turnO = !turnO;
    }

    function handleClick(box) {
        if (!box.textContent) {
            box.textContent = turnO ? "O" : "X";
            box.classList.add(turnO ? "red" : "blue");
            togglePlayer();
            box.disabled = true;
            clickCount++;
            checkWinner();
        }
    }

    function disableBoxes() {
        boxes.forEach(box => box.disabled = true);
    }

    function enableBoxes() {
        boxes.forEach(box => {
            box.disabled = false;
            box.textContent = "";
        });
    }

    function showResult(message) {
        msg.textContent = message;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [pos1, pos2, pos3] = pattern;
            let pos1Val = boxes[pos1].textContent;
            let pos2Val = boxes[pos2].textContent;
            let pos3Val = boxes[pos3].textContent;
            if (pos1Val && pos1Val === pos2Val && pos1Val === pos3Val) {
                showResult(`Congratulations! Winner is ${pos1Val}`);
                return;
            }
        }
        if (clickCount === 9) {
            showResult("It's a draw! No winner this time.");
        }
    }

    boxes.forEach(box => box.addEventListener("click", () => handleClick(box)));
    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
});
