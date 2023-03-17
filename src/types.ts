import { Dispatch, SetStateAction } from "react"

export type TCell = {
    cell: number,
    selection: string | null
}

export type TMenu = {
    title: string,
    value: boolean,
    setValue: Dispatch<SetStateAction<boolean>>
}