// components/sidebar.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdSearch, MdHome, MdPerson, MdAssessment } from "react-icons/md";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SidebarItem = ({ icon: Icon, label, href, isProfile }) => {
  const pathname = usePathname();
  const isProfileActive = isProfile && href && pathname.startsWith(href);
  const isNavItemActive = href && pathname === href;
  const base = `flex items-center justify-center transition-all duration-200 ease-in-out`;
  const profileContainerClasses = `w-12 h-12 rounded-xl ${isProfileActive ? 'bg-[#2b6b4a] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`;
  const navClasses = `w-16 h-10 rounded-full ${isNavItemActive ? 'bg-[#2b6b4a] text-white' : 'text-gray-500 hover:bg-gray-100'}`;
  const navLabelClasses = `text-xs font-medium ${isNavItemActive ? 'text-[#2b6b4a]' : 'text-gray-500'}`;

  if (isProfile) {
    return (
      <Link href={href || "/perfil"} className={`mt-4 ${base}`} aria-label="Perfil">
        <div className={`${base} ${profileContainerClasses}`} aria-hidden>
          <Icon size={28} />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href || "#"} className="flex flex-col items-center gap-1">
      <div className={`${base} ${navClasses}`}>
        <Icon size={22} />
      </div>
      {label && <span className={navLabelClasses}>{label}</span>}
    </Link>
  );
};

const TestToggle = () => {
  const [mode, setMode] = useState("A");

  useEffect(() => {
    const saved = localStorage.getItem("lentilha-test-mode");
    if (saved) setMode(saved);
  }, []);

  const toggle = () => {
    const newMode = mode === "A" ? "B" : "A";
    setMode(newMode);
    localStorage.setItem("lentilha-test-mode", newMode);
    window.dispatchEvent(new CustomEvent('testModeChanged', { detail: newMode }));
  };

  return (
    <div className="mt-4 mb-8 px-3">
      <div className="bg-black/5 rounded-2xl p-3 border border-gray-50">
        <div className="text-[10px] font-black text-[#448040] uppercase tracking-widest mb-3 text-center transition-colors">
          Teste {mode}
        </div>
        
        <div 
          className="relative w-16 h-8 bg-white/80 rounded-full p-1 flex items-center cursor-pointer shadow-inner border border-gray-100 mx-auto"
          onClick={toggle}
        >
          {/* Sliding Indicator */}
          <motion.div 
            className="absolute h-6 w-[calc(50%-4px)] bg-[#448040] rounded-full shadow-md flex items-center justify-center text-white font-black text-[10px]"
            initial={false}
            animate={{ 
              x: mode === "A" ? 0 : "100%",
              backgroundColor: mode === "A" ? "#448040" : "#146151"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {mode}
          </motion.div>

          <div className="flex-1 text-center text-[10px] font-bold text-gray-300">A</div>
          <div className="flex-1 text-center text-[10px] font-bold text-gray-300">B</div>
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-24 flex flex-col items-center pt-8 pb-6 border-r border-gray-100 bg-white fixed h-full z-10 left-0 top-0">
      <SidebarItem icon={MdPerson} isProfile={true} href="/perfil" />
      <TestToggle />
      <nav className="flex flex-col items-center gap-6">
        <SidebarItem icon={MdHome} label="Conhecer" href="/" />
        <SidebarItem icon={MdSearch} label="Pesquisar" href="/pesquisa" />
        <SidebarItem icon={MdAssessment} label="Meu Impacto" href="/almoco" />
      </nav>
    </aside>
  );
}