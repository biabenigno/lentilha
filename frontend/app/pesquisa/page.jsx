"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { searchFoods, addFoodToMeal } from '../../lib/api';
import { mapBackendFoodToUI } from '../../lib/foodMapper';

// Função utilitária mantida para compatibilidade se necessário, mas a busca agora é via backend
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const SearchResultItem = ({ nome, descricao, imagem, id, onAdd }) => {
  const safeNome = nome || 'item-indefinido';
  const safeId = id || '0';

  const handleAddClick = (e) => {
    e.preventDefault();
    onAdd(safeId, safeNome);
  };

  // Extrai o método de preparo principal da descrição longa
  const getPrepInfo = (text = "") => {
    const t = text.toLowerCase();
    const mapping = {
      "cozida": { label: "COZIDA", color: "bg-blue-500" },
      "cozido": { label: "COZIDO", color: "bg-blue-500" },
      "ensopada": { label: "ENSOPADA", color: "bg-sky-600" },
      "ensopado": { label: "ENSOPADO", color: "bg-sky-600" },
      "assada": { label: "ASSADA", color: "bg-orange-500" },
      "assado": { label: "ASSADO", color: "bg-orange-500" },
      "grelhada": { label: "GRELHADA", color: "bg-amber-600" },
      "grelhado": { label: "GRELHADO", color: "bg-amber-600" },
      "frita": { label: "FRITA", color: "bg-red-500" },
      "frito": { label: "FRITO", color: "bg-red-500" },
      "empanada": { label: "EMPANADA", color: "bg-yellow-600" },
      "empanado": { label: "EMPANADO", color: "bg-yellow-600" },
      "refogada": { label: "REFOGADA", color: "bg-teal-500" },
      "refogado": { label: "REFOGADO", color: "bg-teal-500" },
      "crua": { label: "CRUA", color: "bg-green-500" },
      "cru": { label: "CRU", color: "bg-green-500" },
      "conserva": { label: "CONSERVA", color: "bg-purple-500" }
    };

    for (const [key, info] of Object.entries(mapping)) {
      if (t.includes(key)) return info;
    }
    return { label: "TRADICIONAL", color: "bg-[#448040]" };
  };

  const { label: prepLabel, color: prepColor } = getPrepInfo(descricao);

  return (
    <div className="relative group">
      <div
        onClick={handleAddClick}
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
          h-[110px]
          w-full
        "
      >
        <div className="flex items-center h-full gap-4 overflow-hidden">
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
            <span className="text-[#146151] font-extrabold text-lg leading-tight truncate">{nome}</span>
            <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
               <span className={`shrink-0 text-[9px] font-black ${prepColor} text-white px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm`}>
                 {prepLabel}
               </span>
               <span className="text-[#6b6b6b] text-xs truncate font-medium opacity-60 italic">{descricao}</span>
            </div>
          </div>
        </div>

        <div
          className="
            w-10 h-10 
            rounded-full 
            flex items-center justify-center 
            text-[#448040] bg-[#f0f9f3]
            text-2xl font-medium 
            group-hover:bg-[#448040] group-hover:text-white 
            transition-colors ml-4 shadow-sm shrink-0 z-10
          "
        >
          +
        </div>
      </div>
    </div>
  );
};

export default function PesquisaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 8;

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

  const handleSearch = async (overrideTerm = null, page = 1) => {
    const termToUse = typeof overrideTerm === 'string' ? overrideTerm : searchTerm;
    const term = termToUse.trim();
    
    if (typeof overrideTerm === 'string') {
      setSearchTerm(overrideTerm);
      setIsTyping(false);
    } else {
      setIsTyping(false);
    }
    
    setShowSuggestions(false);
    
    if (!term) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setCurrentPage(page);
    try {
      const data = await searchFoods(term, page, PER_PAGE);
      const mappedResults = (data.items || []).map(item => mapBackendFoodToUI(item));
      setSearchResults(mappedResults);
      setTotalPages(data.total_pages || 1);
      setHasSearched(true);
      
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const term = searchTerm.trim();
      if (term) {
        try {
          const data = await searchFoods(term, 1, 15); // More suggestions to filter from
          const mappedResults = (data.items || []).map(item => mapBackendFoodToUI(item));
          
          // Filter to ensure unique names in suggestions
          const uniqueNames = new Set();
          const filtered = [];
          for (const item of mappedResults) {
            if (!uniqueNames.has(item.nome)) {
              filtered.push(item);
              uniqueNames.add(item.nome);
            }
          }
          
          setSuggestions(filtered.slice(0, 8)); // Show top 8 unique
          if (filtered.length > 0 && isTyping) {
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Erro ao carregar sugestões:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsTyping(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0 && searchTerm.trim() !== '') {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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
            onClick={() => handleSearch()}
            className={`absolute right-6 transition-colors ${isLoading ? 'text-gray-300' : 'text-gray-400 hover:text-[#448040]'}`}
            disabled={isLoading}
            aria-label="Pesquisar alimento"
          >
            <MdSearch size={28} className={isLoading ? "animate-pulse" : ""} />
          </button>

          {/* AUTOCOMPLETE DROPDOWN */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50 flex flex-col max-h-[300px] overflow-y-auto"
              >
                {suggestions.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleSearch(item.nome)}
                    className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <MdSearch className="text-gray-400 mr-3" size={20} />
                    <span className="text-[#146151] font-medium">{item.nome}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- RESULTADOS DA PESQUISA --- */}
      <div className="w-full max-w-5xl px-4 mt-8">
        {isLoading && (
          <p className="text-center text-[#448040] text-lg mt-10">
            Buscando alimentos...
          </p>
        )}
      </div>

      {/* --- SEARCH RESULTS --- */}
      <div className="w-full max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* PAGINATION CONTROLS */}
        {hasSearched && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 pb-10">
            <button
              onClick={() => handleSearch(searchTerm, currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-6 py-2 rounded-full border border-gray-200 text-[#448040] font-bold hover:bg-[#f0f9f3] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              Anterior
            </button>
            <span className="text-gray-500 font-medium tracking-widest text-sm">
              PAGINA <span className="text-[#448040] font-black">{currentPage}</span> DE {totalPages}
            </span>
            <button
              onClick={() => handleSearch(searchTerm, currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-6 py-2 rounded-full bg-[#448040] text-white font-bold hover:bg-[#326030] disabled:opacity-30 disabled:hover:bg-[#448040] transition-colors shadow-md"
            >
              Próximo
            </button>
          </div>
        )}

        {hasSearched && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum alimento encontrado para "{searchTerm}".</p>
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