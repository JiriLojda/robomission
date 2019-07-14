import React from "react";

interface IProps {
    children?: string;
    isSuccess: boolean;
}

export const ResultMessage: React.ComponentType<IProps> = (props: IProps) =>
    props.children ?
        <span className={`alert alert-${props.isSuccess ? 'success' : 'danger'}`} style={{display: 'block'}}>
        {props.children}
    </span> : null;
