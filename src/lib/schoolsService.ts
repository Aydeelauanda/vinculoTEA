import { supabase } from './supabase';

export interface SchoolData {
    nome: string;
    cnpj?: string;
    telefone?: string;
    endereco?: string;
}

export const schoolsService = {
    async getAll() {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) {
            console.error('Erro ao buscar escolas:', error);
            throw error;
        }
        return data;
    },

    async create(school: SchoolData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado. Faça login novamente.');

        const { data, error } = await supabase
            .from('schools')
            .insert([{ ...school, user_id: user.id }])
            .select();

        if (error) {
            console.error('Erro ao criar escola:', error);
            throw error;
        }
        return data ? data[0] : null;
    }
};
