import { useEffect } from 'react';
import './App.css';
import Home from './pages/home/Home';
import RouteContainer from './RouteContainer';

function App() {
	useEffect(() => {
		sessionStorage.setItem('apiUrl', 'https://playbook-server-68b4560dd77b.herokuapp.com');
		// sessionStorage.setItem('apiUrl', 'http://localhost:5000');
	}, []);

	return (
		<div className="App">
			<RouteContainer />
		</div>
	);
}

export default App;
