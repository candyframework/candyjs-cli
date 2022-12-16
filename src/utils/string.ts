export const ucFirst = (str: string): string => {
    let ret = str.charAt(0).toUpperCase();

    return ret + str.substring(1);
}
