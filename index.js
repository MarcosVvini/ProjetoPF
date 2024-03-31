const fs = require('fs');
const csv = require('csv-parser');

// processar os registros com os dados dos atletas
const processarLinhas = (linha) => {
    const valores = Object.values(linha);
    return {
        ID: valores[0],
        Name: valores[1],
        Sex: valores[2],
        Age: parseInt(valores[3]),
        Height: valores[4] === 'NA' ? null : parseInt(valores[4]),
        Weight: valores[5] === 'NA' ? null : parseInt(valores[5]),
        Team: valores[6],
        NOC: valores[7],
        Games: valores[8],
        Year: parseInt(valores[9]),
        Season: valores[10],
        City: valores[11],
        Sport: valores[12],
        Event: valores[13],
        Medal: valores[14] === 'NA' ? null : valores[14]
    };
};

// vai ler o arquivo csv e criar uma lista que sera preenchida com os registros de cada atleta
const lerCSV = (caminhoArquivo) => {
    const registrosProcessados = [];

    fs.createReadStream(caminhoArquivo)
        .pipe(csv())
        .on('data', (linha) => {
            const registro = processarLinhas(linha);
            registrosProcessados.push(registro);
        })
        .on('end', () => {
            console.log('Fim do arquivo CSV.');

            //Executar consultas após o processamento
            const q1 = atletasNacionalidadeAno(registrosProcessados)("BRA")("Summer")(2016);
            const q2 = atletasMedalhaAno(registrosProcessados)("BRA")("Silver")("Summer")(2016);
            imprimirResultado(q1.length, "Atleta", "Atletas", q1);
            console.log();
            imprimirResultado(q2.length, "Atleta", "Atletas", q2);

            const mediaidade = calcularMediaIdade(registrosProcessados)("BRA")(2016);
            console.log(`A média de idade dos atletas <xpais> em <xano> foi de: ${mediaidade} Anos.`);
            const mediaAltura = calcularMediaAltura(registrosProcessados)("BRA")(2016);
            console.log(`A média de Tamanho dos atletas <xpais> em <xano> foi de: ${mediaAltura/100} Metros.`);
            const mediaPeso = calcularMediaPeso(registrosProcessados)("BRA")(2016);
            console.log(`A média de Peso dos atletas <xpais> em <xano> foi de: ${mediaPeso} Metros.`);

            const maisVelho = encontrarAtletaMaisVelho(registrosProcessados)("BRA")(2016);
            const maisNovo = encontrarAtletaMaisNovo(registrosProcessados)("BRA")(2016);
            const maisPesado = encontrarAtletaMaisPesado(registrosProcessados)("BRA")(2016);
            const maisLeve = encontrarAtletaMaisLeve(registrosProcessados)("BRA")(2016);

            console.log("Atleta mais velho do <xpais> em <xano>:", maisVelho);
            console.log("Atleta mais novo do <xpais> em <xano>:", maisNovo);
            console.log("Atleta mais pesado do <xpais> em <xano>:", maisPesado);
            console.log("Atleta mais leve do <xpais> em <xano>:", maisLeve);
    
            const atletaMaisVelhoComMedalha = encontrarAtletaMaisVelhoComMedalha(registrosProcessados)("BRA")("Gold")(2016);
            if (atletaMaisVelhoComMedalha) {
                console.log(`O atleta mais velho do <xpais> que recebeu medalha de <xmedalha> em <xano> foi: ${atletaMaisVelhoComMedalha.Name} com ${atletaMaisVelhoComMedalha.Age} anos no ${atletaMaisVelhoComMedalha.Sport}.`);
            } else {
                console.log("Não foi encontrado nenhum atleta com a medalha especificada.");
            }
            const atletaMaisNovoComMedalha = encontrarAtletaMaisNovoComMedalha(registrosProcessados)("BRA")("Gold")(2016);
            if (atletaMaisNovoComMedalha) {
                console.log(`O atleta mais novo do <xpais> que recebeu medalha de <xmedalha> em <xano> foi: ${atletaMaisNovoComMedalha.Name} com ${atletaMaisNovoComMedalha.Age} anos no ${atletaMaisNovoComMedalha.Sport}.`);
            } else {
                console.log("Não foi encontrado nenhum atleta com a medalha especificada.");
            }
            //------------------------------------console.log----------------------------------------------------------------------------------
            
            console.log(AtletasqueParticiparamAno1(registrosProcessados,'Brazil','E',1996))
            console.log(AtletasOutroAno(2016,'Bronze',registrosProcessados))

        })
        //caso tenha problema ao ler o arquivo csv
        .on('error', (error) => {
            console.error('Erro ao ler o arquivo CSV:', error);
        });
};

lerCSV('athlete_events.csv');
//funções Marcos----------------------------------------------------------------
// Funções de consulta
const atletasNacionalidadeAno = (lista) => (paisAbrev) => (season) => (ano) => {
    const atletas = lista.filter(item => item.NOC === paisAbrev && item.Season === season && item.Year === ano);
    return removerDuplicatas(atletas);
};

