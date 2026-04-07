"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";
import { searchFoods, addFoodToMeal } from '../../lib/api';
import { mapBackendFoodToUI } from '../../lib/foodMapper';

// Função utilitária mantida para compatibilidade se necessário, mas a busca agora é via backend
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const SearchResultItem = ({ nome, descricao, imagem, id, onAdd }) => {
  const safeNome = nome || 'item-indefinido';
  const safeId = id || '0';
  const safeHref = `/alimentos/${safeId}`;

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd(safeId, safeNome);
  };

  return (
    <div className="relative group">
      <Link
        href={safeHref}
        className="
          flex items-center justify-between 
          p-4 mx-2
          bg-white
          border border-gray-100
          shadow-sm
          rounded-2xl 
          cursor-pointer 
          hover:shadow-md
          hover:border-[#B4CF66]
          transition-all
          focus-within:border-[#448040]
          h-[110px]
          w-full
        "
      >
        <div className="flex items-center h-full gap-4">
          <div
            className="
              relative 
              w-[100px] h-[76px] 
              rounded-xl 
              overflow-hidden 
              bg-gray-50
              flex items-center justify-center 
              flex-shrink-0 
              border border-gray-50
            "
          >
            {imagem && imagem.length > 0 && imagem !== '/placeholder.png' ? (
              <Image
                src={imagem}
                alt={nome}
                fill
                className="object-cover"
                sizes="144px"
              />
            ) : (
              <div className="text-[#448040] opacity-50">
                <MdSearch size={32} />
              </div>
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0 justify-center text-left">
            <span className="text-[#146151] font-bold text-lg leading-tight mb-1">{nome}</span>
            <span className="text-[#6b6b6b] text-sm line-clamp-2 leading-relaxed pr-2">{descricao}</span>
          </div>
        </div>

        <button 
          onClick={handleAddClick}
          className="
            w-10 h-10 
            rounded-full 
            flex items-center justify-center 
            text-[#448040] bg-[#f0f9f3]
            text-2xl font-medium 
            hover:bg-[#448040] hover:text-white 
            transition-colors ml-4 shadow-sm shrink-0 z-10
          "
          title="Adicionar ao Almoço"
        >
          +
        </button>
      </Link>
    </div>
  );
};

export default function PesquisaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleAddFood = async (id, name) => {
    const result = await addFoodToMeal(id, name);
    if (result) {
      showToast(`${name} adicionado ao Almoço com sucesso!`);
    } else {
      showToast(`Erro ao adicionar ${name}.`);
    }
  };

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchFoods(term);
      // Mapeia os resultados do backend para o formato rico da UI
      const mappedResults = (data.items || []).map(item => mapBackendFoodToUI(item));
      setSearchResults(mappedResults);
      setHasSearched(true);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full pt-20 relative">
      
      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#146151] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#448040]/30"
          >
            <div className="w-6 h-6 rounded-full bg-[#B4CF66] flex items-center justify-center text-[#146151]">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </div>
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              w-full 
              py-4 
              pl-8 pr-16 
              text-gray-700 
              bg-white
              border border-gray-200
              rounded-full 
              outline-none 
              placeholder-gray-400
              transition-all
              focus:ring-2 focus:ring-[#B4CF66] focus:border-[#448040]
              shadow-sm hover:shadow
            "
          />

          <button
            onClick={handleSearch}
            className={`absolute right-6 transition-colors ${isLoading ? 'text-gray-300' : 'text-gray-400 hover:text-[#448040]'}`}
            disabled={isLoading}
            aria-label="Pesquisar alimento"
          >
            <MdSearch size={28} className={isLoading ? "animate-pulse" : ""} />
          </button>
        </div>
      </div>

      {/* --- RESULTADOS DA PESQUISA --- */}
      <div className="w-full max-w-5xl px-4 mt-8">
        {isLoading && (
          <p className="text-center text-[#448040] text-lg mt-10">
            Buscando alimentos...
          </p>
        )}

        {hasSearched && !isLoading && searchResults.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            Nenhum resultado encontrado para "{searchTerm}".
          </p>
        )}

        {/* O GRID QUE CONTÉM OS ITENS */}
        {!isLoading && searchResults.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-10">
            {searchResults.map((item) => (
              <SearchResultItem
                key={item.id}
                id={item.id}
                nome={item.nome}
                descricao={item.descricao}
                imagem={item.imagem}
                onAdd={handleAddFood}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- TEXTO DE RODAPÉ --- */}
      <div className="text-sm text-gray-500 mt-4 mb-10">
        <span>Não nos conhece ainda? </span>
        <Link href="/" className="text-[#448040] font-medium hover:underline">
          Clique aqui e entenda quem somos.
        </Link>
      </div>

    </div>
  );
}