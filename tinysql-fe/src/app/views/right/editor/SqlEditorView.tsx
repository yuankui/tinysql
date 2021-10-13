import { Editor, EditorSelectionChange } from 'codemirror'
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
                gutters: ['run'],
            }}
            onSelection={(editor: Editor, data: EditorSelectionChange) => {
                const lines = data.ranges
                    .filter(
                        (r) =>
                            r.anchor.line !== r.head.line ||
                            r.anchor.ch !== r.head.ch
                    )
                    .map((r) => Math.min(r.anchor.line, r.head.line))

                if (lines.length === 0) {
                    return;
                }
                const minLine = lines.reduce((l, r) => Math.min(l, r))

                const span = document.createElement('span')
                span.className = 'bg-blue-400 flex w-4 h-4'
                editor.clearGutter('run');
                editor.setGutterMarker(minLine, 'run', span)
            }}
            onChange={(editor, data, value) => {}}
        />
    )
}

export default SqlEditorView
