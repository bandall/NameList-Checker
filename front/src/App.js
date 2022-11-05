import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navibar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { getLoggedIn } from "./components/functions";
import Logout from "./components/Logout/Logout";
import List from "./components/List/List";
function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	
	const isLoggedIn = async() => {
		const res = await getLoggedIn();
		console.log(res);
		if(res) {
			setLoggedIn(true);
			localStorage.setItem("loggedIn", "true");
		} else {
			setLoggedIn(false);
			localStorage.setItem("loggedIn", "false");
		}
	}

	useEffect(()=> {
		isLoggedIn();
	}, [])

	return (
		<div>
		<Navibar loggedIn={loggedIn}/>
			<Routes>
				<Route path="/" element={<Home loggedIn={loggedIn}/>} />
				<Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
				<Route path="/logout" element={<Logout setLoggedIn={setLoggedIn}/>} />
				<Route path="/list" element={<List loggedIn={loggedIn}/>} />
			</Routes>
		</div>
	);
}

export default App;
