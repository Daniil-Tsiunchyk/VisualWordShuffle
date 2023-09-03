function shuffleWord(word) {
    let wordArr = word.split('');
    let first = wordArr.shift();
    let last = wordArr.pop() || '';

    for (let i = wordArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]];
    }
    return first + wordArr.join("") + last;
}

function shuffleLetters(el, text) {
    let str = text.split('');
    let len = str.length;

    function randomChar(type) {
        let pool = "";
        if (type === "lowerLetter") pool = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789";
        else if (type === "upperLetter") pool = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789";
        else if (type === "symbol") pool = ",.?/\\(^)![]{}*&^%$#'\"";

        let arr = pool.split('');
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function shuffle(start) {
        if (start > len) {
            return;
        }

        let strCopy = str.slice(0);

        for (let i = Math.max(start, 0); i < len; i++) {
            let ch = strCopy[i];
            let type;
            if (ch === " ") type = "space";
            else if (/[а-я]/.test(ch)) type = "lowerLetter";
            else if (/[А-Я]/.test(ch)) type = "upperLetter";
            else type = "symbol";

            if (type !== "space") strCopy[i] = randomChar(type);
        }

        el.textContent = strCopy.join("");

        setTimeout(function () {
            shuffle(start + 1);
        }, 1000 / 25);
    }
    shuffle(-8);
}

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const userText = document.getElementById('userText');

    shuffleLetters(container, container.textContent);

    userText.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.which === 13) {
            let words = userText.value.split(' ');
            let result = words.map(shuffleWord).join(' ');
            shuffleLetters(container, result);
            userText.value = "";
        }
    });

    userText.style.display = "none";

    setTimeout(function () {
        shuffleLetters(container, "Теперь попробуйте сами");
        userText.style.display = "block";
    }, 2000);
});
