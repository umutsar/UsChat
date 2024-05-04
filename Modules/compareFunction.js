// is not used now.

function compareWords(word1, word2) {
    // İki kelimeyi sözlük sırasına göre karşılaştır
    return word1.localeCompare(word2);
}

module.exports = {
    compareWords
}