"use client";

interface ThumbnailProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function Thumbnail({ files, onRemove }: ThumbnailProps) {
  return (
    <div className="flex flex-col gap-2">
      {files.map((file, index) => {
        const fileURL = URL.createObjectURL(file);

        // Obtener metadatos
        // const size = (file.size / 1024).toFixed(0); 
        // const date = new Date(file.lastModified).toLocaleDateString();

        return (
          <div
            key={index}
            className="relative bg-gray-200 p-4 rounded-md flex items-center justify-between hover:bg-gray-300 transition"
          >
            <div className="flex items-center gap-2">
              {/* Ícono de PDF con texto "PDF" */}
              <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center font-bold rounded">
                PDF
              </div>

              {/* Nombre del archivo con opción para abrir */}
              <a
                href={fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.name}
              </a>
            </div>

            {/* Botón para eliminar */}
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-full text-sm ml-2 hover:bg-red-600 transition"
              onClick={() => onRemove(index)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
