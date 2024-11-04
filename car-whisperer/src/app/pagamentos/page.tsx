"use client"

import { PagamentoProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Pagamentos() {

    const [pagamentos, setPagamentos] = useState<PagamentoProps[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer/pagamentos");
        const data = await response.json();
        
        setPagamentos(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/pagamentos/${id}`,{
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            alert("Pagamento excluído com sucesso.");
            chamadaApi();
        }
        if  (response.status === 404) {
            alert("Pagamento não pode ser excluído devido ao vínculo com um cliente.");
        }

} catch (error) {
    console.error("Falha ao remover o pagamento: ", error);
}
}

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Pagamentos</h2>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID Pagamento</th>
                        <th>ID do Cliente</th>
                        <th>Valor</th>
                        <th>Data do Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.map((p) => (
                        <tr key={p.IDPagamento}>
                            <td>{p.IDPagamento}</td>
                            <td>{p.codCliente}</td>
                            <td>{p.valor}</td>
                            <td>{p.dataPagamento}</td>
                            <td>
                                <Link href={`/${p.IDPagamento}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.IDPagamento);
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
                            Quantidade de carros: {pagamentos.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}