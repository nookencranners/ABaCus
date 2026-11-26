import { useState } from "react";

const AddRegistration = ({ student, setStudent, handleSubmit, onCancel }) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateStudent = (field) => (e) => {
    setStudent((currentStudent) => ({
      ...currentStudent,
      [field]: e.target.value
    }));
  };

  const submitRegistration = (e) => {
    if (student.logPass !== passwordConfirm) {
      e.preventDefault();
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    handleSubmit(e);
  };

  return (
    <main className="registrationPage">
      <form className="registrationForm" onSubmit={submitRegistration}>
        <h1>Student Registration</h1>
        <p>Tell us a little about yourself.</p>

        <label htmlFor="studentName">Full name</label>
        <input
          autoFocus
          id="studentName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Enter full name"
          required
          value={student.fullName}
          onChange={updateStudent('fullName')}
        />

        <label htmlFor="mailAddress">Email address</label>
        <input
          id="mailAddress"
          name="studentMail"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          required
          value={student.studentMail}
          onChange={updateStudent('studentMail')}
        />

        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          required
          value={student.logPass}
          onChange={updateStudent('logPass')}
        />

        <label htmlFor="passConfirm">Confirm password</label>
        <input
          id="passConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {passwordError && <p role="alert">{passwordError}</p>}

        <label htmlFor="studentGoal">Goal</label>
        <textarea
          id="studentGoal"
          name="goal"
          placeholder="What would you like to achieve?"
          value={student.goal}
          onChange={updateStudent('goal')}
          rows="3"
        />

        <label htmlFor="studentInterest">Interests</label>
        <textarea
          id="studentInterest"
          name="interest"
          placeholder="What are you interested in?"
          value={student.interest}
          onChange={updateStudent('interest')}
          rows="3"
        />

        <div className="registrationActions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </main>
  );
};

export default AddRegistration;
