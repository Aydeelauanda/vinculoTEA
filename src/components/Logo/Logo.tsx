import React from 'react';
import styles from './Logo.module.css';
// Importe a imagem aqui
import logoImg from '@/assets/images/logo_vinculo.jpeg'; 

export const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <img 
        src={logoImg}  
        alt="VinculoTEA Logo" 
        className={styles.image}
      />
    </div>
  );
};