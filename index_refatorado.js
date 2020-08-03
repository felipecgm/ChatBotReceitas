const env = require('./.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const bot = new Telegraf(env.token);

//Menu Principal
const menuPrincipal = ['Entradas e Acompanhamentos', 'Pratos Principais', 
    'Bebidas e Sobremesas', 'Sabores Diversos', 'Receitas mais Saudáveis'];

//Botões Menu Principal
const gerarBotoes = () => Extra.markup(
    Markup.inlineKeyboard(
        menuPrincipal.map((value, index) => Markup.callbackButton(value, `op ${index}`)),
        { columns: 1 }
    )
)

//Inicialização do bot
bot.on('text', async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Olá, ${name}, seja bem vindo(a)!`);
    await ctx.reply('Quer uma ideia para cozinhar?😋\n\nEscolha uma categoria de receita:\n', gerarBotoes());
});

//Subcategorias de receitas
const op1 = ['sopas-e-saladas', 'molhos-e-acompanhamentos', 'padaria'];
const op2 = ['aves', 'carnes', 'massas-variadas', 'peixes-e-frutos-do-mar'];
const op3 = ['aniversario-carrefour', 'padaria', 'bolos-e-doces', 'drinks-coqueteis-e-bebidas'];
const op4 = ['tempero-e-arte', 'chefs-convidados', 'prato-unico', 'petiscos-para-torcer', 'receitas-dia-namorados', 'receitas-festa-junina'];
const op5 = ['receitas-verao', 'receitas-saudaveis', 'natal', 'receitas-para-criancas', 'menu-sustentavel', 'macarrao-saudavel'];
const opcoes = [op1, op2, op3, op4, op5];

//Criação dos botões de cada item do menu principal
const urlChefCarrefour = 'https://www.carrefour.com.br/dicas/chef-carrefour/';

//Botões subcategoria
const submenus = [0, 0, 0, 0, 0];

for(let i = 0; i < submenus.length; i++) {
    submenus[i] = () => Extra.markup(
        Markup.inlineKeyboard(
            opcoes[i].map(value => Markup.urlButton(value, `${urlChefCarrefour}${value}`)),
            { columns: 2 }
        )
    )
};

//Escolhendo determinado item do menu principal, geram-se os botões de cada categoria
for (let i = 0; i < submenus.length; i++) {
    bot.action(`op ${i}`, async ctx => {
        await ctx.reply(`Em ${menuPrincipal[i]} temos as seguintes opções:`, submenus[i]());
    });
};

bot.startPolling();