import React from 'react'

interface Props {
    children: React.ReactNode;
}

export const Home: React.FC<Props> = ({ children }) => {
    return (
        <>
            <header></header>
            <main className="main--home">
                { children }
            </main>
            <footer></footer>
        </>
    );
};