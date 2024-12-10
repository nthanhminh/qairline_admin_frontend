export type PlaneDto = {
    name: string,
    type: string,
    description: string
}

export type PlaneResponse = PlaneDto & {
    seatLayoutId: {
        id: string
        planeType: string,
        numberOfBusinessSeats: number,
        numberOfPreminumEconomySeats: number,
        numberOfEconomySeats: number,
        numberOfBasicSeats: number,
    }
}

export type Plane = PlaneResponse & {
    id: string
}

export enum EPlaneType {
    A310 = "A310",
    A210 = "A210"
}