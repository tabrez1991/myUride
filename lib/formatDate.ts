export const formatDate = (date: string) => {
    const parts = date.split('/');
    const formattedDate: any = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return formattedDate;
}

export const formatDateTime = (date: string) => {
    const inputDate = new Date(date);
    const options: any = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
    };
    const formattedDate = inputDate.toLocaleString('en-GB', options);
    return formattedDate;
}