var horariosChegada = [];
var nomesCliente = [];
var horariosDeixado = [];
var numerosDeixado = [];
var numerosColetado = [];
document.addEventListener("DOMContentLoaded", function() {
    var placaInput = document.getElementById("placa");
    var placas = [
        "ABC123",
        "DEF456",
        "GHI789"
        // Adicione outras placas à lista conforme necessário
    ];

    new Autocomplete(placaInput, placas);

    function Autocomplete(input, options) {
        var currentFocus;

        input.addEventListener("input", function() {
            var inputText = this.value;
            var autocompleteList = options.filter(function(option) {
                return option.startsWith(inputText.toUpperCase());
            });

            closeAllLists();

            if (inputText.length > 0 && autocompleteList.length > 0) {
                currentFocus = -1;
                var autocompleteContainer = createAutocompleteContainer();

                autocompleteList.forEach(function(option) {
                    var autocompleteOption = createAutocompleteOption(option);
                    autocompleteContainer.appendChild(autocompleteOption);
                });
            }
        });

        input.addEventListener("keydown", function(e) {
            var autocompleteItems = document.getElementById(this.id + "-autocomplete-list");

            if (!autocompleteItems) {
                return;
            }

            autocompleteItems = autocompleteItems.getElementsByTagName("div");

            if (e.keyCode === 40) { // Seta para baixo
                currentFocus++;
                addActive(autocompleteItems);
            } else if (e.keyCode === 38) { // Seta para cima
                currentFocus--;
                addActive(autocompleteItems);
            } else if (e.keyCode === 13) { // Enter
                e.preventDefault();
                if (currentFocus > -1) {
                    autocompleteItems[currentFocus].click();
                }
            }
        });

        function createAutocompleteContainer() {
            var autocompleteContainer = document.createElement("div");
            autocompleteContainer.setAttribute("id", input.id + "-autocomplete-list");
            autocompleteContainer.setAttribute("class", "autocomplete-items");
            autocompleteContainer.style.backgroundColor = "#FFCCCC"; // Defina a cor de fundo desejada
            input.parentNode.appendChild(autocompleteContainer);
            return autocompleteContainer;
        }        

        function createAutocompleteOption(option) {
            var autocompleteOption = document.createElement("div");
            autocompleteOption.textContent = option;
            autocompleteOption.addEventListener("click", function() {
                input.value = this.textContent;
                closeAllLists();
            });
            return autocompleteOption;
        }

        function addActive(autocompleteItems) {
            removeActive(autocompleteItems);

            if (currentFocus >= autocompleteItems.length) {
                currentFocus = 0;
            }

            if (currentFocus < 0) {
                currentFocus = autocompleteItems.length - 1;
            }

            autocompleteItems[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(autocompleteItems) {
            Array.from(autocompleteItems).forEach(function(item) {
                item.classList.remove("autocomplete-active");
            });
        }

        function closeAllLists() {
            var autocompleteItems = document.getElementsByClassName("autocomplete-items");
            Array.from(autocompleteItems).forEach(function(item) {
                item.parentNode.removeChild(item);
            });
        }

        document.addEventListener("click", function(e) {
            closeAllLists();
        });
    }
});

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

    var totalColetas = dados.length - 1;
    var mediaColetas = totalColetas / 1;

    var kmInicial = parseFloat(document.getElementById('km-inicial').value);
    var kmFinal = parseFloat(document.getElementById('km-final').value);

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

