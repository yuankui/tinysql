import 'codemirror/mode/sql/sql'
import { FunctionComponent } from 'react'
import { UnControlled } from 'react-codemirror2'

interface SqlEditorView2Props {}

const SqlEditorView: FunctionComponent<SqlEditorView2Props> = () => {
    return (
        <UnControlled
            value={"select * from json \nwhere name = 'hello'"}
            options={{
                mode: 'sql',
                theme: 'material',
                lineNumbers: true,
            }}
            onChange={(editor, data, value) => {}}
        />
    )
}

export default SqlEditorView
