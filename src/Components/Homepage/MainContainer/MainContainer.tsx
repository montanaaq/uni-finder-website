import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OpenAI from 'openai'
import { FC, SetStateAction, useRef, useState } from 'react'
import styles from './MainContainer.module.css'

type MainContainerProps = {
	selectedCity: string
}

type ColumnType = {
	id: number
	subjectName: string
	score: string
}

const MainContainer: FC<MainContainerProps> = ({ selectedCity }) => {
	const [firstColumn, setFirstColumn]: [ColumnType[], SetStateAction<object>] =
		useState([
			{ id: 1, subjectName: 'Математика', score: '' },
			{ id: 2, subjectName: 'Информатика', score: '' },
			{ id: 3, subjectName: 'Физика', score: '' },
			{ id: 4, subjectName: 'Литература', score: '' },
			{ id: 5, subjectName: 'Русский язык', score: '' },
		])
	const [secondColumn, setSecondColumn]: [
		ColumnType[],
		SetStateAction<object>
	] = useState([
		{ id: 6, subjectName: 'Китайский язык', score: '' },
		{ id: 7, subjectName: 'Английский язык', score: '' },
		{ id: 8, subjectName: 'Французский язык', score: '' },
		{ id: 9, subjectName: 'Немецкий язык', score: '' },
		{ id: 10, subjectName: 'Испанский язык', score: '' },
	])
	const [thirdColumn, setThirdColumn]: [ColumnType[], SetStateAction<object>] =
		useState([
			{ id: 11, subjectName: 'Биология', score: '' },
			{ id: 12, subjectName: 'Химия', score: '' },
			{ id: 13, subjectName: 'География', score: '' },
			{ id: 14, subjectName: 'История', score: '' },
			{ id: 15, subjectName: 'Обществознание', score: '' }
,
		])
	const [isBudget, setIsBudget] = useState(false)

	type handleCheckedProps = (
		e: any,
		id: number,
		column_id: ColumnType[],
		set_column_id: any
	) => void

	const handleChecked: handleCheckedProps = (
		e,
		id,
		column_id,
		set_column_id
	) => {
		const checked = e.target.checked
		const updatedSubjects = column_id.map((subject) =>
			subject.id === id ? { ...subject, score: checked ? 100 : '' } : subject
		)
		set_column_id(updatedSubjects)
	}

	type checkScoreProps = (
		e: any,
		id: number,
		numberColumn: ColumnType[],
		setNumberColumn: any
	) => void

	const checkScore: checkScoreProps = (
		e,
		id,
		numberColumn,
		setNumberColumn
	) => {
		if (e.target.value >= 0 && e.target.value <= 100) {
			const updatedSubjects = numberColumn.map((subject) =>
				subject.id === id ? { ...subject, score: e.target.value } : subject
			)
			setNumberColumn(updatedSubjects)
		}
	}

	const validateSubjects = (
		firstColumn: ColumnType[],
		secondColumn: ColumnType[],
		thirdColumn: ColumnType[]
	) => {
		let count: number = 0

		firstColumn.forEach((subject) => {
			if (subject.score) {
				count++
			}
		})

		secondColumn.forEach((subject) => {
			if (subject.score) {
				count++
			}
		})

		thirdColumn.forEach((subject) => {
			if (subject.score) {
				count++
			}
		})

		return count >= 3
	}
	const [isModalOpen, setIsModalOpen]: [
		isModalOpen: boolean,
		setIsModalOpen: any
	] = useState(false)

	const joinSubjects = (
		firstColumn: ColumnType[],
		secondColumn: ColumnType[],
		thirdColumn: ColumnType[]
	) => {
		const subjects = []
		subjects.push(firstColumn, secondColumn, thirdColumn)

		const subject = []
		for (const i of subjects) {
			for (let j = 0; j < 5; j++) {
				if (i[j] && i[j].score !== '') {
					subject.push(i[j])
				}
			}
		}
		return subject
			.map(
				(subj_id) => `${subj_id.subjectName} - ${subj_id.score} баллов ЕГЭ\n`
			)
			.join('')
	}
	const completed_msg: string = `Куда я могу поступить в городе ${selectedCity}, Россия. Также ищи ${
		isBudget ? 'бюджетные' : 'платные'
	} варианты обучения и найди лучшие варианты\nМои сданные предметы: \n${joinSubjects(
		firstColumn,
		secondColumn,
		thirdColumn
	)}\nТакже выдай ссылку на все предложенные университеты. Учитывай все мои предпочтения и предложения. И если есть ошибки или у тебя нет информации о каких либо университетах, то пиши напрямую мне, а не скрывай этого`

	const [result, setResult]: [result: string, setResult: any] = useState('')

	const sendToGPT = async () => {
		try {
			const openai = new OpenAI({
				apiKey: import.meta.env.VITE_APP_API_KEY,
				dangerouslyAllowBrowser: true,
			})

			const chatCompletion = await openai.chat.completions.create({
				messages: [{ role: 'user', content: completed_msg }],
				model: 'gpt-3.5-turbo',
				max_tokens: 500,
			})
			setResult(chatCompletion.choices[0].message.content)
		} catch (error: any) {
			if (error.message.includes('403')) {
				alert('Please turn on your VPN to access this resource.')
			} else {
				console.error('Error:', error)
			}
		}
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}
	const formatChatGPTResult = (rawResult: string) => {
		const paragraphs = rawResult.split('\n')

		const formatLinks = (text: string) => {
			const linkRegex = /(\bhttps?:\/\/\S+\b)/g
			return text.replace(linkRegex, '<a href="$1" target="_blank">$1</a>')
		}

		const formattedParagraphs = paragraphs.map(formatLinks)

		const formattedResult = formattedParagraphs.join('<br>')

		return formattedResult
	}
	const mainResult = formatChatGPTResult(result)
	const pRef = useRef(null)
	const copyToClipboard = () => {
		if (pRef.current) {
			const range = document.createRange()
			range.selectNode(pRef.current)
			window.getSelection()?.removeAllRanges()
			window.getSelection()?.addRange(range)
			document.execCommand('copy')
			window.getSelection()?.removeAllRanges()
			alert('Успешно! Информация была скопирована!')
		}
	}

	const toggleModal = async () => {
		if (validateSubjects(firstColumn, secondColumn, thirdColumn)) {
			if (
				confirm(
					'Отправить данные ChatGPT? Если да, вам придётся подождать примерно 1 минуту. Заранее хотим предупредить, что данные могут быть не точные, так как ChatGPT может иметь недочёты.'
				)
			) {
				await sendToGPT()
				setIsModalOpen(!isModalOpen)
			}
		} else {
			alert('Пожалуйста, выберите не менее 3 предметов для сдачи!')
		}
	}
	return (
		<div className={styles.main}>
			<div className={styles.head}>
				<h1>Поиск вузов по ЕГЭ</h1>
				<p>
					Выберите предметы ЕГЭ, которые вы сдали или собираетесь сдавать.
					Укажите свои баллы по предметам (можно ожидаемые). Мы автоматически
					подберем для вас подходящие вузы и специальности.
				</p>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.empty_space}></div>
				<div className={styles.subjects}>
					{firstColumn.map((subject) => (
						<div className={styles.subject_container} key={subject.id}>
							<div className={styles.checkbox_wrapper_13}>
								<input
									checked={!!subject.score}
									type='checkbox'
									onChange={(e) =>
										handleChecked(e, subject.id, firstColumn, setFirstColumn)
									}
								/>
							</div>
							<p className={styles.subject_name}>{subject.subjectName}</p>
							<Box>
								<TextField
									id='outlined-basic'
									label='Балл'
									variant='outlined'
									value={subject.score}
									key={subject.id}
									onChange={(e) =>
										checkScore(e, subject.id, firstColumn, setFirstColumn)
									}
								/>
							</Box>
						</div>
					))}
				</div>
				<div className={styles.subjects}>
					{secondColumn.map((subject) => (
						<div className={styles.subject_container} key={subject.id}>
							<div className={styles.checkbox_wrapper_13}>
								<input
									checked={!!subject.score}
									type='checkbox'
									onChange={(e) =>
										handleChecked(e, subject.id, secondColumn, setSecondColumn)
									}
								/>
							</div>
							<p className={styles.subject_name}>{subject.subjectName}</p>
							<Box>
								<TextField
									id='outlined-basic'
									label='Балл'
									variant='outlined'
									value={subject.score}
									key={subject.id}
									onChange={(e) =>
										checkScore(e, subject.id, secondColumn, setSecondColumn)
									}
								/>
							</Box>
						</div>
					))}
				</div>
				<div className={styles.subjects}>
					{thirdColumn.map((subject) => (
						<div className={styles.subject_container} key={subject.id}>
							<div className={styles.checkbox_wrapper_13}>
								<input
									checked={!!subject.score}
									type='checkbox'
									onChange={(e) =>
										handleChecked(e, subject.id, thirdColumn, setThirdColumn)
									}
								/>
							</div>
							<p className={styles.subject_name}>{subject.subjectName}</p>
							<Box>
								<TextField
									id='outlined-basic'
									label='Балл'
									variant='outlined'
									value={subject.score}
									key={subject.id}
									onChange={(e) =>
										checkScore(e, subject.id, thirdColumn, setThirdColumn)
									}
								/>
							</Box>
						</div>
					))}
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.budget}>
				<div className={styles.checkbox_wrapper_13}>
					<input
						checked={isBudget}
						type='checkbox'
						onChange={(e) => setIsBudget(e.target.checked)}
					/>
				</div>
				<p>Бюджетная форма обучения <b>(по умолч. платная)</b></p>
			</div>
			<button className={styles.button} onClick={toggleModal}>
				Подобрать
			</button>
			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modal_content}>
						<h1>Результат</h1>
						<br />
						{mainResult ? (
							<>
								<p
									ref={pRef}
									dangerouslySetInnerHTML={{ __html: mainResult }}
								></p>
								<button
									onClick={copyToClipboard}
									className={styles.copy_button}
								>
									Копировать
								</button>
							</>
						) : (
							'Пожалуйста включите ВПН, и попробуйте ещё раз!'
						)}
						<Icon
							className={styles.iconify_cross}
							icon='carbon:close-filled'
							color='#777'
							width='36'
							height='36'
							onClick={closeModal}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
export default MainContainer
