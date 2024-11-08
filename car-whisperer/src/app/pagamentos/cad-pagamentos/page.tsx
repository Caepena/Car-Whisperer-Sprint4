"use client";

import { PagamentoProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadPagamentos() {
    const navigate = useRouter();

    const [pagamento, setPagamento] = useState<PagamentoProps>({
        IDPagamento: 0,
        codCliente: 0,
        dataPagamento: "",
        valor: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPagamento({ ...pagamento, [name]: name === 'valor' || name === 'codCliente' ? Number(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/CarWhisperer/pagamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagamento),
            });

            if (response.ok) {
                alert("Pagamento cadastrado com sucesso!");
                setPagamento({
                    IDPagamento: 0,
                    codCliente: 0,
                    dataPagamento: "",
                    valor: 0,
                });
                navigate.push("/pagamentos");
            }
        } catch (error) {
            console.error("Falha ao cadastrar o pagamento: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-blue-500 rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Cadastro de Pagamentos</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="codCliente" className="block mb-2 text-sm font-medium text-white">Código do Cliente</label>
                        <input
                            type="number"
                            id="codCliente"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="codCliente"
                            value={pagamento.codCliente}
                            onChange={handleChange}
                            placeholder="Digite o código do cliente"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dataPagamento" className="block mb-2 text-sm font-medium text-white">Data do Pagamento</label>
                        <input
                            type="date"
                            id="dataPagamento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="dataPagamento"
                            value={pagamento.dataPagamento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="valor" className="block mb-2 text-sm font-medium text-white">Valor</label>
                        <input
                            type="number"
                            id="valor"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="valor"
                            value={pagamento.valor}
                            onChange={handleChange}
                            placeholder="Digite o valor do pagamento"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
