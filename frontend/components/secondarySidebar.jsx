// components/SecondarySidebar.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Para determinar a rota ativa

// Visual tokens (Copiado dos arquivos de página)
const BRAND = {
    primary: "#448040",
    primaryDark: "#146151",
    accent: "#B4CF66",
    orange: "#FF5A34",
    neutralText: "#2f6b46",
    mutedText: "#6b6b6b",
};

// Componente auxiliar para navegação (Substitui SectionButton)
function NavButton({ href, label, currentPath }) {
    const isActive = href === currentPath;

    const base = "w-full h-10 rounded-full px-4 flex items-center gap-3 text-sm transition-shadow";
    const classes = isActive ? "bg-[#2b6b4a] text-white shadow" : "bg-white/80 text-[#4b6a54] hover:shadow-md";

    return (
        <Link href={href} className={`${base} ${classes}`}>
            <span>{label}</span>
        </Link>
    );
}

export default function SecondarySidebar() {
    const pathname = usePathname();

    return (
        // ASIDE LATERAL FIXO (MENU DE NAVEGAÇÃO SECUNDÁRIO)
        <aside
            className="hidden lg:block fixed left-38 top-26 w-[240px] z-40"
            aria-label="menu lateral secundário"
        >
            <div className="flex flex-col items-start gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow">
                        {/* Assumindo que /avatar.png está disponível publicamente */}
                        <Image src="/avatar.png" alt="avatar" width={72} height={72} className="object-cover rounded-full" />
                    </div>
                    <div>
                        <p className="text-xs text-[#6b6b6b]">Seja bem-vinda,</p>
                        <p className="text-lg font-semibold" style={{ color: BRAND.primary }}>Fernanda</p>
                    </div>
                </div>

                <nav className="w-full space-y-3 flex flex-col items-start">
                    {/* Usando o Pathname para determinar qual botão está ativo */}
                    <NavButton href="/perfil" label="Perfil" currentPath={pathname} />
                    <NavButton href="/resumo" label="Meu Impacto" currentPath={pathname} />
                    <NavButton href="/refeicoes" label="Refeições" currentPath={pathname} />
                    <NavButton href="/configuracoes" label="Configurações" currentPath={pathname} />
                    <NavButton href="/sair" label="Sair" currentPath={pathname} />
                </nav>
            </div>
        </aside>
    );
}