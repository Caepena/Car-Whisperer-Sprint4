import Link from "next/link";

export default function Menu() {
    return(
        <nav>
            <ul className="flex list-none p-7.5">
                <li className="ml-14 font-semibold"><Link href="/">Página Inicial</Link></li>
                <li className="ml-14 font-semibold"><Link href="/carros">Carros</Link></li>
                <li className="ml-14 font-semibold"><Link href="/clientes">Clientes</Link></li>
                <li className="ml-14 font-semibold"><Link href="/sinistros">Sinistros</Link></li>
                <li className="ml-14 font-semibold"><Link href="/pagamentos">Pagamentos</Link></li>
                <li className="ml-14 font-semibold"><Link href="/chat-online">Chat Online</Link></li>
            </ul>
        </nav>
    )
}