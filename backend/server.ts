import express from 'express';
import cors from 'cors';
import path from 'path';
import pdfRoutes from './src/pdfToImage/pdfToImage.route'; // Impo

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos generados (imagenes convertidas)
app.use('/images', express.static(path.join(__dirname, 'src/pdfToImage/images')));

// Usar las rutas de conversión de PDF
app.use('/api/pdf', pdfRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
