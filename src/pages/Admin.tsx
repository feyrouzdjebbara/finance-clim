import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import { Lock, Users, Download, LogOut } from "lucide-react";

interface Registration {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  organisation: string | null;
  fonction: string | null;
  created_at: string;
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple admin auth (demo)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "workshop2026";

  // Vérifier l'authentification depuis le localStorage au démarrage
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Récupérer les inscriptions si authentifié
  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);

    fetch("http://localhost:3001/registrations")
      .then((res) => res.json())
      .then((data: Registration[]) => {
        setRegistrations(data || []);
        setLoading(false);
      })
      .catch(() => {
        setRegistrations([]);
        setLoading(false);
      });
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Identifiants incorrects");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const exportExcel = () => {
    const data = registrations.map((r) => ({
      Nom: r.nom,
      Prénom: r.prenom,
      Email: r.email,
      Organisation: r.organisation || "",
      Fonction: r.fonction || "",
      Date: new Date(r.created_at).toLocaleDateString("fr-FR"),
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Style entête
    const range = XLSX.utils.decode_range(ws["!ref"]!);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (cell) {
        cell.s = {
          fill: { fgColor: { rgb: "FFB6C1" } }, // rose clair
          font: { bold: true },
        };
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inscriptions");
    XLSX.writeFile(wb, "inscriptions_workshop.xlsx");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zellige-dark p-4" style={{ background: "var(--gradient-hero)" }}>
        <div className="bg-card rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--gradient-zellige)" }}>
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin</h1>
            <p className="text-muted-foreground font-body text-sm">Accès réservé aux organisateurs</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {error && <p className="text-destructive text-sm font-body">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-lg font-body font-semibold text-primary-foreground" style={{ background: "var(--gradient-zellige)" }}>
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground font-body">Gestion des inscriptions</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportExcel} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity">
              <Download className="w-4 h-4" /> Exporter CSV
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-body text-sm hover:bg-muted transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-zellige)" }}>
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">{registrations.length}</p>
                <p className="text-muted-foreground font-body text-sm">Inscriptions totales</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div>
              <p className="text-3xl font-display font-bold text-foreground">
                {new Set(registrations.map((r) => r.organisation).filter(Boolean)).size}
              </p>
              <p className="text-muted-foreground font-body text-sm">Organisations</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div>
              <p className="text-3xl font-display font-bold text-foreground">
                {registrations.filter((r) => new Date(r.created_at).toDateString() === new Date().toDateString()).length}
              </p>
              <p className="text-muted-foreground font-body text-sm">Aujourd'hui</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-muted-foreground font-body">Chargement...</div>
            ) : registrations.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground font-body">Aucune inscription pour le moment.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">#</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Nom</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Prénom</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Email</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Organisation</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Fonction</th>
                    <th className="px-4 py-3 font-body text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    <tr key={r.id} className="border-b border-border last:border-none hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-body text-sm text-foreground font-medium">{r.nom}</td>
                      <td className="px-4 py-3 font-body text-sm text-foreground">{r.prenom}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{r.email}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{r.organisation || "—"}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{r.fonction || "—"}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;