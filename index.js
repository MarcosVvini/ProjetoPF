const fs = require('fs');
const dados = fs.readFileSync('athlete_events.csv', 'utf8');
//const dados = fs.readFileSync('teste.csv', 'utf8');

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
//remover duplicatas não repete o nome do atleta que pode ter participado de varias modalidades e varias vezes.
const removerDuplicatas = (lista) => lista.reduce((acc, item) => {
    // Verifica se o ID do item já está presente na lista
    const idPresente = acc.some(existingItem => existingItem.ID == item.ID);
    // Se o ID não estiver presente, adiciona o item à lista
    return idPresente ? acc : [...acc, item];
}, []);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//vai formatar a lista em uma string que mostra o nome e o esporte que o atleta pratica entre parenteses... com o join para separa-los com virgula e um espaço.
const formatarListaAtletas = (atletas) => atletas.map(item => `${item.Name} (${item.Sport})`);

//irá imprimir os resultados, comparar se tem mais ou menos que 2 atletas para decidir se é singular ou plural.
//ao fim irá chamar a função formatarListaAtletas para mostrar o nome e esporte praticado pelo(s) atleta(s).
const imprimirResultado = (quantidade, singular, plural, atletas) => {
    console.log(`${quantidade} ${(quantidade < 2 ? singular : plural)}:`);
    console.log(formatarListaAtletas(atletas));
};

//irá receber a lista de registros, usar a função para remover os duplicados e filtrar para ter so os atletas que desejamos.
//por fim irá chamar a função imprimirResultado passando o tamanho (que sera o numero de atletas), o texto que sera comparado la se será no singular ou plural
//e os atletas que passaram no filtro...
const atletasNacionalidadeAno = (lista) => (paisAbrev) => (season) => (ano) => {
    const atletas = removerDuplicatas(lista.filter(item => item.NOC === paisAbrev && item.Season === season && item.Year === ano));
    imprimirResultado(atletas.length, "Atleta", "Atletas", atletas);
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//irá receber a lista de registros, usar a função para remover os duplicados e filtrar para ter so os atletas que desejamos.
//por fim irá chamar a função imprimirResultado passando o tamanho, o texto que sera comparado la se será no singular ou plural
//e os atletas que passaram no filtro...
const atletasMedalhaAno = (lista) => (paisSula) => (medalha) => (season) => (ano) => {
    const medalhistas = removerDuplicatas(lista.filter(item => item.NOC === paisSula && item.Medal === medalha && item.Season === season && item.Year === ano));
    imprimirResultado(medalhistas.length, "Atleta", "Atletas", medalhistas);
};


console.log("Quantos atletas competiram pelo <país(testando com Brasil)> nos Jogos Olímpicos de <inverno/verão(testando com verão)> de <ano(testando com 2016)>?")
atletasNacionalidadeAno(registros)("BRA")("Summer")(2016);
console.log()
console.log("Quantos Atletas <Sul-americanos (testando com Brasil)> ganharam medalha de <ouro/prata/bronze(testando com ouro)> nas olimpíadas de <inverno/verão(testando com verão)> de <ano(testando com 2016)>")
atletasMedalhaAno(registros)("BRA")("Gold")("Summer")(2016);