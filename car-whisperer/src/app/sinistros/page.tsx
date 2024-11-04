"use client"

import { SinistroProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Sinistros() {

    const [searchId, setSearchId] = useState<string>("");
    const [filteredSinistros, setFilteredSinistros] = useState<SinistroProps[]>([]);

    const [sinistros, setSinistros] = useState<SinistroProps[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer/sinistros");
        const data = await response.json();
        
        setSinistros(data);
        setFilteredSinistros(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/sinistros/${id}`,{
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            alert("Sinistro excluído com sucesso.");
            chamadaApi();
        }
        if  (response.status === 404) {
            alert("Sinistro não pode ser excluído devido ao vínculo com um carro.");
        }

    } catch (error) {
        console.error("Falha ao remover o sinistro: ", error);
    }
}

const handleSearch = async () => {
    if (searchId.trim() === "") {
        setFilteredSinistros(sinistros);
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/sinistros/${searchId}`);
        if (response.ok) {
            const data = await response.json();
            setFilteredSinistros([data]);
        } else {
            alert("Sinistro não encontrado.");
            setFilteredSinistros([]);
        }
    } catch (error) {
        console.error("Erro na pesquisa do sinistro: ", error);
    }
};

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Sinistros</h2>
            <div className="flex ml-40 mt-5 mb-5">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do sinistro"
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
                        <th>ID Sinistro</th>
                        <th>ID do Carro</th>
                        <th>Valor Estimado</th>
                        <th>Descrição</th>
                        <th>Data do Sinistro</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSinistros.map((p) => (
                        <tr key={p.IDSinistro}>
                            <td>{p.IDSinistro}</td>
                            <td>{p.codVeiculo}</td>
                            <td>{p.valorEstimado}</td>
                            <td>{p.descricao}</td>
                            <td>{p.dataSinistro}</td>
                            <td>
                                <Link href={`/sinistros/${p.IDSinistro}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.IDSinistro);
                                }}>
                                    <Excluir className="inline text-3xl" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                    <td colSpan={5}>
                            Quantidade de sinistros: {sinistros.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center mt-5">
                <Link href="/sinistros/cad-sinistros">
                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600">
                        Cadastrar Novo Sinistro
                    </button>
                </Link>
            </div>
        </div>
    )
}