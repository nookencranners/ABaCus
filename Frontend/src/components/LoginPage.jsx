const LoginPage = ({ setIsSigning, setIsLogging }) => {
  return (
    <>
      <div>LoginPage</div>
      <button onClick={() => {
          setIsSigning(true);
          setIsLogging(false);
        }}>
        Register Instead
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

export default LoginPage