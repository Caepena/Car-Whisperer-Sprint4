"use client"

import { ClienteProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Clientes() {

    const [clientes, setClientes] = useState<ClienteProps[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer/clientes");
        const data = await response.json();
        
        setClientes(data);
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

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Clientes</h2>

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
                    {clientes.map((p) => (
                        <tr key={p.IDCliente}>
                            <td>{p.IDCliente}</td>
                            <td>{p.nome}</td>
                            <td>{p.cpf}</td>
                            <td>{p.endereco}</td>
                            <td>
                                <Link href={`/${p.IDCliente}`}>
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
        </div>
    )
}