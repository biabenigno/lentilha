// app/pesquisa/page.jsx

"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";

// Importação sem a extensão '.js' (melhor compatibilidade)
import { MOCK_DATA } from '../../data/mock';


const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// O componente SearchResultItem é mantido aqui
const SearchResultItem = ({ nome, descricao, imagem, id }) => {

  // TRATAMENTO DE ERRO: Garante que nome e id sejam strings ou fallbacks
  const safeNome = nome || 'item-indefinido';
  const safeId = id || '0';

  // ⚠️ CORREÇÃO DE ROTAS (404): Removemos o slug (safeNome.toLowerCase()...)
  // para que a rota corresponda a app/alimentos/[id]/page.jsx
  const safeHref = safeNome !== 'item-indefinido'
    ? `/alimentos/${safeId}` // ⬅️ Apenas o ID é usado aqui
    : '#';

  return (
    <Link
      href={safeHref}
      className="
        flex items-center justify-between 
        p-3.5 mx-2 
        bg-[#ece0f0] 
        rounded-xl 
        cursor-pointer 
        hover:bg-[#f3e9f8] 
        transition-colors
        border border-transparent 
        focus-within:border-purple-500
        h-[100px]
      "
    >
      <div className="flex items-center h-full">

        {/* Imagem/Ícone do Alimento: Largura e altura padronizadas */}
        <div
          className="
            relative 
            w-36 h-20 
            rounded-lg 
            overflow-hidden 
            mr-4 
            bg-[#d8c3e8]
            flex items-center justify-center 
            flex-shrink-0 
          "
        >
          {imagem && imagem.length > 0 ? (
            <Image
              src={imagem}
              alt={nome}
              fill
              className="object-cover"
              sizes="144px"
            />
          ) : (
            <div className="text-purple-900 opacity-50">
              <MdSearch size={32} />
            </div>
          )}
        </div>

        {/* Nome e descricao */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-gray-900 font-semibold text-lg">{nome}</span>
          <span className="text-gray-500 text-sm">Descrição: {descricao}</span>
        </div>
      </div>

      {/* Seta de navegação */}
      <div className="text-gray-500 text-3xl font-light">
        &rsaquo;
      </div>
    </Link>
  );
};


export default function PesquisaPage() {
  // 1. GERAÇÃO DA LISTA DE RESULTADOS A PARTIR DA BASE MESTRA
  const ALL_MOCK_RESULTS = useMemo(() => {
    const data = MOCK_DATA || {};

    return Object.entries(data).map(([id, item]) => {
      const nome = item.nome || item.title;
      const descricao = item.descricao;

      return {
        id: parseInt(id),
        nome: nome || '',
        descricao,
        imagem: item.imagem,
        // Adiciona um campo de busca normalizado para comparação
        searchableText: removeAccents(`${nome} ${descricao}`).toLowerCase(),
      };
    });
  }, []);

  // 2. Estados para o termo de pesquisa e os resultados
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // 3. Lógica da simulação de pesquisa
  const handleSearch = () => {
    const normalizedTerm = removeAccents(searchTerm.trim()).toLowerCase();

    if (!normalizedTerm) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Filtra a lista completa (ALL_MOCK_RESULTS) para simular a busca
    const results = ALL_MOCK_RESULTS.filter(item =>
      item.searchableText.includes(normalizedTerm)
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full pt-20">

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
              bg-[#ece0f0] 
              rounded-full 
              outline-none 
              placeholder-gray-500
              transition-all
              focus:ring-2 focus:ring-purple-300 focus:bg-white
              shadow-sm
            "
          />

          <button
            onClick={handleSearch}
            className="absolute right-6 text-gray-600 hover:text-purple-700 transition-colors"
            aria-label="Pesquisar alimento"
          >
            <MdSearch size={24} />
          </button>
        </div>
      </div>

      {/* --- RESULTADOS DA PESQUISA --- */}
      <div className="w-full max-w-5xl px-4 mt-8">
        {hasSearched && searchResults.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            Nenhum resultado encontrado para "{searchTerm}".
          </p>
        )}

        {/* O GRID QUE CONTÉM OS ITENS */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((item) => (
              <SearchResultItem
                key={item.id}
                nome={item.nome}
                descricao={item.descricao}
                id={item.id}
                imagem={item.imagem}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- TEXTO DE RODAPÉ --- */}
      <div className="text-sm text-gray-500 mt-12 mb-10">
        <span>Não nos conhece ainda? </span>
        <Link href="/" className="text-[#448040] font-medium hover:underline">
          Clique aqui e entenda quem somos.
        </Link>
      </div>

    </div>
  );
}