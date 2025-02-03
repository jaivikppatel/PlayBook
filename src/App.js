import { useEffect } from 'react';
import './App.css';
import Home from './pages/home/Home';
import RouteContainer from './RouteContainer';

function App() {
	useEffect(() => {
		sessionStorage.setItem('apiUrl', 'https://playbook-server-08d8a72fc897.herokuapp.com');
	}, []);

	return (
		<div className="App">
			<RouteContainer />
		</div>
	);
}

export default App;
