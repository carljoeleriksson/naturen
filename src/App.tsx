import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ProductItemPage from "./pages/ProductItemPage"


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Navbar />
				<main>
					
					<Routes>
						<Route path="/" element={<HomePage />}/>
						<Route path="/product/:id" element={<ProductItemPage />}/>
						<Route path="/about" element={<AboutPage />}/>
					</Routes>
				</main>
				<footer>
					<img src="./assets/img/naturen-icon.png" alt="Naturen Logo" />
					<span>Naturen&reg;</span>
					<span>2022</span>
				</footer>
			</BrowserRouter>
		</div>
	)
}

export default App
