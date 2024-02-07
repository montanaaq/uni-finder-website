import Header from './Homepage/Header/Header'
import Footer from './Homepage/Footer/Footer.tsx'
import { FC } from 'react'
import InfoContainer from './Homepage/InfoContainer/InfoContainer.tsx'

const App: FC = () => {
  return (
    <div className="top_app">
      <h1 className="not_supported">Not supported on mobile</h1>
      <div className="app">
        <Header />
        <InfoContainer />
        <Footer />
      </div>
    </div>
  )
}

export default App
