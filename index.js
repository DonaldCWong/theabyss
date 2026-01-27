const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Nosifer&display=swap";
document.head.appendChild(fontLink);

document.title = "THE ABYSS";

document.body.style.margin = "0";
document.body.style.minHeight = "100vh";
document.body.style.display = "grid";
document.body.style.placeItems = "center";
document.body.style.background =
  "radial-gradient(circle at 30% 20%, #2a0d0d, #0b0505 55%, #000)";
document.body.style.color = "#f7f1f1";

document.documentElement.style.colorScheme = "dark";

document.body.innerHTML = `
  <main>
    <h1>THE ABYSS</h1>
  </main>
`;

const heading = document.querySelector("h1");
heading.style.margin = "0";
heading.style.fontFamily = '"Nosifer", cursive';
heading.style.fontSize = "clamp(2.5rem, 10vw, 7rem)";
heading.style.letterSpacing = "0.1em";

