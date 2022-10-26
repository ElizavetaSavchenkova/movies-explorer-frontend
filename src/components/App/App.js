import { Switch, Route } from 'react-router-dom';

import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div >
  );
}

export default App;


