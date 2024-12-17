import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';

function App() {

  return (
    <Router>
        <Routes>
            <Route path='/' element= {<Home/>} />
            <Route path='/book/:id' element= {<Book/>} />
        </Routes>
    </Router>
  )
}

export default App

