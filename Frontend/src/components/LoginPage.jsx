const LoginPage = ({ setIsSigning, setIsLogging }) => {
  return (
    <>
      <div>LoginPage
        <div className="PageButtons">
          <div className="AuthButtons">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage