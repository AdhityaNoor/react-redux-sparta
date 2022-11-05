import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import TaskDetail from "./pages/TaskDetail";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/detail" element={<TaskDetail />} />
                <Route path="/detail/:id" element={<TaskDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;