import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';

function App() {
	return (
		<NoteState>
			<Router>
				<Alert message={"This is amazing react course"} /> 
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
					</Switch>
				</div>
			</Router>
		</NoteState>
	);
}

export default App;
