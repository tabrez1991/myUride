export const formatDate = (date: string) => {
    const parts = date.split('/');
    const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
}