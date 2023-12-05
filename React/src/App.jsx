import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./custom.scss";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/Profile/UserProfile";
import UserProfileEdit from "./pages/Profile/UserProfileEdit";
import UserChangePassword from "./pages/Profile/UserChangePassword";
import EditCar from "./pages/Profile/Cars/EditCar";
import AddCar from "./pages/Profile/Cars/AddCar";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/profile" element={<UserProfile />} />
				<Route exact path="/profile/edit" element={<UserProfileEdit />} />
				<Route exact path="/profile/changePassword" element={<UserChangePassword />} />
				<Route exact path="/profile/addCar" element={<AddCar />} />
				<Route exact path="/profile/editCar/:id" element={<EditCar />} />
				<Route exact path="/car/:id" element={<CarDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
