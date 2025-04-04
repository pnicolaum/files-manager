"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Thumbnail from "@/components/Thumbnail";

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const pdfFiles = Array.from(selectedFiles).filter(
        (file) => file.type === "application/pdf"
      );

      if (pdfFiles.length === 0) {
        alert("Por favor, selecciona solo archivos PDF.");
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const bindFiles = async () => {
    if (files.length === 0) {
      alert("No hay archivos para unir.");
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
        const pageIndices = pdfDoc.getPageIndices();

        // PDF sin páginas
        if (pageIndices.length === 0) {
          console.warn(`El archivo ${file.name} no tiene páginas y será omitido.`);
          continue;
        }

        for (const index of pageIndices) {
          try {
            const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [index]);
            mergedPdf.addPage(copiedPage);
          } catch (copyError) {
            console.error(`Error al copiar la página ${index} de ${file.name}:`, copyError);
          }
        }
      } catch (error) {
        console.error(`Error procesando ${file.name}:`, error);
        alert(`Hubo un problema con el archivo ${file.name}. Se omitirá.`);
      }
    }

    if (mergedPdf.getPageCount() === 0) {
      alert("No se pudo generar el PDF porque los archivos estaban vacíos o no eran válidos.");
      return;
    }

    console.log("PDF combinado generado correctamente");
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "binded.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="border w-[90%] text-white p-4 flex flex-col items-center gap-4 rounded-l">
  
        <button 
          className="bg-white text-black px-4 py-2 rounded-md border-2 cursor-pointer"
          onClick={handleClick}
        >
          Añadir archivo +
        </button>
  
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          accept="application/pdf" 
          multiple 
          onChange={handleFileSelect}
        />       
  
        <Thumbnail files={files} onRemove={removeFile} />
  
        <button 
          className="bg-white text-black px-4 py-2 rounded-md border-2 cursor-pointer"
          onClick={bindFiles}
        >
          Juntar archivos
        </button>
      </div>
    </div>
  );
  
}
