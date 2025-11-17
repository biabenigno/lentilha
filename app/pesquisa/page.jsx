import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";

export default function PesquisaPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">

      {/* --- LOGO --- */}
      <Link
        href="/"
        className="relative w-[550px] h-[128px] cursor-pointer mb-8"
      >
        <Image
          src="/logo-lentilha.png"
          alt="Logo Lentilha"
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* --- BARRA DE PESQUISA --- */}
      <div className="w-full max-w-5xl px-4">
        <div className="relative flex items-center group">
          <input
            type="text"
            placeholder="Insira aqui o nome do alimento..."
            className="
              w-full 
              py-4 
              pl-8 pr-16 
              text-gray-700 
              bg-[#ece0f0] 
              rounded-full 
              outline-none 
              placeholder-gray-500
              transition-all
              focus:ring-2 focus:ring-purple-300 focus:bg-white
              shadow-sm
            "
          />

          <button className="absolute right-6 text-gray-600 hover:text-purple-700 transition-colors">
            <MdSearch size={24} />
          </button>
        </div>
      </div>

      {/* --- TEXTO DE RODAPÉ --- */}
      <div className="text-sm text-gray-500 mt-3">
        <span>Não nos conhece ainda? </span>
        <Link href="/" className="text-[#448040] font-medium hover:underline">
          Clique aqui e entenda quem somos.
        </Link>
      </div>

    </div>
  );
}