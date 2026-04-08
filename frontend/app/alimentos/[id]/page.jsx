"use client";

import React, { use, useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, PlusIcon, ArrowLeft } from "lucide-react";
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';

import Cards from "../../../components/ui/cards.jsx";
import { getFoodDetail, searchFoods } from '../../../lib/api';
import { mapBackendDetailToUI, mapBackendFoodToUI } from '../../../lib/foodMapper';

const getIconCircleColor = (level) => {
  const lowerLevel = (level || 'média').toLowerCase();
  switch (lowerLevel) {
    case 'baixa': return 'bg-[#448040]';
    case 'média': return 'bg-[#FFAE3C]';
    case 'alta': return 'bg-[#FF5A34]';
    default: return 'bg-gray-400';
  }
};

const AlimentoSearchResultItem = ({ nome, id, impactIcon, impactLevel, handleResultClick, className }) => {
  const safeHref = `/alimentos/${id}`;
  const circleColor = getIconCircleColor(impactLevel);

  return (
    <Link
      href={safeHref}
      onClick={handleResultClick}
      className={`flex items-start gap-4 p-3 border-b border-gray-50 transition-colors cursor-pointer hover:bg-[#f2f8f2] ${className || ''}`}
    >
      {impactIcon && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${circleColor}`}>
          <img src={impactIcon} alt="Impact Icon" className="w-5 h-5 object-contain" />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-gray-900 font-medium text-base truncate">{nome}</div>
      </div>
    </Link>
  );
};

const getImpactStyles = (level) => {
  const lowerLevel = (level || 'média').toLowerCase();
  switch (lowerLevel) {
    case 'baixa': return { colorClass: 'bg-[#448040]', text: 'Produto com pegada baixa' };
    case 'média': return { colorClass: 'bg-[#FFAE3C]', text: 'Produto com pegada média' };
    case 'alta': return { colorClass: 'bg-[#FF5A34]', text: 'Produto com pegada alta' };
    default: return { colorClass: 'bg-gray-500', text: 'Impacto Indefinido' };
  }
};

export default function AlimentoDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [alimento, setAlimento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Fetch food detail on load
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getFoodDetail(id);
        if (data) {
          const mapped = mapBackendDetailToUI(data);
          setAlimento(mapped);
        } else {
          setError("Alimento não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar dados do banco.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Clickaway listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const runAutocompleteSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const data = await searchFoods(term);
      const mapped = (data.items || []).map(item => mapBackendFoodToUI(item));
      setSearchResults(mapped);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleResultClick = () => {
    setSearchResults([]);
    setSearchTerm('');
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-[#448040] font-bold text-xl">Carregando dados reais do Lentilha...</div>;
  if (error || !alimento) return <div className="p-10 text-center text-red-600">❌ {error || "Erro desconhecido"}</div>;

  const impactStyles = getImpactStyles(alimento.impactLevel);
  const co2Styles = getImpactStyles(alimento.co2Card?.impactLevel);
  const aguaStyles = getImpactStyles(alimento.aguaCard?.impactLevel);
  const terraStyles = getImpactStyles(alimento.terraCard?.impactLevel);
  const alternativeList = alimento.alternativa || [];

  return (
    <div className="overflow-x-hidden min-h-screen">
      {/* BARRA DE PESQUISA SUPERIOR */}
      <div className="fixed top-[3rem] left-[6rem] w-[calc(100%-6rem)] bg-white py-4 px-4 lg:px-[10%] flex items-center justify-between border-b border-gray-200 z-50">
        <Link href="/pesquisa" className="flex items-center gap-2 text-gray-700 hover:text-[#448040] transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Nova pesquisa...</span>
        </Link>

        <div ref={searchRef} className="hidden md:flex relative items-center w-1/3 max-w-sm">
          <input
            type="text"
            placeholder="Pesquise outro alimento..."
            value={searchTerm}
            onChange={(e) => runAutocompleteSearch(e.target.value)}
            className={`w-full py-2 pl-4 pr-10 text-gray-700 bg-white border border-gray-200 rounded-full outline-none placeholder-gray-500 hover:bg-gray-50 transition-all text-sm z-50 relative ${searchResults.length > 0 ? 'focus:bg-white rounded-b-none' : 'focus:bg-white'}`}
          />
          <button className="absolute right-3 text-gray-600 hover:text-[#448040] transition-colors z-50">
            <MdSearch size={20} />
          </button>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg z-40 max-h-80 overflow-y-auto py-2">
              <div className="flex flex-col">
                {searchResults.slice(0, 7).map((item) => (
                  <AlimentoSearchResultItem
                    key={item.id}
                    nome={item.nome}
                    id={item.id}
                    impactIcon={item.impactIcon}
                    impactLevel={item.impactLevel}
                    handleResultClick={handleResultClick}
                    className="px-4 py-2 text-gray-800"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-1/3 hidden md:block"></div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="mt-18 bg-white lg:pl-[10%] lg:pr-[10%] px-4 py-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between w-full">
          <div className="flex flex-col w-full md:w-[40%]">
            <div className="flex flex-col items-start md:flex-row md:items-center md:gap-8 gap-3">
              <h1 className="font-light text-4xl text-left">{alimento.title}</h1>
              <div className="flex gap-2">
                <img src={alimento.co2Icon} className="w-6 h-6" alt="co2" />
                <img src={alimento.aguaIcon} className="w-6 h-6" alt="agua" />
                <img src={alimento.terraIcon} className="w-6 h-6" alt="terra" />
              </div>
            </div>
            <p className="text-sm font-medium text-left mt-2 text-gray-600">{alimento.descricao}</p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-end gap-3 w-full md:w-[60%]">
            <div className={`h-10 px-4 flex items-center gap-2 rounded-full text-white font-medium text-sm ${impactStyles.colorClass} flex-shrink-0 text-center whitespace-nowrap`}>
              <img src={alimento.impactIcon} className="w-6 h-6" alt="pegada" />
              {impactStyles.text}
            </div>
            <div className="flex gap-1">
              <Button className="pl-8 pr-8 rounded-r-[3px] focus:bg-[#f2f8f2] hover:bg-[#f2f8f2]" variant="pattern">
                <PlusIcon className="h-8 w-8" /> Adicionar à refeição
              </Button>
              <Button className="pl-8 pr-8 rounded-l-[3px] rounded-r-lg focus:bg-[#f2f8f2] hover:bg-[#f2f8f2]" variant="pattern">
                <ChevronDown className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-[200px] overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
              {alimento.imagem && alimento.imagem !== '/placeholder.png' ? (
                <Image src={alimento.imagem} alt={alimento.title} fill className="object-cover" sizes="300px" />
              ) : (
                <div className="text-[#448040] opacity-30"><MdSearch size={64} /></div>
              )}
            </div>

            {alternativeList.length > 0 && (
              <Cards title="Recomendações" noHeader={true} className="flex-grow min-h-[250px]">
                <div className="flex flex-col gap-4 mt-2">
                  {alternativeList.map((alt, index) => (
                    <div key={index} className="border border-green-50 rounded-lg p-4 bg-[#f2f8f2] shadow-sm">
                      <p className="font-semibold text-[#146151] mb-2">{alt.title}</p>
                      <p className="text-gray-700 text-sm">{alt.description}</p>
                    </div>
                  ))}
                </div>
              </Cards>
            )}
          </div>

          {[alimento.co2Card, alimento.aguaCard, alimento.terraCard].map((card, idx) => (
            card && (
              <Cards 
                key={idx}
                title={card.title}
                headerColor={getImpactStyles(card.impactLevel).colorClass}
                iconSrc={card.iconSrc}
                mainValue={card.mainValue}
                mainDescription={card.mainDescription}
                className="min-h-[400px]"
              >
                <div className="flex flex-col gap-2">
                  {card.details.map((detail, index) => (
                    <div key={index} className="border p-4 rounded-md bg-white">
                      <p className="font-medium mb-2 text-base text-gray-800">{detail.subtitle}</p>
                      <p className="text-sm text-gray-600">{detail.text}</p>
                    </div>
                  ))}
                </div>
              </Cards>
            )
          ))}
        </div>
      </div>
    </div>
  );
}