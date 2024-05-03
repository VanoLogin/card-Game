import createMarkup from "../templetes/createCardMarkup.js";
import { load, save, remove, LS_KEYS } from "./interfaceLS.js";

/**
 * class Game - класс управления игрой
 *
 */

export default class Game {
  static openCardClass = "is-flipped";

  #clicks;

  /**
   * создание объекта игры
   * @param {array} field - масив который хранит в себе объекты карточек игры
   * @param {number} openCardsCounter - количество открытых карточек
   */
  constructor(parentContainer, handleCardClick) {
    this.parentContainer = parentContainer;
    this.field = [];
    this.openCardsCounter = 0;
    this.#clicks = [];

    this.handleCardClick = handleCardClick;
  }

  /**
   * заполнять поле объектами карточек в перемешаном порядке
   * @return {array} - возвращает новий масив поля
   */

  #shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  #fillTheField() {
    const field = this.#shuffle(["*", "+", "&", "*", "+", "&"]);

    return field.map((symbol, id) => ({ symbol, id, isOpen: false }));
  }

  startNewGame() {
    const lsArray = load(LS_KEYS.cardsList);
    const counter = load(LS_KEYS.counter);
    console.log(lsArray, counter);
    if (lsArray && counter !== undefined) {
      this.field = lsArray;
      this.openCardsCounter = counter;
    } else {
      this.field = this.#fillTheField();
      this.openCardsCounter = 0;
      save(LS_KEYS.cardsList, this.field);
      save(LS_KEYS.counter, this.openCardsCounter);
    }
    this.parentContainer.addEventListener("click", this.handleCardClick);

    this.parentContainer.innerHTML = createMarkup(this.field);
  }

  closeFlippedCards(firstCard, secondCard) {
    this.parentContainer.removeEventListener("click", this.handleCardClick);
    firstCard.isOpen = false;
    secondCard.isOpen = false;

    save(LS_KEYS.cardsList, this.field);

    for (const card of this.parentContainer.children) {
      if (
        Number(card.dataset.id) === firstCard.id ||
        Number(card.dataset.id) === secondCard.id
      ) {
        card.classList.remove(Game.openCardClass);
      }
    }
    setTimeout(
      () =>
        this.parentContainer.addEventListener("click", this.handleCardClick),
      800
    );
    console.log(this.field);
  }

  handleClicks(id) {
    this.parentContainer.removeEventListener("click", this.handleCardClick);
    setTimeout(
      () =>
        this.parentContainer.addEventListener("click", this.handleCardClick),
      800
    );
    const findCard = this.field.find((item) => item.id === Number(id));

    if (this.#clicks.length < 2) {
      findCard.isOpen = true;
      this.#clicks.push(findCard);
      save(LS_KEYS.cardsList, this.field);
    }

    if (this.#clicks.length === 2) {
      const [firstCard, secondCard] = this.#clicks;

      if (firstCard.symbol === secondCard.symbol) {
        this.#clicks.splice(0);
        this.openCardsCounter += 1;
        save(LS_KEYS.counter, this.openCardsCounter);

        if (this.openCardsCounter * 2 === this.field.length) {
          Notiflix.Notify.info("Вы выйграли. Новая игра!");
          setTimeout(() => this.startNewGame(), 2000);
          remove(LS_KEYS.counter);
          remove(LS_KEYS.cardsList);
        }
      } else {
        setTimeout(() => {
          this.#clicks.splice(0);
          this.closeFlippedCards(firstCard, secondCard);
        }, 1000);
      }
    }
  }
}
