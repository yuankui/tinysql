import Prism from 'prismjs'
import 'prismjs/components/prism-sql'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Range, Text } from 'slate'
import { Editable, RenderLeafProps, Slate, withReact } from 'slate-react'

interface SqlEditorViewProps {}

const SqlEditorView: FunctionComponent<SqlEditorViewProps> = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    // Add the initial value when setting up our state.
    const [value, setValue] = useState<Descendant[]>([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ])

    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const getLength = (token: any) => {
        if (typeof token === 'string') {
            return token.length
        } else if (typeof token.content === 'string') {
            return token.content.length
        } else {
            return token.content.reduce((l: any, t: any) => l + getLength(t), 0)
        }
    }

    const decorate = useCallback(([node, path]) => {
        const ranges: Range[] = []
        if (!Text.isText(node)) {
            return ranges
        }
        const tokens = Prism.tokenize(node.text, Prism.languages.sql)
        let start = 0

        for (const token of tokens) {
            const length = getLength(token)
            const end = start + length

            if (typeof token !== 'string') {
                ranges.push({
                    type: token.type,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                })
            }

            start = end
        }

        return ranges
    }, [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}
        >
            <Editable className='bg-white min-h-4' decorate={decorate} renderLeaf={renderLeaf} />
        </Slate>
    )
}

const colorMap: {[key:string]: string} = {
    comment: 'slategray',
    operator: '#9a6e3a',
    url: '#9a6e3a',
    keyword: '#07a',
    variable: '#e90',
    regex: '#e90',
    number: '#905',
    boolean: '#905',
    tag: '#905',
    'attr-name': '#905',
    constant: '#905',
    symbol: '#905',
    selector: '#905',
    punctuation: '#999',
    string: '#690',
    char: '#690',
    function: '#dd4a68',
    'class-name': '#dd4a68',
};
const Leaf: FunctionComponent<RenderLeafProps> = ({ attributes, children, leaf }) => {
    const color = colorMap[leaf.type || '']

    return (
      <span
        {...attributes}
        className='font-mono'
        style={{
            color: color || 'black',
        }}
      >
        {children}
      </span>
    )
  }

export default SqlEditorView
