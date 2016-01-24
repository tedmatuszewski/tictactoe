; (function () {
    "use strict";

    var cells = document.getElementsByClassName("cell");

    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function (event) {
            if (event.target.innerText == "") {
                event.target.innerText = getCurrentMarker();

                if (checkForWin()) {
                    alert(getCurrentMarker() + " has won!");
                    incrementWinCount();
                    
                    reset();
                    document.getElementById("currentTurnText").innerHTML = "X";
                } else {
                    if (!isCats()) {
                        toggleCurrentTurn();
                    } else {
                        alert("cats!");

                        reset();

                        document.getElementById("currentTurnText").innerHTML = "X";
                    }
                }
            }
        });
    }

    function incrementWinCount() {
        var text = null;
        if (getCurrentMarker() == "O") {
            text = document.getElementById("oWinText");
        } else {
            text = document.getElementById("xWinText");
        }

        text.innerText = parseInt(text.innerText) + 1
    }

    function checkForWin() {
        var win = false;
        var letter = getCurrentMarker();
        var sequence = [
            [0, 4, 8],
            [0, 3, 6],
            [0, 1, 2],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8]
        ];

        var currentBoard = toArray(document.getElementsByClassName("cell")).map(function (element) {
            return element.innerText;
        });

        sequence.forEach(function (item) {
            if (currentBoard[item[0]] == letter && currentBoard[item[1]] == letter && currentBoard[item[2]] == letter) {
                win = true;
            }
        });

        return win;
    }

    function isCats() {
        var currentBoard = toArray(document.getElementsByClassName("cell")).map(function (element) {
            return element.innerText;
        });

        return currentBoard.filter(function (item) { return item == "" }).length == 0;
    }

    function toggleCurrentTurn() {
        var currentTurn = document.getElementById("currentTurnText");
        
        if (currentTurn.innerText == "X") {
            currentTurn.innerHTML = "O";
        } else {
            currentTurn.innerHTML = "X";
        }
    }

    function getCurrentMarker() {
        return document.getElementById("currentTurnText").innerHTML;
    }

    function reset() {
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
        }
    }
}());

function toArray(elementList) {
    var arr = [];

    for (var i = 0; i < elementList.length; i++) {
        arr.push(elementList[i]);
    }

    return arr;
}