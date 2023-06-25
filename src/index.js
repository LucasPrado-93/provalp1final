import { coinEmitter } from "./emitters/coin_emitter.js";
import { openDB } from "./config/db.js";
import {
  CREATE_TABLE_BTC_VALUE,
  INSERT_BTC_READ,
  SELECT_AVG_PRICE,
} from "./config/queries.js";

console.log("Iniciando leituras...");

/**
 * Formatador capaz de formatar um número
 * no padrão de moeda brasileiro.
 */
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "usd",
});
const db = await openDB();
await db.exec(CREATE_TABLE_BTC_VALUE);

let counter = 1;
coinEmitter.on("btc_read", async (price) => {
  const time = new Date().toISOString();
  const formattedPrice = moneyFormatter.format(price);
  console.log(`Preço do Bitcoin em ${time} -> U$ ${formattedPrice}`);

  const generateId = () => {
    let dataNow = Date.now();
    const numberRandom = Math.floor(Math.random() * 1000); // Número aleatório entre 0 e 999
    const id = `${dataNow}${counter}${numberRandom}`;
    counter++;
    return id;
  };
  let idTable = generateId();

  await db.run(INSERT_BTC_READ, idTable, time, formattedPrice);
  let allData = await db.all(SELECT_AVG_PRICE);
  /**
   * Abaixo, crie o código necessário para salvar
   * o novo preço lido do Bitcoin na tabela btc_value.
   * Após, crie o código necessário para executar uma
   * consulta na tabela btc_value que retorne o valor
   * médio do Bitcoin desde a primeira leitura.
   *
   */

  const pricesBitcoin = allData.map((e) => {
    const exluedString = e.price.replace(/[^0-9.,]/g, "");
    return parseFloat(exluedString);
  });
  let distinctPrices = new Set(pricesBitcoin);

  let totalValue = [...distinctPrices].reduce(
    (accumulator, price) => accumulator + price,
    0
  );
  let resultPrice = totalValue / distinctPrices.size;

  console.log(`O preço médio do bitcoin está: US$ ${resultPrice}`);
});

/**
 * Observação final:
 *
 * Implemente este script de tal forma que,
 * caso ele seja interrompido e posteriormente
 * executado novamente, não haja problemas
 * de conflito de chaves primárias na tabela
 * btc_value.
 */
