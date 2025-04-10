import express from 'express';
import { convertPdfToImage } from './pdfToImage.controller';

const router = express.Router();

// Ruta para convertir un PDF a imagen
router.post('/convert', convertPdfToImage);

export default router;
