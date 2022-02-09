import React from 'react';

import MDEditor, { MDEditorProps } from '@uiw/react-md-editor';

export const MarkdownEditor: React.FC<MDEditorProps> = props => (
  <MDEditor height={200} {...props} />
);

const MarkdownPreview: React.FC<{ source: string }> = props => (
  <MDEditor.Markdown {...props} />
);

export default MarkdownPreview;
