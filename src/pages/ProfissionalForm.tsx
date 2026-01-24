import Input from "../components/Form/Input";
import Section from "../components/Form/Section";
import Select from "../components/Form/Select";
import DashboardLayout from "../layouts/DashboardLayout";

export default function ProfissionalForm() {
    const perfilOptions = [
    { value: "gestor", label: "Gestor" },
    { value: "professor", label: "Professor" },
    { value: "especialista", label: "Especialista" },
  ];
  
    return (
        <DashboardLayout>
            <h1>Cadastrar Profissional</h1>

            <form
                style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "24px",
                    marginTop: "24px",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.04)"
                }}
            >
                <Section title="Dados Profissionais">
                    <Input label="Nome Completo" />
                    <Input label="Email" type="email" />
                    <Input label="Telefone" type="tel" />
                </Section>

                <Section title="Registo">
                    <Input label="Registro Profissional" type="text" />
                </Section>

                <Section title="Perfil">
                    <Select
                        label="Selecione o Perfil"
                        name="perfil"
                        value=""
                        onChange={() => {}}
                    >
                        {perfilOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </Section>

                 {/* AÇÕES */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px"
          }}
        >
          <button type="button">Cancelar</button>
          <button
            type="submit"
            style={{
              background: "#4F46E5",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px 20px",
              border: "none"
            }}
          >
            Salvar
          </button>
        </div>
            </form>
        </DashboardLayout>
    );
}
