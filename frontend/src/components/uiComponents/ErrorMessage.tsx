import React from "react";

interface IProps {
    children?: string;
}

export const ErrorMessage: React.SFC<IProps> = (props: IProps) =>
    props.children ?
    <span className="alert alert-danger">
        {props.children}
    </span> : null;
