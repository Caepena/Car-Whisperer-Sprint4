import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sinistros",
    description: "Página de manipulação de sinistros",
};

  
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return <div>{children}</div>;
}
