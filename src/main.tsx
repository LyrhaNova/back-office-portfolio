import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <Router />
  </PrimeReactProvider>
)