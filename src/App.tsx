import { Provider } from 'react-redux'
import RouterView from './router/index'
import store from './store';
import './app.scss'

function App() {
  
  return (
    <div className="App">
      <Provider store={store}>
        <RouterView />
      </Provider>
    </div>
  );
}

export default App;
