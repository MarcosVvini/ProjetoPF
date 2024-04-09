// Funcoes relacionadas a leitura e manipulação de arquivos CSV
const lerArquivoCsv = async (caminhoArquivo) => {
    try {
        const response = await fetch(caminhoArquivo); //faz uma solicitação para pegar o caminho do arquivo
        if (!response.ok) { //verifica se a solicitação deu certo.
            throw new Error('Falha ao carregar o arquivo');
        }
        const csvContent = await response.text();
        return csvContent;
    } catch (err) {
        throw err;
    }
};
const parseCSV = (csv) => {
    const lines = csv.split(/\r?\n/); //divide em linhas
    const [cabecalho, ...linhasDados] = lines; //separa o cabeçalho e as linhas

    const formatarCampo = (campo) => campo.replace(/"/g, ''); //função que remove as aspas

    const camposCabecalhoFormatados = cabecalho.split(',').map(formatarCampo);

    //função para criar uma lista de registros
    const parseLinha = (linha) => {
        const campos = linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);//divide os campos, mesmo que tenha "," nas strings, não irá afetar o resultado
        return campos.reduce((objeto, campo, index) => {
            const campoFormatado = formatarCampo(campo);
            return { ...objeto, [camposCabecalhoFormatados[index]]: campoFormatado };
        }, {});
    };
    //aplicação da função parseLinha nos dados
    const dados = linhasDados.map(parseLinha);

    //como retorno uma lista de registros com as seguintes chaves e os seus respectivos valores
    return dados.map(item => ({
        ID: item.ID,
        Name: item.Name,
        Age: item.Age,
        Team: item.Team ? item.Team.replace('-1', '') : '', //testando pois tive problema com undefined. to trocando o -1 por str vazia pois alguns Team eram Brazil-1 por ex...
        Year: parseInt(item.Year),
        Season: item.Season,
        Sport: item.Sport,
        Medal: item.Medal
    }));
};
// Constante para o caminho do arquivo de atletas
const caminhoArquivoAtletas = 'athlete_events.csv';

