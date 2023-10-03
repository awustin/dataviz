export const formatData = data => data.sort((a, b) => new Date(a.date) - new Date(b.Date))
    .map(datum => {
        const date = new Date(datum.date);
        const month = date.getMonth();
        const year = date.getUTCFullYear();
        const monthElapsed = new Date(date.setMonth(!date.getMonth() ? 11 : date.getMonth() - 1)).toLocaleDateString('es-AR', { month: 'long' });
        const monthElapsedShort = monthElapsed.toUpperCase().slice(0, 3);

        return {
            ...datum,
            month,
            monthElapsedShort,
            year,
        }
    });

export const dateARG = dateString => new Date(dateString).toLocaleDateString('es-AR');