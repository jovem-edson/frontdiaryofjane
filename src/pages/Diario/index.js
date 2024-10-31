import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import Card from '../../components/card';

export default function Diario() {
    const [txtAnotacao, setTxtAnotacao] = useState('');
    const [dataAnotacao, setDataAnotacao] = useState(new Date().toISOString().split('T')[0]);
    const [nomeAutor, setNomeAutor] = useState(''); // Altere para armazenar o nome do autor
    const [autores, setAutores] = useState([]);
    const [anotacoes, setAnotacoes] = useState([]);
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const anotacoesResponse = await axios.get('http://localhost:3000/diario');
                setAnotacoes(anotacoesResponse.data);

                const autoresResponse = await axios.get('http://localhost:3000/autores');
                setAutores(autoresResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const salvarAnotacao = async () => {
        const novaAnotacao = {
            txt_anotacao: txtAnotacao,
            dt_anotacao: dataAnotacao,
            nome_autor: nomeAutor, // Altere para salvar o nome do autor
        };

        try {
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/diario/${editando.id}`, novaAnotacao);
                console.log('Anotação editada:', response.data);
                
                setAnotacoes(anotacoes.map(anotacao => anotacao.id === editando.id ? { ...anotacao, ...novaAnotacao } : anotacao));
                setEditando(null);
            } else {
                response = await axios.post('http://localhost:3000/diario', novaAnotacao);
                console.log('Anotação adicionada:', response.data);
                
                setAnotacoes([...anotacoes, { id: response.data.novoId, ...novaAnotacao }]);
            }

            setTxtAnotacao('');
            setDataAnotacao(new Date().toISOString().split('T')[0]);
            setNomeAutor(''); // Limpe o campo do autor
        } catch (error) {
            console.error('Erro ao adicionar ou editar anotação:', error);
        }
    };

    const editarAnotacao = (anotacao) => {
        setTxtAnotacao(anotacao.txt_anotacao);
        setDataAnotacao(anotacao.dt_anotacao);
        setNomeAutor(anotacao.nome_autor); // Defina o nome do autor para edição
        setEditando(anotacao);
    };

    const excluirAnotacao = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/diario/${id}`);
            setAnotacoes(anotacoes.filter(anotacao => anotacao.id !== id));
            console.log(`Anotação ${id} excluída.`);
        } catch (error) {
            console.error('Erro ao excluir anotação:', error);
        }
    };

    return (
        <div className='container'>
            <Cabecalho />
            <h1>Diário</h1>
            <div className='form'>
                <div>
                    <label>Anotação</label>
                    <input
                        type='text'
                        value={txtAnotacao}
                        onChange={e => setTxtAnotacao(e.target.value)}
                    />
                </div>
                <div>
                    <label>Data</label>
                    <input
                        type='date'
                        value={dataAnotacao}
                        onChange={e => setDataAnotacao(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nome do Autor</label>
                    <input
                        type='text'
                        value={nomeAutor}
                        onChange={e => setNomeAutor(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={salvarAnotacao}>
                        {editando ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
            </div>
            <div className="card-container">
                {anotacoes.map(anotacao => (
                    <Card 
                        key={anotacao.id} 
                        title={anotacao.txt_anotacao}
                        text={anotacao.dt_anotacao} // Removida a formatação de data
                        authorName={anotacao.nome_autor || 'Autor Desconhecido'}
                        onEdit={() => editarAnotacao(anotacao)}
                        onDelete={() => excluirAnotacao(anotacao.id)}
                    />
                ))}
            </div>
            <Rodape />
        </div>
    );
}
