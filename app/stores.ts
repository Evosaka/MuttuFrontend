import { atom } from 'jotai';

export interface Scale {
  id: number;
  name: string;
  description: string;
  _count: {
    questions: number;
  };
  questions?: {
    id: number;
    text: string;
    options: string[];
  }[];
}

export const scalesAtom = atom<Scale[]>([]); // Agora `scalesAtom` é tipado como um array de `Scale`
export const scaleIdAtom = atom<number | null>(null); // `scaleIdAtom` pode ser `null` ou `number`
export const questionsAtom = atom<any[]>([]); // Agora `questionsAtom` é tipado como um array de `any`