class Seat {
    constructor(id, position, seatNo, showStatus, bookStatus, price, blockSeat){
        this.id = id;
        this.position = position;
        this.seatNo = seatNo;
        this.showStatus = showStatus;
        this.bookStatus = bookStatus;
        this.price = price;
        this.blockSeat = blockSeat;
    }
}

export default Seat;