const RegisterPage = ({ setIsSigning, setIsLogging }) => {
  return (
    <>
      <div>RegisterPage</div>
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
    </>
  )
}

export default RegisterPage
