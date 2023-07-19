// Informações-Motorista
var nomeMotorista = document.getElementById('nome').value;
var data = document.getElementById('data').value;
var kmInicial = document.getElementById('km-inicial').value;
var kmFinal = document.getElementById('km-final').value;
var horarioSaida = document.getElementById('horario-saida').value;
var numeroPlaca = [];

// Infomações-Cliente
var horariosChegada = [];
var nomesCliente = [];
var horariosDeixado = [];
var numerosDeixado = [];
var numerosColetado = [];

var placaInput = document.getElementById('placa');

placaInput.addEventListener('input', function () {
    var placaValue = placaInput.value;

    var placaFormatada = placaValue.replace(/\W/g, '');

    if (placaFormatada.length >= 6) {
        var letras = placaFormatada.substring(0, 3);
        var numeros = placaFormatada.substring(3, 6);

        var placaFormatada = letras.toUpperCase() + '-' + numeros;

        numeroPlaca.push(placaFormatada);

        placaInput.value = placaFormatada;
    }
});

function adicionarLinha() {
    var divInformacoes = document.getElementById('informacoes');
    var novaLinha = document.createElement('div');
    novaLinha.classList.add('form-row');
    novaLinha.innerHTML = `
    <div class="col-md-1">
    <div class="icon-location text-center">
        <button class="btn btn-primary getLocationBtn" name="localizacaoBtn"><i class="bi bi-geo-alt-fill"></i></button>
    </div>
</div>
<div class="col-md-3">
    <div class="form-group text-center">
        <label for="horario-chegada">Saída</label>
        <input type="time" class="form-control" name="horario-chegada[]" id="horario-chegada" required>
    </div>
</div>
<div class="col-md-3">
    <div class="form-group text-center">
        <label for="nome-cliente">Cliente</label>
        <input type="text" class="form-control" name="nome-cliente[]" id="nome-cliente" required>
    </div>
</div>
<div class="col-md-2">
    <div class="form-group text-center">
        <label for="horarios-deixado">Chegada</label>
        <input type="time" class="form-control" name="horarios-deixado[]" id="horarios-deixado" required>
    </div>
</div>
<div class="col-md-1">
    <div class="form-group text-center">
        <label for="numero-deixado">Deixado</label>
        <input type="text" class="form-control" name="numero-deixado[]" id="numero-deixado" required>
    </div>
</div>
<div class="col-md-1">
    <div class="form-group text-center">
        <label for="numero-coletado">Coletado</label>
        <input type="text" class="form-control" name="numero-coletado[]" id="numero-coletado" required>
    </div>
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
    var campos = document.querySelectorAll('input[required], select[required], textarea[required]');

    for (var i = 0; i < campos.length; i++) {
        if (campos[i].value.trim() === '') {
            Swal.fire({
                title: 'Campos Incompletos',
                icon: 'warning',
                text: 'Preencha todos os campos do formulário antes de enviar.',
            });

            campos[i].style.border = '3px solid #dc3545';

            campos[i].addEventListener('input', function () {
                if (this.value.trim() !== '') {
                    this.style.border = '';
                }
            });

            return;
        }
    }

    imprimirTabela();
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
    var horariosChegada = document.getElementsByName('horario-chegada[]');
    var nomesCliente = document.getElementsByName('nome-cliente[]');
    var horariosDeixado = document.getElementsByName('horarios-deixado[]');
    var numerosDeixado = document.getElementsByName('numero-deixado[]');
    var numerosColetado = document.getElementsByName('numero-coletado[]');

    var tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';

    var dados = [];

    var nomeMotorista = document.getElementById('nome').value;
    var placa = document.getElementById('placa').value;
    var data = document.getElementById('data').value;
    var kmInicial = document.getElementById('km-inicial').value;
    var kmFinal = document.getElementById('km-final').value;
    var horarioSaida = document.getElementById('horario-saida').value;

    // Cabeçalho
    var cabecalho = ['Nome do Motorista', 'Placa', 'Data', 'Km Inicial', 'Km Final', 'Horário de Saída'];
    dados.push(cabecalho);

    var linhaCabecalho = [
        nomeMotorista,
        placa,
        data,
        kmInicial,
        kmFinal,
        horarioSaida
    ];
    dados.push(linhaCabecalho);

    // Informações adicionais
    var informacoes = ['Horário de Chegada', 'Nome do Cliente', 'Horário Deixado', 'Número Deixado', 'Número Coletado'];
    dados.push(informacoes);

    // Adicionar as linhas com os valores dos campos de entrada
    for (var i = 0; i < horariosChegada.length; i++) {
        var linha = [
            horariosChegada[i].value,
            nomesCliente[i].value,
            horariosDeixado[i].value,
            numerosDeixado[i].value,
            numerosColetado[i].value
        ];
        dados.push(linha);

        // Criação da linha na tabela HTML
        var novaLinha = document.createElement('tr');

        var colunaHorarioChegada = document.createElement('td');
        colunaHorarioChegada.textContent = horariosChegada[i].value;
        novaLinha.appendChild(colunaHorarioChegada);

        var colunaNomeCliente = document.createElement('td');
        colunaNomeCliente.textContent = nomesCliente[i].value;
        novaLinha.appendChild(colunaNomeCliente);

        var colunaHorarioDeixado = document.createElement('td');
        colunaHorarioDeixado.textContent = horariosDeixado[i].value;
        novaLinha.appendChild(colunaHorarioDeixado);

        var colunaNumeroDeixado = document.createElement('td');
        colunaNumeroDeixado.textContent = numerosDeixado[i].value;
        novaLinha.appendChild(colunaNumeroDeixado);

        var colunaNumeroColetado = document.createElement('td');
        colunaNumeroColetado.textContent = numerosColetado[i].value;
        novaLinha.appendChild(colunaNumeroColetado);

        tabelaCorpo.appendChild(novaLinha);
    }

    var totalColetas = dados.length - 3; // Exclui a linha do cabeçalho, linha em branco e linha de informações adicionais
    var mediaColetas = totalColetas / 1;

    var quilometragemPercorrida = kmFinal - kmInicial;

    var mensagem = '<p>Total de coletas: ' + totalColetas + '</p>';
    mensagem += '<p>Média de coletas: ' + mediaColetas + '</p>';
    mensagem += '<p>Quilometragem percorrida: ' + quilometragemPercorrida + '</p>';
    mensagem += '<p><strong>Deseja baixar o arquivo em Excel?</strong></p>';

    Swal.fire({
        title: 'Alerta',
        html: mensagem,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true,
        customClass: {
            container: 'my-sweetalert-container',
            content: 'my-sweetalert-content',
        },
    }).then(function (result) {
        if (result.isConfirmed) {
            console.log('Clique em Sim');
            var downloadExcel = true;

            if (downloadExcel) {
                var wb = XLSX.utils.book_new();
                var ws = XLSX.utils.aoa_to_sheet(dados);

                // Ajustar o posicionamento das informações no Excel
                ws['A3'].s = { alignment: { horizontal: 'left' } };
                ws['B3'].s = { alignment: { horizontal: 'left' } };
                ws['C3'].s = { alignment: { horizontal: 'left' } };
                ws['D3'].s = { alignment: { horizontal: 'left' } };
                ws['E3'].s = { alignment: { horizontal: 'left' } };

                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, 'percurso_diario.xlsx');

                Swal.fire({
                    title: 'Download do Excel',
                    icon: 'success',
                    text: 'O arquivo Excel foi baixado com sucesso!',
                });
            }
        } else {
            // Ação para o botão "Não"
            console.log('Clique em Não');
        }
    });
}

document.addEventListener("click", function (event) {
    if (event.target.getAttribute("name") === "localizacaoBtn") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback.bind(null, event), errorCallback);
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    }
});

function successCallback(event, position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var url = "https://api.opencagedata.com/geocode/v1/json?q=" + latitude + "+" + longitude + "&key=277f5159206e49f7b0ae8b29696b0464";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.results.length > 0) {
                var address = data.results[0].formatted;

                Swal.fire({
                    title: "Localização Atual",
                    text: address,
                    input: "text",
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        var formRow = event.target.closest('.form-row');
                        var clienteInput = formRow.querySelector('input[name="nome-cliente[]"]');
                        clienteInput.value = result.value;

                        var horarioChegadaInput = formRow.querySelector('input[name="horario-chegada[]"]');
                        var now = new Date();
                        var horas = String(now.getHours()).padStart(2, '0');
                        var minutos = String(now.getMinutes()).padStart(2, '0');
                        var horarioChegada = horas + ":" + minutos;
                        horarioChegadaInput.value = horarioChegada;
                    }
                });
            } else {
                alert("Endereço não encontrado.");
            }
        })
        .catch(function (error) {
            alert("Falha ao obter o endereço: " + error);
        });
}

function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permissão para obter localização negada pelo usuário.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informações de localização indisponíveis.");
            break;
        case error.TIMEOUT:
            alert("Tempo limite para obter localização expirado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Erro desconhecido ao obter localização.");
            break;
    }
}

// Seletor para os campos de entrada
// var camposInput = document.querySelectorAll('input[type="text"], input[type="time"], input[type="number"]');

// camposInput.forEach(function (campo) {
//     var label = campo.previousElementSibling.getAttribute('data-tippy-content') || campo.previousElementSibling.innerText;
//     tippy(campo, {
//         content: label,
//         theme: 'custom',
//         allowHTML: true,
//     });
// });

