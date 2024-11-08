"use client"

import { ClienteProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Clientes() {

    const [searchId, setSearchId] = useState<string>("");
    const [filteredClientes, setFilteredClientes] = useState<ClienteProps[]>([]);

    const [clientes, setClientes] = useState<ClienteProps[]>([]);
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer/clientes");
        const data = await response.json();
        
        setClientes(data);
        setFilteredClientes(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/clientes/${id}`,{
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            alert("Cliente excluído com sucesso.");
            chamadaApi();
        }
        if  (response.status === 404) {
            alert("Cliente não foi encontrado.");
        }
    } catch (error) {
        console.error("Falha ao remover o cliente: ", error);
    }
}

const handleSearch = async () => {
    if (searchId.trim() === "") {
        setFilteredClientes(clientes);
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/clientes/${searchId}`);
        if (response.ok) {
            const data = await response.json();
            setFilteredClientes([data]);
        } else {
            alert("Cliente não encontrado.");
            setFilteredClientes([]);
        }
    } catch (error) {
        console.error("Erro na pesquisa do cliente: ", error);
    }
};

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Clientes</h2>
            <div className="flex ml-40 mt-5 mb-5">
                <input
                    type="text"
                    placeholder="Buscar pelo ID do cliente"
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
                        <th>ID do Cliente</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map((p) => (
                        <tr key={p.IDCliente}>
                            <td>{p.IDCliente}</td>
                            <td>{p.nome}</td>
                            <td>{p.cpf}</td>
                            <td>{p.endereco}</td>
                            <td>
                                <Link href={`clientes/${p.IDCliente}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.IDCliente);
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
                            Quantidade de clientes: {clientes.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center mt-5">
                <Link href="/clientes/cad-clientes">
                    <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600">
                        Cadastrar Novo Cliente
                    </button>
                </Link>
            </div>
        </div>
    )
}