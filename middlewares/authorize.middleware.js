const HttpStatusCodes = require("../config/http.status.config");
const staffRepository = require("../repositories/staff.repo");

const authorize = (roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED.code)
        .json({ message: "User is not authenticated" });
    }

    try {
      const user = await staffRepository.findStaffById(req.user.userId);

      if (!user || !roles.includes(user.role)) {
        return res
          .status(HttpStatusCodes.FORBIDDEN.code)
          .json({ message: "Permission denied" });
      }

      next();
    } catch (err) {
      console.error("Error in authorization middleware:", err);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ message: "Internal server error" });
    }
  };
};

module.exports = authorize;
