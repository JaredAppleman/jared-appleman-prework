const hintP = document.querySelector('#hint');
const guessed = document.querySelector('#lettersGuessed')
let letters = 'A, B, '

console.log(guessed)
letters = letters + 'C ';
guessed.innerText = letters;
hintP.innerText = 'This animal has stripes.';
console.log(hintP)