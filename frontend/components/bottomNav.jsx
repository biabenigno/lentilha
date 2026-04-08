// components/bottomNav.jsx
"use client";

import React from "react";
import Link from "next/link";
import { MdSearch, MdHome, MdAssessment, MdPerson } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const NavItem = ({ icon: Icon, href, label }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className="flex flex-col items-center justify-center flex-1 py-2">
        <div className={`p-1.5 rounded-full transition-colors ${isActive ? 'bg-[#2b6b4a] text-white' : 'text-gray-400'}`}>
          <Icon size={24} />
        </div>
        <span className={`text-[10px] mt-0.5 font-bold ${isActive ? 'text-[#2b6b4a]' : 'text-gray-400'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around z-[100] pb-safe px-2 h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <NavItem icon={MdHome} href="/" label="Início" />
      <NavItem icon={MdSearch} href="/pesquisa" label="Busca" />
      <NavItem icon={MdAssessment} href="/almoco" label="Impacto" />
      <NavItem icon={MdPerson} href="/perfil" label="Perfil" />
    </nav>
  );
}
