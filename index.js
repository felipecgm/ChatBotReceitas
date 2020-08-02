const env = require('./.env');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const bot = new Telegraf(env.token);
const menuPrincipal = ['Entradas e Acompanhamentos', 'Pratos Principais', 
    'Bebidas e Sobremesas', 'Sabores Diversos', 'Receitas mais Saudáveis'];

const gerarBotoes = () => Extra.markup(
    Markup.inlineKeyboard(
        menuPrincipal.map((value, index) => Markup.callbackButton(value, `op ${index}`)),
        { columns: 1 }
    )
)

bot.on('text', async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Olá, ${name}!`);
    await ctx.reply('Quer uma ideia para cozinhar?😋\nEscolha uma categoria de receita:', gerarBotoes());
});

const op1 = ['sopas-e-saladas', 'molhos-e-acompanhamentos', 'padaria'];
const op2 = ['aves', 'carnes', 'massas', 'peixes-e-frutos-do-mar'];
const op3 = ['aniversario-carrefour', 'padaria', 'bolos-e-doces', 'drinks-coqueteis-e-bebidas'];
const op4 = ['tempero-e-arte', 'chefs-convidados', 'prato-unico', 'petiscos-para-torcer', 'dia-dos-namorados', 'festa-junina'];
const op5 = ['receitas-de-verao', 'receitas-saudaveis', 'receitas-de-natal', 'receitas-para-criancas', 'menu-sustentavel', 'macarrao-saudavel'];

const opcoes = [...op1, ...op2, ...op3, ...op4, ...op5];

//Submenus
const urlChefCarrefour = 'https://www.carrefour.com.br/dicas/chef-carrefour/';

const sub1 = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sopas e Saladas', 'e1'),
    Markup.callbackButton('Molhos e Acompanhamentos', 'e2'),
    Markup.callbackButton('Padaria', 'e3')
], { columns: 2}));

const sub2 = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Aves', 'e4'),
    Markup.callbackButton('Carnes', 'e5'),
    Markup.callbackButton('Massas', 'e6'),
    Markup.callbackButton('Peixes e Frutos do Mar', 'e7')
], { columns: 2}));

const sub3 = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Aniversário Carrefour', 'e8'),
    Markup.callbackButton('Padaria', 'e9'),
    Markup.callbackButton('Bolos e Doces', 'e10'),
    Markup.callbackButton('Drinks, Coquetéis e Bebidas', 'e11')
], { columns: 2}));

const sub4 = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Tempero e Arte', 'e12'),
    Markup.callbackButton('Chefs Convidados', 'e13'),
    Markup.callbackButton('Prato Único', 'e14'),
    Markup.callbackButton('Petiscos para Torcer', 'e15'),
    Markup.callbackButton('Dia dos Namorados', 'e16'),
    Markup.callbackButton('Festa Junina', 'e17')
], { columns: 2}));

const sub5 = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Receitas de Verão', 'e18'),
    Markup.callbackButton('Receitas Saudáveis', 'e19'),
    Markup.callbackButton('Receitas de Natal', 'e20'),
    Markup.callbackButton('Receitas para Crianças', 'e21'),
    Markup.callbackButton('Menu Sustentável', 'e22'),
    Markup.callbackButton('Macarrão Saudável', 'e23')
], { columns: 2}));

const submenus = [sub1, sub2, sub3, sub4, sub5];

for (let i = 0; i < submenus.length; i++) {
    bot.action(`op ${i}`, async ctx => {
        await ctx.reply(`Em ${menuPrincipal[i]} temos as seguintes opções:`, submenus[i]);
    });
};

bot.action(/e(\d+)/, async ctx => {
        await ctx.reply(`${urlChefCarrefour}${opcoes[ctx.match[1]-1]}`);
});

bot.startPolling();