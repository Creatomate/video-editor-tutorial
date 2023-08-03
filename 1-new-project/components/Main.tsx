import React from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export const Main: React.FC = () => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      This is the empty starter project we will use for the tutorial.
    </main>
  );
};
