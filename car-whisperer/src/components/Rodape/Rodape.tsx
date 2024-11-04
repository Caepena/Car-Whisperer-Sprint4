import Link from "next/link";

export default function Rodape() {
    return(
        <footer className="fixed bottom-0 left-0 flex gap-10 list-none bg-blue-500 items-center justify-center h-[12vh] w-full">
            <nav>
                <ul className="flex list-none p-7.5">
                    <li className="ml-20"><Link href={"https://api.whatsapp.com/send?1=pt_BR&phone=551130039303&text=Oi,%20Porto%20Seguro%20!"}>WhatsApp</Link></li>
                    <li className="ml-20"><Link href={"https://www.portoseguro.com.br/fale-conosco/contatos/enderecos"}>Endereços</Link></li>
                    <li className="ml-20"><Link href={"https://www.portoseguro.com.br/institucional/a-porto-seguro/historia"}>Nossa História</Link></li>
                    <li className="ml-20"><Link href={"https://www.portoseguro.com.br/sustentabilidade"}>Sustentabilidade</Link></li>
                    <li className="ml-20"><Link href={"https://www.portoseguro.com.br/oxigenio-aceleradora"}>Oxigênio Aceleradora</Link></li>
                    <li className="ml-20"><Link href="/integrantes">Página dos Integrantes</Link></li>
                </ul>
            </nav>
        </footer>
    )
}