const atletasMedalhaAno = (lista) => (paisSula) => (medalha) => (season) => (ano) => {
    const medalhistas = lista.filter(item => item.NOC === paisSula && item.Medal === medalha && item.Season === season && item.Year === ano);
    return removerDuplicatas(medalhistas);
};

// Funções utilitárias
const removerDuplicatas = (lista) => lista.reduce((acc, item) => {
    const idPresente = acc.some(existingItem => existingItem.ID == item.ID);
    return idPresente ? acc : [...acc, item];
}, []);

const formatarListaAtletas = (atletas) => atletas.map(item => `${item.Name} (${item.Sport})`);

const imprimirResultado = (quantidade, singular, plural, atletas) => {
    console.log(`${quantidade} ${(quantidade < 2 ? singular : plural)}:`);
    console.log(formatarListaAtletas(atletas));
};

// Função para calcular a média de idade dos atletas de um país em um ano específico
const calcularMediaIdade = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPais = lista.filter(item => item.NOC === paisAbrev && item.Year === ano);
    const idades = atletasDoPais.map(atleta => atleta.Age);
    const somaIdades = idades.reduce((acc, idade) => acc + idade, 0);
    const mediaIdade = somaIdades / idades.length;
    return mediaIdade;
};
const calcularMediaAltura = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPais = lista.filter(item => item.NOC === paisAbrev && item.Year === ano);
    const alturas = atletasDoPais.map(atleta => atleta.Height);
    const somaAltura = alturas.reduce((acc, altura) => acc + altura, 0);
    const mediaAltura = somaAltura / alturas.length;
    return mediaAltura;
};
const calcularMediaPeso = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPais = lista.filter(item => item.NOC === paisAbrev && item.Year === ano);
    const pesos = atletasDoPais.map(atleta => atleta.Weight);
    const somaPeso = pesos.reduce((acc, peso) => acc + peso, 0);
    const mediaPeso = somaPeso / pesos.length;
    return mediaPeso;
};

// Função para encontrar o atleta mais velho de certo país em certo ano
const encontrarAtletaMaisVelho = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.NOC === paisAbrev && item.Year === ano);
    return atletasDoPaisNoAno.reduce((maisVelho, atleta) => atleta.Age > maisVelho.Age ? atleta : maisVelho);
};

// Função para encontrar o atleta mais novo de certo país em certo ano
const encontrarAtletaMaisNovo = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.NOC === paisAbrev && item.Year === ano);
    return atletasDoPaisNoAno.reduce((maisNovo, atleta) => atleta.Age < maisNovo.Age ? atleta : maisNovo);
};

// Função para encontrar o atleta mais pesado de certo país em certo ano
const encontrarAtletaMaisPesado = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.NOC === paisAbrev && item.Year === ano && item.Weight !== null);
    return atletasDoPaisNoAno.reduce((maisPesado, atleta) => atleta.Weight > maisPesado.Weight ? atleta : maisPesado);
};

// Função para encontrar o atleta mais leve de certo país em certo ano
const encontrarAtletaMaisLeve = (lista) => (paisAbrev) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.NOC === paisAbrev && item.Year === ano && item.Weight !== null);
    return atletasDoPaisNoAno.reduce((maisLeve, atleta) => atleta.Weight < maisLeve.Weight ? atleta : maisLeve);
};

// Função para encontrar o atleta mais velho que recebeu uma medalha específica de um país em um ano
const encontrarAtletaMaisVelhoComMedalha = (lista) => (paisAbrev) => (medalha) => (ano) => {
    return lista
        .filter(item => item.NOC === paisAbrev && item.Medal === medalha && item.Year === ano)
        .reduce((maisVelho, atual) => (!maisVelho || atual.Age > maisVelho.Age) ? atual : maisVelho, null);
};
// Função para encontrar o atleta mais novo que recebeu uma medalha específica de um país em um ano
const encontrarAtletaMaisNovoComMedalha = (lista) => (paisAbrev) => (medalha) => (ano) => {
    return lista
        .filter(item => item.NOC === paisAbrev && item.Medal === medalha && item.Year === ano)
        .reduce((maisNovo, atual) => (!maisNovo || atual.Age < maisNovo.Age) ? atual : maisNovo, null);
};

//funções Guilherme---------------------------------------------------------------- 

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
const AtletasOutroAno = (outroano,medal,data) => {
    //Verificação de lista vazia
    if(AtletasqueParticiparamAno1(data,'France','E',outroano) == []){
        return 'Não houve nenhum atleta que participou de outro ano'
    }
    //Filtragem através das medalhas ganhadas pelo atleta
    else{ const info = AtletasqueParticiparamAno1(data,'Brazil','E',outroano)
            const infoTotal = info.filter((inf) => inf.Medal == medal )
            if(infoTotal == []){
                console.log('Os atletas seguintes participaram, mas não ganharam medalhas /n')
                return info
            }
            else{ console.log('Lista dos atletas')
                return infoTotal}
}
}

//funções Davi----------------------------------------------------------------

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
