
const state = {
  levels: window.GAME_LEVELS || [],
  currentLevelIndex: 0,
  currentLevel: null,
  leftItems: [],
  rightItems: [],
  selectedLeftId: null,
  selectedRightId: null,
  matchedPairIds: new Set(),
  totalPairs: 0
};

const refs = {
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  finishScreen: document.getElementById("finishScreen"),
  startGameBtn: document.getElementById("startGameBtn"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  finishMenuBtn: document.getElementById("finishMenuBtn"),
  leftColumn: document.getElementById("leftColumn"),
  rightColumn: document.getElementById("rightColumn"),
  levelIndex: document.getElementById("levelIndex"),
  levelTotal: document.getElementById("levelTotal"),
  levelTitle: document.getElementById("levelTitle"),
  progressValue: document.getElementById("progressValue"),
  explanationBox: document.getElementById("explanationBox"),
  explanationText: document.getElementById("explanationText"),
  hintBtn: document.getElementById("hintBtn"),
  restartBtn: document.getElementById("restartBtn"),
  menuBtn: document.getElementById("menuBtn"),
  nextBtn: document.getElementById("nextBtn")
};

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPlaceholderSvg(label) {
  const safeLabel = encodeURIComponent(label);
  return `data:image/svg+xml;charset=UTF-8,` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180' viewBox='0 0 240 180'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0%' stop-color='%23f6e8c7'/><stop offset='100%' stop-color='%23d6b172'/></linearGradient></defs>` +
    `<rect x='8' y='8' width='224' height='164' rx='28' fill='url(%23g)' stroke='%23845f2c' stroke-width='4'/>` +
    `<circle cx='120' cy='74' r='34' fill='%23fff2cf' stroke='%2394682b' stroke-width='3'/>` +
    `<path d='M82 118H158' stroke='%2394682b' stroke-width='6' stroke-linecap='round'/>` +
    `<foreignObject x='24' y='126' width='192' height='38'><div xmlns='http://www.w3.org/1999/xhtml' style='font-family: Georgia, serif; font-size: 18px; color: #44250c; text-align: center;'>${safeLabel}</div></foreignObject>` +
    `</svg>`;
}

function showScreen(name) {
  [refs.startScreen, refs.gameScreen, refs.finishScreen].forEach((screen) => {
    screen.classList.remove("active");
  });
  refs[name].classList.add("active");
}

function resetSelections() {
  state.selectedLeftId = null;
  state.selectedRightId = null;
}

function hideExplanation() {
  refs.explanationBox.classList.add("hidden");
  refs.explanationText.textContent = "";
}

function showExplanation(text) {
  if (!text) {
    hideExplanation();
    return;
  }
  refs.explanationText.textContent = text;
  refs.explanationBox.classList.remove("hidden");
}

function updateProgress() {
  refs.progressValue.textContent = `${state.matchedPairIds.size} / ${state.totalPairs}`;
  refs.nextBtn.disabled = state.matchedPairIds.size !== state.totalPairs;
}

function buildLevel(levelIndex) {
  state.currentLevelIndex = levelIndex;
  state.currentLevel = state.levels[levelIndex];
  state.matchedPairIds = new Set();
  state.totalPairs = state.currentLevel.pairs.length;
  resetSelections();
  hideExplanation();

  const leftItems = state.currentLevel.pairs.map((pair, index) => ({
    id: `L-${state.currentLevel.id}-${index}`,
    pairId: index,
    side: "left",
    label: pair.left.label,
    image: pair.left.image || createPlaceholderSvg(pair.left.label)
  }));

  const rightItems = state.currentLevel.pairs.map((pair, index) => ({
    id: `R-${state.currentLevel.id}-${index}`,
    pairId: index,
    side: "right",
    label: pair.right.label,
    image: pair.right.image || createPlaceholderSvg(pair.right.label)
  }));

  state.leftItems = shuffle(leftItems);
  state.rightItems = shuffle(rightItems);

  refs.levelIndex.textContent = String(levelIndex + 1);
  refs.levelTotal.textContent = String(state.levels.length);
  refs.levelTitle.textContent = state.currentLevel.title;

  renderColumns();
  updateProgress();
}

function cardTemplate(item) {
  const type = state.currentLevel.type;
  const isImage = type === "image";
  return `
    <article class="card ${isImage ? "image-card" : "text-card"}"
      data-id="${item.id}"
      data-pair-id="${item.pairId}"
      data-side="${item.side}">
      <div class="card-face">
        <div class="card-front">
          <div class="card-content-front">
            ${isImage ? `<img class="card-figure" src="${item.image}" alt="${item.label}">` : ""}
            <div class="card-label">${item.label}</div>
          </div>
        </div>
        <div class="card-back">
          <span>Верно</span>
        </div>
      </div>
    </article>
  `;
}

function renderColumns() {
  refs.leftColumn.innerHTML = state.leftItems.map(cardTemplate).join("");
  refs.rightColumn.innerHTML = state.rightItems.map(cardTemplate).join("");
  bindCardEvents();
}

function getCardElement(side, id) {
  const parent = side === "left" ? refs.leftColumn : refs.rightColumn;
  return parent.querySelector(`.card[data-id="${id}"]`);
}

function clearSelectedClasses() {
  document.querySelectorAll(".card.selected").forEach((card) => {
    card.classList.remove("selected");
  });
}

function markMatched(pairId) {
  state.matchedPairIds.add(pairId);

  const matchedCards = document.querySelectorAll(`.card[data-pair-id="${pairId}"]`);
  matchedCards.forEach((card) => {
    card.classList.remove("selected", "hint");
    card.classList.add("matched", "is-disabled");
  });

  const pair = state.currentLevel.pairs[pairId];
  if (pair.explanation) {
    showExplanation(pair.explanation);
  } else {
    hideExplanation();
  }

  updateProgress();
}

function shakeMismatch(cardA, cardB) {
  [cardA, cardB].forEach((card) => {
    if (!card) return;
    card.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 220, easing: "ease" }
    );
  });
}

function tryMatch() {
  if (state.selectedLeftId === null || state.selectedRightId === null) return;

  const leftCard = getCardElement("left", state.selectedLeftId);
  const rightCard = getCardElement("right", state.selectedRightId);

  const leftPairId = Number(leftCard.dataset.pairId);
  const rightPairId = Number(rightCard.dataset.pairId);

  if (leftPairId === rightPairId) {
    markMatched(leftPairId);
  } else {
    shakeMismatch(leftCard, rightCard);
  }

  resetSelections();
  clearSelectedClasses();
}

function handleCardSelect(card) {
  if (card.classList.contains("matched")) return;

  const side = card.dataset.side;
  const id = card.dataset.id;

  if (side === "left") {
    state.selectedLeftId = id;
  } else {
    state.selectedRightId = id;
  }

  clearSelectedClasses();

  if (state.selectedLeftId) {
    const leftCard = getCardElement("left", state.selectedLeftId);
    leftCard?.classList.add("selected");
  }

  if (state.selectedRightId) {
    const rightCard = getCardElement("right", state.selectedRightId);
    rightCard?.classList.add("selected");
  }

  tryMatch();
}

function bindCardEvents() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => handleCardSelect(card));
  });
}

function showHint() {
  const availablePairs = state.currentLevel.pairs
    .map((pair, index) => ({ pair, index }))
    .filter(({ index }) => !state.matchedPairIds.has(index));

  if (!availablePairs.length) return;

  const hintPair = availablePairs[0].index;
  const cards = document.querySelectorAll(`.card[data-pair-id="${hintPair}"]`);
  cards.forEach((card) => {
    card.classList.remove("hint");
    void card.offsetWidth;
    card.classList.add("hint");
  });
}

function restartCurrentLevel() {
  buildLevel(state.currentLevelIndex);
}

function goToMenu() {
  showScreen("startScreen");
}

function goToNextLevel() {
  if (state.matchedPairIds.size !== state.totalPairs) return;

  const nextIndex = state.currentLevelIndex + 1;
  if (nextIndex >= state.levels.length) {
    showScreen("finishScreen");
    return;
  }

  buildLevel(nextIndex);
}

function startGame() {
  buildLevel(0);
  showScreen("gameScreen");
}

refs.startGameBtn.addEventListener("click", startGame);
refs.playAgainBtn.addEventListener("click", startGame);
refs.finishMenuBtn.addEventListener("click", goToMenu);
refs.restartBtn.addEventListener("click", restartCurrentLevel);
refs.menuBtn.addEventListener("click", goToMenu);
refs.nextBtn.addEventListener("click", goToNextLevel);
refs.hintBtn.addEventListener("click", showHint);

refs.levelTotal.textContent = String(state.levels.length);
