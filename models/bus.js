class Bus {
    constructor(id, terminal, departure, arrival, fare, seat, lseat, service, from, to){
        this.id = id;
        this.terminal = terminal;
        this.departure = departure;
        this.arrival = arrival;
        this.fare = fare;
        this.seat = seat;
        this.lseat = lseat;
        this.service = service;
        this.from = from;
        this.to = to;
    }
}

export default Bus;