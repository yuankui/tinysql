import { BaseRange, Range } from 'slate';
/// <reference types="vite/client" />
interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
}

// TypeScript users only add this code
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string, type?: string }
type CustomRange = { type: string } & BaseRange
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
    Range: CustomRange
  }
}