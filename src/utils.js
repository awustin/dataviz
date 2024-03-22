export const formatData = data => data.sort((a, b) => new Date(a.date) - new Date(b.Date))
    .map(datum => {
        const date = new Date(datum.date);
        const month = date.getMonth();
        const year = date.getUTCFullYear();
        const monthElapsed = new Date(date.setMonth(date.getMonth())).toLocaleDateString('es-AR', { month: 'long' });
        const monthElapsedShort = monthElapsed.toUpperCase().slice(0, 3);

        return {
            ...datum,
            month,
            monthElapsedShort,
            year,
        }
    });

export const dateARG = dateString => new Date(dateString).toLocaleDateString('es-AR');

/**
 * Formats points for plotting
 */
export const formatPointsMonthlyVariation = points => points.map(([x, y]) => {
    const date = new Date(x);
    const varMonth = y * 100;
    const year = date.getUTCFullYear();
    const month = date.toLocaleDateString('es-AR', { month: 'long' });
    const monthShort = month.toUpperCase().slice(0, 3);

    return {
        varMonth,
        date,
        month,
        monthShort,
        year,
    }
});
