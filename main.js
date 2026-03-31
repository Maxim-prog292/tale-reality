(function () {
  const state = {
    currentLevelIndex: 0,
    selectedLeftId: null,
    selectedRightId: null,
    matchedPairIds: new Set(),
    leftCards: [],
    rightCards: [],
    hintsLeft: 6,
  };

  const els = {
    startScreen: document.getElementById("startScreen"),
    gameScreen: document.getElementById("gameScreen"),
    finishScreen: document.getElementById("finishScreen"),
    startGameBtn: document.getElementById("startGameBtn"),
    playAgainBtn: document.getElementById("playAgainBtn"),
    finishMenuBtn: document.getElementById("finishMenuBtn"),
    hintBtn: document.getElementById("hintBtn"),
    restartBtn: document.getElementById("restartBtn"),
    menuBtn: document.getElementById("menuBtn"),
    nextBtn: document.getElementById("nextBtn"),
    levelIndex: document.getElementById("levelIndex"),
    levelTotal: document.getElementById("levelTotal"),
    levelTitle: document.getElementById("levelTitle"),
    leftColumn: document.getElementById("leftColumn"),
    rightColumn: document.getElementById("rightColumn"),
    explanationBox: document.getElementById("explanationBox"),
    explanationText: document.getElementById("explanationText"),
    progressValue: document.getElementById("progressValue"),
  };

  els.levelTotal.textContent = String(window.levels.length);

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getLevel() {
    return window.levels[state.currentLevelIndex];
  }

  function showScreen(screen) {
    [els.startScreen, els.gameScreen, els.finishScreen].forEach((el) =>
      el.classList.remove("active"),
    );
    screen.classList.add("active");
  }
  function useHint() {
    if (state.hintsLeft <= 0) return;

    const pair = getUnmatchedPair(); // твоя функция поиска незакрытой пары
    if (!pair) return;

    highlightPair(pair);

    state.hintsLeft--;
    updateHintsUI();
  }
  function updateHintsUI() {
    const hintBtn = document.getElementById("hintBtn");

    hintBtn.innerText = `Подсказка (${state.hintsLeft})`;

    if (state.hintsLeft <= 0) {
      hintBtn.classList.add("disabled");
    } else {
      hintBtn.classList.remove("disabled");
    }
  }
  function buildCard(item, levelType, side) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card selectable";
    card.dataset.side = side;
    card.dataset.itemId = item.id;
    card.dataset.pairId = item.pairId;

    const frontContent =
      levelType === "image"
        ? `
        <div class="card-face card-front">
          <div class="image-card-content">
            <img src="${item.image}" alt="${item.label}">
            <div class="label">${item.label}</div>
          </div>
        </div>`
        : `
        <div class="card-face card-front">
          <div class="text-card-content">${item.label}</div>
        </div>`;

    card.innerHTML = `
      <div class="card-inner">
        ${frontContent}
        <div class="card-face card-back">
          <div class="card-back-content">
            <strong>Верно</strong>
            <span>Пара собрана</span>
          </div>
        </div>
      </div>`;

    card.addEventListener("click", () => onCardClick(card));
    return card;
  }

  function prepareLevelData(level) {
    const left = level.pairs.map((pair, idx) => ({
      ...pair.left,
      id: `L-${pair.id}-${idx}`,
      pairId: pair.id,
      explanation: pair.explanation || "",
    }));

    const right = level.pairs.map((pair, idx) => ({
      ...pair.right,
      id: `R-${pair.id}-${idx}`,
      pairId: pair.id,
      explanation: pair.explanation || "",
    }));

    state.leftCards = shuffle(left);
    state.rightCards = shuffle(right);
  }

  function renderLevel() {
    const level = getLevel();
    state.selectedLeftId = null;
    state.selectedRightId = null;
    state.matchedPairIds = new Set();

    prepareLevelData(level);

    els.levelIndex.textContent = String(state.currentLevelIndex + 1);
    els.levelTitle.textContent = level.title;
    els.leftColumn.innerHTML = "";
    els.rightColumn.innerHTML = "";
    hideExplanation();
    updateProgress();
    els.nextBtn.disabled = true;

    state.leftCards.forEach((item) =>
      els.leftColumn.appendChild(buildCard(item, level.type, "left")),
    );
    state.rightCards.forEach((item) =>
      els.rightColumn.appendChild(buildCard(item, level.type, "right")),
    );
  }

  function clearSelectionClasses() {
    document
      .querySelectorAll(".card.selected")
      .forEach((el) => el.classList.remove("selected"));
  }

  function onCardClick(card) {
    if (card.classList.contains("matched")) return;

    const side = card.dataset.side;
    const itemId = card.dataset.itemId;

    if (side === "left") {
      state.selectedLeftId = state.selectedLeftId === itemId ? null : itemId;
    } else {
      state.selectedRightId = state.selectedRightId === itemId ? null : itemId;
    }

    clearSelectionClasses();
    if (state.selectedLeftId)
      document
        .querySelector(`.card[data-item-id="${state.selectedLeftId}"]`)
        ?.classList.add("selected");
    if (state.selectedRightId)
      document
        .querySelector(`.card[data-item-id="${state.selectedRightId}"]`)
        ?.classList.add("selected");

    if (state.selectedLeftId && state.selectedRightId) {
      checkMatch();
    }
  }

  function checkMatch() {
    const leftCard = document.querySelector(
      `.card[data-item-id="${state.selectedLeftId}"]`,
    );
    const rightCard = document.querySelector(
      `.card[data-item-id="${state.selectedRightId}"]`,
    );
    if (!leftCard || !rightCard) return;

    const pairId = leftCard.dataset.pairId;
    const isMatch = pairId === rightCard.dataset.pairId;

    if (isMatch) {
      state.matchedPairIds.add(pairId);
      [leftCard, rightCard].forEach((card) => {
        card.classList.remove("selected", "selectable", "hint");
        card.classList.add("matched", "magic-burst");
        setTimeout(() => card.classList.remove("magic-burst"), 850);
      });
      showExplanationForPair(pairId);
      updateProgress();
      if (state.matchedPairIds.size === getLevel().pairs.length) {
        els.nextBtn.disabled = false;
      }
    } else {
      [leftCard, rightCard].forEach((card) => {
        const front = card.querySelector(".card-front");
        front.style.borderColor = "rgba(255,142,142,0.95)";
        front.style.boxShadow = "0 0 0 2px rgba(255,142,142,0.35)";
        setTimeout(() => {
          front.style.borderColor = "";
          front.style.boxShadow = "";
        }, 340);
      });
    }

    state.selectedLeftId = null;
    state.selectedRightId = null;
    clearSelectionClasses();
  }

  function showExplanationForPair(pairId) {
    const pair = getLevel().pairs.find((p) => p.id === pairId);
    if (pair && pair.explanation) {
      els.explanationText.textContent = pair.explanation;
      els.explanationBox.classList.remove("hidden");
    } else {
      hideExplanation();
    }
  }

  function hideExplanation() {
    els.explanationText.textContent = "";
    els.explanationBox.classList.add("hidden");
  }

  function updateProgress() {
    els.progressValue.textContent = `${state.matchedPairIds.size} / ${getLevel().pairs.length}`;
  }

  function startGame() {
    state.hintsLeft = 6;
    updateHintsUI();
    state.currentLevelIndex = 0;
    renderLevel();
    showScreen(els.gameScreen);
  }

  function restartLevel() {
    renderLevel();
  }

  function nextLevel() {
    if (state.matchedPairIds.size !== getLevel().pairs.length) return;
    if (state.currentLevelIndex >= window.levels.length - 1) {
      showScreen(els.finishScreen);
      return;
    }
    state.currentLevelIndex += 1;
    renderLevel();
  }

  function backToMenu() {
    showScreen(els.startScreen);
  }

  function showHint() {
    document
      .querySelectorAll(".card.hint")
      .forEach((el) => el.classList.remove("hint"));
    const unconnected = getLevel().pairs.find(
      (pair) => !state.matchedPairIds.has(pair.id),
    );
    if (!unconnected) return;

    const leftCard = document.querySelector(
      `.card[data-pair-id="${unconnected.id}"][data-side="left"]`,
    );
    const rightCard = document.querySelector(
      `.card[data-pair-id="${unconnected.id}"][data-side="right"]`,
    );
    [leftCard, rightCard].forEach((card) => card?.classList.add("hint"));
    setTimeout(
      () =>
        [leftCard, rightCard].forEach((card) => card?.classList.remove("hint")),
      1800,
    );
  }

  els.startGameBtn.addEventListener("click", startGame);
  els.playAgainBtn.addEventListener("click", startGame);
  els.finishMenuBtn.addEventListener("click", backToMenu);
  els.restartBtn.addEventListener("click", restartLevel);
  els.menuBtn.addEventListener("click", backToMenu);
  els.nextBtn.addEventListener("click", nextLevel);
  els.hintBtn.addEventListener("click", showHint, useHint);
})();
