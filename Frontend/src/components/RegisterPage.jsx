// import "./RegisterPage.css";

const RegisterPage = ({ setIsSigning, setIsLogging }) => {
  return (
    <>
      <div>Register Page
        <div className="PageButtons">
          <div className="AuthButtons">
            <button onClick={() => {
              setIsSigning(true);
              setIsLogging(true);
            }}>
              Login Instead
            </button>
            <button onClick={() => {
              setIsSigning(false);
              setIsLogging(false);
            }}>
              Return to Home Page
            </button>
          </div>
        </div>
        <div className="RegisterPage">
          <h1>
            Create an Account Today!
          </h1>
          <p>
            Fill in your details to register.
          </p>

          <form className="RegisterForm">
            <div className="FormGroup">
              <label>Register As</label>
                <div className="AccountType">
                  <label>
                    <input
                      type="radio"
                      name="accountType"
                      value="student"
                      required
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="accountType"
                      value="teacher"
                    />
                      Teacher
                  </label>
                </div>   
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required/>
            </div>
            <div className="FormGroup">
              <label>Email Address</label>
              <input type="text" placeholder="Enter your email address" required/>
            </div>
            <div className="FormGroup">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" required/>
            </div>
            <div className="FormGroup">
              <label>Password</label>
              <input type="text" placeholder="Enter your password" required/>
            </div>
            <div className="FormGroup">
              <label>Confrim Password</label>
              <input type="text" placeholder="Rewrite your password" required/>
            </div>
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
        

export default RegisterPage