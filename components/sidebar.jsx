"use client";

import React from 'react';
import { MdSearch, MdHome, MdPerson } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, href, isProfile }) => {
  const pathname = usePathname(); // Pega a rota atual
  const isActive = href === pathname; // Compara a rota do item com a rota atual

  const buttonBaseClasses = `
    flex items-center justify-center 
    transition-all duration-200 ease-in-out
  `;

  const profileButtonClasses = `
    w-12 h-12 rounded-xl bg-purple-100 text-purple-900 mb-6
  `;

  const navButtonClasses = `
    w-16 h-10 rounded-full 
    ${isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-500 hover:bg-gray-100'}
  `;

  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      {/* Botão para Ícone de Perfil */}
      {isProfile ? (
        <div className={`${buttonBaseClasses} ${profileButtonClasses}`}>
          <Icon size={28} />
        </div>
      ) : (
        // Botões de Navegação
        <Link href={href || "#"} className="flex flex-col items-center gap-1"> {/* Adicionado um wrapper para o Link */}
          <div className={`${buttonBaseClasses} ${navButtonClasses}`}>
            <Icon size={28} />
          </div>
          {label && (
            <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
              {label}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-24 flex flex-col items-center pt-8 pb-6 border-r border-gray-100 bg-white fixed h-full z-10 left-0 top-0">

      {/* Espaçamento entre o topo e o primeiro item */}
      <div className="mt-4 mb-8"> {/* Ajustei o espaçamento aqui para controlar melhor */}
        <SidebarItem icon={MdPerson} isProfile={true} />
      </div>

      <nav className="flex flex-col items-center gap-6">
        <SidebarItem icon={MdSearch} label="Pesquisar" href="/pesquisa" />
        <SidebarItem icon={MdHome} label="Conhecer" href="/" />
      </nav>
    </aside>
  );
}