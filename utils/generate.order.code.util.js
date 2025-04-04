function generateOrderCode() {
  const now = new Date();

  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Ma hoa don: ORDER-ngaythangnam-giophutgiaymilligiay
  const orderCode = `ORDER-${day}${month}${year}-${hour}${minutes}${seconds}${milliseconds}`;
  return orderCode;
}

generateOrderCode();

export default generateOrderCode;
