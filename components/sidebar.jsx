// components/sidebar.jsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdSearch, MdHome, MdPerson, MdAssessment } from "react-icons/md";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon: Icon, label, href, isProfile }) => {
  const pathname = usePathname();

  // ⬅️ LÓGICA DE ESTADO ATIVO DO PERFIL: Ativo se o path começar com o href do perfil.
  const isProfileActive = isProfile && href && pathname.startsWith(href);

  // Lógica de estado ativo para itens normais (requer match exato)
  const isNavItemActive = href && pathname === href;

  const base = `flex items-center justify-center transition-all duration-200 ease-in-out`;

  // ⬅️ TARGET 1 & 2: CLASSES DINÂMICAS PARA O PERFIL (Verde quando ativo, neutro quando inativo)
  const profileContainerClasses = `w-12 h-12 rounded-xl ${isProfileActive ? 'bg-[#2b6b4a] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`;

  // Classes para itens de navegação regulares
  const navClasses = `w-16 h-10 rounded-full ${isNavItemActive ? 'bg-[#2b6b4a] text-white' : 'text-gray-500 hover:bg-gray-100'}`;

  const navLabelClasses = `text-xs font-medium ${isNavItemActive ? 'text-[#2b6b4a]' : 'text-gray-500'}`;


  if (isProfile) {
    // ⬅️ CORREÇÃO: Envolve a div do perfil em um Link, usando o href fornecido.
    return (
      <Link href={href || "/perfil"} className={`mt-4 mb-8 ${base}`} aria-label="Perfil">
        <div className={`${base} ${profileContainerClasses}`} aria-hidden>
          <Icon size={28} />
        </div>
      </Link>
    );
  }

  // Lógica para itens de navegação regulares
  return (
    <Link href={href || "#"} className="flex flex-col items-center gap-1">
      <div className={`${base} ${navClasses}`}>
        <Icon size={22} />
      </div>
      {label && (
        <span className={navLabelClasses}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-24 flex flex-col items-center pt-8 pb-6 border-r border-gray-100 bg-white fixed h-full z-10 left-0 top-0">

      {/* ⬅️ ÍCONE DE PERFIL: Agora é um Link dinâmico */}
      <SidebarItem icon={MdPerson} isProfile={true} href="/perfil" />

      <nav className="flex flex-col items-center gap-6">

        <SidebarItem icon={MdHome} label="Conhecer" href="/" />
        <SidebarItem icon={MdSearch} label="Pesquisar" href="/pesquisa" />
        <SidebarItem icon={MdAssessment} label="Meu Impacto" href="/resumo" />
      </nav>
    </aside>
  );
}