// Funcoes relacionadas ao filtro e processamento dos dados dos atletas
/* 
essa função é resoponsavel por filtrar os atletas de acordo com a nacionalidade e ano, recebendo como parametro
a lista (que serão os dados do csv processado), o pais (fornecido pelo usuario) e o ano (tambem fornecido pelo usuario)
e retorna uma lista com os atletas filtrados de acordo com os parametros passados pelo usuario!
*/
const atletasNacionalidadeAno = (lista) => (pais) => (ano) => {
    const atletas = lista.filter(item => item.Team === pais && item.Year === ano);
    return removerDuplicatas(atletas);
};
/* 
essa função é resoponsavel por filtrar os atletas de acordo com a nacionalidade, medalha e ano, recebendo como parametro
a lista (que serão os dados do csv processado), o pais (fornecido pelo usuario), a medalha (fornecida pelo usuario) e o ano (tambem fornecido pelo usuario)
e retorna uma lista com os atletas filtrados de acordo com os parametros passados pelo usuario!
*/
const atletasMedalhaAno = (lista) => (pais) => (medalha) => (ano) => {
    const medalhistas = lista.filter(item => item.Team === pais && item.Medal === medalha && item.Year === ano);
    return removerDuplicatas(medalhistas);
};
/* 
essas 2 funções são resoponsaveis respectivamente por mostrar o atleta mais velho e mais novo, 
filtrando os atletas por nacionalidade e ano, recebendo como parametro
a lista (que serão os dados do csv processado), o pais (fornecido pelo usuario) e o ano (tambem fornecido pelo usuario)
e retorna o atleta mais velho e mais novo de acordo com os parametros passados pelo usuario!
*/
const encontrarAtletaMaisVelho = (lista) => (pais) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.Team === pais && item.Year === ano);
    if (atletasDoPaisNoAno.length === 0) {
        return null;
    }
    const atletaMaisVelho = atletasDoPaisNoAno.reduce((maisVelho, atleta) => atleta.Age > maisVelho.Age ? atleta : maisVelho);
    return atletaMaisVelho;
};
const encontrarAtletaMaisNovo = (lista) => (pais) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.Team === pais && item.Year === ano);
    if (atletasDoPaisNoAno.length === 0) {
        return null;
    }
    const atletaMaisNovo = atletasDoPaisNoAno.reduce((maisNovo, atleta) => atleta.Age < maisNovo.Age ? atleta : maisNovo);
    return atletaMaisNovo;
};
/* 
essa função é resoponsavel por filtrar os atletas de acordo com a letra e ano, recebendo como parametro
a lista (que serão os dados do csv processado), a letra (fornecido pelo usuario) e o ano (tambem fornecido pelo usuario)
e retorna uma lista com os atletas Sulamericanos filtrados de acordo com os parametros passados pelo usuario!
*/
const AtletasqueParticiparamAno = (lista) => (letra) => (ano) => {
    const filt1 = lista.filter((p) => (p.Team == "Argentina") || (p.Team == "Bolivia") || (p.Team == "Brazil") 
        || (p.Team == "Chile") || (p.Team == "Colombia") || (p.Team == "Ecuador") || (p.Team == "Guyana") || (p.Team == "Paraguay")
        || (p.Team == "Peru") || (p.Team == "Suriname") || (p.Team == "Uruguay") || (p.Team == "Venezuela"))
    const filt2 = filt1.filter((l) => l.Name[0] == letra)
    const filt3 = filt2.filter((a) => a.Year == ano)
    return removerDuplicatas(filt3)
}
/* 
essa função é responsavel por comparar a quantidade de medalhas que os atletas de 2 determinados paises ganharam, recebendo como parametro
a lista (que serão os dados do csv processado), os 2 paises (fornecidos pelo usuario), e o ano (tambem fornecido pelo usuario)
e retorna uma lista com a quantidade de medalhas (ouro prata e bronze) adiquiridas pelos atletas dos paises de acordo com os parametros passados pelo usuario!
*/
const totalMedalhasPorPais = (lista) => (pais1) => (pais2) => (ano) => {
    const atletasDoPais1NoAno = lista.filter(item => item.Team === pais1 && item.Year === ano && item.Medal !== '');
    const atletasDoPais2NoAno = lista.filter(item => item.Team === pais2 && item.Year === ano && item.Medal !== '');
    const medalhasPorAtleta1 = atletasDoPais1NoAno.map(atleta => atleta.Medal);//mapeia as listas de atletas filtradas para criar listas contendo apenas os tipos de medalhas (ouro, prata, bronze) que cada atleta ganhou
    const medalhasPorAtleta2 = atletasDoPais2NoAno.map(atleta => atleta.Medal);

    //essa função usa o reduce para contar cada tipo de medalha que cada atleta ganhou
    const contagemMedalhas1 = medalhasPorAtleta1.reduce((contador, medalha) => {
        return {
            ...contador, [medalha]: (contador[medalha] || 0) + 1 
        };
    }, { Gold: 0, Silver: 0, Bronze: 0 });

    const contagemMedalhas2 = medalhasPorAtleta2.reduce((contador, medalha) => {
        return {
            ...contador, [medalha]: (contador[medalha] || 0) + 1
        };
    }, { Gold: 0, Silver: 0, Bronze: 0 });

    return [contagemMedalhas1,contagemMedalhas2];
};
/* 
essa função é resoponsavel por filtrar os atletas que participaram mais vezes, pois em alguns casos vou querer apenas saber se ele participou ou ganhou
então so precisarei que ele apareça uma vez na lista, vai receber uma lista ja filtrada para o resultado como parametro e comparar 
os ids para ter apenas 1 por atleta, logo, não haverão repetições e retorna uma lista com os atletas sem repetições!
*/
const removerDuplicatas = (lista) => lista.reduce((acc, item) => {
    const idPresente = acc.some(existingItem => existingItem.ID == item.ID);
    return idPresente ? acc : [...acc, item];
}, []);

// Funcao relacionada a adição de opções nos elementos <select> do HTML, que recebe o id do select e a lista com as opções
const adicionarOpcaoSelect = (id, opcoes) => {
    const select = document.querySelector(`#${id}`);
    const optionsElements = opcoes.map(opcao => {
        const optionElement = document.createElement('option');
        optionElement.value = opcao;
        optionElement.textContent = opcao;
        return optionElement;
    });
    select.append(...optionsElements);
};


