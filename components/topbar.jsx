import React from 'react';

export default function TopBar() {
  const colors = [
    'bg-[#FF5A34]', // Laranja
    'bg-[#FEEC5C]', // Amarelo
    'bg-[#B4CF66]', // Verde Claro
    'bg-[#448040]', // Verde Médio
    'bg-[#146151]', // Verde Escuro
  ];

  // Repete a sequência 2 vezes
  const fullPattern = [...colors, ...colors];

  return (
    <div className="flex h-12 w-full shrink-0">
      {fullPattern.map((color, index) => (
        <div key={index} className={`${color} flex-1`} />
      ))}
    </div>
  );
}