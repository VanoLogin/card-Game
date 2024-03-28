/*
1.1 проверить LS yа наличие данных про карточки, если данные есть, то мы делаем разметку по этим данным, если нет, то смотреть шаг 1.2

1.2 массив символов для карточек, сделать шафел и создать обьекты на основе каждой карточки (символ, айди, статус: открыта ? закрыта)
2. взять масиив и createMarkup() из этого массива 
3. повесить слушателя на container  по нажатию 
  3.1 записывть таргет элемента в массив(если карточка была закрыта), длинна которого не привышает 2, если больше будет потом закрывать карточки обратно.
  3.2 написать функцию, которая будет сравнивать значение строк в массиве открытых карточек, вызывать функцию при условии, что в массиве 2 элемента!
  3.3 если true,  тогда мы оставляем карточки открытой и counter +=1 и обновляем значение counter in LS(создать ключ значение для counter), если false, то мы их закрываем, и очищаем массив, и обновляем данные в LS.
  3.4 если counter*2 === array.length(длина массива символов), если они равны, тогда мы через basicLigthBox выведем сообщение, что вы выйграли и перевернем все карточки на исходное положение ( начнем игру сначала) и очистим LS в целом 
  
4. 
*/

import Game from "./interfaces/gameInterface.js";



const refs = {
  container: document.querySelector(".scene"),
};

const gameInterface = new Game(refs.container, handleCardClick);

gameInterface.startNewGame();


function handleCardClick({ target, currentTarget }) {
  if (
    target === currentTarget ||
    target.parentNode.classList.contains(Game.openCardClass)
  )
    return;

  target.parentNode.classList.add(Game.openCardClass);
  gameInterface.handleClicks(target.parentNode.dataset.id);

  console.log(gameInterface.field);
}

console.dir(Game);

// function fillCardContainer() {
//   const cardsListLS = load(LS_KEYS.cardsList);
//   if (!cardsListLS || cardsListLS.length === 0) {
//     gameInterface.startNewGame();
//   } else {
//     gameInterface.continueTheGame(cardsListLS);

//   }
// }

// class User {
//   #year;
//   constructor(name, surname, year) {
//     this.name = name;
//     this.surname = surname;
//     this.#year = year;
//   }
//   getFullName() {
//     return `He is ${this.name} ${this.surname}`;
//   }
//   getAge() {
//     const today = new Date().getFullYear();
//     return today - this.#year;
//   }

//   get year() {
//     return this.#year;
//   }
//   set year(newDate) {
//     const today = new Date().getFullYear(); //2023
//     if (today < newDate || today - newDate >= 200) return;
//     this.#year = newDate;
//   }
// }

// const newUser = new User("Oleg", "Vinson", 2001);
// console.log(newUser.getFullName());
// console.log(newUser.getAge());
// console.log(newUser);

// newUser.year = 1500;

// console.log(newUser.year);
