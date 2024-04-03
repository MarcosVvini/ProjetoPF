const csvatletas = [{
    ID: "1", Name: "A Dijiang", Age : 21, Team: "China", Year: 2016, Season: "Summer", Sport: "Basketball", Medal: "Bronze"
}, {
    ID: "2", Name: "John mark", Age : 22, Team: "United States", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "2", Name: "John mark", Age : 22, Team: "United States", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Silver"
}, {
    ID: "3", Name: "Andre", Age : 32, Team: "United States", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "4", Name: "Alex", Age : 32, Team: "United States", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Gold"
}, {
    ID: "5", Name: "Bruno", Age : 34, Team: "United States", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Bronze"
}, {
    ID: "6", Name: "Jasda", Age : 29, Team: "China", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Gold"
}, {
    ID: "7", Name: "Jaueline", Age : 22, Team: "China", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "8", Name: "uzosto", Age : 43, Team: "China", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "9", Name: "tanga", Age : 29, Team: "Brazil", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "10", Name: "boka", Age : 35, Team: "Argentina", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "NA"
}, {
    ID: "11", Name: "felipe", Age : 29, Team: "Brazil", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Gold"
}, {
    ID: "12", Name: "nicolas", Age : 27, Team: "Chile", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Bronze"
}, {
    ID: "13", Name: "david guetta", Age : 35, Team: "Brazil", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Silver"
}, {
    ID: "14", Name: "thetheus", Age : 40, Team: "Chile", Year: 2016, Season: "Summer",  Sport: "Football", Medal: "Silver"
},
{ID: "15", Name: "Arvo Ossian Aaltonen", Age : 29, Team: "Finland", Year: 1912, Season: "Summer", Sport: "Swimming", Medal: "NA"}, 
{ID: "15", Name: "Arvo Ossian Aaltonen", Age : 48, Team: "Finland", Year: 1912, Season: "Summer", Sport: "Swimming", Medal: "Bronze"},
{ID: "16", Name: "Juhamatti Tapio Aaltonen",Age : 36, Team: "Finland",Year: 2014, Season: "Winter", Sport: "Ice Hockey", Medal: "Bronze"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 57, Team: "Finland", Year: 1948, Season: "Summer", Sport: "Gymnastics",Medal: "Bronze"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 32, Team: "Finland", Year: 1948, Season: "Summer", Sport: "Gymnastics",Medal: "Gold"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 31, Team: "Finland", Year: 1948, Season: "Summer", Sport: "Gymnastics",Medal: "NA"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 20, Team: "Finland", Year: 1948, Season: "Summer", Sport: "Gymnastics",Medal: "Gold"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 27, Team: "Finland", Year: 1948, Season: "Summer", Sport: "Gymnastics",Medal: "Gold"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 25, Team: "Finland", Year: 1952, Season: "Summer", Sport: "Gymnastics",Medal: "NA"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 32, Team: "Finland", Year: 1952, Season: "Summer", Sport: "Gymnastics",Medal: "Bronze"},
{ID: "17", Name: "Paavo Johannes Aaltonen",Age : 22, Team: "Finland", Year: 1952, Season: "Summer", Sport: "Gymnastics",Medal: "NA"},
{ID: "18", Name: "Timo Antero Aaltonen",Age : 27, Team: "Finland", Year: 2000, Season: "Summer", Sport: "Athletics", Medal: "NA"},
{ID: "19", Name: "Win Valdemar Aaltonen",Age : 41, Team: "Finland", Year: 1948, Season: "Summer",Sport: "Art Competitions", Medal: "NA"},
{ID: "20", Name: "Kjetil Andr Aamodt", Age : 24, Team: "Norway", Year: 1992, Season: "Winter", Sport: "Alpine Skiing", Medal: "NA"},
{ID: "20", Name: "Kjetil Andr Aamodt", Age : 22, Team: "Norway", Year: 1992, Season: "Winter", Sport: "Alpine Skiing", Medal: "Gold"},
{ID: "20", Name: "Kjetil Andr Aamodt", Age : 32, Team: "Norway", Year: 1992, Season: "Winter", Sport: "Alpine Skiing", Medal: "Bronze"},
{ID: "20", Name: "Kjetil Andr Aamodt", Age : 23, Team: "Norway", Year: 1994, Season: "Winter", Sport: "Alpine Skiing", Medal: "Silver"},
{ID: "21", Name: "joao", Age : 24, Team: "Brazil", Year: 1912, Season:"Summer", Sport:"Swimming", Medal: "Bronze"}
];


