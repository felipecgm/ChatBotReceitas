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
bot.start(async ctx => {
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
const opcoes = [...op1, ...op2, ...op3, ...op4, ...op5];

//Criação dos botões de cada item do menu principal
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

//Escolhendo determinado item do menu principal, geram-se os botões de cada categoria
for (let i = 0; i < submenus.length; i++) {
    bot.action(`op ${i}`, async ctx => {
        await ctx.reply(`Em ${menuPrincipal[i]} temos as seguintes opções:`, submenus[i]);
    });
};

//Opção de encerramento
const tecladoEncerramento = Markup.keyboard(['Sim', 'Não']).resize().extra();

//Redirecionamento para o site da categoria escolhida
bot.action(/e(\d+)/, async ctx => {
        await ctx.reply(`${urlChefCarrefour}${opcoes[ctx.match[1]-1]}`);
        await ctx.reply('Deseja terminar? ', tecladoEncerramento);
});

//Ações para continuar ou não no chatbot
bot.hears('Sim', async ctx => {
    await ctx.reply('Obrigado por utilizar nossas sugestões!\nPrecisando, só voltar. 😀 ');
});
bot.hears('Não', async ctx => {
    await ctx.reply('Continue procurando!\nTemos uma receita especial para você! 😀\n', gerarBotoes());
});

bot.startPolling();