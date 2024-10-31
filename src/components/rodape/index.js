import React from 'react';
import './index.scss';

const Rodape = () => {
  return (
    <footer className="rodape">
      <div className="conteudo-rodape">
        <p>&copy; 2024 Diary of Jane. Todos os Direitos Reservados.</p>
        <ul className="link-rodape">
          <li><a href="#">Politica de Privacidade</a></li>
          <li><a href="#">Termos de Serviço</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Rodape;
