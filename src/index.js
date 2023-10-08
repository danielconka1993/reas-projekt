import { createRoot } from 'react-dom/client';
import './index.css';
import JSApp from './App';

const container = document.getElementById('result')
const root = createRoot(container)

root.render(<JSApp tab="home" />)