// função que vai filtrar os atletas por pais ue representou e ano.
const atletasNacionalidadeAno = (lista) => (pais) => (ano) => {
    const atletas = lista.filter(item => item.Team === pais && item.Year === ano);
    return removerDuplicatas(atletas);
};

// vai filtrar os atletas do pais informado que ja ganharam certa medalha em um certo ano
const atletasMedalhaAno = (lista) => (pais) => (medalha) => (ano) => {
    const medalhistas = lista.filter(item => item.Team === pais && item.Medal === medalha && item.Year === ano);
    return removerDuplicatas(medalhistas);
};


const AtletasqueParticiparamAno = (lista) => (letra) => (pais) => (ano) => {
    //filtragem a partir do país fornecido
    const filt1 = lista.filter((p) => p.Team == pais)
    //filtragem a partir da primeira letra fornecida pelo usuário
    const filt2 = filt1.filter((l) => l.Name[0] == letra)
    const filt3 = filt2.filter((a) => a.Year == ano)
    return removerDuplicatas(filt3)
}


const encontrarAtletaMaisVelho = (lista) => (pais) => (ano) => {
    const atletasDoPaisNoAno = lista.filter(item => item.Team === pais && item.Year === ano);
    if (atletasDoPaisNoAno.length === 0) {
        return null; // Retorna null se não houver atletas no ano selecionado
    }
    const atletaMaisVelho = atletasDoPaisNoAno.reduce((maisVelho, atleta) => atleta.Age > maisVelho.Age ? atleta : maisVelho);
    return atletaMaisVelho;
};

const calcularMediaIdade = (lista) => (pais) => (ano) => {
    const atletasDoPais = lista.filter(item => item.Team === pais && item.Year === ano);
    const idades = atletasDoPais.map(atleta => atleta.Age);
    const somaIdades = idades.reduce((acc, idade) => acc + idade, 0);
    const mediaIdade = somaIdades / idades.length;
    if (idades.length === 0) {
        return null; // Retorna null se não houver atletas no ano selecionado
    }
    return mediaIdade;
}

// Função que vai remover duplicatas, utiliza um reduce para comparar cm o id, se ja existe na lista não adiciona
const removerDuplicatas = (lista) => lista.reduce((acc, item) => {
    const idPresente = acc.some(existingItem => existingItem.ID == item.ID);
    return idPresente ? acc : [...acc, item];
}, []);

// criando variavel que vai receber as funções acima passando a lista (utilizando função como expressao sla)

const filtroq1 = atletasNacionalidadeAno(csvatletas);
const filtroq2 = atletasMedalhaAno(csvatletas);
const filtroq3 = AtletasqueParticiparamAno(csvatletas)
const filtroq4 = encontrarAtletaMaisVelho(csvatletas)
const filtroq5 = calcularMediaIdade(csvatletas)

// listas para os selects

const paises = ["Brazil", "China", "United States", "Chile", "Finland", "Norway"];
const anos = [1912, 1948, 1952, 1992, 1994, 2000, 2016];
const medalha = ["Gold", "Silver", "Bronze"]
const letra = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

//---------------------Q1-----------------------------------------------------------
//essa função adiciona os atletas na tabela
const criarETrocarTabela = (registros) => {
    // cria a nova tabela
    const novaTabela = document.createElement('table');
    novaTabela.id = 'tabela';

    // adiciona registros à nova tabela
    novaTabela.append(...registros.map(item => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = item;
        row.appendChild(cell);
        return row;
    }));

    // substitui a tabela atual pela nova tabela
    const tabelaAtual = document.querySelector('#tabela');
    tabelaAtual.replaceWith(novaTabela);
};



