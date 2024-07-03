import React from "react";
import { Routes, Route } from "react-router-dom";
import { Panel, Welcome } from "../pages";
import { SocketConext } from "../shared/hooks/socketContext";

const AppRoutes = () => {
    return (
        <SocketConext>
            <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/:id" element={<Panel />}/>
                <Route path="*" element={<Welcome />}/>
            </Routes>
        </SocketConext>
    );
};

export default AppRoutes;
