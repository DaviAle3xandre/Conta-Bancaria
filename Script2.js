document.addEventListener('DOMContentLoaded', () => {
    const conta = new ContaBancaria();

    document.getElementById('criarUsuarioBtn').addEventListener('click', () => {
        const nome = document.getElementById('nomeUsuario').value;
        const agencia = document.getElementById('numeroAgencia').value; 
        const senha = document.getElementById('senhaUsuario').value; 

        conta.criarUsuario(nome, agencia, senha);
        alert("Conta criada com sucesso!");

        // Login automático
        const contasArmazenadas = JSON.parse(localStorage.getItem('contas')) || [];
        const contaLogada = contasArmazenadas.find(c => c.nome === nome && c.senha === senha);

        if (contaLogada) {
            conta.usuario = contaLogada.nome;
            conta.agencia = contaLogada.numeroAgencia;
            conta.saldo = contaLogada.saldo || 0; 
            alert(`Bem-vindo, ${conta.usuario}!`);
            window.location.href = 'index.html';
        }

        
        document.getElementById('nomeUsuario').value = '';
        document.getElementById('numeroAgencia').value = '';
        document.getElementById('senhaUsuario').value = '';
    });

    document.getElementById('loginBtn').addEventListener('click', () => {
        const nomeUsuario = document.getElementById('loginNomeUsuario').value;
        const senhaUsuario = document.getElementById('loginSenhaUsuario').value;

        const contasArmazenadas = JSON.parse(localStorage.getItem('contas')) || [];
        const contaLogada = contasArmazenadas.find(c => c.nome === nomeUsuario && c.senha === senhaUsuario);

        if (contaLogada) {
            conta.usuario = contaLogada.nome;
            conta.agencia = contaLogada.numeroAgencia;
            conta.saldo = contaLogada.saldo || 0; 
            alert(`Bem-vindo, ${conta.usuario}!`);
            window.location.href = 'index.html';
        } else {
            alert('Nome de usuário ou senha incorretos. Tente novamente.');
        }
    });

    document.getElementById('acessarContaBtn').addEventListener('click', () => {
        alert(`Acessando a conta de ${conta.usuario}`);
        
    });

    document.getElementById('sairBtn').addEventListener('click', () => {
        conta.usuario = '';
        conta.agencia = '';
        conta.saldo = 0;
        alert('Você saiu da conta.');
        document.getElementById('contaArea').style.display = 'none';
        document.getElementById('formularioLogin').style.display = 'block';
    });
});

class ContaBancaria {
    constructor() {
        this.saldo = 0;
        this.usuario = '';
        this.agencia = '';
    }

    criarUsuario(nome, numeroAgencia, senha) {
        const contasArmazenadas = JSON.parse(localStorage.getItem('contas')) || [];
        const novaConta = {
            nome,
            numeroAgencia,
            senha,
            saldo: this.saldo 
        };
        contasArmazenadas.push(novaConta);
        localStorage.setItem('contas', JSON.stringify(contasArmazenadas));
    }
}
