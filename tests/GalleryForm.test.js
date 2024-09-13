import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom/extend-expect";
import GalleryForm from "../src/components/GalleryForm";

// Mock fetch API for testing form submissions and gallery interactions
global.fetch = jest.fn((url, options) => {
  if (url === "/api/gallery/images") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: "1",
            name: "Sample Image",
            src: "http://example.com/image.jpg",
          },
        ]),
    });
  } else if (url.startsWith("/api/gallery/add")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Image added successfully" }),
    });
  } else if (url.startsWith("/api/gallery/delete")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Image deleted successfully" }),
    });
  }
  return Promise.reject("Not Found");
});

describe("GalleryForm component", () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console errors
  });

  test("renders the gallery and form elements correctly", () => {
    render(
      <>
        <GalleryForm />
        <ToastContainer />
      </>
    );

    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Add Item")).toBeInTheDocument();
    expect(screen.getByText("S.N.")).toBeInTheDocument();
    expect(screen.getByText("Image Name")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("submits the form and handles successful image addition", async () => {
    render(
      <>
        <GalleryForm />
        <ToastContainer />
      </>
    );

    // Open the modal
    fireEvent.click(screen.getByText("Add Item"));

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Image Name"), {
      target: { value: "New Image" },
    });
    fireEvent.change(screen.getByLabelText("file-input"), {
      target: {
        files: [new File(["dummy"], "image.jpg", { type: "image/jpeg" })],
      },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add"));

    await act(async () => {
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "/api/gallery/add",
          expect.anything()
        )
      );

      // Check for success toast
      expect(
        screen.getByText("Image added to gallery successfully.")
      ).toBeInTheDocument();
    });
  });

  test("handles API failure on image addition", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to add image" }),
      })
    );

    render(
      <>
        <GalleryForm />
        <ToastContainer />
      </>
    );

    // Open the modal
    fireEvent.click(screen.getByText("Add Item"));

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Image Name"), {
      target: { value: "New Image" },
    });
    fireEvent.change(screen.getByLabelText("file-input"), {
      target: {
        files: [new File(["dummy"], "image.jpg", { type: "image/jpeg" })],
      },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add"));

    await act(async () => {
      await waitFor(() =>
        expect(
          screen.getByText("An error occurred. Please try again.")
        ).toBeInTheDocument()
      );
    });
  });

  test("handles image deletion and updates gallery", async () => {
    render(
      <>
        <GalleryForm />
        <ToastContainer />
      </>
    );

    // Trigger delete action
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await act(async () => {
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith("/api/gallery/delete/1", {
          method: "DELETE",
        })
      );

      // Check for success toast
      expect(
        screen.getByText("Image deleted successfully.")
      ).toBeInTheDocument();
    });
  });

  test("fetches and displays images", async () => {
    render(
      <>
        <GalleryForm />
        <ToastContainer />
      </>
    );

    await act(async () => {
      await waitFor(() =>
        expect(screen.getByText("Sample Image")).toBeInTheDocument()
      );
      expect(screen.getByRole("img", { name: "Sample Image" })).toHaveAttribute(
        "src",
        "http://example.com/image.jpg"
      );
    });
  });
});
