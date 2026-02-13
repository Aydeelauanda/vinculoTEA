import { supabase } from './supabase';

export const studentService = {
    async getAll() {
        const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async create(studentData: any) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('students')
            .insert([{ 
                ...studentData, 
                user_id: user.id,
                nome: studentData.nomeCompleto // Mantém compatibilidade
            }])
            .select();

        if (error) throw error;
        return data[0];
    },

    async createExecution(executionData: any) {
        const { data, error } = await supabase.from('student_executions').insert([executionData]).select();
        if (error) throw error;
        return data[0];
    }
};
