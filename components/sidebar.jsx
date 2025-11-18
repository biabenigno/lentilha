"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdSearch, MdHome, MdPerson, MdAssessment } from "react-icons/md";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon: Icon, label, href, isProfile }) => {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  const base = `flex items-center justify-center transition-all duration-200 ease-in-out`;
  const profileClasses = `w-12 h-12 rounded-xl bg-purple-100 text-purple-900 mb-6`;
  const navClasses = `w-16 h-10 rounded-full ${isActive ? 'bg-[#2b6b4a] text-white' : 'text-gray-500 hover:bg-gray-100'}`;

  if (isProfile) {
    return (
      <div className={`${base} ${profileClasses}`} aria-hidden>
        <Icon size={28} />
      </div>
    );
  }

  return (
    <Link href={href || "#"} className="flex flex-col items-center gap-1">
      <div className={`${base} ${navClasses}`}>
        <Icon size={22} />
      </div>
      {label && (
        <span className={`text-xs font-medium ${isActive ? 'text-[#2b6b4a]' : 'text-gray-500'}`}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-24 flex flex-col items-center pt-8 pb-6 border-r border-gray-100 bg-white fixed h-full z-10 left-0 top-0">
      <div className="mt-4 mb-8">
        <SidebarItem icon={MdPerson} isProfile={true} />
      </div>

      <nav className="flex flex-col items-center gap-6">
        <SidebarItem icon={MdSearch} label="Pesquisar" href="/pesquisa" />
        <SidebarItem icon={MdHome} label="Conhecer" href="/" />
        {/* ADICIONADO: botão Resumo que leva para /resumo */}
        <SidebarItem icon={MdAssessment} label="Resumo" href="/resumo" />
      </nav>
    </aside>
  );
}
