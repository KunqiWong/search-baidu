import { suggestionListProps } from '@/types/suggestions/index'
import styles from './suggestionList.module.css'
import { forwardRef } from 'react'

const SuggestionList = forwardRef(
  (
    { suggestionsList, handleSuggestionClick }: suggestionListProps,
    ref: any
  ) => {
    return (
      <ul className={styles.suggestionList} ref={ref}>
        {suggestionsList.map((suggestion) => (
          <li
            key={suggestion.id}
            className={styles.suggestionItem}
            onClick={() => handleSuggestionClick(suggestion.text)}>
            {suggestion.text}
          </li>
        ))}
      </ul>
    )
  }
)

export default SuggestionList
