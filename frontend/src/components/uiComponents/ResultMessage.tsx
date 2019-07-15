import React from "react";

interface IProps {
    children?: string;
    type: ResultMessageType;
}

export enum ResultMessageType {
    Success = 'success',
    Draw = 'warning',
    Bad = 'danger',
}

export const ResultMessage: React.ComponentType<IProps> = (props: IProps) =>
    props.children ?
        <span className={`alert alert-${props.type}`} style={{display: 'block'}}>
        {props.children}
    </span> : null;
