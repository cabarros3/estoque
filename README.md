# 📦 Sistema de Controle de Estoque - Terminal

Projeto de gerenciamento de estoque com controle de entrada e saída de produtos, desenvolvido em **TypeScript** com execução via terminal usando o **Node.js** e a biblioteca **prompt-sync** para entrada de dados.

---

## 🚀 Funcionalidades

- Cadastro de produtos (nome, código, preço e quantidade inicial)
- Registro de **entradas** e **saídas** de estoque
- Detecção automática de **estoque baixo**
- Relatórios completos de produtos e movimentações
- Pesquisa de produtos por nome
- Interface interativa via terminal (menu)

---

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prompt-sync](https://www.npmjs.com/package/prompt-sync)

---

## 🧠 Modelagem das Classes

### 📦 Produto
- `nome`: string  
- `código`: string  
- `preço`: number  
- `quantidade`: number  
- 🔁 Métodos:
  - `adicionarEstoque()`
  - `removerEstoque()`
  - `verificarEstoque()`

### 🔄 Classe Abstrata: Movimentacao
- `produto`: Produto  
- `quantidade`: number  
- `data`: Date  
- 🔁 Método abstrato: `registrar()`

### ➕ Entrada (herda Movimentacao)
- Implementa `registrar()` para adicionar estoque

### ➖ Saída (herda Movimentacao)
- Implementa `registrar()` para remover estoque com validação

### 🗃️ Estoque
- `listaProdutos`: Produto[] (privado)
- `listaMovimentacoes`: Movimentacao[] (privado)
- 🔁 Métodos:
  - `adicionaProduto()`
  - `registraMovimentacao()`
  - `listarProdutos()`
  - `buscarProdutos()`
  - `gerarRelatorio()`
  - `calculaTotal()`
  - `mostrarEstoqueBaixo()`

---

## 📋 Menu de funcionalidades (no terminal)

```text
1 - Adicionar produto
2 - Registrar entrada
3 - Registrar saída
4 - Listar produtos
5 - Gerar relatório de estoque
6 - Mostrar produtos com estoque baixo
7 - Pesquisar produto
0 - Sair
```

## ⚙️ Como rodar o projeto localmente

### 🔧 Pré-requisitos

- Node.js instalado
- Git instalado (opcional, para clonar o projeto)
- Terminal ou prompt de comando

## Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```
2. Instale as dependências:
```bash
npm install
```
3. Compile o TypeScript para JavaScript:
```bash
npx tsc
```
4. Execute o programa via terminal:
```bash
node dist/estoque.js
```

## Observações

- O projeto é focado para uso em terminal, sem interface gráfica.

- O controle de entrada/saída de produtos é feito manualmente via menu interativo.

- O sistema emite alertas de estoque baixo automaticamente para produtos com quantidade menor ou igual a 5.