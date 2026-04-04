"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineScience, MdPublic, MdLayers, MdArrowForward } from "react-icons/md";
// 💡 Supondo que você tenha um Button component acessível
import { Button } from "../components/ui/button";

const BRAND = {
  primary: "#448040", // Verde Lentilha
  primaryDark: "#146151",
  accent: "#B4CF66",
  mutedText: "#6b6b6b",
  lightPurple: "#f3eef6"
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  // Card com border-left grosso para destacar o conteúdo
  <div className="flex flex-col gap-2 p-5 bg-white rounded-lg shadow-md border-l-4 border-[#FFAE3C] hover:shadow-xl transition-shadow duration-300">
    <Icon size={32} className="text-purple-700" />
    <h3 className="text-lg font-bold" style={{ color: BRAND.primaryDark }}>{title}</h3>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

export default function Home() {
  return (
    // Garantindo que a tela tenha altura 100vh e sem scroll
    <div className="flex flex-col items-center pt-12 lg:pt-20 font-sans bg-[#f3eef6] pb-10">

      <main className="flex flex-col gap-16 items-center text-center max-w-5xl px-4 flex-grow">

        {/* 1. SEÇÃO DE HERO: LOGO E MISSÃO PRINCIPAL */}
        <div className="flex flex-col items-center gap-6 mt-16">
          <div className="relative w-96 h-24">
            {/* Imagem do logo Lentilha */}
            <Image
              src="/logo-lentilha.png"
              alt="Logo Lentilha"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* --- LOGO-- - */}
          <Link
            href="/"
            className="relative w-[550px] h-[128px] cursor-pointer"
          >
            <Image
              src="/logo-lentilha.png"
              alt="Logo Lentilha"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-800 max-w-3xl" style={{ color: BRAND.primaryDark }}>
            A solução para quantificar o verdadeiro impacto ambiental da sua alimentação!
          </h1>

          <p className="text-xl font-light text-gray-600 max-w-2xl">
            Transformamos a complexidade da Avaliação do Ciclo de Vida (ACV) em informações simples e acionáveis para o consumidor brasileiro.
          </p>
        </div>

        {/* 2. PILARES TÉCNICOS (3 COLUNAS) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">

          <FeatureCard
            icon={MdOutlineScience}
            title="Rigor Metodológico"
            description="Baseado na metodologia científica  ACV (ISO 14040/14044) para medir o impacto 'do berço ao túmulo'."
          />
          <FeatureCard
            icon={MdLayers}
            title="Análise 3D: Multidimensional"
            description="Não olhamos apenas o CO₂e, mas sim o impacto completo:  Pegada de Carbono,  Pegada Hídrica (WF)  e  Uso da Terra (EF) ."
          />
          <FeatureCard
            icon={MdPublic}
            title="Contexto Regionalizado"
            description="Nossos cálculos utilizam dados do consumo alimentar da  POF/IBGE, superando a lacuna de dados não adaptados ao Brasil."
          />
        </div>

        {/* 3. CHAMADA À AÇÃO E ESTATÍSTICA CHAVE */}
        <div className="w-full mt-4 flex flex-col items-center gap-6 p-6 rounded-xl border-2 border-[#FFAE3C] bg-white shadow-xl">
          <p className="text-lg font-semibold text-gray-700">
            O Brasil tem uma emissão de carbono por refeição diária muito maior que a meta global.
            <br />
            Comece a comparar e reduzir seu impacto agora!
          </p>

          <Link href="/pesquisa">
            <Button
              className="h-12 px-8 text-lg font-bold flex items-center gap-2 transition-colors duration-300 hover:bg-[#60B46A]" // Hover mais claro
              style={{ backgroundColor: BRAND.primary, color: 'white' }}
              variant="default" // Usando a variante padrão para o botão principal
            >
              <MdArrowForward size={24} />
              Pesquisar o impacto da minha dieta
            </Button>
          </Link>
        </div>
      </main>

      {/* Rodapé - Texto colado com o conteúdo acima */}
      <footer className=" text-sm text-gray-500 mt-8 mb-4">
        &copy; 2025 LENTILHA. Trabalho de Conclusão de Curso (TCC), UNIFOR.
      </footer>
    </div>
  );
}
