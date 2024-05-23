import React from "react";
import './styles/Container.css'

export default function Container(props){
    const {children} = props;
    return (
        <div className="Container">
            {children}
        </div>
    )
}