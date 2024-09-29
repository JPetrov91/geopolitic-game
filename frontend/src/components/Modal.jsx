// src/components/Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Стилизация фонового оверлея
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Темный полупрозрачный фон */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Высокий z-index для поверх всех элементов */
`;

// Стилизация содержимого модального окна
const ModalContent = styled(motion.div)`
    background-color: #2c3e50; /* Тёмный фон для модального окна */
    color: #ecf0f1; /* Светлый текст */
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    position: relative;
    font-family: 'Roboto', sans-serif; /* Контрастный шрифт для основного текста */
`;

// Стилизация кнопки закрытия модального окна
const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: #ecf0f1;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #e74c3c; /* Красный цвет при наведении */
    }
`;

// Анимации для оверлея и содержимого
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -50 },
};

const Modal = ({ isOpen, onClose, children }) => {
    if (typeof document === 'undefined') return null; // Для SSR

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <Overlay
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <ModalContent
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике внутри модала
                    >
                        <CloseButton onClick={onClose} aria-label="Закрыть модал">
                            &times;
                        </CloseButton>
                        {children}
                    </ModalContent>
                </Overlay>
            )}
        </AnimatePresence>,
        document.getElementById('modal-root') // Убедитесь, что 'modal-root' существует
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
