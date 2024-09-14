import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/"></Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to="/">Catálogo</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/dados">Novo</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<LivroLista />} />
                <Route path="/dados" element={<LivroDados />} />
            </Routes>
        </Router>
    );
}

export default App;
