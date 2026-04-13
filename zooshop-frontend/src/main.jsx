import { createRoot } from 'react-dom/client';
import { Zooshop } from './Zooshop.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Zooshop />
		</Provider>
	</BrowserRouter>,
);
