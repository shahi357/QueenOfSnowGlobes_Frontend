// Signin.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom/extend-expect";
import Signin from "../src/pages/Signin";

// Mock fetch API for testing form submissions
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        userId: "123",
        firstName: "John",
        email: "john@example.com",
        role: "user",
      }),
  })
);

describe("Signin component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    fetch.mockClear();
  });

  test("renders the sign-in form by default", () => {
    render(<Signin />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("allows user to switch to the sign-up form", () => {
    render(<Signin />);
    fireEvent.click(screen.getByText(/Create a new account/i));
    expect(screen.getByText("Create your Account")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });

  test("submits the form and handles successful login", async () => {
    render(
      <>
        <Signin />
        <ToastContainer />
      </>
    );

    // Simulate filling in the form
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/auth/login", expect.anything())
    );

    await waitFor(() =>
      expect(sessionStorage.getItem("firstName")).toEqual("John")
    );
    expect(sessionStorage.getItem("userRole")).toEqual("user");

    // Toast notification should appear
    await waitFor(() =>
      expect(
        screen.getByText("Success! Redirecting to dashboard...")
      ).toBeInTheDocument()
    );
  });

  test("shows error message when API call fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    );

    render(
      <>
        <Signin />
        <ToastContainer />
      </>
    );

    // Simulate form submission with invalid credentials
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });

  test("handles admin login", async () => {
    render(
      <>
        <Signin />
        <ToastContainer />
      </>
    );

    // Fill in admin credentials
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "admin@admin.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Log In"));

    // Check for session storage updates
    expect(sessionStorage.getItem("firstName")).toEqual("Admin");
    expect(sessionStorage.getItem("userEmail")).toEqual("admin@admin.com");
    expect(sessionStorage.getItem("userRole")).toEqual("admin");

    // Toast notification should appear
    await waitFor(() =>
      expect(
        screen.getByText("Success! Redirecting to admin dashboard...")
      ).toBeInTheDocument()
    );
  });
});
