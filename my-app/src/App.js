import logo from './logo.svg';
import './App.css';
import Addingstudent from './Addingstudent';
import Addingassignment from './Addingassignemt';
import Submit from './Submit';
import Student_page from './Student_page';

function App() {
  return (
    <div className="App">
      <Addingstudent/>
      <Addingassignment/>
      <Submit/>
      <Student_page/>


            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
