import { Icon } from '@iconify/react'
import styles from './Header.module.css'
import { useState, FC } from 'react'
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown'
import MainContainer from '../MainContainer/MainContainer'
import { mostPopularCities } from '../../../data/cities'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Москва')

  const toggleModal = () => {
    setIsPopupOpen(!isPopupOpen)
  }
  return (
    <>
      <div className={styles.center}>
        <header className={styles.header} id="header">
          <Link to="/" style={{ cursor: 'pointer' }}>
            <div className={styles.logo_container}>
              <img src="logo.png" alt="not downloaded" />
            </div>
          </Link>

          <div className={styles.links}>
            <div className={styles.location} onClick={toggleModal}>
              <Icon icon="carbon:location" color="#333" />
              {
                selectedCity === '' ? <p>Выберите город</p> : <p>{selectedCity}</p>
              }
            </div>
            {isPopupOpen && (
              <div className={styles.modal}>
                <div className={styles.modal_content}>
                  <h2>Где вы хотите учиться?</h2>
                  <p>Выберите город, где вы планируете поступать.</p>
                  <div className={styles.select_city}>
                    <SearchableDropdown
                      options={mostPopularCities}
                      label="name"
                      id="id"
                      selectedVal={selectedCity}
                      handleChange={val => setSelectedCity(val)}
                    />
                  </div>
                  <button onClick={toggleModal} className={styles.save_button}>
                    Сохранить
                  </button>
                  <Icon
                    className={styles.iconify_cross}
                    icon="carbon:close-filled"
                    color="#777"
                    width="36"
                    height="36"
                    onClick={toggleModal}
                  />
                </div>
              </div>
            )}
            <a href="#academic" style={{ textDecoration: 'none' }}>
              <div className={styles.academic}>
                <Icon icon="solar:square-academic-cap-2-linear" color="#333" />
                <p>План поступления</p>
              </div>
            </a>

            <a
              href="https://t.me/uni_finder_bot"
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.telegram_bot}>
                <Icon icon="ph:telegram-logo" color="#333" />
                <p>Мы в Telegram!</p>
              </div>
            </a>
          </div>
        </header>
      </div>
      <MainContainer selectedCity={selectedCity} />
    </>
  )
}

export default Header
