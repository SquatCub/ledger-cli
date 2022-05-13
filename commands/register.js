import {Chalk} from 'chalk'
import { readFile } from 'fs';
const chalk = new Chalk();

export default function register(filePath) {
    let file = `./files/${filePath.file}`
    readFile(file, 'utf8', (err, data) => {
        err ? console.log('File not found') : formatFile(data.split('\n'));
    });
}

function formatFile(content) {
    console.log(content.slice(1).join('\n'))
}