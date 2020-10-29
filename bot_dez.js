const env = require('./.env');
const telegraf = require('telegraf');
const Axios = require('axius')
const Fs = require('fs')
const Path = require('path')
const downloadImg = require('./donwloadImg')

//inicia o boot
const bot = new telegraf(env.token);

bot.use(async (ctx, next) => {
    const strat = new Date();
    await next();
    const ms = new Date - strat;
    const dataHora = new Date().toLocaleString();
    console.log(`${dataHora} \n tempo de resposta: ${ms} ms`)
})

bot.on('text', ctx => ctx.reply('envie uma imagem?'));
bot.start(ctx => ctx.reply('envie uma imagem?'))

//evento de fotos
bot.on('photo', async ctx => {

    const photo = ctx.message.photo
    const caption = ctx.message.caption

    console.log(`Quantidade de arquivos gerados: ${photo.length}`)


    // ID da foto de menor resolução
    const id = photo[0].file.id

    const res = await Axios.get(`${env.apiUrl}/getFile?file_id =${id}`)

    const url = `${env.apiFileUrl}/${res.data.result.file_path}`

    const file_unique_id = res.data.result.file_unique_id

    //baixando o arquivo localmente
    await downloadImg(url, file_unique_id)

    // responder com o arquivo local
    const source = Path.resolve(__dirname, 'img', `${file_unique_id}.jpg`)


   console.log(source)

   await ctx.replyWithPhoto({source:Fs.createReadStream(source)},{caption})
})
bot.launch();