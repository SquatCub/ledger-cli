import {Chalk} from 'chalk'
import { readFile } from 'fs';
const chalk = new Chalk();

export default function add(filePath) {
    let file = `./files/${filePath.file}`
    readFile(file, 'utf8', (err, data) => {
        err ? console.log('File not found') : formatFile(data);
    });
}

function formatFile(content) {
    let file = content.match(/\; [A-Za-z]+/g)[0].replace('; ', '');

    let sumDollars = 0;
    let sumBitcoins = 0;

    let findDollars = content.match(/\-?\$(\d{1,10}(?:[.,]\d{3})*((?:[.,]\d{2})?))+/g)
    let findBitCoins = content.match(/\-?(\d{1,10}(?:[.,]\d{3})*((?:[.,]\d{0,2})?))+\ BTC+/g)

    if(findBitCoins) {
        findBitCoins.forEach(e => sumBitcoins += Number(e.replace(' BTC', '')));
    }
    if(findDollars) {
        findDollars.forEach(e => sumDollars += Number(e.replace('$', '')));
    }

    switch(file) {
        case 'Bitcoin':
            printBitcoin(sumDollars, sumBitcoins);
            break;
        case 'Income':
            printIncome(sumDollars, findDollars);
            break;
    }
}

function printBitcoin(sumDollars, sumBitcoins) {
    console.log(`\t\t${sumBitcoins} BTC\n\t\t${(sumDollars < 0 ? chalk.red(`$${sumDollars}`) : `$${sumDollars}` )}\n------------------------\n\t\t${(sumDollars < 0 ? chalk.red(`$${sumDollars}`) : `$${sumDollars}` )}\n\t\t${sumBitcoins} BTC`);
}

function printIncome(sumDollars, findDollars) {
    console.log(`\t\t$${sumDollars}`);
    findDollars.forEach(e => {
        let currentValue = Number(e.replace('$', ''));
        console.log(`\t\t-${chalk.red(`$${currentValue}`)}`)
    });
    console.log('------------------------\n\t\t 0')
}