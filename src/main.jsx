import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import CellsProvider from './context/CellsContext';
import SelectionsProvider from './context/SelectionsContext';
import ScoresProvider from "./context/ScoresContext";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider>
			<CellsProvider>
				<SelectionsProvider>
					<ScoresProvider>
						<App />
					</ScoresProvider>
				</SelectionsProvider>
			</CellsProvider>
		</ThemeProvider>
  	</React.StrictMode>
);