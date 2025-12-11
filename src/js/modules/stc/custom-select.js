export function initCustomSelect() {
  const selects = document.querySelectorAll(".form__select");

  selects.forEach(select => {
    const input = select.querySelector(".form__select-input");
    const arrow = select.querySelector(".form__select-arrow");
    const optionsBox = select.querySelector(".form__select-options");
    const options = Array.from(optionsBox.querySelectorAll("span"));

    const open = () => {
      select.classList.add("open");
      runFilter(); // фільтрація при відкритті
    };

    const close = () => select.classList.remove("open");

    const toggle = () => {
      select.classList.toggle("open");
      if (select.classList.contains("open")) runFilter();
    };

    // --- Функція фільтрації ---
    const runFilter = () => {
      const filter = input.value.trim().toLowerCase();

      options.forEach(opt => {
        const text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(filter) ? "block" : "none";
      });
    };

    // Клік по інпуту
    input.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    // Клік по стрілці
    arrow.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    // Вибір елемента
    options.forEach(option => {
      option.addEventListener("click", () => {
        input.value = option.textContent;
        input.dataset.value = option.textContent; // ❗ для валідації
        close();
      });
    });

    // Фільтрація під час введення
    input.addEventListener("input", () => {
      runFilter();
      input.dataset.value = ""; // якщо вводять вручну → очищаємо
      if (input.value.trim() !== "") open();
    });

    // Закриття при кліку поза селектом
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) close();
    });
  });
}
