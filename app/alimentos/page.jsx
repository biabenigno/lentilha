import { Button } from "@/components/ui/button";
import { ChevronDown, PlusIcon } from "lucide-react";
import { MdSearch } from "react-icons/md";
import Cards from "../../components/cards";

export default function PesquisaPage() {
  return (
    <div className="overflow-x-hidden lg:pl-[10%] lg:pr-[10%]">
      {/* --- BARRA DE PESQUISA --- */}
      <div className="w-full px-4">
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
      <div
        className="
m-8 
    flex 
    flex-col 
    gap-6
    md:flex-row 
    md:items-center  
    md:justify-between
  "
      >
        {/* ESQUERDA */}
        <div className="flex flex-col">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-8 gap-3">
            <h1 className="font-light text-4xl text-center md:text-left">
              Mussarela
            </h1>

            {/* ÍCONES */}
            <div className="flex gap-2">
              <img src={"custo-co2-medio.png"} className="w-6 h-6" alt="co2" />
              <img src={"custo-agua-bom.png"} className="w-6 h-6" alt="agua" />
              <img
                src={"custo-terra-ruim.png"}
                className="w-6 h-6"
                alt="terra"
              />
            </div>
          </div>

          <p className="text-sm font-medium text-center md:text-left">
            Marca: Genérico
          </p>
        </div>

        {/* DIREITA */}
        <div
          className="
      flex 
      flex-col 
      md:flex-row 
      items-center 
      gap-3 
    "
        >
          <Button className="pl-8 pr-8 flex items-center gap-2">
            <img src={"Frame 26.png"} className="w-6 h-6" alt="terra" />
            Produto com pegada média
          </Button>

          <div className="flex gap-1">
            <Button className="pl-8 pr-8 rounded-r-[3px]" variant="pattern">
              <PlusIcon className="h-8 w-8" />
              Adicionar à refeição
            </Button>

            <Button
              className="pl-8 pr-8 rounded-l-[3px] rounded-r-lg"
              variant="pattern"
            >
              <ChevronDown className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 

"
      >
        {/* IMAGEM + ALTERNATIVA */}
        <div className="flex flex-col gap-5 m-2">
          <img
            src={"Frame 22.png"}
            alt="queijo"
            className="rounded-lg"
            width={300}
          />

          <div className="p-8 border rounded-lg w-full max-w-[300px] bg-[#fef7ff]">
            {" "}
            <p className="font-medium text-lg mb-8">Alternativa recomendada</p>
            <p>
              <span className="font-bold block">Queijo Ricota</span>O queijo
              ricota é uma alternativa com pegada menor que Mussarela. Sua
              pegada de carbono é 50% menor e 30% menor ocupação de terra.
            </p>
          </div>
        </div>

        {/* CARD 1 */}
        <Cards
          title="Emissão de CO₂"
          description="Quantidade de carbono emitido durante a produção do alimento até seu estado atual."
        >
          <div className="flex flex-col gap-2">
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
          </div>
        </Cards>

        {/* CARD 2 */}
        <Cards
          title="Emissão de CO₂"
          description="Quantidade de carbono emitido durante a produção do alimento até seu estado atual."
        >
          <div className="flex flex-col gap-2">
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
          </div>
        </Cards>

        {/* CARD 3 */}
        <Cards
          title="Emissão de CO₂"
          description="Quantidade de carbono emitido durante a produção do alimento até seu estado atual."
        >
          <div className="flex flex-col gap-2">
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
            <div className="border p-4 rounded-md">
              <p className="font-medium mb-3 text-lg">Transporte</p>
              <p>Essa emissão é o equivalente a 6km em um carro à gasolina.</p>
            </div>
          </div>
        </Cards>
      </div>
    </div>
  );
}
