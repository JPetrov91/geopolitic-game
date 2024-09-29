// src/components/AddItemModal.jsx

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { SubmitButton, Input } from './StyledComponents'; // Общие стили

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #2c3e50;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
    color: #ecf0f1;
    position: relative;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const ModalTitle = styled.h3`
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8em;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: #ecf0f1;
    font-size: 1.5em;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #e74c3c;
    }
`;

const SelectField = styled.select`
    padding: 8px;
    border: 1px solid #34495e;
    border-radius: 5px;
    background-color: rgba(236, 240, 241, 0.2);
    color: #ecf0f1;
    font-size: 1em;
    margin-bottom: 20px;

    &:focus {
        outline: none;
        border-color: #e74c3c;
    }
`;

const AddItemModal = ({ isOpen, onClose, onSubmit, newItem, onChange, isSubmitting }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <CloseButton onClick={onClose} aria-label="Закрыть модальное окно">
                    <FaTimes />
                </CloseButton>
                <ModalTitle id="modal-title">Выставить товар на продажу</ModalTitle>
                <form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Название товара"
                        value={newItem.name}
                        onChange={onChange}
                        required
                        aria-label="Название товара"
                    />
                    <Input
                        type="number"
                        name="quantity"
                        placeholder="Количество"
                        value={newItem.quantity}
                        onChange={onChange}
                        min="1"
                        required
                        aria-label="Количество"
                    />
                    <Input
                        type="number"
                        name="price"
                        placeholder="Цена за единицу (₽)"
                        value={newItem.price}
                        onChange={onChange}
                        min="0"
                        step="0.01"
                        required
                        aria-label="Цена за единицу"
                    />
                    {/* Добавлено поле выбора типа товара */}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="type" style={{ display: 'block', marginBottom: '5px', color: '#ecf0f1', fontWeight: 'bold' }}>
                            Тип товара:
                        </label>
                        <SelectField
                            id="type"
                            name="type"
                            value={newItem.type}
                            onChange={onChange}
                            required
                            aria-label="Тип товара"
                        >
                            <option value="">Выберите тип</option>
                            <option value="Ресурсы">Ресурсы</option>
                            <option value="Оружие">Оружие</option>
                        </SelectField>
                    </div>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Создание...' : 'Создать'}
                    </SubmitButton>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
};

AddItemModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newItem: PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        type: PropTypes.string, // Добавлено поле type
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
};

AddItemModal.defaultProps = {
    isSubmitting: false,
};

export default AddItemModal;
