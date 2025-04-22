const HttpStatusCodes = require("../../config/http.status.config");
const staffRepository = require("../../repositories/staff.repo");

// Import necessary modules and dependencies
// Mock the staffRepository to control its behavior during tests
jest.mock("../../repositories/staff.repo");

describe("authorize() authorize method", () => {
  let req, res, next;

  beforeEach(() => {
    // Initialize mock request, response, and next function
    req = { user: { userId: "123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should call next if user is authenticated and has the correct role", async () => {
      // Arrange: Set up the mock to return a user with the correct role
      staffRepository.findStaffById.mockResolvedValue({ role: "admin" });
      const middleware = authorize(["admin"]);

      // Act: Call the middleware
      await middleware(req, res, next);

      // Assert: Ensure next is called and no response is sent
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return 401 if user is not authenticated", async () => {
      // Arrange: Set req.user to null to simulate unauthenticated user
      req.user = null;
      const middleware = authorize(["admin"]);

      // Act: Call the middleware
      await middleware(req, res, next);

      // Assert: Ensure 401 status and appropriate message are sent
      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.UNAUTHORIZED.code
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "User is not authenticated",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if user does not have the correct role", async () => {
      // Arrange: Set up the mock to return a user with a different role
      staffRepository.findStaffById.mockResolvedValue({ role: "user" });
      const middleware = authorize(["admin"]);

      // Act: Call the middleware
      await middleware(req, res, next);

      // Assert: Ensure 403 status and appropriate message are sent
      expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.FORBIDDEN.code);
      expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 500 if there is an error in the repository", async () => {
      // Arrange: Set up the mock to throw an error
      staffRepository.findStaffById.mockRejectedValue(
        new Error("Database error")
      );
      const middleware = authorize(["admin"]);

      // Act: Call the middleware
      await middleware(req, res, next);

      // Assert: Ensure 500 status and appropriate message are sent
      expect(res.status).toHaveBeenCalledWith(
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
