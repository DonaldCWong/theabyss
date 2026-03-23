import "./abyss.css";
import joeAngryImage from "./src/assets/joe angry.png";

(function () {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const startColor = { r: 40, g: 42, b: 55 };
  const endColor = { r: 3, g: 0, b: 0 };

  const quotes = [
    `“The trouble with the world is that the stupid are cocksure and the intelligent are full of doubt.” — Bertrand Russell`,
    `“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.” — Albert Einstein`,
    `“Never argue with an idiot. They will drag you down to their level and beat you with experience.” — Mark Twain`,
    `“Hell is other people.” — Jean-Paul Sartre`,
    `“I love mankind… it's people I can't stand.” — Charles M. Schulz`,
    `“Human beings, who are almost unique in having the ability to learn from the experience of others, are also remarkable for their apparent disinclination to do so.” — Douglas Adams`,
    `“The surest sign that intelligent life exists elsewhere in the universe is that it has never tried to contact us.” — Bill Watterson`,
    `“We are all in the gutter, but some of us are looking at the stars.” — Oscar Wilde`,
    `“The mass of men lead lives of quiet desperation.” — Henry David Thoreau`,
    `“Most people are other people.” — Oscar Wilde`,
    `“Man is the only animal that blushes. Or needs to.” — Mark Twain`,
    `“The average man does not want to be free. He simply wants to be safe.” — H. L. Mencken`,
    `“Insanity is doing the same thing over and over again and expecting different results.” — Rita Mae Brown`,
    `“It is difficult to get a man to understand something, when his salary depends on his not understanding it.” — Upton Sinclair`,
    `“Every existing thing is born without reason, prolongs itself out of weakness, and dies by chance.” — Jean-Paul Sartre`,
    `“If you’re going through hell, keep going.” — Winston Churchill`,
    `“A person who thinks all the time has nothing to think about except thoughts.” — Alan Watts`,
    `“Life is a tale told by an idiot, full of sound and fury, signifying nothing.” — William Shakespeare`,
    `“The unexamined life is not worth living.” — Socrates`,
    `“Against stupidity the gods themselves contend in vain.” — Friedrich Schiller`,
    `“The majority of people are fools.” — Niccolò Machiavelli`,
    `“It is no measure of health to be well adjusted to a profoundly sick society.” — Jiddu Krishnamurti`,
    `“People demand freedom of speech as a compensation for the freedom of thought which they seldom use.” — Søren Kierkegaard`,
    `“Man is condemned to be free.” — Jean-Paul Sartre`,
    `“The only thing necessary for the triumph of evil is for good men to do nothing.” — Edmund Burke`,
    `“We are what we pretend to be, so we must be careful about what we pretend to be.” — Kurt Vonnegut`,
    `“To be stupid, selfish, and have good health are three requirements for happiness.” — Gustave Flaubert`,
    `“Whenever you find yourself on the side of the majority, it is time to pause and reflect.” — Mark Twain`,
    `“The absurd is born of this confrontation between the human need and the unreasonable silence of the world.” — Albert Camus`,
    `“A casual stroll through the lunatic asylum shows that faith does not prove anything.” — Friedrich Nietzsche`,
    `“What is hell? I maintain that it is the suffering of being unable to love.” — Fyodor Dostoevsky`,
    `“He who despises himself still respects himself as one who despises.” — Friedrich Nietzsche`,
    `“Man is the only creature who refuses to be what he is.” — Albert Camus`,
    `“Experience is merely the name men gave to their mistakes.” — Oscar Wilde`,
    `“One is not born, but rather becomes, a woman.” — Simone de Beauvoir`,
    `“The whole problem with the world is that fools and fanatics are always so certain of themselves.” — Bertrand Russell`,
    `“I am free of all prejudice. I hate everyone equally.” — W. C. Fields`,
    `“No one is more dangerous than he who imagines himself pure in heart.” — James Baldwin`,
    `“The only true wisdom is in knowing you know nothing.” — Socrates`,
    `“It is better to be feared than loved, if you cannot be both.” — Niccolò Machiavelli`,
    `“Life is nothing but a competition to be the criminal rather than the victim.” — Bertrand Russell`,
    `“Men are born ignorant, not stupid; they are made stupid by education.” — Bertrand Russell`,
    `“Most men would rather deny a hard truth than face it.” — George R. R. Martin`,
    `“We live in the best of all possible worlds.” — Voltaire`,
    `“Nothing in the world is more dangerous than sincere ignorance and conscientious stupidity.” — Martin Luther King Jr.`,
    `“The aim of art is to represent not the outward appearance of things, but their inward significance.” — Aristotle`,
    `“Life is really simple, but we insist on making it complicated.” — Confucius`,
    `“Man suffers only because he takes seriously what the gods made for fun.” — Alan Watts`,
    `“You are free, and that is why you are lost.” — Franz Kafka`,
    `“It is the mark of an educated mind to be able to entertain a thought without accepting it.” — Aristotle`,
  ];

  const overlay = document.getElementById("abyssOverlay");
  const modalEl = overlay.querySelector(".modal");
  const titleEl = document.getElementById("abyssTitle");
  const bodyEl = document.getElementById("abyssBody");
  const revealBtn = document.getElementById("abyssReveal");
  const skipBtn = document.getElementById("abyssSkip");
  const continueBtn = document.getElementById("abyssContinue");
  const skipModal = document.getElementById("abyssSkipModal");
  const skipModalText = document.getElementById("abyssSkipModalText");
  const joeAngryOverlay = document.getElementById("abyssJoeAngry");
  const joeAngryImageEl = document.getElementById("abyssJoeAngryImage");

  joeAngryImageEl.src = joeAngryImage;

  let locked = false;
  let skipPressCount = 0;
  let skipButtonPermanentlyDisabled = false;
  let skipModalTimer = null;
  let skipModalIsFourthPress = false;
  let lockedY = 0;
  let previousScrollBehavior = "";
  let gateActive = false;
  let overlayDismissOnModalClick = false;
  let quoteVisible = false;
  let gateStepPx = Math.max(1, window.innerHeight * 3);
  let nextGateAt = gateStepPx;
  let gateCount = 0;
  const winGateIndex = Math.floor(Math.random() * 9) + 2; // 2–10: "you won" happens once per run at this gate
  let hasSeenWin = false;

  continueBtn.style.display = "none";

  function recalcGate() {
    gateStepPx = Math.max(1, window.innerHeight * 3);
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    nextGateAt = (Math.floor(y / gateStepPx) + 1) * gateStepPx;
  }

  function lockScroll() {
    if (locked) return;
    locked = true;
    lockedY = window.scrollY || document.documentElement.scrollTop || 0;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    if (!locked) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    window.scrollTo(0, lockedY);
    locked = false;
  }

  function setOverlay(open) {
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function setButtons(mode) {
    if (mode === "choice") {
      revealBtn.style.display = "";
      skipBtn.style.display = skipButtonPermanentlyDisabled ? "none" : "";
      continueBtn.style.display = "none";
      revealBtn.focus();
    } else if (mode === "result") {
      revealBtn.style.display = "none";
      skipBtn.style.display = "none";
      continueBtn.style.display = "none";
    } else {
      revealBtn.style.display = "none";
      skipBtn.style.display = "none";
      continueBtn.style.display = "";
      continueBtn.focus();
    }
  }

  function setOverlayDismissOnModalClick(enabled) {
    overlayDismissOnModalClick = enabled;
    modalEl.classList.toggle("is-clickable", enabled);
  }

  function showChoice() {
    quoteVisible = false;
    setOverlayDismissOnModalClick(false);
    titleEl.textContent = "";
    bodyEl.textContent = "You can reveal the prompt, or skip it.";
    setButtons("choice");
    setOverlay(true);
  }

  function showMessage(title, message, options) {
    const dismissOnClick = Boolean(options && options.dismissOnClick);
    quoteVisible = dismissOnClick;
    setOverlayDismissOnModalClick(dismissOnClick);
    titleEl.textContent = "";
    bodyEl.textContent = message;
    setButtons("result");
    setOverlay(true);
  }

  function closeOverlay() {
    quoteVisible = false;
    setOverlayDismissOnModalClick(false);
    setOverlay(false);
  }

  function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  let afterContinue = null;
  let timerA = null;
  let timerB = null;

  function clearTimers() {
    if (timerA) clearTimeout(timerA);
    if (timerB) clearTimeout(timerB);
    timerA = null;
    timerB = null;
  }

  function finishAndUnlock() {
    clearTimers();
    closeOverlay();
    unlockScroll();
    gateActive = false;
    recalcGate();
  }

  function pickEvent() {
    // "You won" happens exactly once per run at a random gate
    if (gateCount === winGateIndex && !hasSeenWin) {
      return "fakewin";
    }
    const r = Math.random();
    if (r < 0.08) return "nothing";   // nothing happens – less often
    if (r < 0.53) return "taunt";     // quote – more often
    if (r < 0.78) return "nudge";     // devil/god nudge
    if (r < 0.96) return "glitch";    // abyss blinks
    return "reset";                   // not worthy – rare
  }

  function runReveal() {
    const evt = pickEvent();
    if (evt === "nothing") {
      finishAndUnlock();
      return;
    }

    if (evt === "taunt") {
      showMessage("", randomQuote(), { dismissOnClick: true });
      timerA = setTimeout(function () {
        finishAndUnlock();
      }, 5000);
      return;
    }

    if (evt === "nudge") {
      // God message more often, devil less often
      const dir = Math.random() < 0.75 ? -1 : 1; // 75% god, 25% devil
      const delta = Math.round(window.innerHeight * 6) * dir;
      showMessage(
        "",
        dir > 0
          ? "The Devil wants to pull you down deeper"
          : "God decided you are not ready for the plunge"
      );
      timerA = setTimeout(function () {
        finishAndUnlock();
        window.scrollBy(0, delta);
        recalcGate();
      }, 5000);
      return;
    }

    if (evt === "fakewin") {
      hasSeenWin = true;
      bodyEl.textContent = "YOU WON";
      setButtons("result");
      setOverlay(true);
      timerA = setTimeout(function () {
        bodyEl.textContent = "You think you can fall into the abyss through luck?";
      }, 5000);   // first part 5 seconds
      timerB = setTimeout(function () {
        finishAndUnlock();
      }, 10000);  // next part 5 more seconds (10s total)
      return;
    }

    if (evt === "glitch") {
      document.body.classList.add("glitching");
      setTimeout(function () {
        document.body.classList.remove("glitching");
      }, 2200);
      showMessage("", "The abyss blinks.");
      timerA = setTimeout(function () {
        finishAndUnlock();
      }, 5000);
      return;
    }

    showMessage("", "Not even the devil considers you worthy for him");
    timerA = setTimeout(function () {
      location.reload();
    }, 5000);
  }

  revealBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    runReveal();
  });

  skipBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    handleSkipPress();
  });

  continueBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    const fn = afterContinue;
    afterContinue = null;
    if (typeof fn === "function") fn();
    else {
      finishAndUnlock();
    }
  });

  modalEl.addEventListener("click", function () {
    if (!overlayDismissOnModalClick || !quoteVisible) return;
    finishAndUnlock();
  });

  function closeSkipModal() {
    if (skipModalTimer) clearTimeout(skipModalTimer);
    skipModalTimer = null;
    skipModal.setAttribute("aria-hidden", "true");
    skipBtn.style.display = "none";
  }

  function handleSkipPress() {
    if (skipButtonPermanentlyDisabled) return;
    skipPressCount += 1;
    skipBtn.style.display = "none";

    if (skipPressCount === 1) {
      skipModalText.textContent = "Do you think you can just ignore me?";
      skipModal.setAttribute("aria-hidden", "false");
      skipModalTimer = setTimeout(function () {
        closeSkipModal();
      }, 3000);
      return;
    }

    if (skipPressCount === 2) {
      skipModalText.textContent = "I told you, stop trying to ignore me";
      skipModal.setAttribute("aria-hidden", "false");
      skipModalTimer = setTimeout(function () {
        closeSkipModal();
      }, 3000);
      return;
    }

    if (skipPressCount === 3) {
      joeAngryOverlay.setAttribute("aria-hidden", "false");
      const scrollBackAmount = Math.round(window.innerHeight * 1);
      setTimeout(function () {
        joeAngryOverlay.setAttribute("aria-hidden", "true");
        window.scrollBy(0, -scrollBackAmount);
        recalcGate();
        skipModalText.textContent = "I shall not be ignored like this!";
        skipModal.setAttribute("aria-hidden", "false");
        skipModalTimer = setTimeout(function () {
          closeSkipModal();
        }, 3000);
      }, 2500);
      return;
    }

    if (skipPressCount >= 4) {
      skipModalIsFourthPress = true;
      skipModalText.textContent = "Fine, have your small victory...";
      skipModal.setAttribute("aria-hidden", "false");
      skipModalTimer = setTimeout(function () {
        skipModalIsFourthPress = false;
        closeSkipModal();
        skipButtonPermanentlyDisabled = true;
        finishAndUnlock();
      }, 3000);
    }
  }

  skipModal.addEventListener("click", function () {
    if (skipModalTimer) clearTimeout(skipModalTimer);
    skipModalTimer = null;
    if (skipModalIsFourthPress) {
      skipModalIsFourthPress = false;
      closeSkipModal();
      skipButtonPermanentlyDisabled = true;
      finishAndUnlock();
    } else {
      closeSkipModal();
    }
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function updateBackground() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const t = Math.min(Math.max(scrollTop / docHeight, 0), 1);

    const r = Math.round(lerp(startColor.r, endColor.r, t));
    const g = Math.round(lerp(startColor.g, endColor.g, t));
    const b = Math.round(lerp(startColor.b, endColor.b, t));

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  function onScroll() {
    updateBackground();
    if (gateActive) return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y >= nextGateAt) {
      gateActive = true;
      gateCount += 1;
      nextGateAt += gateStepPx;
      lockScroll();
      showChoice();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    updateBackground();
    recalcGate();
  });
  recalcGate();
  onScroll();
})();
