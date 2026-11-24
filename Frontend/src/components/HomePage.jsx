const HomePage = ({ setIsSigning, setIsLogging, setViewingDashboard }) => {
  return (
    <>
      <div>HomePage</div>
      <button onClick={() => {
          setIsSigning(true);
          setIsLogging(true);
        }}>
        Login
      </button>
      <button onClick={() => {
          setIsSigning(true);
          setIsLogging(false);
        }}>
        Register
      </button>
      <br/>
      <button onClick={() => {
          setViewingDashboard(true)
        }}>
        Look at the Teacher Dashboard
      </button>
    </>
  )
}

export default HomePage