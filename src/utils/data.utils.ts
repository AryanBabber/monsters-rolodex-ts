export const getData = async<T>(url:string): Promise<T> => {
    const resp = await fetch(url);
    return await resp.json();
}