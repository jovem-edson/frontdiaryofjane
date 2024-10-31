import React from 'react';
import './index.scss';
import { FaEdit, FaTrash } from 'react-icons/fa'; // ícones de edição e lixeira

// Exemplo de como o componente Card pode ser implementado
const Card = ({ title, text, authorName, onEdit, onDelete }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{text}</p>
            <p><strong>Autor:</strong> {authorName}</p>
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Excluir</button>
        </div>
    );
};

export default Card;

