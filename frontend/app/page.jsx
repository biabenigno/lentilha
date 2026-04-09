"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineScience, MdPublic, MdLayers, MdArrowForward,
  MdTrendingDown, MdWaterDrop, MdCo2, MdSpeed, MdCheckCircle
} from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";

const BRAND = {
  primary: "#448040",
  primaryDark: "#146151",
  accent: "#B4CF66",
  mutedText: "#6b6b6b",
  lightGreen: "#f4f8f4",
  orange: "#FFAE3C"
};

const TimelineStep = ({ number, title, text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-5 items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex-1 relative overflow-hidden group hover:shadow-lg transition-all"
  >
    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#146151]/10 group-hover:bg-[#146151] transition-colors" />
    <div className="w-12 h-12 rounded-full bg-[#146151] text-[#B4CF66] flex items-center justify-center text-sm font-black shrink-0 shadow-md">
      {number}
    </div>
    <div className="space-y-1 text-left">
      <h4 className="text-base font-black text-[#146151]">{title}</h4>
      <p className="text-gray-500 font-medium leading-snug text-xs md:text-sm">{text}</p>
    </div>
  </motion.div>
);

const StatCounter = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    let timer;

    const run = () => {
      const increment = end / (duration / 16);
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        run();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-xl md:text-2xl font-black text-[#146151]">
        {count}{suffix}
      </div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
};

const BackgroundAura = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B4CF66]/20 blur-[120px]" />
    <div className="absolute bottom-[5%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#448040]/15 blur-[100px]" />
    <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-[#FFAE3C]/5 blur-[80px]" />
  </div>
);

export default function Home() {
  return (
    <div className="relative flex flex-col items-center font-sans bg-[#f8fbf8] pb-0 min-h-screen overflow-hidden">
      <BackgroundAura />

      <main className="relative z-10 flex flex-col items-center w-full px-4">

        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center gap-8 pt-14 pb-20 max-w-5xl w-full text-center">




          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 flex flex-col items-center"
          >
            {/* --- LOGO --- */}
            <Link
              href="/"
              className="relative w-full max-w-[180px] md:max-w-[350px] h-[80px] md:h-[128px] cursor-pointer mb-2"
            >
              <Image
                src="/logo-lentilha.png"
                alt="Logo Lentilha"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-1 rounded-full bg-[#B4CF66]/20 border border-[#B4CF66]/30 text-[#146151] text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              Sustentabilidade com Rigor Científico
            </motion.div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter leading-[0.95] max-w-4xl mx-auto">
              Descubra o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146151] via-[#448040] to-[#B4CF66]">Impacto Ambiental</span> do seu prato.
            </h1>
            <p className="text-sm md:text-base font-medium text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Do campo ao descarte: quantificamos o impacto real da sua dieta com dados oficiais brasileiros.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/pesquisa">
              <Button className="h-13 px-8 text-sm font-black bg-[#448040] text-white rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-[#448040]/30">
                Começar agora <MdArrowForward className="ml-2 inline" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* --- COMPARISON --- */}
        <section className="w-full max-w-5xl mb-20">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-xl md:text-2xl font-black text-[#146151] leading-tight">Trocas simples, mudanças gigantes.</h2>
              <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl mx-auto">
                Produzir <strong>1 kg de carne bovina</strong> consome até <strong>51x mais água</strong> do que vegetais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Carne */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full -mr-12 -mt-12 blur-2xl" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <MdWaterDrop className="text-red-500" size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-red-400">Alto Impacto Hídrico</div>
                    <div className="text-base font-black text-red-600">1 kg de Carne Bovina</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-red-500">
                    <span>Pegada Hídrica</span>
                    <span>15.400 litros</span>
                  </div>
                  <div className="h-3 w-full bg-red-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-red-400 font-medium">
                  Equivale a mais de <strong>100 dias</strong> de consumo doméstico de água de uma pessoa.
                </p>
              </div>

              {/* Vegetal */}
              <div className="bg-[#f0f9f0] border border-[#448040]/15 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4CF66]/20 rounded-full -mr-12 -mt-12 blur-2xl" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#448040]/10 flex items-center justify-center shrink-0">
                    <MdWaterDrop className="text-[#448040]" size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#448040]">Baixo Impacto Hídrico</div>
                    <div className="text-base font-black text-[#146151]">1 kg de Vegetais</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#448040]">
                    <span>Pegada Hídrica</span>
                    <span>~290 litros</span>
                  </div>
                  <div className="h-3 w-full bg-[#448040]/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "2%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#B4CF66] to-[#448040] rounded-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#448040] font-medium">
                  Apenas <strong>1,9%</strong> do consumo hídrico da carne para a mesma quantidade produzida.
                </p>
              </div>
            </div>

            {/* Número destaque */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-6 px-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-black text-red-500">15.400 L</div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">Carne bovina — 1kg</div>
              </div>
              <div className="text-xl md:text-2xl font-black text-gray-200">vs</div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-black text-[#448040]">290 L</div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">Vegetais (média) — 1kg</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID --- */}
        <section className="w-full max-w-5xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rigor Metodológico */}
            <div className="bg-[#146151] rounded-2xl p-8 text-left text-white flex flex-col justify-between overflow-hidden relative min-h-[260px]">
              <MdPublic className="absolute bottom-[-15%] right-[-5%] text-white/5 w-[220px] h-[220px]" />
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <MdOutlineScience size={26} />
                </div>
                <h3 className="text-lg md:text-xl font-black leading-tight">Rigor Metodológico</h3>
                <p className="text-sm text-white/70 font-medium">Análise baseada em ACV (Ciclo de Vida) do berço ao prato.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 relative z-10 mt-4">
                <div className="text-xs font-black uppercase tracking-widest text-[#B4CF66] mb-1">Padrão Internacional</div>
                <div className="text-xs font-medium">ISO 14040 e 14044 — transparência total na metodologia.</div>
              </div>
            </div>

            {/* Contexto Brasileiro */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between text-left min-h-[260px]">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#448040]">
                    <MdPublic size={26} />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#146151]">Contexto Brasileiro</h3>
                </div>
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Utilizamos dados oficiais da <strong>POF (IBGE)</strong> para refletir o consumo alimentar real do brasileiro, superando lacunas de dados genéricos globais.
              </p>
            </div>
          </div>
        </section>

        {/* --- TIMELINE --- */}
        <section className="w-full max-w-5xl py-8 px-4 text-center">
          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-black text-[#146151]">Como a ciência chega à sua mesa?</h2>
              <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto font-medium">Nosso processo rigoroso garante que cada grama de CO₂ seja contabilizada.</p>
            </div>
            <div className="flex flex-col gap-4">
              <TimelineStep index={0} number="01" title="Coleta Regional" text="Dados da POF/IBGE capturam o consumo real do brasileiro em cada estado." />
              <TimelineStep index={1} number="02" title="Análise ACV" text="Aplicamos a Avaliação do Ciclo de Vida do berço ao seu prato." />
              <TimelineStep index={2} number="03" title="Mapeamento" text="Cruzamos pegada de carbono, hídrica e uso da terra de maneira multidimensional." />
            </div>
          </div>
        </section>

        {/* --- STATS --- */}
        <section className="w-full max-w-4xl py-12 px-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <StatCounter value="2500" label="Alimentos" suffix="+" />
            <StatCounter value="100" label="Científico" suffix="%" />
            <div className="hidden md:block">
              <StatCounter value="50" label="Metodologias" suffix="+" />
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="w-full max-w-5xl mb-20 px-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#146151] to-[#448040] text-left text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full -mr-36 -mt-36 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-black/5 rounded-full -ml-24 -mb-24 blur-[60px]" />
            <div className="max-w-xl relative z-10 space-y-6">
              <h2 className="text-xl md:text-2xl font-black leading-tight">Pronto para liderar a mudança na sua mesa?</h2>
              <p className="text-sm md:text-base text-white/80 font-medium">
                Sua próxima refeição pode ser o primeiro passo para um planeta mais saudável.
              </p>
              <Link href="/pesquisa" className="block pt-2">
                <Button className="h-14 px-10 text-base font-black bg-white text-[#146151] rounded-2xl hover:bg-[#B4CF66] hover:text-[#146151] transition-all shadow-lg">
                  Quero começar agora!
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <footer className="w-full bg-[#146151] pt-14 pb-10 px-8 text-white relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-4 max-w-xs">
            <div className="text-2xl font-black tracking-tighter">LENTILHA</div>
            <p className="text-white/60 font-medium text-sm">Democratizando o acesso à sustentabilidade através da ciência de dados.</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-3">
              <div className="font-black text-xs uppercase tracking-widest text-[#B4CF66]">Navegação</div>
              <ul className="space-y-2 font-bold text-sm">
                <li><Link href="/pesquisa" className="hover:text-[#B4CF66] transition-colors">Pesquisar</Link></li>
                <li><Link href="/almoco" className="hover:text-[#B4CF66] transition-colors">Meu Impacto</Link></li>
                <li><Link href="/" className="hover:text-[#B4CF66] transition-colors">Sobre nós</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-black text-xs uppercase tracking-widest text-[#B4CF66]">Acadêmico</div>
              <div className="text-sm font-medium text-white/60">Trabalho de Conclusão de Curso (TCC) — UNIFOR</div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14 pt-6 border-t border-white/10 text-center text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
          &copy; 2025 LENTILHA. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
