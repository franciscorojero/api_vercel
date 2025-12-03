// Para usar import en packaje.json agregar -> "type": "module",

import 'dotenv/config';
import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

// 🔹 API Routes
app.get('/api', (req, res) => {
  res.send('API de Libros funcionando');
});

// Libros
app.get('/api/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Autores
app.get('/api/autores', (req, res) => {
  db.query('SELECT * FROM autors', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Libro por ID
app.get('/api/libros/id/:id', (req, res) => {
  db.query('SELECT * FROM libros WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0] || {});
  });
});

// Libros por autor
app.get('/api/libros/autor/:autor', (req, res) => {
  db.query(
    `SELECT li.titulo, au.nombre 
     FROM libros li 
     INNER JOIN autor_libro al ON li.id = al.idlibro 
     INNER JOIN autors au ON al.idautor = au.id 
     WHERE LOWER(au.nombre) LIKE(?) ORDER BY li.titulo`,
    [`%${req.params.autor}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// ✔ Exporta la app para Vercel
export default app;

// ✔ Solo iniciar servidor si se ejecuta localmente
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}