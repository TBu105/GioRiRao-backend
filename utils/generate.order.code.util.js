function generateOrderCode() {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
  
    const hour = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const orderCode = `ORDER-${day}${month}${year}-${hour}${minutes}`;
    return orderCode;
  }
  
  console.log(generateOrderCode());

  export default generateOrderCode;