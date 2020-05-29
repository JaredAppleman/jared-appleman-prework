const letters_guessed_block = document.querySelector('#letters_Guessed_block');
const guess_count_block = document.querySelector('#guess_count_block');
const word_block = document.querySelector('#word_block');
const win_block = document.querySelector('#win_block');
const hint_block = document.querySelector('#hint_block');
const image_HTML = document.querySelector('#img_block');
const prev_word_block = document.querySelector('#prev_word_block');
const music = document.querySelector('audio');
const GUESSES = 7;
let GAME = true;


const wordObject = {
    raccoon: {
        word: 'raccoon',
        imageInfo: '<img src="assets/images/raccoon.jpg" alt="picture of animal" width="50%">',
        hint: '"Trash panda"'
    },
    leopard: {
        word: 'leopard',
        imageInfo: '<img src="assets/images/leopard.jpg" alt="picture of animal" width="50%">',
        hint: '"Rose cat"'
    },
    cheetah: {
        word: 'cheetah',
        imageInfo: '<img src="assets/images/cheetah.jpg" alt="picture of animal" width="50%">',
        hint: '"Speedy boi"'
    }

};

const gameObject = {
    guesses_left: GUESSES,
    letters_guessed: '',
    wins: 0,
    currentWordIndex: -1,
    wordList: ['raccoon', 'leopard','cheetah'],
    currentWord: '',
    blank_word: '',

    start: function(){
        if (this.wordList.length === 0){
            GAME = false;
            music.innerHTML = '<source src="assets/music/coffin-dance-music.mp3" type="audio/mpeg"></source>'
            music.load()
            music.play()
            alert("Out of Words, thanks for playing UwU")
        }
        else {
            console.log('okay')
            currentWordIndex = Math.floor(Math.random()*this.wordList.length); //get random index
            this.currentWord = this.wordList[currentWordIndex]//get word from index
            this.blank_word = this.makeBlankWord(wordObject[this.currentWord].word.length)//make into blank word
            this.wordList.splice(currentWordIndex,1)//remove word
            console.log(this.wordList)//debug
            //set variables to page
            this.guesses_left = GUESSES
            this.letters_guessed = ''
            hint_block.innerText = wordObject[this.currentWord].hint
            word_block.innerText = this.blank_word;
            guess_count_block.innerText = this.guesses_left;
            win_block.innerText = this.wins;
            letters_guessed_block.innerText = this.letters_guessed;
        }
    },

    makeBlankWord: function(wordLength){
        this.blank_word = '';
        for (let x = 0; x < wordLength; x++){
            this.blank_word += '_ ';
        }
        return this.blank_word
    },

    hangman: function(key){
        music.play()
        key = key.toLowerCase()
        if (this.isValidGuess(key)){
            console.log('okay')
            if (this.letters_guessed.length === 0){
                this.letters_guessed += key;
            }
            else{
                this.letters_guessed += ', '+key;  
            }
            this.guesses_left--;
            const indexList = this.checkWord(key, this.currentWord);
            this.updateWord(indexList, key);
            letters_guessed_block.innerText = this.letters_guessed;
            guess_count_block.innerText = this.guesses_left;
        }
        if (this.blank_word.includes('_') === false){
            this.wins = this.wins + 1;
            win_block.innerText = this.wins
            music.innerHTML = '<source src="assets/music/bongo-cat_dance-monkey.mp3" type="audio/mpeg"></source>'
            music.load()
            music.play()
            image_HTML.innerHTML = wordObject[this.currentWord].imageInfo
            prev_word_block.innerText = wordObject[this.currentWord].word
            alert('win')
            this.start()
        }
        else if (this.guesses_left === 0){
            music.innerHTML = '<source src="assets/music/bongo-cat_see-you-again.mp3" type="audio/mpeg"></source>'
            music.load()
            music.play()
            image_HTML.innerHTML = wordObject[this.currentWord].imageInfo
            prev_word_block.innerText = wordObject[this.currentWord].word
            alert('loss')
            this.start()
        }
        else{
            console.log("no win/loss")
        }     
    },

    updateWord: function(indexList, letter){
        for (index = 0; index < indexList.length; index++){
            indexToUpdate = indexList[index];
            indexToUpdate = indexToUpdate * 2; //there is a space between every letter
            temp = this.blank_word;
            this.blank_word = temp.slice(0,indexToUpdate) + letter + temp.slice(indexToUpdate+1, temp.length);
            word_block.innerText = this.blank_word

        }
    },

    checkWord: function(letter, word){
        let index = word.indexOf(letter,0);
        const indexList = [];

        while (index !== -1){
            indexList.push(index);
            index = word.indexOf(letter,index+1);
        }
        return indexList;
    },

    isValidGuess: function(key){
        pattern = /[a-z]/i;
        isLetter = pattern.test(key);
        if (isLetter & key.length === 1){
            if (!(this.letters_guessed.includes(key))){
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};

const eventFunction = function(event) {
    if (GAME){
        const key = event.key;
        gameObject.hangman(key);
    }
}

gameObject.start()
document.addEventListener('keyup',eventFunction);

