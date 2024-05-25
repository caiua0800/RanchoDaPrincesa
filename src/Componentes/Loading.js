import React from "react";
import './styles/Loading.css';

export default function Loading({ load }){

    return (
        <div className={load}>
            <div className="c-loader"></div>
        </div>
    )
}