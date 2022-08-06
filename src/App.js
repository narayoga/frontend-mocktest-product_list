import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/register';
// import Edit from './component/modal-edit';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/product/:id' element={<Edit />} /> */}
      </Routes>
    </div>
  );
}

export default App;
