function shuffelWord(word) {
    word_spl = word.split('');

    let first = word_spl.shift();
    let last = '';
    if (word.length > 1) { last = word_spl.pop() }

    for (let i = word_spl.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [word_spl[i], word_spl[j]] = [word_spl[j], word_spl[i]];
    }
    return first + word_spl.join("") + last;
}


$(function () {

    var container = $("#container")
    userText = $('#userText');

    container.shuffleLetters();

    userText.click(function () {
        userText.val("");

    }).bind('keypress', function (e) {
        if (e.keyCode == 13) {

            arr = userText.val().split(' ');
            var result = '';
            for (let i = 0; i < arr.length; i++) {
                result = result + shuffelWord(arr[i]) + ' ';
            }

            container.shuffleLetters({
                "text": result
            });
            userText.val("");
        }
    }).hide();

    setTimeout(function () {
        container.shuffleLetters({
            "text": "Теперь попробуйте сами"
        });
        userText.val("Введите текст и нажмите enter..").fadeIn();
    }, 2000);

});