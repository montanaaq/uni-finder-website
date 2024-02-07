import { Icon } from '@iconify/react'
import styles from './Footer.module.css'
import { FC } from 'react'

const Footer: FC = () => {
  const alertMessageAbout = () => {
    alert(
      'Привет! На самом деле всё это делал один человек, в контактах вы можете посмотреть кто. Хотел бы сказать, что все проекты были созданы за 6 дней, поэтому могут быть недочёты.\nТакже все проекты были сделаны в цели помощи людям с поиском университета, так как у многих нет на это времени или возможностей.\nЗаранее хотел бы сказать, что все данные могут быть не точны и лучше их перепроверять, так как ChatGPT может иметь недочёты.\n\nВсем спасибо!'
    )
  }
  const alertMessageContacts = () => {
    alert(
      'Контакты:\n\nГлавный разработчик: Амир Нурисламов\nДизайнер: Амир Нурисламов\ntelegram: @montaanaq\nmail: a.presovsky@list.ru\nЕсли есть вопросы - пишите в телеграм, там быстрее отвечаю). Всем добра!'
    )
  }
  return (
    <div className={styles.center}>
      <div className={styles.footer}>
        <a href="#header" style={{ cursor: 'pointer' }}>
          <div className={styles.logo_container}>
            <img src="logo.png" alt="not downloaded" />
          </div>
        </a>
        <div className={styles.text_container}>
          <ul>
            <div className={styles.home}>
              <Icon icon="carbon:home" />
              <a
                href="#header"
                style={{ color: 'var(--text-color)', textDecoration: 'none' }}
              >
                <li>Главная</li>
              </a>
            </div>
            <div className={styles.contacts} onClick={alertMessageContacts}>
              <Icon icon="mingcute:contacts-line" />
              <li>Контакты</li>
            </div>
            <div className={styles.about} onClick={alertMessageAbout}>
              <Icon icon="mdi:about-circle-outline" />
              <li>Информация</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
