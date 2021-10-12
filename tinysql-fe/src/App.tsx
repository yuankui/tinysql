import { Tabs } from 'antd';
import './App.css'
const TabPane = Tabs.TabPane;

function App() {
    return <div className='h-screen w-screen flex flex-row'>
        {/* left */}
        <div className='w-72 bg-blue-400 flex flex-col p-4'>
            {/* bar */}
            <div className='h-6 bg-green-400'/>
            {/* connection-list */}
            <div className='flex-1 bg-purple-300 flex flex-col justify-start'>
                {
                    [1,2,3].map(c => {
                        return  <div key={c} className='bg-gray-400 h-52 m-4'/>;
                    })
                }
            </div>
        </div>

        {/* right */}
        <div className='flex-1 bg-white p-4 pt-4'>
            <Tabs defaultActiveKey="1" type="card" size={'middle'}>
                <TabPane tab="Card Tab 1" key="1">
                    Content of card tab 1
                </TabPane>
                <TabPane tab="Card Tab 2" key="2">
                    Content of card tab 2
                </TabPane>
                <TabPane tab="Card Tab 3" key="3">
                    Content of card tab 3
                </TabPane>
            </Tabs>

        </div>
    </div>
}

export default App
