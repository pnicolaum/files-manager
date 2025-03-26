"use client";
import { useState } from "react";

export default function Thumbnail() {
  const [files, setFiles] = useState<string[]>([]); // Array para almacenar los nombres de archivos

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

      setFiles((prevFiles) => [...prevFiles, ...pdfFiles]); // Agregar nuevos archivos sin borrar los anteriores
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="flex flex-col gap-4">
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

      {/* Mostrar thumbnails con nombres de archivos */}
      <div className="flex flex-col gap-2">
        {files.map((fileName, index) => (
          <div key={index} className="bg-gray-200 text-black p-2 rounded-md">
            {fileName}
          </div>
        ))}
      </div>
    </div>
  );
}
