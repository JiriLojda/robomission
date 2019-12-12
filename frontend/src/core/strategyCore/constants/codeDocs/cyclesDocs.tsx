import {DocumentationEntry} from "../../models/docsTypes";
import React from "react";
import Image from "../../../../components/Image";

export const cyclesDocs: DocumentationEntry = {
    title: 'cycles',
    message: <span>
        Here are all the available cycles:<br/>
        <Image imageId="docs/cyclesCode.png" height={215} style={{}} />
        <Image imageId="docs/cyclesBlockly.png" height={289} style={{}} />
    </span>
};