// Função para adicionar opções de países ao select do html
const addOptionsPais = (paises) => {
    const select = document.querySelector("#listaPaisQ1");

    const options = paises.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};

// Função para adicionar opções de anos ao select
const addOptionsAno = (anos) => {
    const select = document.querySelector("#listaAnoQ1");

    const options = anos.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};



// função para buscar os atletas com os filtros selecionados e atualizar a tabela
const atualizarTabelaq1 = () => {
    const selectPais = document.querySelector("#listaPaisQ1");
    const selectAno = document.querySelector("#listaAnoQ1");

    const paisSelecionado = selectPais.value;
    const anoSelecionado = selectAno.value;

    console.log("País selecionado:", paisSelecionado);
    console.log("Ano selecionado:", anoSelecionado);

    //passando a filtro q1 cm os parametros que o usuario escolheu no select
    const resultadoFiltro = filtroq1(paisSelecionado)(parseInt(anoSelecionado));
    const q1 = resultadoFiltro.map(item => (`Nome: ${item.Name}, Esporte: ${item.Sport}`));

    //chama a função que mostra o resultado
    criarETrocarTabela(q1);


    console.log(q1);
}; 
//---------------------------------Q2---------------------------------------------------------
//essa função adiciona os atletas na tabela
const criarETrocarTabelaQ2 = (registros) => {
    // Criar a nova tabela
    const novaTabela = document.createElement('table');
    novaTabela.id = 'tabelaQ2'; // atribuir o mesmo ID para manter a consistência

    // Criar linhas da tabela e adicionar registros
    const linhasTabela = registros.map(item => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = item;
        row.appendChild(cell);
        return row;
    });

    // Adicionar as linhas à nova tabela
    novaTabela.append(...linhasTabela);

    // Substituir a tabela atual pela nova tabela
    const tabelaAtual = document.querySelector('#tabelaQ2');
    tabelaAtual.replaceWith(novaTabela);
};

// Função para adicionar opções de países ao select
const addOptionsPaisQ2 = (paises) => {
    const select = document.querySelector("#listaPaisQ2");

    const options = paises.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};


// Função para adicionar opções de anos ao select
const addOptionsAnoQ2 = (anos) => {
    const select = document.querySelector("#listaAnoQ2");

    const options = anos.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};



const addOptionsMedalhaQ2 = (medalhas) => {
    const select = document.querySelector("#listaMedalhaQ2");

    const options = medalhas.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};



const atualizarTabelaq2 = () => {
    const selectPais = document.querySelector("#listaPaisQ2");
    const selectMedalha = document.querySelector("#listaMedalhaQ2")
    const selectAno = document.querySelector("#listaAnoQ2");

    const paisSelecionado = selectPais.value;
    const medalhaSelecionado = selectMedalha.value;
    const anoSelecionado = selectAno.value;

    console.log("País selecionado:", paisSelecionado);
    console.log("Medalha selecionado:", medalhaSelecionado);
    console.log("Ano selecionado:", anoSelecionado);

    // Aqui você pode chamar sua função filtroq1 com os valores selecionados
    const resultadoFiltro = filtroq2(paisSelecionado)(medalhaSelecionado)(parseInt(anoSelecionado));
    const q2 = resultadoFiltro.map(item => (`Nome: ${item.Name}, Esporte: ${item.Sport}`));

    // Limpar e trocar a tabela com os novos registros
    criarETrocarTabelaQ2(q2);

    // Exemplo de como você pode usar os resultados
    console.log(q2);
}; 




