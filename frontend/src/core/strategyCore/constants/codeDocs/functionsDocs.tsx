import {DocumentationEntry} from "../../models/docsTypes";
import Image from "../../../../components/Image";
import React from "react";

export const functionsDocs: DocumentationEntry = {
    title: 'functions',
    message: <span>
        Here is how to use functions:<br/>
        <Image imageId="docs/functionsCode.png" height={479} style={{}} />
        <Image imageId="docs/functionsBlockly.png" height={589} style={{}} />
    </span>
};