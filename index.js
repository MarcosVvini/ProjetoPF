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

//Guilherme Questões----------------------------------------------------
//Quais atletas de <país>, que começam com a letra <tal>, participaram nas Olimpíadas de <ano>? Quantos?
////////////////////////////////////////////////////////////////////////
const AtletasqueParticiparamAno1 = (data,pais,letra,ano ) => {
    //filtragem a partir do país fornecido
    const filt1 = data.filter((p) => p.Team == pais)
    //filtragem a partir da primeira letra fornecida pelo usuário
    const filt2 = filt1.filter((l) => l.Name[0] == letra)
    const filt3 = filt2.filter((a) => a.Year == ano)
    //subfunção para tirar as repetições de atletas que já apareceram
    const DelDuplo = (lista) => lista.reduce((acc, item) => {
        // Verifica se o ID do atleta já está presente na lista
        const idPresente = acc.some((id) => id.ID == item.ID);
        // Se o ID não estiver presente, adiciona o item à lista
        return idPresente ? acc : [...acc, item];}, []);
    return DelDuplo(filt3)
}
////////////////////////////////////////////////////////////////////////////

//Quais desses atletas participaram nas Olimpíadas de <outro ano>? Quais deles ganharam medalha de <medalha>
//nesse ano?
const AtletasOutroAno = (outroano,medal) => {
    //Verificação de lista vazia
    if(AtletasqueParticiparamAno1(registros,'France','E',outroano) == []){
        return 'Não houve nenhum atleta que participou de outro ano'
    }
    //Filtragem através das medalhas ganhadas pelo atleta
    else{ const info = AtletasqueParticiparamAno1(registros,'Brazil','E',outroano)
            const infoTotal = info.filter((inf) => inf.Medal == medal )
            if(infoTotal == []){
                console.log('Os atletas seguintes participaram, mas não ganharam medalhas /n')
                return info
            }
            else{ console.log('re')
                return infoTotal}
}
}
//-----------------------------------------------------------------------

console.log(AtletasqueParticiparamAno1(registros,'Brazil', 'E',1996));
console.log(AtletasOutroAno(2016,1))


console.log("Quantos atletas competiram pelo <país(testando com Brasil)> nos Jogos Olímpicos de <inverno/verão(testando com verão)> de <ano(testando com 2016)>?")
atletasNacionalidadeAno(registros)("BRA")("Summer")(2016);
console.log()
console.log("Quantos Atletas <Sul-americanos (testando com Brasil)> ganharam medalha de <ouro/prata/bronze(testando com ouro)> nas olimpíadas de <inverno/verão(testando com verão)> de <ano(testando com 2016)>")
atletasMedalhaAno(registros)("BRA")("Gold")("Summer")(2016);

//------------------------------------------------------------------------

 //A função 'totalMedalhas' recebe o nome do atleta como parâmetro (atletaNome)
 //Ela filtra os dados do atleta desejado usando a função filter e depois mapeia as medalhas desse atleta usando a função map.

function totalMedalhas(atletaNome) {
  const atleta = lista.filter(atleta => atleta.Name === atletaNome);
  const medalhas = atleta.map(atleta => atleta.Medal);
  
//O método reduce para contar o número de medalhas de ouro, prata e bronze. 
//A constante 'medalhasContadas' é inicializado com contadores para cada tipo de medalha (Ouro, Prata e Bronze), e a função de redução incrementa os contadores com base no tipo de medalha encontrada.
  
  const medalhasContadas = medalhas.reduce((contador, medalha) => {
    if (medalha === "Gold") {
      contador.Ouro++;
    } else if (medalha === "Silver") {
      contador.Prata++;
    } else if (medalha === "Bronze") {
      contador.Bronze++;
    }
    return contador;
  }, { Ouro: 0, Prata: 0, Bronze: 0 });
  
//A função retorna um objeto contendo o total de medalhas de ouro, prata e bronze para o atleta desejado.

  return medalhasContadas;
}

const atletaNome = "A Dijiang"; //exemplo
const totalMedalhasAtleta = totalMedalhas(atletaNome);
console.log(`Total de medalhas de ouro: ${totalMedalhasAtleta.Ouro}`);
console.log(`Total de medalhas de prata: ${totalMedalhasAtleta.Prata}`);
console.log(`Total de medalhas de bronze: ${totalMedalhasAtleta.Bronze}`);
