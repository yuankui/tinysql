import './App.css'
import { useSelector } from './app/hooks'

function App() {
    const list = useSelector(state => state.list);
    return (
        <div className="App">
            <h1 className="p-2 inline-flex bg-blue-400">hello kitty</h1>
            <ul>
                {
                    list.map(one => {
                        return <li key={one}>{one}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default App
