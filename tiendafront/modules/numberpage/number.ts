export const setNumberPage = (id: number): void => {
    sessionStorage.removeItem('page');
    sessionStorage.setItem('page', id.toString());
}
export const getNumberPage = (): number => {
    let data = sessionStorage.getItem('page');
    if (data != null) {
        return Number.parseInt(data);
    }
    return 0;
}