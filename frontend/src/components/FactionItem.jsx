// src/components/FactionItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FactionItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #34495e;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease, transform 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
    }
`;

const FactionInfo = styled.div`
    max-width: 70%;
    
    h4 {
        margin: 0 0 5px 0;
        color: #f1c40f;
        font-size: 1.4em;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    
    p {
        margin: 0;
        color: #bdc3c7;
        font-size: 1em;
    }
`;

const FactionIcon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    object-fit: cover;
`;

const JoinButton = styled.button`
    padding: 8px 16px;
    background-color: ${({ theme, active }) => active ? theme.colors.active : theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.95em;
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    &:hover {
        background-color: ${({ theme, active }) => active ? theme.colors.active : theme.colors.primaryHover};
        transform: translateY(-2px);
    }
    
    &:disabled {
        background-color: ${({ theme }) => theme.colors.muted};
        cursor: not-allowed;
        transform: none;
    }
`;

const FactionItem = React.memo(({ faction, character, handleJoinFaction, joiningFactionId }) => (
    <FactionItemContainer>
        <FactionInfo>
            <h4>
                <FactionIcon src={faction.iconUrl} alt={`${faction.name} Icon`}/>
                {faction.name}
            </h4>
            <p>{faction.description}</p>
        </FactionInfo>
        {!character.currentFactionId && (
            <JoinButton
                active={character.currentFactionId === faction.id}
                onClick={() => handleJoinFaction(faction.id)}
                disabled={joiningFactionId === faction.id}
            >
                {joiningFactionId === faction.id ? 'Вступление...' : 'Вступить'}
            </JoinButton>
        )}
    </FactionItemContainer>
));

FactionItem.propTypes = {
    faction: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    character: PropTypes.shape({
        currentFactionId: PropTypes.number,
    }).isRequired,
    handleJoinFaction: PropTypes.func.isRequired,
    joiningFactionId: PropTypes.number,
};

export default FactionItem;
