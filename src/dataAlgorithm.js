const chales = [
    'Mayra',
    'Caiuã',
    'Nathalia',
    'Trancoso',
    'Master'
];

function procurarDisponibilidade(checkin, checkout, reservas) {
    if (!checkin || !checkout || !reservas || reservas.length === 0) {
        return { hospedesEncontrados: [], chalesDisponiveis: chales.slice() };
    }

    const chalesDisponiveis = chales.slice(); // Faz uma cópia do array de chalés disponíveis
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

            // Verifica se as datas de check-in e check-out fornecidas se sobrepõem com a reserva atual
            if (
                (inputCheckin >= reservaCheckin && inputCheckin < reservaCheckout) ||
                (inputCheckout > reservaCheckin && inputCheckout <= reservaCheckout) ||
                (inputCheckin <= reservaCheckin && inputCheckout >= reservaCheckout)
            ) {
                // Se houver sobreposição, adiciona as informações do hóspede ao array
                hospedesEncontrados.push({
                    responsavel: reserva.responsavelNome,
                    checkin: reserva.checkIn,
                    checkout: reserva.checkOut,
                    chales: reserva.chale
                });

                // Remove o chalé já reservado dos chalés disponíveis
                const index = chalesDisponiveis.indexOf(reserva.chale);
                if (index !== -1) {
                    chalesDisponiveis.splice(index, 1);
                }
            }
        }
    });

    return { hospedesEncontrados, chalesDisponiveis };
}

module.exports = procurarDisponibilidade;
