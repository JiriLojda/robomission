declare module 'react-blockly-component' {
    import React from 'react';

    type Block = { type: string; fields?: any }
    interface IProps {
        workspaceConfiguration: { trashcan: boolean, collapse: boolean };
        toolboxCategories: {name: string, blocks: Block[]}[];
        initialXml: any;
        xmlDidChange: (e: any) => void;
        wrapperDivClassName: string;
    }

    export class BlocklyEditor extends React.Component<IProps> {
        public resize: () => void;
        public importFromXml: (xml: string) => void;
        public refs: any;
    }
}

declare module "react-router-relative-link";
