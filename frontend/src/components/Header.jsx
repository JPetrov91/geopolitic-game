// src/components/Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from './Avatar';
import MyFaction from './MyFaction';

// Стилизация контейнера хедера
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    width: 100%;
    padding: 10px 20px;
    background-color: rgba(44, 62, 80, 0.8);
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        height: 20%;
    }
`;

// Стилизация строки хедера
const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

// Стилизация левой секции хедера
const LeftSection = styled.div`
    display: flex;
    align-items: center;
`;

// Стилизация правой секции хедера
const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

// Стилизация информации о персонаже
const CharacterInfo = styled.div`
    margin-left: 10px;
    color: #bdc3c7;

    h2 {
        margin: 0 0 5px 0;
        font-size: 1.2em;
    }

    p {
        margin: 0;
        font-size: 1em;
    }
`;

// Стилизация кнопки выхода
const LogoutButton = styled.button`
    padding: 8px 16px;
    background-color: #e74c3c; /* Красный цвет для кнопки выхода */
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease;
    margin-left: 10px;

    &:hover {
        background-color: #c0392b;
    }
`;

const Header = ({ character, onLogout }) => (
    <HeaderContainer>
        <HeaderRow>
            <LeftSection>
                {character ? (
                    <Avatar nickname={character.nickname} avatarUrl={character.avatar} />
                ) : (
                    <div>
                        <img src="/images/avatar.png" alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <span style={{ marginLeft: '10px', color: '#fff' }}>Без персонажа</span>
                    </div>
                )}
                <CharacterInfo>
                    {character ? (
                        <>
                            {/*<h2>Имя: {character.nickname}</h2>*/}
                            {/*<p>Текущий регион: {character.currentRegionName}</p>*/}
                        </>
                    ) : (
                        <p>У вас пока нет персонажа.</p>
                    )}
                </CharacterInfo>
            </LeftSection>
            <RightSection>
                {character && <MyFaction character={character} />}
                <LogoutButton onClick={onLogout}>Выйти</LogoutButton>
            </RightSection>
        </HeaderRow>
    </HeaderContainer>
);

Header.propTypes = {
    character: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
};

export default Header;
