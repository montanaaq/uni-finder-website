import { useEffect, useRef, useState, FC } from 'react'
import styles from './SearchableDropdown.module.css'

type SearchableDropdownProps = {
  options: any[]
  label: string
  id: string
  selectedVal: string
  handleChange: (value: string) => void
}

const SearchableDropdown: FC<SearchableDropdownProps> = ({
  options,
  label,
  id,
  selectedVal,
  handleChange
}) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', toggle)
    return () => document.removeEventListener('click', toggle)
  }, [])

  const selectOption = (option: { [key: string]: string }) => {
    setQuery(() => '')
    handleChange(option[label])
    setIsOpen(isOpen => !isOpen)
  }

  function toggle(e: any) {
    setIsOpen(e && e.target === inputRef.current)
  }

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return selectedVal

    return ''
  }

  const filter = (options: { [key: string]: string }[]) => {
    return options.filter(
      option => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.control}>
        <div className={styles.selected_value}>
          <input
            placeholder="Город"
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={e => {
              setQuery(e.target.value)
              handleChange('')
            }}
            onClick={toggle}
          />
        </div>
        <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
      </div>

      <div className={`${styles.options} ${isOpen ? styles.open : ''}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`${styles.option} ${
                option[label] === selectedVal ? styles.selected : ''
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchableDropdown
