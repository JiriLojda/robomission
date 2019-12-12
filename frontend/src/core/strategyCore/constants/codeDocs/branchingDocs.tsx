import {DocumentationEntry} from "../../models/docsTypes";
import React from "react";
import Image from "../../../../components/Image";

export const branchingDocs: DocumentationEntry = {
    title: 'branching',
    message: <span>
        Here is how branching looks like in the code editor:<br/>
        <Image imageId="docs/branchingCode.png" height={263} style={{}} />
        <Image imageId="docs/branchingBlockly.png" height={376} style={{}} />
    </span>
};
