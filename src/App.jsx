import 'bootstrap/dist/css/bootstrap.min.css';
import GameProvider from './context/GameProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import Header from './components/Header';

const App = () => {
	return (
		<GameProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/game' element={<GamePage />} />
				</Routes>
			</BrowserRouter>
		</GameProvider>
	);
};

export default App;
