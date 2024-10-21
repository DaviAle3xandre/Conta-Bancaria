class ContaBancaria {
    constructor() {
        this.saldo = 0;
        this.usuario = '';
        this.agencia = '';
        this.historico = []; // Armazena o histórico de transações
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            document.getElementById('saldoValor').innerText = `R$ ${this.saldo.toFixed(2)}`;
            const mensagem = `Depositado: R$ ${valor}. Saldo atual: R$ ${this.saldo.toFixed(2)}`;
            this.exibirResultado(mensagem);
            this.adicionarHistorico(`Depósito - R$ ${valor.toFixed(2)}`);
        } else {
            this.exibirResultado("Valor para depósito deve ser positivo.");
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            document.getElementById('saldoValor').innerText = `R$ ${this.saldo.toFixed(2)}`;
            const mensagem = `Sacado: R$ ${valor}. Saldo atual: R$ ${this.saldo.toFixed(2)}`;
            this.exibirResultado(mensagem);
            this.adicionarHistorico(`Saque - R$ ${valor.toFixed(2)}`);
        } else {
            this.exibirResultado("Valor para saque deve ser positivo e menor ou igual ao saldo.");
        }
    }

    exibirResultado(mensagem) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML  = `<p>${mensagem}</p>`;
    }

    adicionarHistorico(mensagem) {
        this.historico.push(mensagem); // Adiciona a nova transação ao histórico
        if (this.historico.length > 2) {
            this.historico.shift(); // Remove a transação mais antiga se houver mais de três
        }
        this.atualizarHistorico(); // Atualiza a exibição do histórico
    }

    atualizarHistorico() {
        const historicoDiv = document.getElementById('historico');
        historicoDiv.innerHTML = this.historico.map(item => `<p>${item}</p>`).join('');
    }
}

// Instanciando a conta
const conta = new ContaBancaria();

// Atualiza o nome do usuário na interface
document.getElementById('nomeUsuarioDisplay').innerText = conta.usuario;

// Eventos dos botões
document.getElementById('depositarBtn').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('valorDeposito').value);
    conta.depositar(valor);
});

document.getElementById('sacarBtn').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('valorSaque').value);
    conta.sacar(valor);
});

// Funcionalidade para deslogar
document.getElementById('deslogarLink').addEventListener('click', () => {
    window.location.href = '/index.html'; // Altere conforme necessário
});
