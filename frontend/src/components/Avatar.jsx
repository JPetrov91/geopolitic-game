// src/components/Avatar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Стилизация контейнера аватара
const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
`;

// Стилизация изображения аватара
const AvatarImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

// Стилизация имени аватара
const Nickname = styled.span`
    margin-left: 10px;
    color: #fff;
    font-size: 1em;
`;

const Avatar = ({ nickname, avatarUrl }) => (
    <AvatarContainer>
        <AvatarImage src={avatarUrl} alt={`${nickname} Avatar`} />
        <Nickname>{nickname}</Nickname>
    </AvatarContainer>
);

Avatar.propTypes = {
    nickname: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
};

export default Avatar;
