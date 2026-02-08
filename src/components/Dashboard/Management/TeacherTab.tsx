import { useState, useEffect } from 'react';
import { Search, Plus, X, Mail, Phone, GraduationCap, Loader2 } from 'lucide-react';
import { teachersService } from '../../../lib/teacherService';

export const TeachersTab = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [professionals, setProfessionals] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        especialidade: '',
        registro: '',
        telefone: ''
    });

    const loadProfessionals = async () => {
        try {
            setIsLoading(true);
            const data = await teachersService.getAll();
            setProfessionals(data || []);
        } catch (err: any) {
            console.error('Erro ao carregar profissionais:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProfessionals();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nome || !formData.email) {
            alert('Nome e E-mail são obrigatórios!');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log('Tentando salvar profissional:', formData);
            await teachersService.create(formData);
            alert('Profissional salvo com sucesso!');
            setIsCreating(false);
            setFormData({ nome: '', email: '', especialidade: '', registro: '', telefone: '' });
            await loadProfessionals();
        } catch (err: any) {
            console.error('Erro detalhado:', err);
            alert('Erro ao salvar: ' + (err.message || 'Verifique sua conexão ou as tabelas no Supabase'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCreating) {
        return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic">Novo <span className="text-primary">Profissional</span></h2>
                        <p className="text-xs font-medium text-slate-500">Cadastre um novo especialista na rede</p>
                    </div>
                    <button onClick={() => setIsCreating(false)} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-500 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo *</label>
                        <input 
                            required
                            type="text" 
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="Ex: Dra. Mariana Costa" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-mail *</label>
                        <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="mariana@clinica.com" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Disciplina / Especialidade</label>
                        <select 
                            value={formData.especialidade}
                            onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none appearance-none"
                        >
                            <option value="">Selecione uma especialidade</option>
                            <option value="Psicopedagogia">Psicopedagogia</option>
                            <option value="Fonoaudiologia">Fonoaudiologia</option>
                            <option value="Terapia Ocupacional">Terapia Ocupacional</option>
                            <option value="Educação Especial">Educação Especial</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Registro (CRP/CRM/CREFITO)</label>
                        <input 
                            type="text" 
                            value={formData.registro}
                            onChange={(e) => setFormData({...formData, registro: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="00/000000" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contato Telefônico</label>
                        <input 
                            type="tel" 
                            value={formData.telefone}
                            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" 
                            placeholder="(00) 00000-0000" 
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50 dark:border-slate-800 md:col-span-2">
                        <button type="button" onClick={() => setIsCreating(false)} className="flex-1 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Descartar</button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Salvar Profissional'}
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
                        placeholder="Pesquisar profissionais..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-sm font-bold"
                    />
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-xs uppercase tracking-widest hover:scale-[1.05] shadow-xl transition-all"
                >
                    <Plus size={18} strokeWidth={3} />
                    Novo Profissional
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={40} className="text-primary animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-[2rem] border-[1.5px] border-slate-100 dark:border-slate-800">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Especialista</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Área de Atuação</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {professionals.map((teacher, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                                                {teacher.nome.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{teacher.nome}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                                                    <Mail size={10} /> {teacher.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap size={14} className="text-slate-300" />
                                            <span className="font-bold text-slate-600 dark:text-slate-400">{teacher.especialidade}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600">
                                            Ativo
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {professionals.length === 0 && (
                        <div className="text-center py-20 text-slate-400 font-bold uppercase text-xs tracking-widest">
                            Nenhum profissional cadastrado
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