//funções que irão pegar o valor selecionado pelo usuario no select
const valSelecQ1 = (selectPais, selectAno) => {
    const paisSelecionado = selectPais.value;
    const anoSelecionado = parseInt(selectAno.value);
    return [paisSelecionado, anoSelecionado];
};
const valSelecQ2 = (selectPaisQ2, selectMedalhaQ2, selectAnoQ2) => {
    const paisSelecionadoQ2 = selectPaisQ2.value;
    const medalhaSelecionadaQ2 = selectMedalhaQ2.value;
    const anoSelecionadoQ2 = parseInt(selectAnoQ2.value);
    return [paisSelecionadoQ2, medalhaSelecionadaQ2, anoSelecionadoQ2];
};
const valSelecQ3 = (selectLetraQ3, selectAnoQ3) => {
    const letraSelecionadaQ3 = selectLetraQ3.value;
    const anoSelecionadoQ3 = parseInt(selectAnoQ3.value);
    return [letraSelecionadaQ3, anoSelecionadoQ3];
};
const valSelecQ4 = (selectPaisQ4, selectAnoQ4) => {
    const paisSelecionadoQ4 = selectPaisQ4.value;
    const anoSelecionadoQ4 = parseInt(selectAnoQ4.value);
    return [paisSelecionadoQ4, anoSelecionadoQ4];
};
const valSelecQ5 = (selectPaisQ51,selectPaisQ52, selectAnoQ5) => {
    const paisSelecionadoQ51 = selectPaisQ51.value;
    const paisSelecionadoQ52 = selectPaisQ52.value;
    const anoSelecionadoQ5 = parseInt(selectAnoQ5.value);
    return [paisSelecionadoQ51, paisSelecionadoQ52, anoSelecionadoQ5];
};

