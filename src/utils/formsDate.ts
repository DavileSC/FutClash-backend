export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos (getMonth() devuelve 0-11)
    const year = date.getFullYear(); // Año en formato completo
  
    const hours = String(date.getHours()).padStart(2, '0'); // Horas en formato 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos en formato 2 dígitos
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };