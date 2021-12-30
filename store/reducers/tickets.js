import TicketItem from '../../models/ticket-item';
import { TOGGLE_TICKETS} from '../actions/tickets';

const initialState = {
    selectedTickets: {}
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_TICKETS: 
            const addedTicket = action.ticket;
            const sId = addedTicket.ticketID;
            const seatIdNo = addedTicket.seatNo;
            const passName = addedTicket.name;
            const TicketPrice = addedTicket.fare;
            const dfrom = addedTicket.from;
            const dto = addedTicket.to;

            console.log('Ticket From Within', action.ticket)

            let updateTicketItem;
            if (state.selectedTickets[addedTicket.ticketID]) {
                const selectedSeatItem = state.selectedTickets[sId];
                updateTicketItem = { ...state.selectedTickets };
                delete updateTicketItem[sId];
                return {...state, selectedTickets: updateTicketItem};
            }else{
                updateTicketItem = new TicketItem(sId, passName, seatIdNo, TicketPrice, dfrom, dto);
                return {...state, selectedTickets: { ...state.selectedTickets, [addedTicket.ticketID]: updateTicketItem }};
            }
              
        default: 
            return state;
    }
}

export default ticketReducer;