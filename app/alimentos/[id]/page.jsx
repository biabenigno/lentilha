// app/alimentos/[id]/page.js

"use client";

import React, { use, useState, useMemo, useRef, useEffect } from 'react'; // ⬅️ Adicionado useRef e useEffect
import { Button } from "@/components/ui/button";
import { ChevronDown, PlusIcon, ArrowLeft } from "lucide-react";
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';

// Caminhos ajustados para 3 pontos (assumindo components e data estão na raiz)
import Cards from "../../../components/ui/cards.jsx";
import { MOCK_DATA } from '../../../data/mock.js';


// 💡 Função utilitária copiada de app/pesquisa/page.jsx
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// 💡 Nova função para determinar a cor de fundo do círculo do ícone
const getIconCircleColor = (level) => {
  const lowerLevel = (level || 'média').toLowerCase();
  switch (lowerLevel) {
    case 'baixa':
      return 'bg-[#448040]'; // Verde (Low Impact)
    case 'média':
      return 'bg-[#FFAE3C]'; // Laranja (Medium Impact)
    case 'alta':
      return 'bg-[#FF5A34]'; // Vermelho (High Impact)
    default:
      return 'bg-gray-400';
  }
};

// 💡 Componente de item de resultado adaptado para dropdown (Visual Google/Lentilha)
const AlimentoSearchResultItem = ({ nome, descricao, id, impactIcon, impactLevel, handleResultClick, className }) => {
  const safeHref = nome ? `/alimentos/${id}` : '#';
  const circleColor = getIconCircleColor(impactLevel);

  return (
    <Link
      href={safeHref}
      onClick={handleResultClick}
      className={`
        flex items-start gap-3 
        p-2 
        border-b 
        border-gray-100
        transition-colors
        cursor-pointer
        hover:bg-[#f3e9f8] // Hover roxinho
        ${className || ''} 
      `}
    >

      {/* Símbolo do impacto em círculo */}
      {impactIcon && (
        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center 
              mt-0.5
              flex-shrink-0
              ${circleColor} // Cor do impacto
          `}>
          {/* Note: Usando <img> para ícones SVG */}
          <img src={impactIcon} alt="Impact Icon" className="w-5 h-5 object-contain" />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        {/* Título: Preto (text-gray-900) */}
        <div className="text-gray-900 font-medium text-base truncate">
          {nome}
        </div>
        {/* Descrição */}
        <div className="text-gray-600 text-sm truncate">
          {descricao}
        </div>
      </div>
    </Link>
  );
};


// FUNÇÃO CENTRAL PARA DEFINIR CORES E TEXTO
const getImpactStyles = (level) => {
  // ... (restante da função getImpactStyles permanece inalterado)
  const lowerLevel = (level || 'média').toLowerCase();

  switch (lowerLevel) {
    case 'baixa':
      // Verde (Baixa)
      return {
        colorClass: 'bg-[#448040]',
        text: 'Produto com pegada baixa',
      };
    case 'média':
      // Laranja (Média)
      return {
        colorClass: 'bg-[#FFAE3C]', // Cor do protótipo
        text: 'Produto com pegada média',
      };
    case 'alta':
      // Vermelho (Alta)
      return {
        colorClass: 'bg-[#FF5A34]', // Cor do protótipo
        text: 'Produto com pegada alta',
      };
    default:
      return {
        colorClass: 'bg-gray-500',
        text: 'Impacto Indefinido',
      };
  }
};


export default function AlimentoDetailPage({ params }) {

  // CORREÇÃO DO AVISO: Usa React.use() para resolver a promessa params
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const alimento = MOCK_DATA[id];

  // ⬅️ Referência para o container de busca
  const searchRef = useRef(null);

  if (!alimento) {
    return <div className="p-10 text-center text-red-600">❌ Alimento com ID "{id}" não encontrado no Mock.</div>;
  }

  // --- LÓGICA DE PESQUISA AUTOSSUGESTÃO ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Implementação do Clickaway Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o clique não foi dentro da área de busca E o dropdown está aberto
      if (searchRef.current && !searchRef.current.contains(event.target) && searchResults.length > 0) {
        handleResultClick();
      }
    };

    // Adiciona o listener ao documento
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: remove o listener ao desmontar o componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResults.length]); // Depende do estado de resultados (só precisa do listener se houver resultados)


  // Base de dados memoizada para busca (AGORA COM DADOS DE IMPACTO)
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
        impactLevel: item.impactLevel,
        impactIcon: item.impactIcon,
        searchableText: removeAccents(`${nome} ${descricao}`).toLowerCase(),
      };
    });
  }, []);

  // Função que dispara a busca no onChange (autocompletar)
  const runAutocompleteSearch = (term) => {
    const normalizedTerm = removeAccents(term.trim()).toLowerCase();
    setSearchTerm(term);

    if (!normalizedTerm) {
      setSearchResults([]);
      return;
    }

    // Filtra no momento da digitação
    const results = ALL_MOCK_RESULTS.filter(item =>
      item.searchableText.includes(normalizedTerm)
    );

    setSearchResults(results);
  };

  // Função para limpar a busca e fechar o dropdown (usada no clique, ESC ou clickaway)
  const handleResultClick = () => {
    setSearchResults([]);
    setSearchTerm('');
  };
  // --------------------------

  // OBTENDO ESTILOS DINÂMICOS PARA RÓTULO GERAL E CARDS
  const impactStyles = getImpactStyles(alimento.impactLevel);
  // Garante que os objetos card existam antes de acessar impactLevel (com fallback)
  const co2Styles = getImpactStyles(alimento.co2Card?.impactLevel || 'média');
  const aguaStyles = getImpactStyles(alimento.aguaCard?.impactLevel || 'média');
  const terraStyles = getImpactStyles(alimento.terraCard?.impactLevel || 'média');

  // 💡 Lógica para normalizar a propriedade 'alternativa' (singular) para que seja sempre um array.
  const alternativeData = alimento.alternativa;
  const alternativeList = Array.isArray(alternativeData)
    ? alternativeData
    : (alternativeData ? [alternativeData] : []);

  return (
    <div className="overflow-x-hidden min-h-screen">

      {/* -------------------- BARRA DE PESQUISA SUPERIOR (FIXA) -------------------- */}
      <div className="
        fixed 
        top-[3rem] 
        left-[6rem] 
        w-[calc(100%-6rem)] 
        bg-white 
        py-4 
        px-4 
        lg:px-[10%] 
        flex 
        items-center 
        justify-between 
        border-b 
        border-gray-200
        z-50 
      ">

        {/* BOTÃO VOLTAR / NOVA PESQUISA */}
        <Link href="/pesquisa" className="flex items-center gap-2 text-gray-700 hover:text-purple-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Nova pesquisa...</span>
        </Link>

        {/* BARRA DE PESQUISA (Autocomplete com Dropdown) */}
        {/* ⬅️ Aplicando o useRef aqui */}
        <div ref={searchRef} className="hidden md:flex relative items-center w-1/3 max-w-sm">
          <input
            type="text"
            placeholder="Insira aqui o nome do alimento..."
            value={searchTerm}
            onChange={(e) => runAutocompleteSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                handleResultClick(); // Fecha o dropdown no ESC ou ENTER
              }
            }}
            // ⬅️ Adaptação de classes para visual consistente com o dropdown
            className={`
              w-full 
              py-2 
              pl-4 pr-10 
              text-gray-700 
              bg-[#ece0f0] 
              rounded-full 
              outline-none 
              placeholder-gray-500
              hover:bg-[#DFD4E6]   
              transition-all
              text-sm
              z-50 relative
              ${searchResults.length > 0 ? 'focus:bg-white rounded-b-none' : 'focus:bg-white'} // Ajusta o border-radius no topo para encaixar o dropdown
            `}
          />
          <button
            onClick={handleResultClick}
            className="absolute right-3 text-gray-600 hover:text-purple-700 transition-colors z-50"
            aria-label="Limpar pesquisa"
          >
            <MdSearch size={20} />
          </button>

          {/* 💡 DROPDOWN DE SUGESTÕES */}
          {searchResults.length > 0 && searchTerm.length > 0 && (
            <div className="
              absolute 
              top-full
              left-0 
              w-full 
              bg-white 
              border 
              border-[#DFD4E6] // ⬅️ Cor do border roxinho
              rounded-b-lg // ⬅️ Borda inferior arredondada
              shadow-lg 
              z-40 
              max-h-80 
              overflow-y-auto 
              py-2
            ">
              <div className="flex flex-col">
                {searchResults.slice(0, 7).map((item) => (
                  <AlimentoSearchResultItem
                    key={item.id}
                    nome={item.nome}
                    descricao={item.descricao}
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

        {/* Espaçador */}
        <div className="w-1/3 hidden md:block"></div>
      </div>


      {/* -------------------- CONTEÚDO PRINCIPAL (SCROLLÁVEL) -------------------- */}
      <div
        className="
          mt-18
          bg-white 
          lg:pl-[10%] 
          lg:pr-[10%] 
          px-4
          py-4 // Espaço reduzido
        "
      >

        {/* HEADER DE INFORMAÇÕES DO ALIMENTO (Título, Descrição, Ícones, Botões) */}
        <div className="
            mb-12
            flex 
            flex-col 
            gap-6
            md:flex-row 
            md:items-center  
            md:justify-between
          "
        >
          <div className="flex flex-col">
            <div className="flex flex-col items-start md:flex-row md:items-center md:gap-8 gap-3">
              <h1 className="font-light text-4xl text-left">
                {alimento.title}
              </h1>

              <div className="flex gap-2">
                <img src={alimento.co2Icon} className="w-6 h-6" alt="co2 label" />
                <img src={alimento.aguaIcon} className="w-6 h-6" alt="agua label" />
                <img src={alimento.terraIcon} className="w-6 h-6" alt="terra label" />
              </div>
            </div>

            <p className="text-sm font-medium text-left">
              {alimento.descricao}
            </p>
          </div>

          <div
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-3 
            "
          >
            {/* RÓTULO DE PEGADA DINÂMICO (COR, TEXTO E ÍCONE) */}
            <div
              className={`h-10 px-4 flex items-center gap-2 rounded-full text-white font-medium text-sm ${impactStyles.colorClass}`}
            >
              <img src={alimento.impactIcon} className="w-6 h-6" alt="pegada icon" />
              {impactStyles.text}
            </div>

            <div className="flex gap-1">
              <Button className="pl-8 pr-8 rounded-r-[3px] focus:bg-[#DFD4E6] hover:bg-[#DFD4E6] " variant="pattern">
                <PlusIcon className="h-8 w-8" />
                Adicionar à refeição
              </Button>

              <Button
                className="pl-8 pr-8 rounded-l-[3px] rounded-r-lg focus:bg-[#DFD4E6] hover:bg-[#DFD4E6] "
                variant="pattern"
              >
                <ChevronDown className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>

        {/* SEÇÃO PRINCIPAL - IMAGEM, ALTERNATIVA E CARDS DE DETALHE */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-4 
            gap-4
            items-start
          "
        >
          {/* COLUNA 1: IMAGEM + CARDS DE ALTERNATIVA */}
          <div className="flex flex-col gap-4">

            {/* Bloco da Imagem (Padronizado) */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
              <Image
                src={alimento.imagemSrc || alimento.imagem || '/placeholder.png'}
                alt={alimento.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 300px"
              />
            </div>

            {/* CARD DE ALTERNATIVAS */}
            {alternativeList.length > 0 && (
              <Cards
                title="Alternativas de Produto" // Título do Card Principal
                noHeader={true} // Desativa o header colorido
                className="flex-grow min-h-[250px]"
              >
                {/* Agrupa as alternativas dentro do conteúdo (children) do card principal */}
                <div className="flex flex-col gap-4 mt-2">
                  {alternativeList.map((alt, index) => (
                    <div
                      key={index}
                      className="border border-purple-200 rounded-lg p-4 bg-white shadow-sm"
                    >
                      {/* Título da alternativa - Corrigido para text-gray-800 */}
                      <p className="font-semibold text-gray-800 mb-2">
                        {alt.title}
                      </p>
                      {/* Descrição da alternativa */}
                      <p className="text-gray-700 text-sm">
                        {alt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Cards>
            )}

          </div>

          {/* COLUNA 2: CARD DE EMISSÃO DE CO₂ */}
          {alimento.co2Card && (
            <Cards
              title={alimento.co2Card.title}
              headerColor={co2Styles.colorClass}
              iconSrc={alimento.co2Card.iconSrc}
              mainValue={alimento.co2Card.mainValue}
              mainDescription={alimento.co2Card.mainDescription}
              className="min-h-[400px]"
            >
              <div className="flex flex-col gap-2">
                {alimento.co2Card.details.map((detail, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <p className="font-medium mb-3 text-lg">{detail.subtitle}</p>
                    <p>{detail.text}</p>
                  </div>
                ))}
              </div>
            </Cards>
          )}

          {/* COLUNA 3: CARD DE USO DE ÁGUA */}
          {alimento.aguaCard && (
            <Cards
              title={alimento.aguaCard.title}
              headerColor={aguaStyles.colorClass}
              iconSrc={alimento.aguaCard.iconSrc}
              mainValue={alimento.aguaCard.mainValue}
              mainDescription={alimento.aguaCard.mainDescription}
              className="min-h-[400px]"
            >
              <div className="flex flex-col gap-2">
                {alimento.aguaCard.details.map((detail, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <p className="font-medium mb-3 text-lg">{detail.subtitle}</p>
                    <p>{detail.text}</p>
                  </div>
                ))}
              </div>
            </Cards>
          )}

          {/* COLUNA 4: CARD DE OCUPAÇÃO DE TERRA */}
          {alimento.terraCard && (
            <Cards
              title={alimento.terraCard.title}
              headerColor={terraStyles.colorClass}
              iconSrc={alimento.terraCard.iconSrc}
              mainValue={alimento.terraCard.mainValue}
              mainDescription={alimento.terraCard.mainDescription}
              className="min-h-[400px]"
            >
              <div className="flex flex-col gap-2">
                {alimento.terraCard.details.map((detail, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <p className="font-medium mb-3 text-lg">{detail.subtitle}</p>
                    <p>{detail.text}</p>
                  </div>
                ))}
              </div>
            </Cards>
          )}
        </div>
      </div>
    </div>
  );
}