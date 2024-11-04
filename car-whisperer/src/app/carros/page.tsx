"use client"

import { CarroProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Carros() {

    const [carros, setCarros] = useState<CarroProps[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:8080/CarWhisperer");
        const data = await response.json();
        
        setCarros(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:8080/CarWhisperer/${id}`,{
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            alert("Carro excluído com sucesso.");
            chamadaApi();
        }
        if  (response.status === 404) {
            alert("Carro não pode ser excluído devido ao vínculo com um cliente.");
        }

} catch (error) {
    console.error("Falha ao remover o carro: ", error);
}
}

    return(
        <div>
            <h2 className="text-2xl font-bold ml-40 mt-24">Carros</h2>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID Veículo</th>
                        <th>ID do Cliente</th>
                        <th>Placa</th>
                        <th>Ano</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.map((p) => (
                        <tr key={p.IDVeiculo}>
                            <td>{p.IDVeiculo}</td>
                            <td>{p.codCliente}</td>
                            <td>{p.placa}</td>
                            <td>{p.ano}</td>
                            <td>
                                <Link href={`/${p.IDVeiculo}`}>
                                    <Editar className="inline text-3xl" />
                                </Link>
                                |
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(p.IDVeiculo);
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
                            Quantidade de carros: {carros.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}