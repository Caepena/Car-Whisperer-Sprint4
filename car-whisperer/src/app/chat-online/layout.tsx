import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat Online",
    description: "Página do chat",
};

  
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return <div>{children}</div>;
}