//----------------------------------------Q3------------------------------------------------------
//essa função adiciona os atletas na tabela
const criarETrocarTabelaQ3 = (registros) => {
    // Criar a nova tabela
    const novaTabela = document.createElement('table');
    novaTabela.id = 'tabelaQ3'; // atribuir o mesmo ID para manter a consistência

    // Criar linhas da tabela e adicionar registros
    const linhasTabela = registros.map(item => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = item;
        row.appendChild(cell);
        return row;
    });

    // Adicionar as linhas à nova tabela
    novaTabela.append(...linhasTabela);

    // Substituir a tabela atual pela nova tabela
    const tabelaAtual = document.querySelector('#tabelaQ3');
    tabelaAtual.replaceWith(novaTabela);
};


// Função para adicionar opções de países ao select
const addOptionsLetraQ3 = (letras) => {
    const select = document.querySelector("#listaLetraQ3");

    const options = letras.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};


const addOptionsPaisQ3 = (paises) => {
    const select = document.querySelector("#listaPaisQ3");

    const options = paises.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};



// Função para adicionar opções de anos ao select
const addOptionsAnoQ3 = (anos) => {
    const select = document.querySelector("#listaAnoQ3");

    const options = anos.map(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        return option;
    });

    select.append(...options);
};

const atualizarTabelaq3 = () => {
    const selectLetra = document.querySelector("#listaLetraQ3");
    const selectPais = document.querySelector("#listaPaisQ3");
    const selectAno = document.querySelector("#listaAnoQ3");

    const letraSelecionado = selectLetra.value;
    const paisSelecionado = selectPais.value;
    const anoSelecionado = selectAno.value;

    console.log("Letra selecionado:", letraSelecionado);
    console.log("Pais selecionado:", paisSelecionado)
    console.log("Ano selecionado:", anoSelecionado);

    // Aqui você pode chamar sua função filtroq1 com os valores selecionados
    const resultadoFiltro = filtroq3(letraSelecionado)(paisSelecionado)(parseInt(anoSelecionado));
    const q3 = resultadoFiltro.map(item => (`Nome: ${item.Name}, Pais: ${item.Team}, Esporte: ${item.Sport}`));

    // Limpar e trocar a tabela com os novos registros
    criarETrocarTabelaQ3(q3);

    // Exemplo de como você pode usar os resultados
    console.log(q3);
}; 



//--------------------------------------------------Q4--------------------------------------------------------

//essa função adiciona os atletas na tabela
const criarETrocarTabelaQ4 = (registro) => {
    // Função para criar a nova tabela
    const criarNovaTabela = () => {
        const novaTabela = document.createElement('table');
        novaTabela.id = 'tabelaQ4'; // atribuir o mesmo ID para manter a consistência
        return novaTabela;
    };

    // Função para adicionar o registro à nova tabela
    const adicionarRegistro = (tabela, registro) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        if (registro !== null) {
            cell.textContent = registro.Name; // Exibe o nome do atleta mais velho
        } else {
            cell.textContent = "Nenhum atleta encontrado"; // Mensagem para quando não há atleta no ano selecionado
        }

        row.appendChild(cell);
        tabela.appendChild(row);
    };

    // Função para substituir a tabela atual pela nova tabela
    const substituirTabelaAtual = (novaTabela) => {
        const tabelaAtual = document.querySelector('#tabelaQ4');
        tabelaAtual.replaceWith(novaTabela);
    };

    // Fluxo principal
    const novaTabela = criarNovaTabela();
    adicionarRegistro(novaTabela, registro);
    substituirTabelaAtual(novaTabela);
};



// Função para adicionar opções de países ao select
const addOptionsPaisQ4 = (paises) => {
    const select = document.querySelector("#listaPaisQ4");

    const criarOption = (valor, texto) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = texto;
        return option;
    };

    const options = paises.map(item => criarOption(item, item));
    const selectComOptions = options.reduce((acc, option) => {
        acc.appendChild(option);
        return acc;
    }, select);
};

// Função para adicionar opções de anos ao select
const addOptionsAnoQ4 = (anos) => {
    const select = document.querySelector("#listaAnoQ4");

    const criarOption = (valor, texto) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = texto;
        return option;
    };

    const options = anos.map(item => criarOption(item, item));
    select.append(...options);
};


