import { fromPath } from 'pdf2pic';
import path from 'path';

// Función para convertir el PDF a imagen
export const convertPdfToImageService = async (filePath: string): Promise<string> => {
  const convert = fromPath(filePath, {
    density: 100, // Calidad de la imagen
    saveFilename: 'converted', // Nombre de archivo
    savePath: './src/pdfToImage/images', // Carpeta de salida
    format: 'png', // Formato de la imagen
  });

  return new Promise((resolve, reject) => {
    convert(1) // Convertir solo la primera página (puedes ajustar este valor)
      .then((resolveResult) => {
        // Devolver la ruta completa de la imagen convertida
        resolve(path.join(__dirname, 'images', resolveResult.name));
      })
      .catch((error) => {
        reject(error);
      });
  });
};
