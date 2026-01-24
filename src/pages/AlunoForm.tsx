import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlunos } from "../hooks/useAlunos";
import { toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import Section from "../components/Form/Section";
import Input from "../components/Form/Input";
import Select from "../components/Form/Select";

export default function AlunoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { 
    familias, 
    escolas, 
    loading: dataLoading, 
    createAluno, 
    updateAluno, 
    createFamilia 
  } = useAlunos();

  const [formLoading, setFormLoading] = useState(false);
  const [showNewFamily, setShowNewFamily] = useState(false);
  const [novaFamilia, setNovaFamilia] = useState({
    Nome_responsavel: '',
    Telefone: '',
    Email: '',
    Endereco: ''
  });

  const [formData, setFormData] = useState({
    Nome: '',
    Data_nascimento: '',
    Serie: '',
    Status: 'Ativo',
    Familia_ID: '',
    Escola_ID: ''
  });

  useEffect(() => {
    if (isEditing) {
      // Carregar dados do aluno para edição
      // Implemente a lógica de carregamento aqui
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFamiliaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovaFamilia(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setFormLoading(true);

      let familiaId = formData.Familia_ID;

      // Se o usuário escolheu criar nova família
      if (showNewFamily) {
        const novaFamiliaCriada = await createFamilia(novaFamilia);
        familiaId = novaFamiliaCriada.Familia_ID.toString();
      }

      const alunoData = {
      ...formData,
        Familia_ID: familiaId ? parseInt(familiaId) : null,
        Escola_ID: formData.Escola_ID ? parseInt(formData.Escola_ID) : null
      };

      if (isEditing) {
        await updateAluno(parseInt(id!), alunoData);
        toast.success('Aluno atualizado com sucesso!');
      } else {
        await createAluno(alunoData);
        toast.success('Aluno criado com sucesso!');
      }

      navigate('/alunos');
    } catch (err) {
      toast.error('Erro ao salvar aluno');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const calculateAge = (dateString: string) => {
    if (!dateString) return 0;

    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const idade = formData.Data_nascimento ? calculateAge(formData.Data_nascimento) : 0;

  if (dataLoading && isEditing) {
    return (
      <DashboardLayout>
        <div>Carregando...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1>{isEditing ? "Editar Aluno" : "Novo Aluno"}</h1>
      <p style={{ color: "#666" }}>
        {isEditing ? "Atualize as informações do aluno abaixo." : "Preencha o formulário para adicionar um novo aluno."}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          marginTop: "24px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.04)"
        }}
      >
        {/* DADOS PESSOAIS */}
        <Section title="Dados Pessoais">
          <Input
            label="Nome Completo *"
            name="Nome"
            value={formData.Nome}
            onChange={handleChange}
            required
          />
          <Input
            label="Data de Nascimento"
            name="Data_nascimento"
            type="date"
            value={formData.Data_nascimento}
            onChange={handleChange}
            required
          />
          <Input
            label="Idade"
            value={`${idade} anos`}
            // disabled
          />
        </Section>

        {/* DADOS ESCOLARES */}
        <Section title="Dados Escolares">
          <Select
            label="Escola"
            name="Escola_ID"
            value={formData.Escola_ID}
            onChange={handleChange}
          >
            <option value="">Selecione uma escola</option>
            {escolas.map(escola => (
              <option key={escola.Escola_ID} value={escola.Escola_ID}>
                {escola.Nome}
              </option>
            ))}
          </Select>

          <Input
            label="Série / Ano"
            name="Serie"
            value={formData.Serie}
            onChange={handleChange}
          />

          <Select
            label="Status"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Transferido">Transferido</option>
            <option value="Formado">Formado</option>
          </Select>
        </Section>

        {/* RESPONSÁVEL */}
        <Section title="Família/Responsável">
          <div style={{ gridColumn: 'span 3' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Família:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewFamily(false)}
                  style={{
                    padding: '8px 16px',
                    background: !showNewFamily ? '#4F46E5' : '#f1f5f9',
                    color: !showNewFamily ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Selecionar Existente
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewFamily(true)}
                  style={{
                    padding: '8px 16px',
                    background: showNewFamily ? '#4F46E5' : '#f1f5f9',
                    color: showNewFamily ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Nova Família
                </button>
              </div>
            </div>

            {!showNewFamily ? (
              <Select
                label="Família"
                name="Familia_ID"
                value={formData.Familia_ID}
                onChange={handleChange}
              >
                <option value="">Selecione uma família</option>
                {familias.map(familia => (
                  <option key={familia.Familia_ID} value={familia.Familia_ID}>
                    {familia.Nome_responsavel} - {familia.Telefone}
                  </option>
                ))}
              </Select>
            ) : (
              <div style={{
                background: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ marginBottom: '16px', color: '#475569' }}>Nova Família</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input
                    label="Nome do Responsável *"
                    name="Nome_responsavel"
                    value={novaFamilia.Nome_responsavel}
                    onChange={handleFamiliaChange}
                    required
                  />
                  <Input
                    label="Telefone *"
                    name="Telefone"
                    value={novaFamilia.Telefone}
                    onChange={handleFamiliaChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="Email"
                    type="email"
                    value={novaFamilia.Email}
                    onChange={handleFamiliaChange}
                  />
                  <Input
                    label="Endereço"
                    name="Endereco"
                    value={novaFamilia.Endereco}
                    onChange={handleFamiliaChange}
                  />
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* AÇÕES */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '24px'
        }}>
          <button
            type="button"
            onClick={() => navigate('/alunos')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#1a1a1a',
              cursor: 'pointer'
            }}
            disabled={formLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              background: '#4F46E5',
              color: '#fff',
              borderRadius: '8px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer'
            }}
            disabled={formLoading}
          >
            {formLoading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar Aluno'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