const atualizarTabelaq4 = () => {
    const selectPais = document.querySelector("#listaPaisQ4");
    const selectAno = document.querySelector("#listaAnoQ4");

    const paisSelecionado = selectPais.value;
    const anoSelecionado = selectAno.value;

    console.log("País selecionado:", paisSelecionado);
    console.log("Ano selecionado:", anoSelecionado);

    // Aqui você pode chamar sua função filtroq1 com os valores selecionados
    const resultadoFiltro = filtroq4(paisSelecionado)(parseInt(anoSelecionado));
    const q4 = resultadoFiltro

    // Limpar e trocar a tabela com os novos registros
    criarETrocarTabelaQ4(q4);

    // Exemplo de como você pode usar os resultados
    console.log(q4);
}; 

//------------------------------------------------------Q5------------------------------------------------------------------
const criarETrocarTabelaQ5 = (registro) => {
    // Função para criar a nova tabela
    const criarNovaTabela = () => {
        const novaTabela = document.createElement('table');
        novaTabela.id = 'tabelaQ5'; // atribuir o mesmo ID para manter a consistência
        return novaTabela;
    };

    // Função para adicionar o registro à nova tabela
    const adicionarRegistro = (tabela, registro) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        if (registro !== null) {
            cell.textContent = `Média das idades: ${registro.toFixed(2)}`; // Exibe a média das idades com 2 casas decimais
        } else {
            cell.textContent = "Nenhum atleta encontrado"; // Mensagem para quando não há atleta no ano selecionado
        }

        row.appendChild(cell);
        tabela.appendChild(row);
    };

    // Função para substituir a tabela atual pela nova tabela
    const substituirTabelaAtual = (novaTabela) => {
        const tabelaAtual = document.querySelector('#tabelaQ5');
        tabelaAtual.replaceWith(novaTabela);
    };

    // Fluxo principal
    const novaTabela = criarNovaTabela();
    adicionarRegistro(novaTabela, registro);
    substituirTabelaAtual(novaTabela);
};

// Função para adicionar opções de países ao select
const addOptionsPaisQ5 = (paises) => {
    const select = document.querySelector("#listaPaisQ5");

    const criarOption = (valor, texto) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = texto;
        return option;
    };

    const options = paises.map(item => criarOption(item, item));
    select.append(...options);
};

// Função para adicionar opções de anos ao select
const addOptionsAnoQ5 = (anos) => {
    const select = document.querySelector("#listaAnoQ5");

    const criarOption = (valor, texto) => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = texto;
        return option;
    };

    const options = anos.map(item => criarOption(item, item));
    select.append(...options);
};



const atualizarTabelaq5 = () => {
    const selectPais = document.querySelector("#listaPaisQ5");
    const selectAno = document.querySelector("#listaAnoQ5");

    const paisSelecionado = selectPais.value;
    const anoSelecionado = parseInt(selectAno.value);

    console.log("País selecionado:", paisSelecionado);
    console.log("Ano selecionado:", anoSelecionado);

    // Aqui você pode chamar sua função filtroq5 com os valores selecionados
    const resultadoFiltro = filtroq5(paisSelecionado)(anoSelecionado);
    const q5 = resultadoFiltro;

    // Limpar e trocar a tabela com os novos registros
    criarETrocarTabelaQ5(q5);

    // Exemplo de como você pode usar os resultados
    console.log(q5);
};

// Adicionar opções de países e anos aos selects
addOptionsPais(paises);
addOptionsAno(anos);

addOptionsPaisQ2(paises);
addOptionsAnoQ2(anos);
addOptionsMedalhaQ2(medalha);

addOptionsLetraQ3(letra);
addOptionsPaisQ3(paises);
addOptionsAnoQ3(anos);

addOptionsPaisQ4(paises);
addOptionsAnoQ4(anos);

addOptionsPaisQ5(paises);
addOptionsAnoQ5(anos);