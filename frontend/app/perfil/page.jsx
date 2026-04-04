// app/perfil/page.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdEdit, MdDelete, MdEmail, MdLocationOn, MdCalendarToday, MdLock, MdInfo } from "react-icons/md";
// ⬅️ NOVA IMPORTAÇÃO DO COMPONENTE DE BARRA LATERAL SECUNDÁRIA
import SecondarySidebar from "../../components/secondarySidebar";

// Visual tokens (Copiado de app/refeicoes/page.jsx)
const BRAND = {
    primary: "#448040",
    primaryDark: "#146151",
    accent: "#B4CF66",
    orange: "#FF5A34",
    neutralText: "#2f6b46",
    mutedText: "#6b6b6b",
};

// Dados mockados do usuário
const MOCK_USER = {
    name: "Fernanda Souza",
    email: "fernanda.souza@lentilha.com.br",
    location: "São Paulo, SP",
    memberSince: "Janeiro de 2024",
};

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
            <Icon size={24} className="text-purple-600" />
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
}

export default function PerfilPage() {
    return (
        <div className="min-h-screen p-6 bg-[#f3eef6] font-sans relative">

            {/* ⬅️ NOVO COMPONENTE: ASIDE LATERAL FIXO */}
            <SecondarySidebar />

            {/* CONTEÚDO PRINCIPAL DO PERFIL */}
            <div className="max-w-6xl mx-auto lg:ml-[360px]">
                <main>
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>Meu Perfil</h1>
                            <p className="text-sm mt-1 text-[#6b6b6b]">Gerencie suas informações e configurações da conta.</p>
                        </div>
                    </header>

                    {/* ESTRUTURA DE 3 COLUNAS LADO A LADO */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                        {/* 1. CARD AVATAR (Mudar foto) */}
                        <div className="flex flex-col items-center">
                            <div className="w-full p-6 bg-white rounded-2xl shadow-lg border border-[#f0e6ef] text-center">
                                <Image
                                    src="/avatar.png"
                                    alt={MOCK_USER.name}
                                    width={150}
                                    height={150}
                                    className="object-cover rounded-full mx-auto mb-4 border-4 border-gray-100 shadow-md"
                                />
                                <p className="text-lg font-bold">{MOCK_USER.name}</p>
                                <p className="text-sm text-gray-500">Usuário Lentilha</p>

                                <Link href="/perfil/editar" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:underline">
                                    <MdEdit size={18} />
                                    Mudar foto
                                </Link>
                            </div>
                        </div>

                        {/* 2. CARD INFORMAÇÕES BÁSICAS */}
                        <div className="space-y-6">
                            <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#f0e6ef] h-full">
                                <h2 className="text-xl font-bold mb-6" style={{ color: BRAND.primaryDark }}>Informações Básicas</h2>

                                <div className="space-y-4">
                                    <DetailItem icon={MdInfo} label="Nome Completo" value={MOCK_USER.name} />
                                    <DetailItem icon={MdEmail} label="Email" value={MOCK_USER.email} />
                                    <DetailItem icon={MdLocationOn} label="Localização" value={MOCK_USER.location} />
                                    <DetailItem icon={MdCalendarToday} label="Membro Desde" value={MOCK_USER.memberSince} />
                                </div>
                            </div>
                        </div>

                        {/* 3. CARD SEGURANÇA E AÇÕES */}
                        <div className="space-y-6">
                            <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#f0eef0] h-full">
                                <h2 className="text-xl font-bold mb-6" style={{ color: BRAND.primaryDark }}>Segurança e Ações</h2>

                                <div className="space-y-4">
                                    <Link href="/perfil/editar" className="flex items-center gap-4 p-3 bg-[#e8def8] rounded-lg hover:bg-[#dfd4e6] transition-colors font-medium text-gray-800">
                                        <MdLock size={24} className="text-purple-700" />
                                        <span>Alterar Senha</span>
                                    </Link>

                                    <Link href="/perfil/editar" className="flex items-center gap-4 p-3 bg-[#e8def8] rounded-lg hover:bg-[#dfd4e6] transition-colors font-medium text-gray-800">
                                        <MdEdit size={24} className="text-purple-700" />
                                        <span>Editar Perfil</span>
                                    </Link>

                                    <button className="w-full text-left flex items-center gap-4 p-3 bg-[#ffe8e8] rounded-lg hover:bg-[#ffdfdf] transition-colors font-medium text-red-600">
                                        <MdDelete size={24} className="text-red-600" />
                                        <span>Excluir Conta Permanentemente</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}