"use client";
import { useState } from "react";
import Thumbnail from "@/components/Thumbnail";

export default function Page() {
  const [files, setFiles] = useState<string[]>([]); // Almacena los nombres de los archivos PDF

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const pdfFiles = Array.from(selectedFiles)
        .filter((file) => file.type === "application/pdf") // Filtrar solo PDFs
        .map((file) => file.name); // Obtener los nombres

      if (pdfFiles.length === 0) {
        alert("Por favor, selecciona solo archivos PDF.");
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...pdfFiles]); // Agregar sin sobrescribir
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const separateFiles = ()=>{

  }

  return (
    <div className="grid grid-cols-2 gap-4 ml-2">
      <div className="bg-green-500 text-white p-4 flex flex-col gap-4">
        <h1>Contenido Columna 1</h1>

        {/* Botón para añadir archivo */}
        <button 
          className="bg-white text-black px-4 py-2 rounded-md"
          onClick={handleClick}
        >
          Añadir archivo +
        </button>

        {/* Input oculto para seleccionar archivos */}
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          accept="application/pdf" 
          multiple 
          onChange={handleFileSelect}
        />

        {/* Componente Thumbnail que recibe los archivos y la función de eliminar */}
        {/* <Thumbnail fkiles={files} onRemove={handleRemove} /> */}
        {/* <Thumbnail files={files} onRemove={removeFile} /> */}

        <button 
          className="bg-white text-black px-4 py-2 rounded-md"
          onClick={separateFiles}
        >
          Juntar archivos
        </button>
      </div>

      <div className="bg-red-500 text-white p-4 flex items-center justify-center">
        Contenido Columna 2
      </div>
    </div>
  );
}
