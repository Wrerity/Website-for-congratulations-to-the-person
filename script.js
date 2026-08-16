// Настройки открытки: имя, возраст и тексты
const CONFIG = {
  name: "Анна",
  age: 23,
  message:
    "Ты самая лучшая подруга на свете! Пусть каждый день приносит радость, " +
    "счастье и море поводов для улыбки. Желаю исполнения всех самых смелых мечтаний!",
  from: "— с любовью, твой человек ❤️",
};

// Подставляем тексты в открытку
document.getElementById("name").textContent = CONFIG.name;
document.getElementById("age").textContent = CONFIG.age;
document.getElementById("message").textContent = CONFIG.message;
document.getElementById("from").textContent = CONFIG.from;
document.title = `С днём рождения, ${CONFIG.name}!`;

// Конфетти на канвасе
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const COLORS = ["#ff6fb5", "#ffd166", "#ff9ff3", "#ffffff", "#ff9f1c"];
const pieces = [];
let animating = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Запускаем конфетти: рассыпаем частицы сверху экрана
function launchConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: -1.5 + Math.random() * 3,
      vy: 2 + Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(draw);
  }
}

// Двигаем и рисуем частицы, пока они не упадут за край экрана
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    if (p.y > canvas.height + 20) pieces.splice(i, 1);
  }
  if (pieces.length) {
    requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animating = false;
  }
}

// Летающие эмодзи: наполняем контейнер спанами с эмодзи
const EMOJIS = ["🎈", "🎉", "💖", "✨", "🎊"];
function addFloatingEmojis(container, amount = 10) {
  for (let i = 0; i < amount; i++) {
    const span = document.createElement("span");
    span.textContent = EMOJIS[i % EMOJIS.length];
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 4 + Math.random() * 6 + "s";
    span.style.animationDelay = Math.random() * 4 + "s";
    container.appendChild(span);
  }
}
addFloatingEmojis(document.getElementById("coverFloating"));

// Показ открытки по клику: конфетти и эмодзи внутри
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("card").classList.remove("hidden");
  document.getElementById("cover").classList.add("hidden");
  launchConfetti();
  addFloatingEmojis(document.getElementById("cardFloating"));
});
