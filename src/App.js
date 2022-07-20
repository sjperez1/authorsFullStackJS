import './App.css';
import {Routes, Route} from "react-router-dom"
import Dashboard from './views/Dashboard';
import Update from './views/Update';
import AuthorForm from './components/AuthorForm';
function App() {
  return (
    <div className="App">
      <h1>Favorite authors</h1>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/new" element={<AuthorForm/>} />
        <Route path="/edit/:id" element={<Update/>} />
      </Routes>
    </div>
  );
}

export default App;
