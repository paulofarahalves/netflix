import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Watch from './pages/Watch';
import VideoContext from './contexts/VideoContext';
import ModalContext from './contexts/ModalContext';

const App = () => {
	const [video, setVideo] = useState({});
	const [openModal, setOpenModal] = useState(false);

	return (
		<ModalContext.Provider value={{ openModal, setOpenModal }}>
			<VideoContext.Provider value={{ video, setVideo }}>
				<Routes>
					<Route path="/netflix/" element={<Home />} />
					<Route path="/netflix/watch/:id" element={<Watch />} />
				</Routes>
			</VideoContext.Provider>
		</ModalContext.Provider>
	);
};

export default App;
