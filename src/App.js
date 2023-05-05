
import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import SignIn from './SignIn';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (loggedIn) {
    return (
      <div>
        <Header setLoggedIn={setLoggedIn}/>
        <Main />
      </div>
    )
  } else {
  return (
    <div>
      <SignIn setLoggedIn={setLoggedIn}/>
    </div>
  );}
}

export default App;
