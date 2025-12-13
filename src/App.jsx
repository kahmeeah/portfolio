import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'

import Header from './components/Header'
import About from './components/About'
import Design from './components/Design'
import Code from './components/Code'
import Home from './components/Home'
import Block from './components/Block';

function App() {

  return (
    <BrowserRouter>
    <div>

        <Header/>

        <main>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/design" element={<Design />} />
            <Route path="/code" element={<Code />} />
            <Route path="/block" element={<Block />} />
          </Routes>
        </main>
      </div>
       
    </BrowserRouter>
  )
}

export default App