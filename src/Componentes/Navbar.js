import React from "react";
import './styles/Navbar.css'
import { Link } from "react-router-dom";
import { icons } from '../icons'

export default function Navbar({ isLoggedIn }) {

    const appear = isLoggedIn ? 'Navbar' : 'd-none'

    const hosp_icon = ``

    return (
        <div className={appear}>
            <div className="navbar">
                <div className="navBrand"></div>
                <div className="nav-items">
                    <div className="nav-item">
                        <Link to='/cadastrar' className="nav-link sem-icons">Novo Hóspede</Link>
                        <Link to='/cadastrar' className="nav-link icons"><img alt="hospede-icon" src={icons.hospede} /></Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/cadastros' className="nav-link sem-icons">Hóspedes</Link>
                        <Link to='/cadastros' className="nav-link icons"><img alt="Addhospede-icon" src={icons.Addhospede} /></Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/reservar' className="nav-link sem-icons">Nova Reserva</Link>
                        <Link to='/reservar' className="nav-link icons"><img alt="addReserva" src={icons.Reservas} /></Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/reservas' className="nav-link sem-icons">Ver Reservas</Link>
                        <Link to='/reservas' className="nav-link icons"><img alt="Reservas" src={icons.addReserva} /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
