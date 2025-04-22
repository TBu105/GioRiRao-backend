const checkOrderTimeFrame = (type) => {
  /**
   * - Ca 1: 7-11 → Tổng kết lúc 11
   * - Ca 2: 11-3 → Tổng kết lúc 3
   * - Ca 3: 3-7 → Tổng kết lúc 7
   * - Ca 4: 7-11 → Tổng kết lúc 11
   */

  const now = new Date();
  const hour = now.getHours();

  if(type === "order") {
    if (hour >= 7 && hour < 11) {
      return 1; // Ca 1
    }
    if (hour >= 11 && hour < 15) {
      return 2; // Ca 2
    }
    if (hour >= 15 && hour < 19) {
      return 3; // Ca 3
    }
    if (hour >= 19 && hour <= 23) {
      return 4; // Ca 4
    }
    return null; // Ngoài giờ làm việc
  }
  else if(type === "statistic") {
    if (hour >= 11 && hour < 15) {
      return 1; // Ca 2
    }
    if (hour >= 15 && hour < 19) {
      return 2; // Ca 3
    }
    if (hour >= 19 && hour <= 23) {
      return 3; // Ca 4
    }
    if (hour > 23) {
      return 4
    }
    return null; // Ngoài giờ làm việc
  }
};

module.exports = checkOrderTimeFrame;
