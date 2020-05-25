export function createAppointment(event, qtde_reservas) {
    return {
        type: '@reserva/CREATE_APPOINTMENT',
        payload: { event, qtde_reservas },
    };
}




