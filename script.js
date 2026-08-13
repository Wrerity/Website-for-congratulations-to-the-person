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

// Показ открытки по клику
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("card").classList.remove("hidden");
  document.getElementById("cover").classList.add("hidden");
  // Здесь раньше запускалось конфетти
});

// Конфетти: canvas готов, осталось дописать частицы и запуск
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);

// Летающие эмодзи удалены. Контейнеры #coverFloating и #cardFloating
// есть в HTML, сюда добавлялись span с эмодзи и CSS-анимацией rise.
