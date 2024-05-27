const chales = [
    'Mayra',
    'Caiuã',
    'Luana',
    'Trancoso',
    'Master'
];

function procurarDisponibilidade(checkin, checkout, reservas) {
    if (!checkin || !checkout || !reservas || reservas.length === 0) {
        return { hospedesEncontrados: [], chalesDisponiveis: chales.slice() };
    }

    const chalesDisponiveis = chales.slice();
    const hospedesEncontrados = [];

    reservas.forEach(reserva => {
        if (reserva && reserva.checkIn && reserva.checkOut && reserva.chale) {
            const [reservaCheckinDia, reservaCheckinMes, reservaCheckinAno] = reserva.checkIn.split('/');
            const [reservaCheckoutDia, reservaCheckoutMes, reservaCheckoutAno] = reserva.checkOut.split('/');
            const reservaCheckinISO = `${reservaCheckinAno}-${reservaCheckinMes}-${reservaCheckinDia}`;
            const reservaCheckoutISO = `${reservaCheckoutAno}-${reservaCheckoutMes}-${reservaCheckoutDia}`;

            const [inputCheckinDia, inputCheckinMes, inputCheckinAno] = checkin.split('/');
            const [inputCheckoutDia, inputCheckoutMes, inputCheckoutAno] = checkout.split('/');
            const inputCheckinISO = `${inputCheckinAno}-${inputCheckinMes}-${inputCheckinDia}`;
            const inputCheckoutISO = `${inputCheckoutAno}-${inputCheckoutMes}-${inputCheckoutDia}`;

            const reservaCheckin = new Date(reservaCheckinISO);
            const reservaCheckout = new Date(reservaCheckoutISO);
            const inputCheckin = new Date(inputCheckinISO);
            const inputCheckout = new Date(inputCheckoutISO);

            if (
                (inputCheckin >= reservaCheckin && inputCheckin < reservaCheckout) ||
                (inputCheckout > reservaCheckin && inputCheckout <= reservaCheckout) ||
                (inputCheckin <= reservaCheckin && inputCheckout >= reservaCheckout)
            ) {
                // Verificar se há vírgula na string de chalés
                if (reserva.chale.includes(',')) {
                    // Se houver vírgula, dividir a string em um array de chalés
                    const chalesReserva = reserva.chale.split(',').map(chale => chale.trim());
                    chalesReserva.forEach(chale => {
                        hospedesEncontrados.push({
                            responsavel: reserva.responsavelNome,
                            checkin: reserva.checkIn,
                            checkout: reserva.checkOut,
                            chales: chale
                        });
                        const index = chalesDisponiveis.indexOf(chale);
                        if (index !== -1) {
                            chalesDisponiveis.splice(index, 1);
                        }
                    });
                } else {
                    // Se não houver vírgula, tratar como um único chalé
                    hospedesEncontrados.push({
                        responsavel: reserva.responsavelNome,
                        checkin: reserva.checkIn,
                        checkout: reserva.checkOut,
                        chales: reserva.chale
                    });
                    const index = chalesDisponiveis.indexOf(reserva.chale);
                    if (index !== -1) {
                        chalesDisponiveis.splice(index, 1);
                    }
                }
            }
        }
    });

    return { hospedesEncontrados, chalesDisponiveis };
}

function verificarDisponibilidade(checkin, checkout, chalesParaVerificar, reservas) {
    if (!checkin || !checkout || !reservas || reservas.length === 0 || !chalesParaVerificar || chalesParaVerificar.length === 0) {
        return { indisponiveis: [], hospedesEncontrados: [], chalesDisponiveis: chales.slice() };
    }

    const chalesDisponiveis = chales.slice(); // Faz uma cópia do array de chalés disponíveis
    const hospedesEncontrados = [];
    const indisponiveis = [];

    reservas.forEach(reserva => {
        if (reserva && reserva.checkIn && reserva.checkOut && reserva.chale) {
            const [reservaCheckinDia, reservaCheckinMes, reservaCheckinAno] = reserva.checkIn.split('/');
            const [reservaCheckoutDia, reservaCheckoutMes, reservaCheckoutAno] = reserva.checkOut.split('/');
            const reservaCheckinISO = `${reservaCheckinAno}-${reservaCheckinMes}-${reservaCheckinDia}`;
            const reservaCheckoutISO = `${reservaCheckoutAno}-${reservaCheckoutMes}-${reservaCheckoutDia}`;

            const [inputCheckinDia, inputCheckinMes, inputCheckinAno] = checkin.split('/');
            const [inputCheckoutDia, inputCheckoutMes, inputCheckoutAno] = checkout.split('/');
            const inputCheckinISO = `${inputCheckinAno}-${inputCheckinMes}-${inputCheckinDia}`;
            const inputCheckoutISO = `${inputCheckoutAno}-${inputCheckoutMes}-${inputCheckoutDia}`;

            const reservaCheckin = new Date(reservaCheckinISO);
            const reservaCheckout = new Date(reservaCheckoutISO);
            const inputCheckin = new Date(inputCheckinISO);
            const inputCheckout = new Date(inputCheckoutISO);

            if (
                (inputCheckin >= reservaCheckin && inputCheckin < reservaCheckout) ||
                (inputCheckout > reservaCheckin && inputCheckout <= reservaCheckout) ||
                (inputCheckin <= reservaCheckin && inputCheckout >= reservaCheckout)
            ) {
                const chalesReserva = reserva.chale.includes(',')
                    ? reserva.chale.split(',').map(chale => chale.trim())
                    : [reserva.chale];

                chalesReserva.forEach(chale => {
                    if (chalesParaVerificar.includes(chale)) {
                        hospedesEncontrados.push({
                            responsavel: reserva.responsavelNome,
                            checkin: reserva.checkIn,
                            checkout: reserva.checkOut,
                            chales: chale
                        });
                        const index = chalesDisponiveis.indexOf(chale);
                        if (index !== -1) {
                            chalesDisponiveis.splice(index, 1);
                        }
                        if (!indisponiveis.includes(chale)) {
                            indisponiveis.push(chale);
                        }
                    }
                });
            }
        }
    });

    return { indisponiveis, hospedesEncontrados, chalesDisponiveis };
}

module.exports = { procurarDisponibilidade, verificarDisponibilidade };
