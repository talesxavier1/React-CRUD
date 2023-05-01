import './App.css'
import Header from './Components/PageComponents/Header/Header'
import Nav from './Components/PageComponents/Nav/Nav'
import Wrapper from './Components/PageComponents/Wrapper/Wrapper'

interface AppProps {
  wrapperShow: JSX.Element
}

function App(appProps: AppProps) {
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='nav-wrapper-container'>
        <div className='nav-area'>
          <Nav />
        </div>
        <div className='content-wrapper'>
          <Wrapper WrapperShow={appProps.wrapperShow} />
        </div>
      </div>
    </div>
  )
}

export default App
