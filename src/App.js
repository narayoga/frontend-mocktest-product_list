import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/register';
import Paging from './pages/pagination';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/pagination' element={<Paging />} />
      </Routes>
    </div>
  );
}

export default App;
