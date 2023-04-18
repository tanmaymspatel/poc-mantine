import { Routes, Route } from "react-router-dom"
import MainView from "../../components/MainView"
import UserDetails from "../../components/UserDetails";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/dashboard" element={<MainView />} />
            <Route path="/dashboard/:id" element={<UserDetails />} />
        </Routes>
    )
};

export default Routing;
