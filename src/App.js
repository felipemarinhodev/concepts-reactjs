import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title:"concepts-reactjs",
        url:"https://github.com/felipmarinho/concepts-reactjs.git",
        techs:["Javascript","ReactJS"]
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repository => repository.id === id);
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories;
    newRepositories.splice(index, 1);
    setRepositories([...newRepositories]);
  }

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        console.log(response);
        
        setRepositories(response.data);
      });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
