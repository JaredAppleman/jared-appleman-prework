const nameList = ['Jared', 'Sam', 'Dean'];

for (let count = 0; count < 3; count++){
    const newName = prompt("Enter a name: ");
    nameList.push(newName);
}

for (let index = 0; index < nameList.length; index++){
    console.log(nameList[index]);
}