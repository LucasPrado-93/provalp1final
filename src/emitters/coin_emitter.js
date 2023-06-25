import { EventEmitter } from 'events'
import cron from 'node-cron'
import { getBitcoinPrice } from '../services/coin_service.js'

export const coinEmitter = new EventEmitter()

/**
 * Ajusta o período de execução da leitura
 * do preço do Bitcoin para cada 30 segundos
 */
const period = '*/30 * * * * *'

/**
 * Este scheduler realiza a leitura do
 * preço do Bitcoin de acordo com o período
 * ajustado acima. Após realizar a leitura,
 * ele utiliza o coin emitter para transmitir
 * o preço atual do Bitcoin para todos os listeners
 * que estiverem ouvindo ao evento btc_read.
 */
cron.schedule(period, async () => {
  const price = await getBitcoinPrice()
  coinEmitter.emit('btc_read', price)
})
