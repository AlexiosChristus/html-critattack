import './../scss/style.scss'
import filterTags from './filter-tags'
document.addEventListener('DOMContentLoaded', function(){
    filterTags()
})



document.addEventListener("DOMContentLoaded", () => {
  console.log("main.ts подключён");

  const tagButtons = document.querySelectorAll<HTMLButtonElement>(".catalog-tags__button");
  const catalogCards = document.querySelectorAll<HTMLElement>(".catalog-card");

  console.log("Кнопок найдено:", tagButtons.length);
  console.log("Карточек найдено:", catalogCards.length);

  // 🔹 Читаем тег из URL
  const params = new URLSearchParams(window.location.search);
  const tagFromUrl = params.get("tag");

  // 🔹 Функция фильтрации
  function applyFilter(selectedTag: string) {
    console.log("Применяем фильтр:", selectedTag);

    // переключаем активную кнопку
    tagButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tag === selectedTag);
    });

    // фильтруем карточки
    catalogCards.forEach((card) => {
      const cardTags = (card.dataset.tags ?? "")
        .split(",")
        .map((tag) => tag.trim());

      const shouldShow =
        selectedTag === "all" || cardTags.includes(selectedTag);

      card.hidden = !shouldShow;
    });
  }

  // 🔹 Обработчик кликов
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag ?? "all";

      applyFilter(selectedTag);

      // обновляем URL без перезагрузки
      const url = new URL(window.location.href);
      url.searchParams.set("tag", selectedTag);
      window.history.pushState({}, "", url);
    });
  });

  // 🔹 Применяем фильтр при загрузке страницы
  if (tagFromUrl) {
    const exists = Array.from(tagButtons).some(
      (btn) => btn.dataset.tag === tagFromUrl
    );

    applyFilter(exists ? tagFromUrl : "all");
  }
});




const burgerButton = document.querySelector<HTMLButtonElement>(".burger-button");
const nav = document.querySelector<HTMLElement>(".nav");

if (burgerButton && nav) {
  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("is-active");
    nav.classList.toggle("is-open");
  });
}


const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerButton?.classList.remove("is-active");
    nav?.classList.remove("is-open");
  });
});



console.log("theme script loaded");

const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");

// 1. Применяем сохранённую тему
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

// 2. Обновляем иконку при загрузке
if (themeToggle && savedTheme) {
  themeToggle.textContent = savedTheme === "light" ? "☀️" : "🌙";
}

// 3. Переключение темы
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    console.log("theme button clicked");

    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    themeToggle.textContent = newTheme === "light" ? "☀️" : "🌙";
  });
}
