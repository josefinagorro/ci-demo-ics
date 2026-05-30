import request from "supertest";
import { app } from "../src/app";
import { calculateTicketPrice } from "../src/ticketCalculator";

describe("Ticket calculator unit tests", () => {
  test("calculates VIP ticket total correctly", () => {
    const result = calculateTicketPrice("Harry Styles", "VIP", 2);

    expect(result.total).toBe(240000);
    expect(result.unitPrice).toBe(120000);
  });

  test("throws error when quantity is invalid", () => {
    expect(() => {
      calculateTicketPrice("Harry Styles", "GENERAL", 0);
    }).toThrow("Quantity must be greater than zero");
  });
});

describe("Ticket API integration tests", () => {
  test("POST /tickets/calculate returns ticket price", async () => {
    const response = await request(app)
      .post("/tickets/calculate")
      .send({
        artist: "Harry Styles",
        ticketType: "CAMPO",
        quantity: 3,
      });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(240000);
  });

  test("POST /tickets/calculate returns 400 for invalid ticket type", async () => {
    const response = await request(app)
      .post("/tickets/calculate")
      .send({
        artist: "Harry Styles",
        ticketType: "INVALID",
        quantity: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid ticket type");
  });
});