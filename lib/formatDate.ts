export const formatDate = (date: string) => {
    const parts = date.split('/');
    const formattedDate: any = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
}