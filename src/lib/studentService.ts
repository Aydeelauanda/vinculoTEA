import { supabase } from './supabase';

export interface StudentData {
    nome: string;
    data_nascimento: string;
    cpf: string;
    genero: string;
    escola: string;
    serie?: string;
    cid?: string;
    diagnostico?: string;
    observacoes?: string;
    responsavel_nome: string;
    responsavel_email: string;
    responsavel_telefone: string;
}

export const studentService = {
    // --- ALUNOS ---
    async getAll() {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) throw error;
        return data;
    },

    async create(student: StudentData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('students')
            .insert([{ ...student, user_id: user.id }])
            .select();

        if (error) throw error;
        return data[0];
    },

    // --- DISCIPLINAS (Novo) ---
    async getDisciplines(studentId: string) {
        const { data, error } = await supabase
            .from('disciplines')
            .select('*')
            .eq('student_id', studentId);
        if (error) throw error;
        return data;
    },

    // --- PEIs (Novo) ---
    async getPEIs(studentId: string) {
        const { data, error } = await supabase
            .from('peis')
            .select('*')
            .eq('student_id', studentId);
        if (error) throw error;
        return data;
    },

    // --- ESCOLAS ---
    async getAllSchools() {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .order('nome', { ascending: true });
        if (error) throw error;
        return data;
    },

    async createSchool(school: any) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');
        const { data, error } = await supabase
            .from('schools')
            .insert([{ ...school, user_id: user.id }])
            .select();
        if (error) throw error;
        return data[0];
    },

    // --- PROFISSIONAIS ---
    async getAllProfessionals() {
        const { data, error } = await supabase
            .from('professionals')
            .select('*')
            .order('nome', { ascending: true });
        if (error) throw error;
        return data;
    },

    async createProfessional(professional: any) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');
        const { data, error } = await supabase
            .from('professionals')
            .insert([{ ...professional, user_id: user.id }])
            .select();
        if (error) throw error;
        return data[0];
    }
};
