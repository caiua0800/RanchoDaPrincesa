import React from "react";
import './styles/Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="navbar">
                <div className="navBrand"></div>
                <div className="nav-items">
                    <div className="nav-item">
                        <Link to='/cadastrar' className="nav-link">Novo Hóspede</Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/cadastros' className="nav-link">Hóspedes</Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/reservar' className="nav-link">Nova Reserva</Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/reservas' className="nav-link">Ver Reservas</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}