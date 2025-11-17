import React from "react";
import { Roboto } from "next/font/google"; 
import "./globals.css";
import Sidebar from "../components/sidebar";
import TopBar from "../components/topbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Escolhi os pesos mais comuns
  variable: "--font-roboto", // Opcional: cria uma variável CSS se precisar
});

export const metadata = {
  title: "Lentilha",
  description: "App de pesquisa e gerenciamento do impacto ambiental dos alimentos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      {/* 1. 'overflow-hidden' no body impede que a janela do navegador tenha barra de rolagem dupla */}
      <body className={`${roboto.className} antialiased flex h-screen bg-white overflow-hidden`}>
        
        <Sidebar />

        {/* 2. O 'main' ocupa a altura total da tela (h-screen) */}
        <main className="flex-1 flex flex-col ml-24 h-screen">
          
          <TopBar />
          
          {/* 3. AQUI ESTÁ O SEGREDO: 
              - flex-1: Ocupa todo o espaço abaixo da TopBar.
              - overflow-y-auto: A barra de rolagem aparece SÓ AQUI se o conteúdo for grande.
          */}
          <div className="flex-1 p-8 overflow-y-auto bg-white">
            {children}
          </div>

        </main>

      </body>
    </html>
  );
}