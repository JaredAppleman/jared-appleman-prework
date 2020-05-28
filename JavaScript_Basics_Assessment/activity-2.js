const userName = prompt('Enter your name: ');

if (userName.length > 4){
    alert('${userName}, Your name is longer than 4 characters.');
}
else {
    alert('${userName}, Your name is 4 characters or less.');
}