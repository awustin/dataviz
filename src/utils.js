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
