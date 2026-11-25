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
      </div>
    </>
  )
}

export default RegisterPage
