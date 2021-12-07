const STORAGE_KEY = 'guessesDB';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY);
    if (!gQuestsTree || gQuestsTree.length === 0) {
        gQuestsTree = createQuest('Male ?');
        gQuestsTree.yes = createQuest('Gandhi ?');
        gQuestsTree.no = createQuest('Rita ?');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    _saveTreeToStorage()
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    if (gCurrQuest) gPrevQuest = gCurrQuest;
    else gCurrQuest = gQuestsTree;
    console.log("PREV: ", gPrevQuest);
    gCurrQuest = (res === 'yes') ? gPrevQuest.yes : gPrevQuest.no;
    console.log("MOVE: ", gCurrQuest);
    _saveTreeToStorage();
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    if (res === 'no') {
        gPrevQuest.no = createQuest(newQuestTxt);
        gPrevQuest.no.yes = createQuest(newGuessTxt);
        gPrevQuest.no.no = createQuest(gCurrQuest.txt);
    } else {
        gPrevQuest.yes = createQuest(newQuestTxt);
        gPrevQuest.yes.yes = createQuest(newGuessTxt);
        gPrevQuest.yes.no = createQuest(gCurrQuest.txt);
    }
    _saveTreeToStorage()
}

function getCurrQuest() {
    return gCurrQuest;
}


function _saveTreeToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree)
}