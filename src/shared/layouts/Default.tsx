import React from 'react'

interface Props {
    children: React.ReactNode;
}

export const Default: React.FC<Props> = ({ children }) => {
    return (
        <>
            <header></header>
            <main className='main--default'>
                { children }
            </main>
            <footer></footer>
        </>
    );
};