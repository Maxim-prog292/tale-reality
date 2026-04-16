(function () {
  const GAME_MODE_ALL = "all";
  const GAME_MODE_SINGLE = "single";

  const FINISH_MODE_ALL = "all";
  const FINISH_MODE_SINGLE = "single";

  const state = {
    currentLevelIndex: 0,
    selectedLeftId: null,
    selectedRightId: null,
    matchedPairIds: new Set(),
    leftCards: [],
    rightCards: [],
    hintsLeft: 6,
    gameMode: GAME_MODE_ALL,
    finishMode: FINISH_MODE_ALL,
  };
  function addTapListener(element, handler) {
    let touched = false;

    element.addEventListener(
      "touchstart",
      (e) => {
        touched = true;
        e.preventDefault();
        handler(e);
      },
      { passive: false },
    );

    element.addEventListener("click", (e) => {
      if (touched) {
        touched = false;
        return;
      }
      handler(e);
    });
  }
  const els = {
    startScreen: document.getElementById("startScreen"),
    levelSelectScreen: document.getElementById("levelSelectScreen"),
    gameScreen: document.getElementById("gameScreen"),
    finishScreen: document.getElementById("finishScreen"),

    startGameBtn: document.getElementById("startGameBtn"),
    chooseLevelBtn: document.getElementById("chooseLevelBtn"),
    chooseLevelBtn2: document.getElementById("chooseLevelBtn2"),
    levelMenuBackBtn: document.getElementById("levelMenuBackBtn"),

    playAgainBtn: document.getElementById("playAgainBtn"),
    finishMenuBtn: document.getElementById("finishMenuBtn"),
    finishSelectLevelBtn: document.getElementById("finishSelectLevelBtn"),

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

    levelList: document.getElementById("levelList"),

    finishEyebrow: document.getElementById("finishEyebrow"),
    finishTitle: document.getElementById("finishTitle"),
    finishSubtitle: document.getElementById("finishSubtitle"),
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
    [els.startScreen, els.levelSelectScreen, els.gameScreen, els.finishScreen]
      .filter(Boolean)
      .forEach((el) => el.classList.remove("active"));

    if (screen) {
      screen.classList.add("active");
    }
  }

  function updateHintsUI() {
    if (!els.hintBtn) return;

    els.hintBtn.innerText = `Подсказка (${state.hintsLeft})`;

    if (state.hintsLeft <= 0) {
      els.hintBtn.classList.add("disabled");
      els.hintBtn.disabled = true;
    } else {
      els.hintBtn.classList.remove("disabled");
      els.hintBtn.disabled = false;
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

    card.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        onCardClick(card);
      },
      { passive: false },
    );
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

    if (state.gameMode === GAME_MODE_SINGLE) {
      els.nextBtn.disabled = true;
      els.nextBtn.classList.add("hidden");
    } else {
      els.nextBtn.disabled = true;
      els.nextBtn.classList.remove("hidden");
    }

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

    if (state.selectedLeftId) {
      document
        .querySelector(`.card[data-item-id="${state.selectedLeftId}"]`)
        ?.classList.add("selected");
    }

    if (state.selectedRightId) {
      document
        .querySelector(`.card[data-item-id="${state.selectedRightId}"]`)
        ?.classList.add("selected");
    }

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
        if (state.gameMode === GAME_MODE_SINGLE) {
          setTimeout(() => {
            openFinishScreen(FINISH_MODE_SINGLE);
          }, 450);
        } else {
          els.nextBtn.disabled = false;
        }
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
    state.gameMode = GAME_MODE_ALL;
    state.hintsLeft = 6;
    updateHintsUI();
    state.currentLevelIndex = 0;
    renderLevel();
    showScreen(els.gameScreen);
  }

  function startSelectedLevel(levelIndex) {
    state.gameMode = GAME_MODE_SINGLE;
    state.hintsLeft = 6;
    updateHintsUI();
    state.currentLevelIndex = levelIndex;
    renderLevel();
    showScreen(els.gameScreen);
  }

  function restartLevel() {
    state.hintsLeft = 6;
    updateHintsUI();
    renderLevel();
  }

  function nextLevel() {
    if (state.matchedPairIds.size !== getLevel().pairs.length) return;

    if (state.currentLevelIndex >= window.levels.length - 1) {
      openFinishScreen(FINISH_MODE_ALL);
      return;
    }

    state.currentLevelIndex += 1;
    renderLevel();
  }

  function backToMenu() {
    state.gameMode = GAME_MODE_ALL;
    showScreen(els.startScreen);
  }

  function renderLevelList() {
    if (!els.levelList) return;

    els.levelList.innerHTML = "";

    window.levels.forEach((level, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn";
      btn.textContent = `${index + 1}. ${level.title}`;
      btn.addEventListener("click", () => {
        startSelectedLevel(index);
      });

      els.levelList.appendChild(btn);
    });
  }

  function openLevelSelect() {
    renderLevelList();
    showScreen(els.levelSelectScreen);
  }

  function openFinishScreen(mode) {
    state.finishMode = mode;

    if (mode === FINISH_MODE_SINGLE) {
      if (els.finishEyebrow) {
        els.finishEyebrow.textContent = "Уровень завершён";
      }
      if (els.finishTitle) {
        els.finishTitle.textContent = "Уровень пройден";
      }
      if (els.finishSubtitle) {
        els.finishSubtitle.textContent =
          "Можно вернуться в меню или выбрать другой уровень.";
      }

      if (els.playAgainBtn) {
        els.playAgainBtn.classList.add("hidden");
      }
      if (els.finishSelectLevelBtn) {
        els.finishSelectLevelBtn.classList.remove("hidden");
      }
    } else {
      if (els.finishEyebrow) {
        els.finishEyebrow.textContent = "Финал";
      }
      if (els.finishTitle) {
        els.finishTitle.textContent = "Все уровни пройдены";
      }
      if (els.finishSubtitle) {
        els.finishSubtitle.textContent = "Молодец!";
      }

      if (els.playAgainBtn) {
        els.playAgainBtn.classList.remove("hidden");
      }
      if (els.finishSelectLevelBtn) {
        els.finishSelectLevelBtn.classList.add("hidden");
      }
    }

    showScreen(els.finishScreen);
  }

  function showHint() {
    if (state.hintsLeft <= 0) return;

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

    state.hintsLeft -= 1;
    updateHintsUI();

    setTimeout(() => {
      [leftCard, rightCard].forEach((card) => card?.classList.remove("hint"));
    }, 1800);
  }

  if (els.startGameBtn) {
    els.startGameBtn.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        startGame();
      },
      { passive: false },
    );
  }

  if (els.chooseLevelBtn) {
    els.chooseLevelBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        openLevelSelect();
      },
      { passive: false },
    );
  }

  if (els.chooseLevelBtn2) {
    els.chooseLevelBtn2.addEventListener("click", openLevelSelect);
  }

  if (els.levelMenuBackBtn) {
    els.levelMenuBackBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        backToMenu();
      },
      { passive: false },
    );
  }

  if (els.playAgainBtn) {
    els.playAgainBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        startGame();
      },
      { passive: false },
    );
  }

  if (els.finishMenuBtn) {
    els.finishMenuBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        backToMenu();
      },
      { passive: false },
    );
  }

  if (els.finishSelectLevelBtn) {
    els.finishSelectLevelBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        openLevelSelect();
      },
      { passive: false },
    );
  }

  if (els.restartBtn) {
    els.restartBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        restartLevel();
      },
      { passive: false },
    );
  }

  if (els.menuBtn) {
    els.menuBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        backToMenu();
      },
      { passive: false },
    );
  }

  if (els.nextBtn) {
    els.nextBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        nextLevel();
      },
      { passive: false },
    );
  }

  if (els.hintBtn) {
    els.hintBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        showHint();
      },
      { passive: false },
    );
  }

  updateHintsUI();
})();
