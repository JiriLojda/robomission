import {DocumentationEntry} from "../../models/docsTypes";
import React from "react";
import Image from "../../../../components/Image";

export const actionsDocs: DocumentationEntry = {
    title: 'actions',
    message: <span>
        Here are all the available actions:<br/>
        <Image imageId="docs/actionsCode.png" height={382} style={{}} />
        <Image imageId="docs/actionsBlockly.png" height={306} style={{}} />
    </span>
};
