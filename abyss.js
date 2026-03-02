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
  const titleEl = document.getElementById("abyssTitle");
  const bodyEl = document.getElementById("abyssBody");
  const revealBtn = document.getElementById("abyssReveal");
  const skipBtn = document.getElementById("abyssSkip");
  const continueBtn = document.getElementById("abyssContinue");

  let locked = false;
  let lockedY = 0;
  let gateFired = false;
  const gateKey = "abyss_gate_done_v1";

  continueBtn.style.display = "none";

  function lockScroll() {
    if (locked) return;
    locked = true;
    lockedY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    if (!locked) return;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedY);
    locked = false;
  }

  function setOverlay(open) {
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function setButtons(mode) {
    if (mode === "choice") {
      revealBtn.style.display = "";
      skipBtn.style.display = "";
      continueBtn.style.display = "none";
      revealBtn.focus();
    } else {
      revealBtn.style.display = "none";
      skipBtn.style.display = "none";
      continueBtn.style.display = "";
      continueBtn.focus();
    }
  }

  function showChoice() {
    titleEl.textContent = "THE ABYSS";
    bodyEl.textContent = "You can reveal the prompt, or skip it.";
    setButtons("choice");
    setOverlay(true);
  }

  function showMessage(title, message) {
    titleEl.textContent = title;
    bodyEl.textContent = message;
    setButtons("continue");
    setOverlay(true);
  }

  function closeOverlay() {
    setOverlay(false);
  }

  function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function pickEvent() {
    const r = Math.random();
    if (r < 0.22) return "nothing";
    if (r < 0.49) return "taunt";
    if (r < 0.69) return "nudge";
    if (r < 0.81) return "fakewin";
    if (r < 0.94) return "glitch";
    return "reset";
  }

  let afterContinue = null;

  function runReveal() {
    const evt = pickEvent();
    if (evt === "nothing") {
      sessionStorage.setItem(gateKey, "1");
      closeOverlay();
      unlockScroll();
      return;
    }

    if (evt === "taunt") {
      sessionStorage.setItem(gateKey, "1");
      afterContinue = function () {
        closeOverlay();
        unlockScroll();
      };
      showMessage("TAUNT", randomQuote());
      return;
    }

    if (evt === "nudge") {
      sessionStorage.setItem(gateKey, "1");
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const dir = Math.random() < 0.5 ? -1 : 1;
      const delta = Math.round(docHeight * 0.12) * dir;
      afterContinue = function () {
        closeOverlay();
        unlockScroll();
        window.scrollBy(0, delta);
      };
      showMessage(
        "SHIFT",
        dir > 0 ? "Something pushes you onward." : "Something pulls you back."
      );
      return;
    }

    if (evt === "fakewin") {
      sessionStorage.setItem(gateKey, "1");
      afterContinue = function () {
        closeOverlay();
        unlockScroll();
      };
      showMessage("YOU WIN", "Not yet.");
      return;
    }

    if (evt === "glitch") {
      sessionStorage.setItem(gateKey, "1");
      document.body.classList.add("glitching");
      setTimeout(function () {
        document.body.classList.remove("glitching");
      }, 2200);
      afterContinue = function () {
        closeOverlay();
        unlockScroll();
      };
      showMessage("GLITCH", "The abyss blinks.");
      return;
    }

    afterContinue = function () {
      closeOverlay();
      unlockScroll();
      sessionStorage.removeItem(gateKey);
      window.scrollTo(0, 0);
    };
    showMessage("RESET", "Return to the surface.");
  }

  revealBtn.addEventListener("click", function () {
    runReveal();
  });

  skipBtn.addEventListener("click", function () {
    sessionStorage.setItem(gateKey, "1");
    closeOverlay();
    unlockScroll();
  });

  continueBtn.addEventListener("click", function () {
    const fn = afterContinue;
    afterContinue = null;
    if (typeof fn === "function") fn();
    else {
      closeOverlay();
      unlockScroll();
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
    if (gateFired) return;
    if (sessionStorage.getItem(gateKey) === "1") return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const t = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    if (t >= 0.33) {
      gateFired = true;
      lockScroll();
      showChoice();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateBackground);
  onScroll();
})();
