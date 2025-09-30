## Modelagem de classes

### classe Prodruto

- nome
- código
- preco
- quantidade

* adicionarEstoque() -- ok
* removerEstoque() -- ok
* verificarEstoque() -- ok

### classe abstrata Movimentacao

- produtoCodigo
- data
- quantidade
- registrar(): void -- ok

### classe entrada herda de Movimentação

- registrar(): void -- ok

### classe saida herda de Movimentação

- registrar(): void --ok

### classe Estoque

- listaProdutos (privado) -- ok
- listaMovimentacoes (privado) -- ok
- adicionaProduto() -- ok
- registraMovimentacao()
- buscarProdutos() -- ok
- listarProdutos() -- ok
- relatorio()
- calculaTotal() -- ok
- MostrarEstoqueBaixo() -- ok

MENU para colocar no programa
cadastrar produto: pedir, um nome, um código, uma quantidade
registrar saída: excluir pelo código, quantidade que será removida,
registrar entrada
gerar relatório de estoque: mostrar nome do produto, código, preço e se está com o estoque baixo
sair
