"use client";

import { SinistroProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarSinistros({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [sinistro, setSinistro] = useState<SinistroProps>({
        IDSinistro: 0,
        codVeiculo: 0,
        dataSinistro: "",
        valorEstimado: 0,
        descricao: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/CarWhisperer/sinistros/${params.id}`);
            const data = await response.json();
            setSinistro(data);
        };
        chamadaApi();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/CarWhisperer/sinistros/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sinistro),
            });

            if (response.ok) {
                alert("Sinistro atualizado com sucesso!");
                navigate.push("/sinistros");
            }
        } catch (error) {
            console.error("Erro na atualização do sinistro...", error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="bg-blue-500 rounded-md p-6 w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-5 text-white">Editar Sinistro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="codVeiculo" className="block mb-2 text-sm font-medium text-white">Código do Veículo</label>
                        <input
                            type="number"
                            id="codVeiculo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="codVeiculo"
                            value={sinistro.codVeiculo}
                            onChange={(e) => setSinistro({ ...sinistro, codVeiculo: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dataSinistro" className="block mb-2 text-sm font-medium text-white">Data do Sinistro</label>
                        <input
                            type="date"
                            id="dataSinistro"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="dataSinistro"
                            value={sinistro.dataSinistro}
                            onChange={(e) => setSinistro({ ...sinistro, dataSinistro: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="valorEstimado" className="block mb-2 text-sm font-medium text-white">Valor Estimado</label>
                        <input
                            type="number"
                            id="valorEstimado"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="valorEstimado"
                            value={sinistro.valorEstimado}
                            onChange={(e) => setSinistro({ ...sinistro, valorEstimado: Number(e.target.value) })}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-white">Descrição</label>
                        <textarea
                            id="descricao"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            name="descricao"
                            value={sinistro.descricao}
                            onChange={(e) => setSinistro({ ...sinistro, descricao: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
}
