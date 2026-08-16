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
const COLORS = ["#ff6fb5", "#ffd166", "#ff9ff3", "#ffffff", "#ff9f1c", "#74b9ff", "#a29bfe", "#55efc4", "#ff7675"];
const pieces = [];
const gravity = 0.035;
let animating = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Разовый залп частиц из заданной точки
function burst(x, y, count = 60) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    const circle = Math.random() < 0.35;
    pieces.push({
      x, y,
      w: circle ? 5 + Math.random() * 5 : 5 + Math.random() * 6,
      h: circle ? 5 + Math.random() * 5 : 9 + Math.random() * 7,
      circle,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      rot: Math.random() * Math.PI,
      vr: -0.25 + Math.random() * 0.5,
      sway: Math.random() * Math.PI * 2,
    });
  }
}

// Запускаем конфетти: салют из центра экрана + дождь сверху
function launchConfetti() {
  burst(canvas.width / 2, canvas.height * 0.4, 260);
  burst(canvas.width * 0.3, canvas.height * 0.55, 120);
  burst(canvas.width * 0.7, canvas.height * 0.55, 120);
  // Дождь из частиц по всей ширине
  for (let i = 0; i < 220; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.8,
      w: 4 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      circle: Math.random() < 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: -1 + Math.random() * 2,
      vy: 2.5 + Math.random() * 3.5,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
      sway: Math.random() * Math.PI * 2,
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
    p.sway += 0.05;
    p.x += p.vx + Math.sin(p.sway) * 0.8;
    p.y += p.vy;
    p.vy += gravity;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.circle) {
      ctx.beginPath();
      ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
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
