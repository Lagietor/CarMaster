import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./custom.scss";
import Header from "./components/Header/Header"
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/car/:id" element={<CarDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
