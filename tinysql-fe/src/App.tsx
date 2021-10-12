import './App.css';
import CollectionListView from './app/views/left/CollectionListView';
import ContentView from './app/views/right/ContentView';
import SiderActionView from './app/views/SiderActionView';

function App() {
    return <div className='h-screen w-screen flex flex-row'>
        {/* left */}
        <div className='w-72 bg-white flex flex-col p-4'>
            <SiderActionView/>
            <CollectionListView/>
        </div>

        {/* right */}
        <div className='flex-1 bg-gray-200 p-4 pt-4'>
            <ContentView/>
        </div>
    </div>
}

export default App
