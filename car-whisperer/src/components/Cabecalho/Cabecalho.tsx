import Image from "next/image";
import imgLogo from "@/images/porto-seguro-logo.png"
import Menu from "../Menu/Menu";

export default function Cabecalho() {
    return(
        <header className="bg-gradient-to-t from-gray-700 to-gray-300 flex justify-between items-center p-5">
            <Image src={imgLogo} alt="logo" width={180} height={100}></Image>
            <Menu/>
        </header>
    )
}