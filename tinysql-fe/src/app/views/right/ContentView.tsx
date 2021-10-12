import { Tabs } from "antd";
import { FunctionComponent } from "react";

interface ContentViewProps {
    
}
 
const ContentView: FunctionComponent<ContentViewProps> = () => {
    return <Tabs defaultActiveKey="1" type="card" size={'middle'}>
        <Tabs.TabPane tab="Card Tab 1" key="1">
            Content of card tab 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Card Tab 2" key="2">
            Content of card tab 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Card Tab 3" key="3">
            Content of card tab 3
        </Tabs.TabPane>
    </Tabs>
}
 
export default ContentView;