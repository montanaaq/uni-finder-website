import styles from './InfoContainer.module.css'
import { useState, FC } from 'react'

const InfoContainer: FC = () => {
  const [isOpen1, setIsOpen1]: [isOpen1: boolean, setIsOpen1: any] =
    useState(false)
  const [isOpen2, setIsOpen2]: [isOpen2: boolean, setIsOpen2: any] =
    useState(false)
  const [isOpen3, setIsOpen3]: [isOpen3: boolean, setIsOpen3: any] =
    useState(false)
  const [isOpen4, setIsOpen4]: [isOpen4: boolean, setIsOpen4: any] =
    useState(false)
  const [isOpen5, setIsOpen5]: [isOpen5: boolean, setIsOpen5: any] =
    useState(false)

  return (
    <div>
      <div className={styles.head_info}>
        <h1>Специальности по наборам ЕГЭ</h1>
        <p>
          ЕГЭ проводится по 15 предметам. Для получения школьного аттестата
          выпускники должны сдать ЕГЭ по двум обязательным предметам — русскому
          языку и математике. Остальные дисциплины сдаются по желанию школьника.
          Как правило, абитуриенты вузов выбирают два-три дополнительных ЕГЭ, в
          зависимости от перечня предметов, необходимых для поступления на одно
          или несколько желаемых направлений.
          <br />
          <br />
          Мы рекомендуем школьникам сначала определить для себя несколько
          приоритетных направлений обучения и проанализировать, какие экзамены
          на эти направления принимают вузы. После этого можно подать заявку на
          требуемые предметы ЕГЭ. Если вы еще не до конца определились с выбором
          специальности, сейчас можно зарегистрироваться на несколько предметов
          ЕГЭ, а ближе к экзамену отменить те, которые вам не понадобятся при
          поступлении.
        </p>
      </div>
      <div className={styles.subjects} id="academic">
        <div
          className={styles.info_subject}
          onClick={() => setIsOpen1(!isOpen1)}
        >
          <h1>Математика + физика + русский язык</h1>
          {isOpen1 ? (
            <div>
              <p>
                Один из самых популярных наборов ЕГЭ, в прошлом году экзамен по
                физике выбрали более 170 тысяч российских школьников. Спрос на
                физику обусловлен количеством специальностей, на которые
                требуется этот экзамен. Такую комбинацию предметов можно назвать
                самой востребованной вузами, она подходит более чем для 150
                специальностей высшего образования. Если вы сдали математику,
                физику и русский язык, перед вами открыты технические,
                отраслевые технологические и IT-направления вузов:
              </p>
              <ul>
                <li>Авиастроение</li>
                <li>Горное дело</li>
                <li>Информатика и вычислительная техника</li>
                <li>Машиностроение</li>
                <li>Наноинженерия</li>
                <li>Нефтегазовое дело</li>
                <li>Радиотехника</li>
                <li>Строительство</li>
                <li>Электроника и наноэлектроника</li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={styles.info_subject}
          onClick={() => setIsOpen2(!isOpen2)}
        >
          <h1>Математика + информатика + русский язык</h1>
          {isOpen2 ? (
            <div>
              <p>
                Информатику сдают абитуриенты, поступающие на специальности в
                области информационных технологий, — будущие программисты,
                системотехники, инженеры по телекоммуникациям:
              </p>
              <ul>
                <li>Информатика и вычислительная техника</li>
                <li>Прикладная информатика</li>
                <li>Информационные системы и технологии</li>
                <li>Программная инженерия</li>
                <li>Инфокоммуникационные технологии и системы связи и др.</li>
              </ul>{' '}
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={styles.info_subject}
          onClick={() => setIsOpen3(!isOpen3)}
        >
          <h1>Математика + обществознание + русский язык</h1>
          {isOpen3 ? (
            <div>
              <p>
                Обществознание — самый популярный ЕГЭ по выбору, в прошлом году
                его сдавали 57% выпускников. Этот экзамен, в комбинации с
                математикой и русским языком, требуется на самые популярные у
                абитуриентов направления вузов — экономические:
              </p>
              <ul>
                <li>Экономика</li>
                <li>Менеджмент</li>
                <li>Управление персоналом</li>
                <li>Государственное и муниципальное управление</li>
                <li>Бизнес-информатика</li>
                <li>Торговое дело</li>
                <li>Социология и др.</li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={styles.info_subject}
          onClick={() => setIsOpen4(!isOpen4)}
        >
          <h1>Химия + биология + русский язык</h1>
          {isOpen4 ? (
            <div>
              <p>
                Предметы ЕГЭ для будущих врачей и медработников. Все медицинские
                университеты требуют от абитуриентов результаты экзаменов по
                химии и биологии. Также такой набор ЕГЭ нужно сдавать будущим
                учителям физкультуры и спортивным тренерам. С результатами ЕГЭ
                по этим трем предметам вы сможете подать документы на
                направления:
              </p>
              <ul>
                <li>Лечебное дело</li>
                <li>Стоматология</li>
                <li>Педиатрия</li>
                <li>Медицинская биохимия</li>
                <li>Медико-профилактическое дело</li>
                <li>Физическая культура и др.</li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={styles.info_subject}
          onClick={() => setIsOpen5(!isOpen5)}
        >
          <h1>Обществознание + история + русский язык</h1>
          {isOpen5 ? (
            <div>
              <p>
                Стоит отметить, что некоторые вузы на направления
                «Юриспруденция», «Реклама», «Гостиничное дело» вместо ЕГЭ по
                истории требуют ЕГЭ по иностранному языку. Этот набор ЕГЭ вузы
                принимают на большинство гуманитарных специальностей:
              </p>
              <ul>
                <li>Юриспруденция</li>
                <li>Судебная экспертиза</li>
                <li>Реклама и связи с общественностью</li>
                <li>Гостиничное дело</li>
                <li>Культурология</li>
                <li>Регионоведение</li>
                <li>Политология и др.</li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.footer_info}>
        <h1>Выбрать вуз и специальность по ЕГЭ</h1>
        <p>
          На данном сайте вы сможете найти подходящий вам университет по вашим
          баллам ЕГЭ и вашему местоположению. Для поиска мы используем ChatGPT,
          поэтому результаты не всегда могут быть точные.
        </p>
      </div>
    </div>
  )
}

export default InfoContainer
