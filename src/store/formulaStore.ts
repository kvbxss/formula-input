import { create } from "zustand";

export type AutocompleteSuggestion = {
  name: string;
  category: string;
  value: string | number;
  id: string;
};

export type TagContentType = {
  id: string;
  type: "variable" | "number";
  value: string;
  displayValue?: string;
  category?: string;
  apiId?: string;
};

interface FormulaState {
  content: TagContentType[];
  inputText: string;
  formula: string;
  showAutocomplete: boolean;
  addTag: (tag: TagContentType) => void;
  setInputText: (text: string) => void;
  updateFormula: (formula: string) => void;
  toggleAutocomplete: (show: boolean) => void;
  calculateFormula: () => number | null;
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
  content: [],
  inputText: "",
  formula: "",
  showAutocomplete: false,
  selectedTagId: null,

  addTag: (tag) => {
    set((state) => ({
      content: [...state.content, tag],
      showAutocomplete: false,
    }));
  },

  setInputText: (text) => {
    set({ inputText: text });
  },

  updateFormula: (formula) => {
    set({ formula });
  },

  toggleAutocomplete: (show) => {
    set({ showAutocomplete: show });
  },

  calculateFormula: () => {
    const { content, formula } = get();

    try {
      let calculableFormula = formula;
      const variableValues: Record<string, number> = {};

      content.forEach((item) => {
        if (item.type === "variable") {
          const value = typeof item.value === "number" ? item.value : 10;
          variableValues[item.displayValue || item.value] = value;
        }
      });

      Object.entries(variableValues).forEach(([name, value]) => {
        const regex = new RegExp(`\\b${name}\\b`, "g");
        calculableFormula = calculableFormula.replace(regex, value.toString());
      });

      const result = new Function(`return ${calculableFormula}`)();
      return typeof result === "number" ? result : null;
    } catch (error) {
      console.error("Error calculating formula:", error);
      return null;
    }
  },
}));
