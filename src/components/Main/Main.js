import { memo } from "react";
import "./Main.css";

function Main() {
  return (
    <section className="main">
      <article className="main__article">
        <h1 className="main__title">Стоимость фьючерсов на газ в Европе упала ниже $1000. Инфографика</h1>
        <p className="main__subtitle">
          Стоимость фьючерсов на газ в Европе упала ниже $1000. Инфографика После
          открытия торгов 28 октября биржевая цена на газ в Европе обвалилась на
          9%, стоимость 1 МВт·ч составила меньше €80, или $1000 за 1 тыс. куб. м.
          Исторический рекорд был 6 октября — €162 за 1 МВт·ч, свыше $1900 за 1
          тыс. куб. м
        </p>
      </article>
    </section>
  );
}

export default memo(Main);
