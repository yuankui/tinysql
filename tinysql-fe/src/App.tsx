import './App.css';
import ConnectionListView from './app/views/left/ConnectionListView';
import SiderActionView from './app/views/left/SiderActionView';
import ContentView from './app/views/right/ContentView';

function App() {
    return <div className='h-screen w-screen flex flex-row select-none'>
        {/* left */}
        <div className='w-1/4 bg-gray-50 flex flex-col p-4'>
            <SiderActionView/>
            <ConnectionListView/>
        </div>

        {/* right */}
        <div className='flex-1 bg-white p-4 pt-4 overflow-x-auto'>
            <ContentView/>
        </div>
    </div>
}

export default App
