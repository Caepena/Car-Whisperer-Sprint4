import Integrante from "@/components/Integrante/Integrante";
import fotoMarcos from "@/images/Marcos.jpg"
import fotoDiego from "@/images/Diego.jpg"
import fotoCaetano from "@/images/Foto-Caetano.png"
import Link from "next/link";

export default function Integrantes() {
    return(
        <div className="flex flex-col items-center gap-8 mt-20 mb-40">
        <Link href="https://github.com/Caepena/Car-Whisperer-Sprint4" className="mr-24 mb-10 font-bold text-blue-600 underline hover:text-blue-800">Repositório do Projeto</Link>
        <Integrante
        nome="Marcos Bispo"
        rm="558054"
        turma="1TDSPZ"
        github="https://github.com/MarcosBisp"
        foto={fotoMarcos}/>
        <Integrante
        nome="Caetano Matos Penafiel"
        rm="557984"
        turma="1TDSPG"
        github="https://github.com/Caepena"
        foto={fotoCaetano}/>
        <Integrante
        nome="Diego Bassalo"
        rm="558710"
        turma="1TDSPG"
        github="https://github.com/DGMMX"
        foto={fotoDiego}/>
        </div>
    )
}