var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import promptSync from "prompt-sync";
var entradaUser = require("prompt-sync")({ sigint: false });
// const promptSync = require("prompt-sync");
// const entradaUser = promptSync
// criar classe produto
var Produto = /** @class */ (function () {
    function Produto(nome, codigo, preco, quantidade) {
        this.estoqueBaixo = false;
        this.nome = nome;
        this.codigo = codigo;
        this.preco = preco;
        this.quantidade = quantidade;
        this.verficarEstoqueBaixo(); // vai verificar se na inicialização já começa com estoque baixo
    }
    Object.defineProperty(Produto.prototype, "getNome", {
        get: function () {
            return this.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "getCodigo", {
        get: function () {
            return this.codigo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "getPreco", {
        get: function () {
            return this.preco;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "getEstoqueBaixo", {
        get: function () {
            return this.estoqueBaixo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "getQuantidade", {
        get: function () {
            return this.quantidade;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Produto.prototype, "setQuantidade", {
        set: function (valor) {
            this.quantidade = valor;
            this.verficarEstoqueBaixo();
        },
        enumerable: false,
        configurable: true
    });
    // adiciona um produto a quantidade
    Produto.prototype.adicionarEstoque = function (qtd) {
        this.quantidade += qtd;
        this.verficarEstoqueBaixo();
    };
    // remove produtos da quantidade e verifica estoque baixo. trata erro de remoção maior que estoque disponível.
    Produto.prototype.removerEstoque = function (qtd) {
        if (this.quantidade - qtd < 0) {
            throw new Error("Quantidade solicitada maior que o estoque disponível");
        }
        this.quantidade -= qtd;
        console.log("Saída registrada com sucesso!");
        this.verficarEstoqueBaixo();
    };
    // verifica se o estoque de um produto está baixo
    Produto.prototype.verficarEstoqueBaixo = function () {
        this.estoqueBaixo = this.quantidade <= 5; // delimita que a partir de 5 p estoque está baixo
    };
    return Produto;
}());
// classe abstrata
var Movimentacao = /** @class */ (function () {
    function Movimentacao(produto, quantidade) {
        this.data = new Date();
        this.produto = produto;
        this.quantidade = quantidade;
    }
    Object.defineProperty(Movimentacao.prototype, "getProduto", {
        get: function () {
            return this.produto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movimentacao.prototype, "getQuantidade", {
        get: function () {
            return this.quantidade;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Movimentacao.prototype, "getData", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    Movimentacao.prototype.registrar = function (estoque) { };
    return Movimentacao;
}());
// classe concreta
var Entrada = /** @class */ (function (_super) {
    __extends(Entrada, _super);
    function Entrada() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Entrada.prototype.registrar = function (estoque) {
        this.getProduto.adicionarEstoque(this.getQuantidade);
        estoque.registrarMovimentacao(this); // esse this se refere a instância
        console.log("Entrada registrada com sucesso");
    };
    return Entrada;
}(Movimentacao));
// classe concreta
var Saida = /** @class */ (function (_super) {
    __extends(Saida, _super);
    function Saida() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Saida.prototype.registrar = function (estoque) {
        try {
            this.getProduto.removerEstoque(this.getQuantidade);
            estoque.registrarMovimentacao(this);
        }
        catch (erro) {
            if (erro instanceof Error) {
                console.error("Falha ao remover estoque:", erro.message);
            }
        }
    };
    return Saida;
}(Movimentacao));
// classe de estoque que funciona como gerenciador do estoque
var Estoque = /** @class */ (function () {
    function Estoque() {
        this.listaProdutos = [];
        this.listaMovimentacoes = [];
    }
    Object.defineProperty(Estoque.prototype, "getListaProdutos", {
        get: function () {
            return this.listaProdutos;
        },
        enumerable: false,
        configurable: true
    });
    // adiciona um produto ao estoque (array listaProdutos)
    Estoque.prototype.adicionarProduto = function (produto) {
        this.listaProdutos.push(produto);
    };
    // adiciona ao array de movimentações as movimentações realizadas (listaMovimentacoes)
    Estoque.prototype.registrarMovimentacao = function (mov) {
        this.listaMovimentacoes.push(mov);
    };
    //lista todos os produtos cadastrados (código e nome do produto)
    Estoque.prototype.listarProdutos = function () {
        if (this.listaProdutos.length === 0) {
            console.log("Nenhum produto cadastrado ainda.");
            return;
        }
        console.log("========= Lista de todos os Produtos Cadastrados =======");
        for (var _i = 0, _a = this.listaProdutos; _i < _a.length; _i++) {
            var p = _a[_i];
            if (!p)
                continue; // evita erro se tiver algo inválido
            console.log("C\u00F3digo: ".concat(p.getCodigo, " | Nome do Produto: ").concat(p.getNome));
        }
        console.log("========================================================");
    };
    // gera relatório com código, nome, preço, quantidade, total do produto e flag de estoque baixo. Além do valor total do estoque completo.
    Estoque.prototype.gerarRelatorio = function () {
        console.log("===== RELATÓRIO DE ESTOQUE =====");
        this.listaProdutos.forEach(function (produto) {
            var subtotal = produto.getPreco * produto.getQuantidade;
            console.log("C\u00F3digo: ".concat(produto.getCodigo));
            console.log("Nome: ".concat(produto.getNome));
            console.log("Pre\u00E7o: R$ ".concat(produto.getPreco));
            console.log("Quantidade: ".concat(produto.getQuantidade));
            console.log("Subtotal: R$ ".concat(subtotal.toFixed(2)));
            console.log(produto.getEstoqueBaixo ? "⚠️  Estoque baixo" : "Estoque normal");
            console.log("--------------------------------");
        });
        console.log("Valor total em estoque: R$ ".concat(this.calcularValorTotal().toFixed(2)));
        console.log("================================");
    };
    // imprime no console um relatório de todas as movimentações feitas
    Estoque.prototype.relatorioMovimentacoes = function () {
        console.log("===== RELATÓRIO DE MOVIMENTAÇÕES =====");
        this.listaMovimentacoes.forEach(function (m) {
            // instanceof é um método que retorna true se o objeto for uma instância ou herda de alguma classe/construtor
            var tipo = m instanceof Entrada ? "Entrada" : "Saída";
            console.log("".concat(tipo, " | C\u00F3digo: ").concat(m.getProduto.getCodigo, " | Produto: ").concat(m.getProduto.getNome, " | Qtde: ").concat(m.getQuantidade, " | Data: ").concat(m.getData.toLocaleString()));
        });
        console.log("======================================");
    };
    // busca um produto pelo título e mostra uma lista com os produtos de títulos iguais. Informações detalhadas dos produtos encontrados.
    Estoque.prototype.pesquisarProduto = function (termoDeBusca) {
        var encontrados = [];
        for (var _i = 0, _a = this.listaProdutos; _i < _a.length; _i++) {
            var produto = _a[_i];
            // usando o includes para pegar todos os produtos que possuem o termo
            if (produto.getNome.toLowerCase().includes(termoDeBusca.toLowerCase())) {
                encontrados.push(produto);
            }
        }
        if (encontrados.length === 0) {
            console.log("Nenhum produto foi encontrado com esse termo");
            return;
        }
        console.log("========= Produto(s) Encontrado(s) ==========");
        for (var _b = 0, encontrados_1 = encontrados; _b < encontrados_1.length; _b++) {
            var p = encontrados_1[_b];
            console.log("C\u00F3digo: ".concat(p.getCodigo));
            console.log("Nome: ".concat(p.getNome));
            console.log("Pre\u00E7o: ".concat(p.getPreco));
            console.log("Quantidade: ".concat(p.getQuantidade));
            // p.verficarEstoqueBaixo();
            console.log("");
        }
        console.log("=============================================");
    };
    // calcula o total dos produtos (preço * quantidade)
    // imprime no console se for true e se for false só atualiza
    Estoque.prototype.calcularValorTotal = function (imprimir) {
        if (imprimir === void 0) { imprimir = false; }
        var total = this.listaProdutos.reduce(function (acc, p) { return acc + p.getPreco * p.getQuantidade; }, 0);
        if (imprimir) {
            console.log("O valor total do estoque \u00E9 R$ ".concat(total.toFixed(2)));
        }
        return total;
    };
    // mostra apenas os produtos com estoque baixo
    Estoque.prototype.mostrarProdutosEstoqueBaixo = function () {
        var estoqueBaixo = [];
        for (var _i = 0, _a = this.listaProdutos; _i < _a.length; _i++) {
            var p = _a[_i];
            if (!p)
                continue; // evita erro se p for undefined
            if (p.getEstoqueBaixo) {
                estoqueBaixo.push(p);
            }
        }
        if (estoqueBaixo.length === 0) {
            console.log("Nenhum produto com estoque baixo.");
            return;
        }
        console.log("==== PRODUTOS COM ESTOQUE BAIXO ====");
        for (var _b = 0, estoqueBaixo_1 = estoqueBaixo; _b < estoqueBaixo_1.length; _b++) {
            var prod = estoqueBaixo_1[_b];
            console.log("C\u00F3digo: ".concat(prod.getCodigo));
            console.log("Nome: ".concat(prod.getNome));
            console.log("Pre\u00E7o: ".concat(prod.getPreco));
            console.log("Quantidade: ".concat(prod.getQuantidade));
            console.log("--------------------------------");
        }
    };
    return Estoque;
}());
// instância do estoque
var estoque = new Estoque();
// função para criar o produto
function criarProduto() {
    var _a, _b;
    var nome = (_a = entradaUser("Nome do produto: ")) === null || _a === void 0 ? void 0 : _a.trim();
    var codigo = (_b = entradaUser("Código do produto: ")) === null || _b === void 0 ? void 0 : _b.trim();
    var preco = Number(entradaUser("Preço: "));
    var quantidade = Number(entradaUser("Quantidade: "));
    if (!nome || !codigo || isNaN(preco) || isNaN(quantidade)) {
        console.log("⚠️ Dados inválidos, produto não criado.");
        return null;
    }
    return new Produto(nome, codigo, preco, quantidade);
}
// função para escolher um produto pelo código
function escolherProduto() {
    var codigo = entradaUser("Informe o código do produto: ");
    var produto = estoque.getListaProdutos.find(function (p) { return p.getCodigo === codigo; });
    if (!produto)
        console.log("Produto não encontrado!");
    return produto || null;
}
// criando um menu principal dentro de uma function para executar somente se for chamado
function menu() {
    var opcao = "";
    while (opcao !== "0") {
        console.log("\n=== MENU ESTOQUE ===");
        console.log("1 - Adicionar produto");
        console.log("2 - Registrar entrada");
        console.log("3 - Registrar saída");
        console.log("4 - Listar produtos");
        console.log("5 - Gerar relatório de estoque");
        console.log("6 - Gerar relatório de entradas e saídas");
        console.log("7 - Mostrar produtos com estoque baixo");
        console.log("8 - Pesquisar produto");
        console.log("0 - Sair");
        opcao = entradaUser("Escolha uma opção: ");
        switch (opcao) {
            case "1":
                var novoProduto = criarProduto();
                if (novoProduto) {
                    estoque.adicionarProduto(novoProduto);
                    console.log("Produto adicionado com sucesso!");
                }
                break;
            case "2":
                var prodEntrada = escolherProduto();
                if (prodEntrada) {
                    var qtdEntrada = Number(entradaUser("Quantidade de entrada: "));
                    var entrada = new Entrada(prodEntrada, qtdEntrada);
                    entrada.registrar(estoque);
                }
                break;
            case "3":
                var prodSaida = escolherProduto();
                if (prodSaida) {
                    var qtdSaida = Number(entradaUser("Quantidade de saída: "));
                    var saida = new Saida(prodSaida, qtdSaida);
                    saida.registrar(estoque);
                }
                break;
            case "4":
                estoque.listarProdutos();
                break;
            case "5":
                estoque.gerarRelatorio();
                break;
            case "6":
                estoque.relatorioMovimentacoes();
                break;
            case "7":
                estoque.mostrarProdutosEstoqueBaixo();
                break;
            case "8":
                var termo = entradaUser("Digite o nome do produto para buscar: ");
                estoque.pesquisarProduto(termo);
                break;
            case "0":
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
        }
    }
}
// iniciar menu
menu();
function promptSync(arg0) {
    throw new Error("Function not implemented.");
}
