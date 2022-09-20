
export const SERVER = 'http://localhost:4000'

export function setInputState(setState: (val: string) => void) {
    return function (e: any) {
        const value = e.currentTarget.value;
        setState(value);
    }
}
export const setDropDownState = (setState: any) => (e: any, data: any) => {
    setState(data.value);
}
export function onRowClick(setState: any) {
    return function (value: number) {
        setState((prev: number) => {
            if (prev === value) {
                return 0;
            }
            return value;
        })
    }
}