const HomePage = ({ setIsSigning, setIsLogging, setViewingDashboard }) => {
  return (
    <div>
      HomePage
      <div className="PageButtons">
        <div className="AuthButtons">
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
        </div>
        <button onClick={() => {
            setViewingDashboard(true)
          }}>
          Look at the Teacher Dashboard
        </button>
      </div>  
    </div>
  )
}

export default HomePage