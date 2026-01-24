import { supabase, type Aluno, type AlunoFormData } from '../lib/supabase';

export class AlunoService {
  // LISTAR TODOS OS ALUNOS COM JOINS
  static async getAll() {
    const { data, error } = await supabase
      .from('Alunos')
      .select(`
        *,
        Familias (*),
        Escolas (*)
      `)
      .order('Aluno_ID', { ascending: false });

    if (error) throw error;
    return data as any[];
  }

  // BUSCAR ALUNO POR ID COM JOINS
  static async getById(id: number) {
    const { data, error } = await supabase
      .from('Alunos')
      .select(`
        *,
        Familias (*),
        Escolas (*)
      `)
      .eq('Aluno_ID', id)
      .single();

    if (error) throw error;
    return data;
  }

  // CRIAR NOVO ALUNO
  static async create(alunoData: AlunoFormData) {
    const { data, error } = await supabase
      .from('Alunos')
      .insert([{
        Nome: alunoData.Nome,
        Data_nascimento: alunoData.Data_nascimento,
        Serie: alunoData.Serie,
        Status: alunoData.Status,
        Familia_ID: alunoData.Familia_ID,
        Escola_ID: alunoData.Escola_ID
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Aluno;
  }

  // ATUALIZAR ALUNO
  static async update(id: number, alunoData: Partial<AlunoFormData>) {
    const { data, error } = await supabase
      .from('Alunos')
      .update(alunoData)
      .eq('Aluno_ID', id)
      .select()
      .single();

    if (error) throw error;
    return data as Aluno;
  }

  // DELETAR ALUNO
  static async delete(id: number) {
    const { error } = await supabase
      .from('Alunos')
      .delete()
      .eq('Aluno_ID', id);

    if (error) throw error;
  }
}

// Serviço para Famílias
export class FamiliaService {
  static async getAll() {
    const { data, error } = await supabase
      .from('Familias')
      .select('*')
      .order('Familia_ID', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async create(familiaData: any) {
    const { data, error } = await supabase
      .from('Familias')
      .insert([familiaData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Serviço para Escolas
export class EscolaService {
  static async getAll() {
    const { data, error } = await supabase
      .from('Escolas')
      .select('*')
      .order('Escola_ID', { ascending: false });

    if (error) throw error;
    return data;
  }
}