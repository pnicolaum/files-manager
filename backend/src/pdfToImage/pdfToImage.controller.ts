import { Request, Response } from 'express';
import { convertPdfToImageService } from './pdfToImage.service';
import path from 'path';
import fs from 'fs';

// Función para convertir el PDF a imagen
export const convertPdfToImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const imagePath = await convertPdfToImageService(req.file.path);
    
    // Enviar la imagen convertida al frontend
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error en la conversión');
      }
      // Eliminar archivos temporales
      fs.unlinkSync(req.file.path); // Eliminar PDF original
      fs.unlinkSync(imagePath); // Eliminar imagen convertida
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la conversión');
  }
};
