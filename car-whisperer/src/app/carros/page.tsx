"use client";

import { CarroProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Carros() {
    const [carros, setCarros] = useState<CarroProps[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [filteredCarros, setFilteredCarros] = useState<CarroProps[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:8080/CarWhisperer");
        const data = await response.json();
        setCarros(data);
        setFilteredCarros(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/CarWhisperer/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Carro excluído com sucesso.");
                chamadaApi();
            }
            if (response.status === 404) {
                alert("Carro não pode ser excluído devido ao vínculo com um cliente.");
            }
        } catch (error) {
            console.error("Falha ao remover o carro: ", error);
        }
    };

    const handleSearch = async () => {
        if (searchId.trim() === "") {
            setFilteredCarros(carros);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/CarWhisperer/${searchId}`);
            if (response.ok) {
                const data = await response.json();
                setFilteredCarros([data]);
            } else {
                alert("Carro não encontrado.");
                setFilteredCarros([]);
            }
        } catch (error) {
            console.error("Erro na pesquisa do carro: ", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Carros</h2>
            <div className="flex ml-40 mt-5 mb-5">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do veículo"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border border-gray-300 rounded-l-lg p-2 w-64"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded-r-lg px-4"
                >
                    Buscar
                </button>
            </div>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID Veículo</th>
                        <th>ID do Cliente</th>
                        <th>Placa</th>
                        <th>Ano</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCarros.map((p) => (
                        <tr key={p.IDVeiculo}>
                            <td>{p.IDVeiculo}</td>
                            <td>{p.codCliente}</td>
                            <td>{p.placa}</td>
                            <td>{p.ano}</td>
                            <td>
                                <Link href={`/carros/${p.IDVeiculo}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(p.IDVeiculo);
                                    }}
                                >
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>Quantidade de carros: {filteredCarros.length}</td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center mt-5">
                <Link href="/carros/cad-carros">
                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600">
                        Cadastrar Novo Carro
                    </button>
                </Link>
            </div>
        </div>
    );
}
