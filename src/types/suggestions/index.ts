export interface Suggestion {
  text: string
  id: number
}

export interface suggestionListProps {
  suggestionsList: Suggestion[]
  handleSuggestionClick: Function
}
