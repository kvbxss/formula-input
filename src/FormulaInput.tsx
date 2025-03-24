import type React from "react";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormulaStore, type TagContentType } from "./store/formulaStore";
import { fetchSuggestions } from "./api/suggestions";

const FormulaInput: React.FC = () => {
  const {
    formula,
    showAutocomplete,
    inputText,
    setInputText,
    updateFormula,
    toggleAutocomplete,
    addTag,
    calculateFormula,
  } = useFormulaStore();

  const [result, setResult] = useState<number | null>(null);
  const formulaRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["suggestions", inputText],
    queryFn: () => fetchSuggestions(inputText),
    enabled: inputText.trim().length > 0 && showAutocomplete,
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(event.target as Node)
    ) {
      toggleAutocomplete(false);
    }
  };

  const handleFormulaInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || "";
    setInputText(text);
    updateFormula(text);
    toggleAutocomplete(text.trim().length > 0);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (formulaRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        const span = document.createElement("span");
        span.textContent = suggestion.name;
        span.dataset.value = suggestion.value;
        span.className = "bg-blue-500 text-white px-2 py-1 rounded";

        range.insertNode(span);
        range.setStartAfter(span);
        range.setEndAfter(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        formulaRef.current.textContent += ` ${suggestion.name} `;
      }
      addTag({
        id: suggestion.id,
        type: "variable",
        value: suggestion.value.toString(),
        displayValue: suggestion.name,
        category: suggestion.category,
        apiId: suggestion.id,
      });
      updateFormula(formulaRef.current.textContent || "");
      toggleAutocomplete(false);
    }
  };

  const handleCalculate = () => {
    const calculatedResult = calculateFormula();
    setResult(calculatedResult);
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Formula Input</h2>
      <div className="relative">
        <div
          ref={formulaRef}
          contentEditable
          className="border border-gray-300 p-2 rounded-lg w-full min-h-[40px] bg-white outline-none"
          onInput={handleFormulaInput}
          suppressContentEditableWarning={true}
        />
        {showAutocomplete && (
          <div
            ref={autocompleteRef}
            className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-2 text-gray-500">Loading suggestions...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="font-medium">{suggestion.name}</div>
                  <div className="text-xs text-gray-500">
                    {suggestion.category}{" "}
                    {suggestion.value && `• Value: ${suggestion.value}`}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No suggestions found</div>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={() => {
            if (formulaRef.current) {
              formulaRef.current.textContent = "";
              updateFormula("");
              setInputText("");
              setResult(null);
            }
          }}
        >
          Clear Formula
        </button>
      </div>
      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg">
          <h3 className="font-bold text-lg">Result:</h3>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
