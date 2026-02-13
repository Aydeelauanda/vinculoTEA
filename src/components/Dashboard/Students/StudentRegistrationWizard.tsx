import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, MapPin, School, BookOpen, Brain, Activity, Loader2 } from 'lucide-react';
import styles from './StudentRegistrationWizard.module.css';
import { studentService } from '../../../lib/studentService';

interface WizardProps {
    onCancel: () => void;
    onComplete: (data: any) => void;
}

export const StudentRegistrationWizard: React.FC<WizardProps> = ({ onCancel, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        // Step 1: Dados Pessoais
        nomeCompleto: '', dataNascimento: '', cpf: '', genero: '',
        // Step 2: Responsável
        responsavelNome: '', responsavelEmail: '', responsavelTelefone: '',
        cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
        // Step 3: Vínculo
        escola: '', turma: '',
        // Step 4: História
        gravidez: '', tipoParto: '', pesoNascer: '', apgar: '', internacaoNeonatal: '',
        // Step 5: Desenvolvimento
        marcosDesenvolvimento: '', producaoVerbal: '', entendeInstrucoes: '', contatoOcular: '', brincadeiraPreferida: '',
        // Step 6: Saúde e Rotinas
        doencas: '', medicacao: '', alergias: '', sono: '', alimentacao: '', observacoes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const steps = [
        { id: 1, label: 'Dados Pessoais', icon: User },
        { id: 2, label: 'Responsável', icon: MapPin },
        { id: 3, label: 'Vínculo', icon: School },
        { id: 4, label: 'História', icon: BookOpen },
        { id: 5, label: 'Desenv.', icon: Brain },
        { id: 6, label: 'Saúde', icon: Activity },
    ];

    const handleNext = () => { if (currentStep < 6) setCurrentStep(prev => prev + 1); };
    const handleBack = () => { if (currentStep > 1) setCurrentStep(prev => prev - 1); else onCancel(); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            // Esta é a linha que faz o salvamento real no banco de dados
            await studentService.create(formData);
            onComplete(formData);
        } catch (err: any) {
            console.error('Erro ao salvar:', err);
            setError(err.message || 'Erro ao salvar os dados. Verifique sua conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Novo Aluno/PEI</h2>
                <p className={styles.subtitle}>Preencha as informações por etapas</p>
            </div>

            <div className={styles.stepper}>
                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    return (
                        <div key={step.id} className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepCompleted : ''}`}>
                            <div className={styles.stepCircle}>{isCompleted ? <Check size={16} /> : step.id}</div>
                            <div className={styles.stepLabel}>{step.label}</div>
                        </div>
                    );
                })}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><User size={20} /> Dados Pessoais do Aluno</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Nome Completo *</label>
                                <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder="Nome completo do aluno" className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Data de Nascimento *</label>
                                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>CPF *</label>
                                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Gênero *</label>
                                <select name="genero" value={formData.genero} onChange={handleChange} className={styles.input} required>
                                    <option value="">Selecione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><MapPin size={20} /> Dados do Responsável e Endereço</h3>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}><label className={styles.label}>Nome do Responsável *</label><input type="text" name="responsavelNome" value={formData.responsavelNome} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Email *</label><input type="email" name="responsavelEmail" value={formData.responsavelEmail} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Telefone *</label><input type="tel" name="responsavelTelefone" value={formData.responsavelTelefone} onChange={handleChange} placeholder="(00) 00000-0000" className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>CEP *</label><input type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" className={styles.input} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Logradouro *</label><input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Número *</label><input type="text" name="numero" value={formData.numero} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Complemento</label><input type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, Bloco, etc." className={styles.input} /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Bairro *</label><input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Cidade *</label><input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Estado *</label><select name="estado" value={formData.estado} onChange={handleChange} className={styles.input} required><option value="">Selecione...</option><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option><option value="MG">Minas Gerais</option></select></div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><School size={20} /> Vínculo Escolar</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Escola *</label><input type="text" name="escola" value={formData.escola} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Turma *</label><input type="text" name="turma" value={formData.turma} onChange={handleChange} className={styles.input} required /></div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><BookOpen size={20} /> História Pré/Peri/Neonatal</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Como foi a gravidez? *</label><textarea name="gravidez" value={formData.gravidez} onChange={handleChange} placeholder="Ex: Gravidez tranquila..." className={`${styles.input} ${styles.textarea}`} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Tipo de Parto *</label><select name="tipoParto" value={formData.tipoParto} onChange={handleChange} className={styles.input} required><option value="">Selecione...</option><option value="Normal">Normal</option><option value="Cesarea">Cesárea</option></select></div>
                            <div className={styles.formGroup}><label className={styles.label}>Peso ao Nascer *</label><input type="text" name="pesoNascer" value={formData.pesoNascer} onChange={handleChange} className={styles.input} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>APGAR *</label><input type="text" name="apgar" value={formData.apgar} onChange={handleChange} className={styles.input} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Internação neonatal? *</label><input type="text" name="internacaoNeonatal" value={formData.internacaoNeonatal} onChange={handleChange} className={styles.input} required /></div>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><Brain size={20} /> Desenvolvimento e Comunicação</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Marcos do Desenvolvimento *</label><textarea name="marcosDesenvolvimento" value={formData.marcosDesenvolvimento} onChange={handleChange} className={`${styles.input} ${styles.textarea}`} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Produção verbal? *</label><textarea name="producaoVerbal" value={formData.producaoVerbal} onChange={handleChange} className={`${styles.input} ${styles.textarea}`} required /></div>
                            <div className={styles.formGroup}><label className={styles.label}>Entende instruções? *</label><select name="entendeInstrucoes" value={formData.entendeInstrucoes} onChange={handleChange} className={styles.input} required><option value="">Selecione...</option><option value="Sim">Sim</option><option value="Nao">Não</option></select></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Contato ocular *</label><input type="text" name="contatoOcular" value={formData.contatoOcular} onChange={handleChange} className={styles.input} required /></div>
                        </div>
                    </div>
                )}

                {currentStep === 6 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className={styles.sectionTitle}><Activity size={20} /> Saúde e Rotinas</h3>
                        <div className={styles.grid}>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Doenças ou Histórico *</label><textarea name="doencas" value={formData.doencas} onChange={handleChange} className={`${styles.input} ${styles.textarea}`} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Medicação atual *</label><input type="text" name="medicacao" value={formData.medicacao} onChange={handleChange} className={styles.input} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Sono *</label><input type="text" name="sono" value={formData.sono} onChange={handleChange} className={styles.input} required /></div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}><label className={styles.label}>Alimentação *</label><textarea name="alimentacao" value={formData.alimentacao} onChange={handleChange} className={`${styles.input} ${styles.textarea}`} required /></div>
                        </div>
                    </div>
                )}

                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold">⚠️ {error}</div>}

                <div className={styles.actions}>
                    <button type="button" onClick={handleBack} className={`${styles.button} ${styles.btnSecondary}`} disabled={isSubmitting}>
                        <ArrowLeft size={18} /> {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                    </button>
                    {currentStep < 6 ? (
                        <button type="button" onClick={handleNext} className={`${styles.button} ${styles.btnPrimary}`}>Próximo <ArrowRight size={18} /></button>
                    ) : (
                        <button type="submit" className={`${styles.button} ${styles.btnPrimary}`} disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Finalizar <Check size={18} /></>}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
