import React from "react";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

const Widgets = ({ store }) => (
    <Editor
        value={store}
        onChange={(e) => console.log('e', e)}
    />
);

export default Widgets;
