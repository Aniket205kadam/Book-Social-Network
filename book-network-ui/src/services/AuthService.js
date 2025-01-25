class AuthService {
  register = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
      console.error("#AutheService>register>line4");
      throw new Error("Registration request is null");
    }
    const apiUrl = "http://localhost:8088/api/v1/auth/register";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.validationErrors || "Failed to register user");
    }
    return response.status;
  };

  activateAccount = async (token) => {
    if (!token) {
      console.error("#AutheService>activateAccount>line29");
      throw new Error("token is null");
    }
    const apiUrl = `http://localhost:8088/api/v1/auth/activate-account?token=${token}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.error || "Failed to activate user account");
    }
    return response.status;
  };

  authenticate = async ({ email, password }) => {
    if (!email || !password) {
      console.error("#AutheService>authenticate>line48");
      throw new Error("email or password is null");
    }
    const apiUrl = "http://localhost:8088/api/v1/auth/authenticate";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to authenticate user");
    }
    return response.json();
  };

  resendEmail = async (email) => {
    const apiUrl = `http://localhost:8088/api/v1/auth/activate-account/${email}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to resend activation token");
    }
    return response.status;
  }
}

export default new AuthService();
