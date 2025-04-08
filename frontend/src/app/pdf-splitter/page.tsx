"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import Thumbnail from "@/components/Thumbnail";

export default function Page() {
  const [pages, setPages] = useState<{ name: string; blob: Blob }[]>([]);
  const [zipName, setZipName] = useState<string>("");

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || file.type !== "application/pdf") {
      alert("Por favor, selecciona un archivo PDF válido.");
      return;
    }

    const originalName = file.name.replace(/\.pdf$/i, "");
    setZipName(originalName);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    const newPages: { name: string; blob: Blob }[] = [];

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const pageName = `${originalName}_p${i + 1}.pdf`;
      newPages.push({ name: pageName, blob });
    }

    setPages(newPages);
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const removePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const downloadZip = async () => {
    if (pages.length === 0) {
      alert("No hay archivos para descargar.");
      return;
    }

    const zip = new JSZip();

    pages.forEach((page) => {
      zip.file(page.name, page.blob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = `${zipName || "documento"}.zip`;
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
          onChange={handleFileSelect}
        />

        <Thumbnail
          files={pages.map((p) => new File([p.blob], p.name))}
          onRemove={removePage}
        />

        {pages.length > 0 && (
          <button
            className="bg-white text-black px-4 py-2 rounded-md border-2 cursor-pointer mt-4"
            onClick={downloadZip}
          >
            Descargar archivos
          </button>
        )}
      </div>
    </div>
  );
}
