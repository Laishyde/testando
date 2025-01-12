import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Configuração do CORS
const corsOptions = {
    origin: '*', // Permite todas as origens (você pode restringir a uma origem específica se necessário)
    optionsSuccessStatus: 200 // Para navegadores antigos
};

// Middleware para permitir CORS
app.use(cors(corsOptions));

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Gatinhos! Acesse /gatinhos para ver as imagens de gatinhos.');
});

// Rota para buscar gatinhos
app.get('/gatinhos', async (req, res) => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        const gatinhos = response.data;
        console.log('Gatinho encontrado:', gatinhos);
        res.json(gatinhos);
    } catch (error) {
        console.error('Erro ao buscar gatinhos:', error);
        res.status(500).send('Erro ao buscar gatinhos');
    }
});

// Tratamento para rotas não encontradas
app.use((req, res) => {
    res.status(404).send('404 URL NOT FOUND');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