// Event listeners para os botoes de busca
document.addEventListener("DOMContentLoaded", async () => {
    //listas dos selects!
    const paises = ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"];
    const anos = [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016];
    const medalha = ["Gold", "Silver", "Bronze"]
    const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    //adicionando as opções no select pelo id dele, passando as listas para povoa-los.
    adicionarOpcaoSelect("listaPaisQ1", paises);
    adicionarOpcaoSelect("listaAnoQ1", anos);
    adicionarOpcaoSelect("listaPaisQ2", paises);
    adicionarOpcaoSelect("listaMedalhaQ2", medalha);
    adicionarOpcaoSelect("listaAnoQ2", anos);
    adicionarOpcaoSelect("listaLetraQ3", letras);
    adicionarOpcaoSelect("listaAnoQ3", anos);
    adicionarOpcaoSelect("listaPaisQ4", paises);
    adicionarOpcaoSelect("listaAnoQ4", anos);
    adicionarOpcaoSelect("listaPaisQ5-1", paises);
    adicionarOpcaoSelect("listaPaisQ5-2", paises);
    adicionarOpcaoSelect("listaAnoQ5", anos);

    //função para o botão buscar que vai fazer a busca dos atletas de acordo com os filtros selecionados.
    const botaoBuscar = document.querySelector('#botao-buscar-q1');
    botaoBuscar.addEventListener("click", async () => {
        const selectPais = document.querySelector("#listaPaisQ1");
        const selectAno = document.querySelector("#listaAnoQ1");
        const [paisSelecionado, anoSelecionado] = valSelecQ1(selectPais, selectAno); //pega os valores selecionados pelo usuario

        try {
            document.getElementById('spinner-q1').classList.remove('d-none');//spinner aparece na tela e fica girando ao clicar no botao.

            const conteudoArquivo = await lerArquivoCsv(caminhoArquivoAtletas); //await para so fazer os proximos passos quando conseguir ler o arquivo
            const csvAtletas = parseCSV(conteudoArquivo);

            const filtroQ1 = atletasNacionalidadeAno(csvAtletas);
            const resultadoFiltro = filtroQ1(paisSelecionado)(anoSelecionado);

            const modalPerguntaUm = document.getElementById('modalPerguntaUm');
            const tableBody = modalPerguntaUm.querySelector('.table tbody');

            const listaAtletasHTML = resultadoFiltro.map(item => `
                <tr>
                    <td>${item.Name}</td>
                    <td>${item.Sport}</td>
                </tr>
            `).join('');

            //cria o cabeçalho da tabela resultado depois depois chama o listaAtletasHTML para povoar a tabela com os resultados
            tableBody.innerHTML = `
                <h3>${resultadoFiltro.length} Atletas.</h3>
                <tr>
                    <th>Nome do Atleta</th>
                    <th>Esporte</th>
                </tr>
                ${listaAtletasHTML}
            `;

        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        } finally {
            document.getElementById('spinner-q1').classList.add('d-none');//quando acabar de pesquisar e mostrar o resultado spinner desaparece da tela.
        }
    });
    //agora o que foi feito na q1 é replicado para as outras quatro questões, com as mudanças necessarias nos parametros, ids e o que mais for necessario...
    const botaoBuscarQ2 = document.querySelector('#botao-buscar-q2');
    botaoBuscarQ2.addEventListener("click", async () => {
        const selectPaisQ2 = document.querySelector("#listaPaisQ2");
        const selectMedalhaQ2 = document.querySelector("#listaMedalhaQ2")
        const selectAnoQ2 = document.querySelector("#listaAnoQ2");
        const selecionado = valSelecQ2(selectPaisQ2, selectMedalhaQ2, selectAnoQ2);
        const [paisSelecionadoQ2, medalhaSelecionadaQ2, anoSelecionadoQ2] = selecionado;

        try {
            document.getElementById('spinner-q2').classList.remove('d-none');

            const conteudoArquivo = await lerArquivoCsv(caminhoArquivoAtletas);
            const csvAtletas = parseCSV(conteudoArquivo);

            const filtroq2 = atletasMedalhaAno(csvAtletas);
            const resultadoFiltro = filtroq2(paisSelecionadoQ2)(medalhaSelecionadaQ2)(parseInt(anoSelecionadoQ2));

            const modalPerguntaDois = document.getElementById('modalPerguntaDois');
            const tableBody = modalPerguntaDois.querySelector('.table tbody');

            const listaAtletasHTML = resultadoFiltro.map(item => `
                <tr>
                    <td>${item.Name}</td>
                    <td>${item.Sport}</td>
                </tr>
            `).join('');

            tableBody.innerHTML = `
                <h3>${resultadoFiltro.length} Atletas.</h3>
                <tr>
                    <th>Nome do Atleta</th>
                    <th>Esporte</th>
                </tr>
                ${listaAtletasHTML}
            `;

        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        } finally {
            document.getElementById('spinner-q2').classList.add('d-none');
        }
    });

    const botaoBuscarQ3 = document.querySelector("#botao-buscar-q3");
    botaoBuscarQ3.addEventListener("click", async () => {
        const selectLetraQ3 = document.querySelector("#listaLetraQ3")
        const selectAnoQ3 = document.querySelector("#listaAnoQ3");
        const selecionado = valSelecQ3(selectLetraQ3, selectAnoQ3);
        const [letraSelecionadaQ3, anoSelecionadoQ3] = selecionado;

        try {
            document.getElementById('spinner-q3').classList.remove('d-none');

            const conteudoArquivo = await lerArquivoCsv(caminhoArquivoAtletas);
            const csvatletas = parseCSV(conteudoArquivo);

            const filtroq3 = AtletasqueParticiparamAno(csvatletas);
            const resultadoFiltro = filtroq3(letraSelecionadaQ3)(parseInt(anoSelecionadoQ3));

            const modalPerguntaTres = document.getElementById('modalPerguntaTres');
            const tableBody = modalPerguntaTres.querySelector('.table tbody');

            const listaAtletasHTML = resultadoFiltro.map(item => `
                <tr>
                    <td>${item.Name}</td>
                    <td>${item.Sport}</td>
                    <td>${item.Team}</td>
                </tr>
            `).join('');

            tableBody.innerHTML = `
                <h3>${resultadoFiltro.length} Atletas.</h3>
                <tr>
                    <th>Nome do Atleta</th>
                    <th>Esporte</th>
                    <th>País</th>
                </tr>
                ${listaAtletasHTML}
            `;
        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        } finally {
            document.getElementById('spinner-q3').classList.add('d-none');
        }
    });

    const botaoBuscarQ4 = document.querySelector("#botao-buscar-q4");
    botaoBuscarQ4.addEventListener("click", async () => {
        const selectPaisQ4 = document.querySelector("#listaPaisQ4");
        const selectAnoQ4 = document.querySelector("#listaAnoQ4");
        const selecionado = valSelecQ4(selectPaisQ4, selectAnoQ4);
        const [paisSelecionadoQ4, anoSelecionadoQ4] = selecionado;

        try {
            document.getElementById('spinner-q4').classList.remove('d-none');

            const conteudoArquivo = await lerArquivoCsv(caminhoArquivoAtletas);
            const csvatletas = parseCSV(conteudoArquivo);

            const filtroq4Velho = encontrarAtletaMaisVelho(csvatletas);
            const filtroq4nNovo = encontrarAtletaMaisNovo(csvatletas);
            const resultadoFiltroVelho = filtroq4Velho(paisSelecionadoQ4)(parseInt(anoSelecionadoQ4));
            const resultadoFiltroNovo = filtroq4nNovo(paisSelecionadoQ4)(parseInt(anoSelecionadoQ4));

            const tableBody = document.getElementById('tabelaQ4');
            tableBody.innerHTML = `
            <tr>
                <td colspan="3">Mais Velho</td>
            </tr>
            <tr>
                <td>Nome: ${resultadoFiltroVelho.Name}</td>
                <td>Idade: ${resultadoFiltroVelho.Age} anos</td>
                <td>Esporte: ${resultadoFiltroVelho.Sport}</td>
            </tr>
            <tr>
                <td colspan="3">Mais Novo</td>
            </tr>
            <tr>
                <td>Nome: ${resultadoFiltroNovo.Name}</td>
                <td>Idade: ${resultadoFiltroNovo.Age} anos</td>
                <td>Esporte: ${resultadoFiltroNovo.Sport}</td>
            </tr>
            `;

        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        } finally {
            document.getElementById('spinner-q4').classList.add('d-none');
        }
    });

    const botaoBuscarQ5 = document.querySelector("#botao-buscar-q5");
    botaoBuscarQ5.addEventListener("click", async () => {
        const selectPaisQ51 = document.querySelector("#listaPaisQ5-1");
        const selectPaisQ52 = document.querySelector("#listaPaisQ5-2");
        const selectAnoQ5 = document.querySelector("#listaAnoQ5");
        const selecionado = valSelecQ5(selectPaisQ51, selectPaisQ52, selectAnoQ5);
        const [paisSelecionadoQ51, paisSelecionadoQ52, anoSelecionadoQ5] = selecionado;

        try {
            document.getElementById('spinner-q5').classList.remove('d-none');

            const conteudoArquivo = await lerArquivoCsv(caminhoArquivoAtletas);
            const csvatletas = parseCSV(conteudoArquivo);

            const filtroq5 = totalMedalhasPorPais(csvatletas);
            const resultadoFiltroMedalhaPais = filtroq5(paisSelecionadoQ51)(paisSelecionadoQ52)(parseInt(anoSelecionadoQ5));

            const tableBody = document.getElementById('tabelaQ5');
            tableBody.innerHTML = `
            <tr>
                <td>${paisSelecionadoQ51}</td>
                <td>${paisSelecionadoQ52}</td>
            </tr>
            <tr>
                <td>Ouro: ${resultadoFiltroMedalhaPais[0].Gold} Atletas</td>
                <td>Ouro: ${resultadoFiltroMedalhaPais[1].Gold} Atletas</td>
            </tr>
            <tr>
                <td>Prata: ${resultadoFiltroMedalhaPais[0].Silver} Atletas</td>
                <td>Prata: ${resultadoFiltroMedalhaPais[1].Silver} Atletas</td>
            </tr>
            <tr>
                <td>Bronze: ${resultadoFiltroMedalhaPais[0].Bronze} Atletas</td>
                <td>Bronze: ${resultadoFiltroMedalhaPais[1].Bronze} Atletas</td>
            </tr>
            `;

        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
        } finally {
            document.getElementById('spinner-q5').classList.add('d-none');
        }
    });

});
