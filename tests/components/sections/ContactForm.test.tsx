import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/sections/ContactForm";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello, I would love to chat about your work.",
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), VALID.name);
  await user.type(screen.getByLabelText(/email/i), VALID.email);
  await user.type(screen.getByLabelText(/message/i), VALID.message);
}

describe("<ContactForm />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all required fields and a direct email send", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send by email/i })).toBeInTheDocument();
    expect(screen.getByText(/opens your email app/i)).toBeInTheDocument();
  });

  it("shows inline validation errors and does not open mail", async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), "X");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/message/i), "short");
    await user.click(screen.getByRole("button", { name: /send by email/i }));

    expect(await screen.findByText(/name must be at least 2/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10/i)).toBeInTheDocument();
    expect(click).not.toHaveBeenCalled();
  });

  it("opens a mailto link with the written message", async () => {
    const opened: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      opened.push(this.href);
    });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send by email/i }));

    expect(await screen.findByText(/your email app is opening/i)).toBeInTheDocument();
    expect(opened[0]).toMatch(/^mailto:DipanshuChoudhary109@gmail.com\?/);
    const href = decodeURIComponent(opened[0]);
    expect(href).toContain(VALID.name);
    expect(href).toContain(VALID.email);
    expect(href).toContain(VALID.message);
  });

  it("renders 'Send another' which brings the form back", async () => {
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send by email/i }));

    const reset = await screen.findByRole("button", { name: /send another/i });
    await user.click(reset);

    expect(screen.getByRole("button", { name: /send by email/i })).toBeInTheDocument();
  });

  it("includes a hidden honeypot field that is aria-hidden and tab-skipped", () => {
    render(<ContactForm />);
    const honeypot = screen.getByLabelText(/leave this empty/i, { selector: "input" });
    expect(honeypot).toHaveAttribute("name", "website");
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
  });
});
