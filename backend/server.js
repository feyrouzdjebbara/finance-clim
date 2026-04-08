import express from "express";
import mysql from "mysql2/promise"; // version "promise" pour async/await
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion MySQL locale XAMPP
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // ton mot de passe MySQL
  database: "workshop"
});

console.log("Connecté à MySQL local !");

// Endpoint pour inscription
app.post("/register", async (req, res) => {
  const { nom, prenom, email, organisation, fonction } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO registrations (nom, prenom, email, organisation, fonction)
       VALUES (?, ?, ?, ?, ?)`,
      [nom, prenom, email.toLowerCase(), organisation || null, fonction || null]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Cet email est déjà inscrit." });
    } else {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
});
// Endpoint pour récupérer toutes les inscriptions
app.get("/registrations", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM registrations ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
// Démarrer le serveur
app.listen(3001, () => console.log("Backend MySQL running on http://localhost:3001"));