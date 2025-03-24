import type { AutocompleteSuggestion } from "../store/formulaStore";

export const fetchSuggestions = async (
  query: string
): Promise<AutocompleteSuggestion[]> => {
  try {
    const response = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: AutocompleteSuggestion[] = await response.json();

    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
