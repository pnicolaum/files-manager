"use client";
import Thumbnail from "@/components/Thumbnail";

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4 ml-2">
      <div className="bg-green-500 text-white p-4 flex flex-col gap-4">
        <h1>Contenido Columna 1</h1>
        
        {/* Componente Thumbnail */}
        <Thumbnail />
      </div>

      <div className="bg-red-500 text-white p-4 flex items-center justify-center">
        Contenido Columna 2
      </div>
    </div>
  );
}
