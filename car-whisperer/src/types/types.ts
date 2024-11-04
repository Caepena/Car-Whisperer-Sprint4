export type CarroProps = {
    IDVeiculo: number;
    codCliente: number;
    placa: string;
    ano: number;
}

export type ClienteProps = {
    IDCliente: number;
    nome: string;
    endereco: string;
    cpf: string;
}

export type PagamentoProps = {
    IDPagamento: number;
    codCliente: number;
    dataPagamento: string;
    valor: number;
}

export type SinistroProps = {
    IDSinistro: number;
    codVeiculo: number;
    dataSinistro: string;
    valorEstimado: number;
    descricao: string;
}