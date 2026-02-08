import { supabase } from './supabase';

export interface ProfessionalData {
    nome: string;
    email: string;
    especialidade: string;
    registro?: string;
    telefone?: string;
}

export const teachersService = {
    async getAll() {
        const { data, error } = await supabase
            .from('professionals')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) {
            console.error('Erro ao buscar profissionais:', error);
            throw error;
        }
        return data;
    },

    async create(professional: ProfessionalData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado. Faça login novamente.');

        const { data, error } = await supabase
            .from('professionals')
            .insert([{ ...professional, user_id: user.id }])
            .select();

        if (error) {
            console.error('Erro ao criar profissional:', error);
            throw error;
        }
        return data ? data[0] : null;
    }
};
