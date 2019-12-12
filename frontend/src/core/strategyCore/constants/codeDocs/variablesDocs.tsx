import {DocumentationEntry} from "../../models/docsTypes";
import Image from "../../../../components/Image";
import React from "react";

export const variablesDocs: DocumentationEntry = {
    title: 'variables',
    message: <span>
        Here is how to create and use variables:<br/>
        <Image imageId="docs/variablesCode.png" height={154} style={{}} />
        <Image imageId="docs/variablesBlockly.png" height={293} style={{}} />
    </span>
};