import React from 'react';
import './index.scss';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="container">
        <h1 className="titulo">Meu Diário</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link">Início</a>
            </li>
            <li className="nav-item">
              <a href="/sobre" className="nav-link">Sobre</a>
            </li>
            <li className="nav-item">
              <a href="/contato" className="nav-link">Contato</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
