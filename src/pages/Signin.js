import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [formState, setFormState] = useState("login");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "admin@admin.com" && formData.password === "admin") {
      sessionStorage.setItem("sessionId", "adminSession");
      sessionStorage.setItem("firstName", "Admin");
      sessionStorage.setItem("userEmail", "admin@admin.com");
      sessionStorage.setItem("userRole", "admin"); // Set the role to admin
      toast.success("Success! Redirecting to admin dashboard...");
      window.location.href = "/adminDashboard";
    } else {
      const url =
        formState === "login" ? "/api/auth/login" : "/api/auth/signup";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          sessionStorage.setItem("sessionId", data.userId);
          sessionStorage.setItem("firstName", data.firstName);
          sessionStorage.setItem("userEmail", data.email);
          sessionStorage.setItem("userRole", data.role);
          toast.success("Success! Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 500);
        } else {
          toast.error(data.message || "An error occurred. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const renderInputField = (name, label, type = "text") => (
    <div className="relative flex flex-col z-0 py-5">
      <div className="text-xl absolute left-[30px] z-10 top-[5px]">
        <label htmlFor={name}>{label}</label>
      </div>
      <input
        name={name}
        id={name}
        className="w-[417px] h-[76px] rounded-lg bg-white/20 outline-none border-none text-gray-100 px-5 text-xl"
        type={type}
        value={formData[name]}
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <section>
      <div className="text-white w-[60%] px-28 py-16 ml-auto">
        {formState === "login" ? (
          // Existing users sign in
          <div>
            <h2 className="text-[40px]">Sign In</h2>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {renderInputField("email", "Email", "email")}
              {renderInputField("password", "Password", "password")}

              <p>
                Don't have an account?
                <button
                  onClick={() => setFormState("signup")}
                  className="text-blue-500 ml-1"
                  type="button"
                >
                  Create a new account
                </button>
              </p>

              <button
                type="submit"
                className="mt-5 bg-[#85B6FF] font-bold text-white w-[241px] h-[44px] rounded-[10px]"
              >
                Log In
              </button>
            </form>
          </div>
        ) : (
          // New Users Create Account
          <div>
            <h2 className="text-[40px]">Create your Account</h2>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {renderInputField("firstName", "First Name")}
              {renderInputField("lastName", "Last Name")}
              {renderInputField("email", "Email", "email")}
              {renderInputField("password", "Password", "password")}

              <p>
                Already have an account?
                <button
                  onClick={() => setFormState("login")}
                  className="text-blue-500 ml-1"
                  type="button"
                >
                  Signin
                </button>
              </p>

              <button
                type="submit"
                className="mt-5 bg-[#85B6FF] font-bold text-white w-[241px] h-[44px] rounded-[10px]"
              >
                Create Account
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signin;
