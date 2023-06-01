import { useRef, useState, useEffect } from 'react'
import suggestions from '@/assets/suggestions.json'
import { Suggestion } from '@/types/suggestions'
import SuggestionList from '@/components/suggestionList/suggestionList.tsx'
import styles from './BaiduSearchBox.module.css'
import useDebounce from './hooks/useDebounce'

function BaiduSearchBox() {
  const [keyword, setKeyword] = useState('') // 搜索关键字
  const [suggestionsList, setSuggestionsList] = useState<Suggestion[]>([]) // 搜索建议列表
  const [show, setShow] = useState(false) // 是否显示搜索建议列表
  const searchRef = useRef<HTMLInputElement | null>(null) // 搜索框的引用
  const suggestionBoxRef = useRef<HTMLInputElement | null>(null) // 建议词框的引用

  //搜索防抖
  const debounceSearch = useDebounce((value) => {
    //本地json代替发送请求
    const newSuggestions = suggestions.filter((suggestion) =>
      suggestion.text.startsWith(value)
    )

    setSuggestionsList(
      newSuggestions.length > 10 ? newSuggestions.slice(0, 11) : newSuggestions
    )
  }, 500)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setShow(true)
    setKeyword(value)

    if (value === '') {
      setSuggestionsList([])
      return
    }

    //搜索防抖
    debounceSearch(value)
  }

  const handleSuggestionClick = (word: string) => {
    setKeyword(word)
    setSuggestionsList([])
    searchRef.current?.focus()
  }

  const handleClearClick = () => {
    setKeyword('')
    setSuggestionsList([])
  }

  //input的onBlur触发导致先关掉搜索建议框，没触发搜索建议框函数，所以改用onMouseDown判断
  const handleSuggestionClose = (event: any) => {
    // console.log(event)

    const { clientX, clientY }: any = event
    const suggestionBox = suggestionBoxRef.current

    if (suggestionBox) {
      const { left, top, right, bottom } = suggestionBox.getBoundingClientRect()
      // console.log(left, top, right, bottom, clientX, clientY)
      if (
        clientX >= left &&
        clientX <= right &&
        clientY >= top &&
        clientY <= bottom
      ) {
        // 鼠标在搜索建议框内，不关闭搜索建议框
        return
      }
    }
    setShow(false)
  }

  const handleSuggestionOpen = () => {
    setShow(true)
  }

  return (
    <div
      className={styles.searchBox}
      onMouseDown={(event) => handleSuggestionClose(event)}>
      <div className={styles.inputContainer}>
        <input
          ref={searchRef}
          className={styles.searchInput}
          type="text"
          placeholder="百度一下，你就知道"
          value={keyword}
          onChange={handleInputChange}
          onFocus={handleSuggestionOpen}
        />
        {keyword && (
          <div className={styles.clearButton} onClick={handleClearClick}>
            X
          </div>
        )}
        {suggestionsList.length > 0 && show && (
          <SuggestionList
            ref={suggestionBoxRef}
            suggestionsList={suggestionsList}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
      <button
        className={styles.searchButton}
        onClick={() =>
          (window.location.href = `https://www.baidu.com/s?wd=${keyword}`)
        }>
        搜索
      </button>
    </div>
  )
}

export default BaiduSearchBox
