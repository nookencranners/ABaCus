import { useState } from "react";

const LoginPage = ({ handleSubmit, onCancel }) => {
  const [studentMail, setStudentMail] = useState("");
  const [logPass, setLogPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    const loggedIn = handleSubmit({ studentMail: studentMail.trim(), logPass });
    if (!loggedIn) setLoginError("Email or password is incorrect.");
  };

  return (
    <main className="registrationPage">
      <form className="registrationForm" onSubmit={submitLogin}>
        <h1>Log in</h1>
        <p>Enter your email and password.</p>

        <label htmlFor="loginEmail">Email address</label>
        <input
          autoFocus
          id="loginEmail"
          name="studentMail"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          required
          value={studentMail}
          onChange={(e) => {
            setStudentMail(e.target.value);
            setLoginError("");
          }}
        />

        <label htmlFor="loginPassword">Password</label>
        <input
          id="loginPassword"
          name="logPass"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          value={logPass}
          onChange={(e) => {
            setLogPass(e.target.value);
            setLoginError("");
          }}
        />

        {loginError && <p role="alert">{loginError}</p>}

        <div className="registrationActions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
