import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  const [steps] = useState(data); // получаем данные  из ./data.json для формирования списка шагов
  const [activeIndex, setActiveIndex] = useState("001"); // устанавливаем активное состояния для выбраного шага

  // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
  const forward = () => {
    if (!isLastStep) {
      let nextIndex = Number(activeIndex) + 1;
      setActiveIndex(nextIndex.toString().padStart(3, "0"));
    }
  };
  const back = () => {
    if (!isFirstStep) {
      let previousIndex = Number(activeIndex) - 1;
      setActiveIndex(previousIndex.toString().padStart(3, "0"));
    }
  };

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
  const isFirstStep = activeIndex === steps[0].id;
  const isLastStep = activeIndex === steps.at(-1).id;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[Number(activeIndex) - 1].content}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step) => (
              <li
                key={step.id}
                className={`${styles["steps-item"]} ${styles.done} ${
                  activeIndex === step.id ? styles.active : ""
                }`}
              >
                <button
                  onClick={() => setActiveIndex(step.id)}
                  className={styles["steps-item-button"]}
                >
                  {Number(step.id)}
                </button>
                {step.title}
              </li>
            ))}
          </ul>
          <div className={styles["buttons-container"]}>
            <button onClick={back} className={styles.button}>
              Назад
            </button>
            <button onClick={forward} className={styles.button}>
              Далее
              {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
              {/* Или заменять всю кнопку в зависимости от условия */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
