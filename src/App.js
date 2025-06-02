import './App.css';
import TodoList from './component/todolist';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './component/home';
function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
