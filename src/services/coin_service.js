/**
 * A API Coin Gecko contém web services que retornam
 * os valores atuais de uma grande gama de criptomoedas.
 * A URL abaixo aponta para o web service que retorna o
 * preço de uma criptomoeda específica. Por meio dos
 * search params ids e vs_currencies, por meio desta URL
 * a API Coin Gecko retorna o preço atual do Bitcoin em
 * dólar.
 */
const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'

/**
 * Faz a leitura do preço atual do Bitcoin.
 * @returns o preço atual do bitcoin em dólar
 */
export const getBitcoinPrice = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  const { bitcoin } = data
  const { usd } = bitcoin
  return usd
}
