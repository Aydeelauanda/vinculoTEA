import { useState, useEffect } from 'react';
import { AlunoService, FamiliaService, EscolaService } from '../services/alunoService';
import type { AlunoFormData } from '../lib/supabase';

export function useAlunos() {
    const [alunos, setAlunos] = useState<any[]>([]);
    const [familias, setFamilias] = useState<any[]>([]);
    const [escolas, setEscolas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [alunosData, familiasData, escolasData] = await Promise.all([
                AlunoService.getAll(),
                FamiliaService.getAll(),
                EscolaService.getAll()
            ]);

            setAlunos(alunosData);
            setFamilias(familiasData);
            setEscolas(escolasData);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createAluno = async (alunoData: AlunoFormData) => {
        try {
            const novoAluno = await AlunoService.create(alunoData);
            await loadData(); // Recarrega os dados
            return novoAluno;
        } catch (err) {
            setError('Erro ao criar aluno');
            throw err;
        }
    };

    const updateAluno = async (id: number, alunoData: Partial<AlunoFormData>) => {
        try {
            const alunoAtualizado = await AlunoService.update(id, alunoData);
            await loadData(); // Recarrega os dados
            return alunoAtualizado;
        } catch (err) {
            setError('Erro ao atualizar aluno');
            throw err;
        }
    };

    const deleteAluno = async (id: number) => {
        try {
            await AlunoService.delete(id);
            await loadData(); // Recarrega os dados
        } catch (err) {
            setError('Erro ao excluir aluno');
            throw err;
        }
    };

    const createFamilia = async (familiaData: any) => {
        try {
            const novaFamilia = await FamiliaService.create(familiaData);
            await loadData(); // Recarrega os dados
            return novaFamilia;
        } catch (err) {
            setError('Erro ao criar família');
            throw err;
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        alunos,
        familias,
        escolas,
        loading,
        error,
        loadData,
        createAluno,
        updateAluno,
        deleteAluno,
        createFamilia
    };
}