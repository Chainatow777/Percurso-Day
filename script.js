var horariosChegada = [];
var nomesCliente = [];
var horariosDeixado = [];
var numerosDeixado = [];
var numerosColetado = [];

function adicionarLinha() {
    var divInformacoes = document.getElementById('informacoes');
    var novaLinha = document.createElement('div');
    novaLinha.classList.add('form-row');
    novaLinha.innerHTML = `
    <div class="form-group col-md-2">
      <input type="time" class="form-control" name="horario-chegada[]" required>
    </div>
    <div class="form-group col-md-3">
      <input type="text" class="form-control" name="nome-cliente[]" required>
    </div>
    <div class="form-group col-md-2">
      <input type="time" class="form-control" name="horarios-deixado[]" required>
    </div>
    <div class="form-group col-md-2">
      <input type="text" class="form-control" name="numero-deixado[]" required>
    </div>
    <div class="form-group col-md-2">
      <input type="text" class="form-control" name="numero-coletado[]" required>
    </div>
  `;
    divInformacoes.appendChild(novaLinha);
}

function removerLinha() {
    var divInformacoes = document.getElementById('informacoes');
    var linhasFormulario = divInformacoes.getElementsByClassName('form-row');

    if (linhasFormulario.length > 0) {
        var ultimaLinhaFormulario = divInformacoes.lastElementChild;
        divInformacoes.removeChild(ultimaLinhaFormulario);
    }

    var tabelaCorpo = document.getElementById('tabelaCorpo');
    var linhasTabela = tabelaCorpo.getElementsByTagName('tr');

    if (linhasTabela.length > 0) {
        tabelaCorpo.removeChild(linhasTabela[linhasTabela.length - 1]);
    }
}

function verificarFormulario() {
    var horariosChegada = document.getElementsByName('horario-chegada[]');
    var nomesCliente = document.getElementsByName('nome-cliente[]');
    var horariosDeixado = document.getElementsByName('horarios-deixado[]');
    var numerosDeixado = document.getElementsByName('numero-deixado[]');
    var numerosColetado = document.getElementsByName('numero-coletado[]');

    var isFormFilled = verificarFormularioPreenchido(horariosChegada, nomesCliente, horariosDeixado, numerosDeixado, numerosColetado);

    if (isFormFilled) {
        imprimirTabela();
    } else {
        alert('Preencha todos os campos do formulário antes de enviar.');
    }
}

function verificarFormularioPreenchido(...campos) {
    for (var i = 0; i < campos.length; i++) {
        for (var j = 0; j < campos[i].length; j++) {
            if (campos[i][j].value.trim() === '') {
                return false;
            }
        }
    }
    return true;
}

function enviarFormulario() {
    var formulario = document.getElementById('formulario');
    var tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';

    for (var i = 0; i < formulario.length; i++) {
        var input = formulario[i];
        if (input.name !== '') {
            var valor = input.value;
            adicionarDadoTabela(valor);
        }
    }
}

function adicionarDadoTabela(valor) {
    var tabelaCorpo = document.getElementById('tabelaCorpo');
    var novaLinha = document.createElement('tr');
    var novaCelula = document.createElement('td');
    novaCelula.textContent = valor;
    novaLinha.appendChild(novaCelula);
    tabelaCorpo.appendChild(novaLinha);
}

function imprimirTabela() {
    horariosChegada = document.getElementsByName('horario-chegada[]');
    nomesCliente = document.getElementsByName('nome-cliente[]');
    horariosDeixado = document.getElementsByName('horarios-deixado[]');
    numerosDeixado = document.getElementsByName('numero-deixado[]');
    numerosColetado = document.getElementsByName('numero-coletado[]');

    var tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';

    var dados = [];

    // Cabeçalho
    var cabecalho = ['Horário de Chegada', 'Nome do Cliente', 'Horário Deixado', 'Número Deixado', 'Número Coletado'];
    dados.push(cabecalho);

    for (var i = 0; i < horariosChegada.length; i++) {
        var linha = [
            horariosChegada[i].value,
            nomesCliente[i].value,
            horariosDeixado[i].value,
            numerosDeixado[i].value,
            numerosColetado[i].value
        ];
        dados.push(linha);

        // Adiciona a linha na tabela HTML
        var linhaHTML = document.createElement('tr');
        for (var j = 0; j < linha.length; j++) {
            var colunaHTML = document.createElement('td');
            colunaHTML.textContent = linha[j];
            linhaHTML.appendChild(colunaHTML);
        }
        tabelaCorpo.appendChild(linhaHTML);
    }

    var totalColetas = dados.length - 1; // Excluindo o cabeçalho
    var mediaColetas = totalColetas / 1; // Dividido por 1 (um) como mencionado na pergunta

    // Obtém os valores dos campos de quilometragem
    var kmInicial = parseFloat(document.getElementById('km-inicial').value);
    var kmFinal = parseFloat(document.getElementById('km-final').value);

    // Calcula a quilometragem percorrida
    var quilometragemPercorrida = kmFinal - kmInicial;

    var mensagem = 'Total de coletas: ' + totalColetas + '\n';
    mensagem += 'Média de coletas: ' + mediaColetas + '\n';
    mensagem += 'Quilometragem percorrida: ' + quilometragemPercorrida + '\n';
    mensagem += 'Deseja baixar o arquivo em Excel?';

    var downloadExcel = confirm(mensagem);

    var isFormFilled = verificarFormularioPreenchido(horariosChegada, nomesCliente, horariosDeixado, numerosDeixado, numerosColetado);
    if (isFormFilled && downloadExcel) {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.aoa_to_sheet(dados);

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'percurso_diario.xlsx');
    }

    exibirInformacoesCalendario();
}

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
});