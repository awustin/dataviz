export const formatData = data => data.sort((a, b) => new Date(a.date) - new Date(b.Date));

export const dateARG = dateString => new Date(dateString).toLocaleDateString('es-AR');