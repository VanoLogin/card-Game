const LS_KEYS = {
  counter: "counter",
  cardsList: "cards list",
};

function load(key) {
  try {
    // const data = JSON.parse(localStorage.getItem(key));
    // return data === null ? undefined : data; // 0 || undefined
    return JSON.parse(localStorage.getItem(key)) ?? undefined;
  } catch (err) {
    console.error(`Parsing error: ${err.message}`);
  }
}
function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Stringify error: ${err.message}`);
  }
}
function remove(key) {
  localStorage.removeItem(key);
}

export { load, save, remove, LS_KEYS };
