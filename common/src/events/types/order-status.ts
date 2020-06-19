export enum OrderStatus {
    Created = 'created', // ticket excists but has not been reserved
    Cancelled = 'cancelled', // reserve attemped and failed or user cancelled
    AwaitingPayment = 'awaiting:payment',  // order hs been reserved
    Complete = 'complete' // user provided payment
}