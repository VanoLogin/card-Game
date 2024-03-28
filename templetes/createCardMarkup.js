export default function createMarkup(array) {
  return array
    .map(
      ({ symbol, id, isOpen}) => `
          <div class="card ${isOpen ? "is-flipped" : ""}" data-id = "${id}">
            <div class="card__face card__face--front">flip</div>
            <div class="card__face card__face--back">${symbol}</div>
          </div>
      `
    )
    .join("");
}
