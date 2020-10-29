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

//enviando informação de um user
bot.start(async ctx => {

    const from = ctx.message.from;
    from.id = undefined;
    console.log(from);
    if(from.unsername === 'tarcnux'){

        await ctx.reply(`ola mundo ${from.username},e seu nome:${from.first_name} ${from.last_name} `);
        
    }else {
        
        await ctx.reply(`nao estou autorizado a conversar com você.`);

    }
})


bot.on('text',ctx => ctx.reply('Alo mundo Senai'));
//evento localização
bot.on('locatio',async ctx =>{

    const location = ctx.message.locatino;
    console.log(location);
    const lat  = location.latitude;
    const long = location.longitude;
    await ctx-reply(`Voc~e esta em lat ${lat}  -lon ${long}`) 
})



bot.launch();