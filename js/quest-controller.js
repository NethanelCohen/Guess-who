'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
    console.log('Started...');
    var quests = createQuestsTree();
    console.log('QuestsTree:', quests);
}

function onStartGuessing() {
    $('.game-start').hide();
    $('.quest').show();
    renderQuest();
}

function renderQuest() {
    var currQuest = getCurrQuest();
    console.log("currQuest: ", currQuest);
    // debugger
    $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
    var res = ev.data.ans;

    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.quest').hide();
            $('.modal').show();
            // onRestartGame()
        } else {
            $('.quest').hide();
            $('.new-quest').css("display", "block");
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    $('.modal').hide();
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    if (newQuest === '' || newGuess === '') {
        return alert('Not valid input');
    } else {
        newGuess += ' ?'
        newQuest += ' ?'
        addGuess(newQuest, newGuess, gLastRes);
        onRestartGame();
    }
}

function onRestartGame() {
    $('.modal').hide();
    $('#newGuess').val('');
    $('#newQuest').val('');
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest = gQuestsTree;
}