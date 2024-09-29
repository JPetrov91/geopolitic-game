// frontend/src/components/CharactersList.js

import React, { useEffect, useState } from 'react';
import api from '../api';

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        api.get('/characters')
            .then(response => setCharacters(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Список Персонажей</h1>
            <ul>
                {characters.map(char => (
                    <li key={char.id}>{char.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharactersList;
