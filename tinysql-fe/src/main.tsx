import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { commandMiddleware, commandReducer } from 'redux-commands'
import App from './App'
import { AppInitCommand } from './app/commands/AppInitCommand'
import { AppState } from './app/model'
import './index.css'
import 'antd/dist/antd.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    commandReducer<AppState>(),
    composeEnhancers(applyMiddleware(commandMiddleware))
)

;(async () => {
    await store.dispatch(new AppInitCommand())
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
})()
