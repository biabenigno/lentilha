// components/cards.jsx

import React from 'react';
import Image from 'next/image';

// O componente Cards deve receber a prop headerColor e a nova prop noHeader
const Cards = ({
  title,
  description,
  iconSrc,
  mainValue,
  mainDescription,
  children,
  className,
  headerColor,
  noHeader // ⬅️ Nova prop para desativar o header
}) => {
  return (
    // Contêiner principal do card, com a cor de fundo interna clara
    <div
      className={`
        p-8 
        border 
        rounded-lg 
        bg-[#fef7ff] 
        shadow-sm 
        flex 
        flex-col 
        gap-4 
        ${className}
      `}
    >

      {/* ⚠️ CABEÇALHO DO CARD COM COR DINÂMICA */}
      {/* Renderizado APENAS se noHeader for falso */}
      {!noHeader && (
        <div
          className={`
            -m-8 mb-2
            p-8 
            rounded-t-lg 
            text-white 
            ${headerColor || 'bg-gray-400'} // ⬅️ APLICAÇÃO DA COR
          `}
        >

          {/* Ícone e Título */}
          <div className="flex items-center gap-3">
            {iconSrc && (
              <div className="relative w-8 h-8">
                {/* Usando <img> se o ícone for SVG ou PNG, mas mantendo a div para o tamanho */}
                <img
                  src={iconSrc}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <p className="font-medium text-lg">{title}</p>
          </div>
        </div>
      )}

      {/* Se o header for omitido, renderizamos o título aqui dentro */}
      {noHeader && title && (
        <p className="font-medium text-xl text-gray-900">{title}</p>
      )}


      {/* VALOR PRINCIPAL E DESCRIÇÃO PRINCIPAL (Ficam fora do cabeçalho colorido) */}
      {mainValue && (
        <p className="font-bold text-2xl text-purple-800">{mainValue}</p>
      )}
      {mainDescription && (
        <p className="text-gray-700 text-base">{mainDescription}</p>
      )}

      {/* Renderiza o conteúdo customizado (Detalhes de Transporte, Equivalência, etc.) */}
      {children}
    </div>
  );
};

export default Cards;