const env = require('./.env');
const telegraf = require('telegraf');

const bot = new telegraf(env.token);

bot.use(async(ctx,next)=>{
    const strat = new Date();
    await next();
    const ms = new Date -strat;
    const dataHora = new Date().toLocaleString();
    console.log(`${dataHora} \n tempo de resposta: ${ms} ms`)
})

bot.on('text',ctx => ctx.reply('Alo mundo Senai'));

bot.launch();