import { useState, useEffect } from 'react';
import { Search, Plus, X, Users, Clock, Calendar, Loader2 } from 'lucide-react';
import { classesService } from '../../../lib/classesService';

export const ClassesTab = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [classes, setClasses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        periodo: '',
        ano_letivo: new Date().getFullYear().toString()
    });

    const loadClasses = async () => {
        try {
            setIsLoading(true);
            const data = await classesService.getAll();
            setClasses(data || []);
        } catch (err) {
            console.error('Erro ao carregar turmas:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadClasses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nome) return alert('O nome da turma é obrigatório!');

        try {
            setIsSubmitting(true);
            await classesService.create(formData);
            alert('Turma criada com sucesso!');
            setIsCreating(false);
            setFormData({ nome: '', periodo: '', ano_letivo: new Date().getFullYear().toString() });
            await loadClasses();
        } catch (err: any) {
            alert('Erro ao salvar: ' + (err.message || 'Verifique o banco de dados'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCreating) {
        return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic">Nova <span className="text-primary">Turma</span></h2>
                        <p className="text-xs font-medium text-slate-500">Organize seus alunos em grupos</p>
                    </div>
                    <button onClick={() => setIsCreating(false)} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-500 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome da Turma *</label>
                        <input 
                            required
                            type="text" 
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="Ex: 3º Ano A - Ensino Médio" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Período / Turno</label>
                        <select 
                            value={formData.periodo}
                            onChange={(e) => setFormData({...formData, periodo: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none appearance-none"
                        >
                            <option value="">Selecione o turno</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                            <option value="Integral">Integral</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Ano Letivo</label>
                        <input 
                            type="text" 
                            value={formData.ano_letivo}
                            onChange={(e) => setFormData({...formData, ano_letivo: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="2026" 
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50 dark:border-slate-800 md:col-span-2">
                        <button type="button" onClick={() => setIsCreating(false)} className="flex-1 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Descartar</button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Criar Turma'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="relative w-full sm:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Pesquisar turmas..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-sm font-bold"
                    />
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-xs uppercase tracking-widest hover:scale-[1.05] shadow-xl transition-all"
                >
                    <Plus size={18} strokeWidth={3} />
                    Nova Turma
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={40} className="text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls, i) => (
                        <div key={i} className="group p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-start justify-between mb-6">
                                <div className="size-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                                    <Users className="text-primary" size={24} />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">Ativa</span>
                            </div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-4">{cls.nome}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                    <Clock size={14} /> {cls.periodo || 'Turno não definido'}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                    <Calendar size={14} /> Ano Letivo: {cls.ano_letivo}
                                </div>
                            </div>
                        </div>
                    ))}
                    {classes.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-400 font-bold uppercase text-xs tracking-widest">
                            Nenhuma turma cadastrada
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
