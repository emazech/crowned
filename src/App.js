import './App.css';
import Login from './Login';
import Crown from './assets/crown.png';
import Icon from './assets/icon.png';

function App() {
  return (
    <div className="App">
      <div className="side">
      <img src={Crown} alt='CrownIcon' className='crown-icon' />
      <p className='crown'>WELCOME TO CROWNED</p>
        <img src={Icon} alt='GameIcon'></img>
      </div>
      <Login />
    </div>
  );
}

export default App;
