import Pagination from "../Table/Pagination";
// import { useNavigate } from "react-router-dom";

interface Profissional {
  nome: string;
  disciplina: string;
  telefone: string;
  email: string;
  registro: string;
}

const profissionais: Profissional[] = Array.from({ length: 10 }).map(() => ({
  nome: "Ana Clara",
  disciplina: "Informática",
  telefone: "94 98130-8015",
  email: "gestor@edututorpei.com.br",
  registro: "20000"
}));

export default function ProfissionaisTable() {
  // const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px"
      }}
    >
      {/* Filtros */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}>
          <option>Selecionar disciplina</option>
          <option>Informática</option>
          <option>Psicologia</option>
          <option>Fonoaudiologia</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", color: "#555" }}>
            <th>Profissional</th>
            <th>Disciplina</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Registro Profissional</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {profissionais.map((p, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #f1f1f1", color: "#777" }}>
              <td style={{ padding: "12px" }}>{p.nome}</td>
              <td>{p.disciplina}</td>
              <td>{p.telefone}</td>
              <td>{p.email}</td>
              <td>{p.registro}</td>
              <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.2s",
                    color: "#374151"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                >
                  👁️ Ver
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.2s",
                    color: "#374151"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                >
                  ✏️ Editar
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
}
