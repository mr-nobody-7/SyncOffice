import {useState} from 'react'

import Home from './components/Home';
import Category from './components/Category';

import './App.css';

const App = () => {
  const [showHome , setShowHome] = useState(true)

  const onClickHome = () => {
    setShowHome(true)
  }

  const onClickCategory = () => {
    setShowHome(false)

  }

  return (
    <div className="app-container">
      <header className="app-header">
        <img src='https://syncoffice.com/wp-content/uploads/2021/05/logo.png' alt='logo' className='logo' />
      </header>
      <section className="body-section">
        <div className="side-bar">
          <ul className="categories-list">
            <li>
              <button type="button" onClick={onClickHome} className={`section-button ${showHome ? "active-section-button" : null}`}>
                Home
              </button>
            </li>

            <li>
              <button type="button" onClick={onClickCategory} className={`section-button ${showHome ? null : "active-section-button"}`}>
                Category
              </button>
            </li>
          </ul>
        </div>
        <div className='section-data-container'>
          {showHome ? <Home /> : <Category /> }
        </div>
      </section>
    </div>
  );
}

export default App;
