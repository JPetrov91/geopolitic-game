// src/components/FactionModalContent.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Стилизация контейнера содержимого модального окна
const ModalContentContainer = styled(motion.div)`
    padding: 20px;
    color: #ecf0f1;
    font-family: 'Roboto', sans-serif;
`;

// Стилизация заголовка фракции
const FactionTitle = styled.h2`
    color: #ffcc00; /* Золотистый цвет для заголовка */
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    font-family: 'Creepster', cursive; /* Игровой шрифт */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация аватара фракции в модальном окне
const FactionAvatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    margin: 0 auto 20px auto;
    box-shadow: 0 0 10px rgba(255, 204, 0, 0.7); /* Золотистая тень */
`;

// Стилизация описания фракции
const FactionDescription = styled.p`
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 10px;
`;

// Стилизация информации о датах
const FactionDates = styled.p`
    font-size: 0.9rem;
    margin-bottom: 10px;
`;

// Стилизация заголовка списка участников
const MembersTitle = styled.h3`
    margin-top: 20px;
    color: #ffcc00;
    font-size: 1.5rem;
    font-family: 'Creepster', cursive;
`;

// Стилизация списка участников
const MembersList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// Стилизация элемента списка участников
const MemberItem = styled.li`
    padding: 5px 0;
    border-bottom: 1px solid #444;
    font-family: 'Roboto', sans-serif;
    
    &:hover {
        background-color: #3a3a3a;
        border-radius: 4px;
    }
`;

const FactionModalContent = ({ faction }) => (
    <ModalContentContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
    >
        <FactionTitle>{faction.name}</FactionTitle>
        <FactionAvatar src={faction.imageUrl} alt={`${faction.name} Avatar`} />
        <FactionDescription><strong>Описание:</strong> {faction.description}</FactionDescription>
        <FactionDates><strong>Дата создания:</strong> {new Date(faction.createdAt).toLocaleString()}</FactionDates>
        <FactionDates><strong>Дата обновления:</strong> {new Date(faction.updatedAt).toLocaleString()}</FactionDates>
        <MembersTitle>Участники:</MembersTitle>
        <MembersList>
            {faction.memberIds && faction.memberIds.length > 0 ? (
                faction.memberIds.map(memberId => (
                    <MemberItem key={memberId}>Персонаж #{memberId}</MemberItem>
                ))
            ) : (
                <MemberItem>Нет участников.</MemberItem>
            )}
        </MembersList>
    </ModalContentContainer>
);

FactionModalContent.propTypes = {
    faction: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        memberIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
};

export default FactionModalContent;
