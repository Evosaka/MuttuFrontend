import { atom } from 'jotai';

// Interfaces
export interface Option {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  scaleId?: number;
}

export interface Scale {
  id: number;
  name: string;
  description: string;
  type: string;
  createdBy: number;
  questions: Question[];
  hasResponded: boolean;
  _count: {
    questions: number;
  };
}

export interface UserScale {
  id: number;
  userId: number;
  scaleId: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScaleResult {
  success: boolean;
  userScale: UserScale;
  responses: Array<{
    id: number;
    userId: number;
    scaleId: number;
    questionId: number;
    answer: string;
    createdAt: string;
    updatedAt: string;
  }>;
  result: string;
  resultDescription: string;
}

// Atoms
export const scaleIdAtom = atom<number | null>(null);
export const scalesAtom = atom<Scale[]>([]);
export const patientIdAtom = atom<number | null>(null);
export const usernameAtom = atom<string | null>(null);
export const questionsAtom = atom<Question[]>([]);
export const resultAtom = atom<ScaleResult | null>(null);
export const userIdAtom = atom<number | null>(null);
export const emailidAtom = atom<string | null>(null);