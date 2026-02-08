import { supabase } from './supabase';

export interface ClassData {
    nome: string;
    periodo: string;
    ano_letivo: string;
}

export const classesService = {
    async getAll() {
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .order('nome', { ascending: true });
        
        if (error) throw error;
        return data;
    },

    async create(classData: ClassData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('classes')
            .insert([{ ...classData, user_id: user.id }])
            .select();

        if (error) throw error;
        return data[0];
    }
};
