# Readme - Site de Registro de Motorista

O Site de Registro de Motorista é uma aplicação web que simplifica o processo de registro de informações sobre motoristas, clientes e produtos em uma empresa de transporte. Ele possui um formulário intuitivo para os motoristas inserirem detalhes relevantes e exibe uma tabela atualizada com estatísticas relevantes. O site é fácil de usar, responsivo e pode ser uma ferramenta valiosa para empresas de transporte gerenciarem suas atividades de forma eficiente.

## Funcionalidades

- Registro de informações do motorista:
  - Nome do motorista
  - Placa do veículo
  - Data do registro
  - Quilometragem inicial
  - Quilometragem final
  - Horário de saída

- Registro de informações dos clientes e produtos:
  - Horário de chegada
  - Nome do cliente
  - Horário de deixado
  - Número deixado
  - Número coletado

- Adicionar e remover linhas para registrar múltiplos clientes e produtos

- Validação dos campos obrigatórios antes do envio do formulário

- Exibição das informações registradas em uma tabela

## Uso

1. Preencha os campos do formulário:
   - Nome do motorista: Nome completo do motorista
   - Placa: Placa do veículo no formato XXX-0000
   - Data: Data do registro
   - Quilometragem inicial: Valor da quilometragem inicial do veículo
   - Quilometragem final: Valor da quilometragem final do veículo
   - Horário de saída: Horário de saída do veículo

2. Para adicionar informações de clientes e produtos, preencha os campos na seção "Informações do Cliente e Produto" e clique no botão "Adicionar Linha". Repita esse passo para cada cliente/produto adicionado. Caso precise remover uma linha, clique no botão "Remover Linha".

3. Ao finalizar o preenchimento do formulário, clique no botão "Enviar". Se todos os campos obrigatórios estiverem preenchidos, as informações serão exibidas na tabela abaixo do formulário.

## Tecnologias utilizadas

O site utiliza as seguintes bibliotecas externas:

- [Popper.js](https://popper.js.org/) (v2.11.6): Biblioteca usada para posicionamento de elementos pop-up.
- [Tippy.js](https://atomiks.github.io/tippyjs/) (v6.3.1): Biblioteca usada para adicionar tooltips interativos.
- [SweetAlert2](https://sweetalert2.github.io/) (v11.1.2): Biblioteca usada para exibir mensagens de alerta personalizadas.

## Estrutura do Código

O código é composto por um arquivo HTML que contém a estrutura do formulário e uma tabela para exibição dos dados. Além disso, há um arquivo JavaScript chamado "script.js" que contém as funcionalidades do formulário.

As informações são coletadas do formulário e armazenadas em variáveis. Os eventos de adicionar e remover linhas são tratados pelas funções "adicionarLinha()" e "removerLinha()", respectivamente. A função "verificarFormulario()" valida os campos obrigatórios antes de enviar o formulário. As funções "enviarFormulario()" e "imprimirTabela()" são responsáveis por exibir os dados na tabela.

## Nota

Este código faz uso de bibliotecas externas hospedadas em CDNs públicos. Certifique-se de ter acesso à Internet para carregar corretamente essas bibliotecas.
