const fs = require('fs');
const dados = fs.readFileSync('teste.csv', 'utf8');

// Dividir o texto em linhas
const linhas = dados.trim().split('\r\n');

// Dividir cada linha por vírgulas e criar um array de registros
const registros = linhas.map(linha => {
    const valores = linha.split(',');
    // Mapear os valores para suas respectivas chaves
    return {
        ID: valores[0].replace(/"/g, ''),
        Name: valores[1].replace(/"/g, ''),
        Sex: valores[2].replace(/"/g, ''),
        Age: parseInt(valores[3]),
        Height: valores[4] === 'NA' ? null : parseInt(valores[4]),
        Weight: valores[5] === 'NA' ? null : parseInt(valores[5]),
        Team: valores[6].replace(/"/g, ''),
        NOC: valores[7].replace(/"/g, ''),
        Games: valores[8].replace(/"/g, ''),
        Year: parseInt(valores[9]),
        Season: valores[10].replace(/"/g, ''),
        City: valores[11].replace(/"/g, ''),
        Sport: valores[12].replace(/"/g, ''),
        Event: valores[13].replace(/"/g, ''),
        Medal: valores[14].replace(/"/g, '') === 'NA' ? null : valores[14].replace(/"/g, '')
    };
}); 

//tirar o primeiro elemento.

console.log(registros);