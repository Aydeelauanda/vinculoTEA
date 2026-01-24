import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vyugkgrmabfdlabixij.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dWdrZ3JtYWJmZGpsYWJpeGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTM5ODAsImV4cCI6MjA4NDU2OTk4MH0.m1ZY9MDjjh7IIcn6Q4kPfelwnCOpgD2odGwEfGJRqhM";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tipos baseados no seu schema
export interface Aluno {
  Aluno_ID: number;
  Familia_ID: number | null;
  Escola_ID: number | null;
  Nome: string;
  Data_nascimento: string | null;
  Serie: string | null;
  Status: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Familia {
  Familia_ID: number;
  Nome_responsavel: string;
  Telefone: string;
  Email: string | null;
  Endereco: string | null;
}

export interface Escola {
  Escola_ID: number;
  Nome: string;
  CNPJ: number | null;
  Email: string | null;
  Telefone: string | null;
  Endereco: string | null;
}

export interface AlunoFormData {
  Nome: string;
  Data_nascimento: string;
  Serie: string;
  Status: string;
  Familia_ID?: number | null;
  Escola_ID?: number | null;
}

export interface FamiliaFormData {
  Nome_responsavel: string;
  Telefone: string;
  Email: string;
  Endereco: string;
}