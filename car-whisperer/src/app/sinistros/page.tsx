"use client"

import { SinistroProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Sinistros() {

    const [sinistros, setSinistros] = useState<SinistroProps[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer/sinistros");
        const data = await response.json();
        
        setSinistros(data);
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

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Sinistros</h2>

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
                    {sinistros.map((p) => (
                        <tr key={p.IDSinistro}>
                            <td>{p.IDSinistro}</td>
                            <td>{p.codVeiculo}</td>
                            <td>{p.valorEstimado}</td>
                            <td>{p.descricao}</td>
                            <td>{p.dataSinistro}</td>
                            <td>
                                <Link href={`/${p.IDSinistro}`}>
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
        </div>
    )
}