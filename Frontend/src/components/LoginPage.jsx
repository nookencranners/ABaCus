const LoginPage = ({ setIsSigning, setIsLogging }) => {
  return (
    <>
      <div style={{
          backgroundColor: "lightblue", margin: "1em auto", width: "40%"
        }}>LoginPage
        <div className="PageButtons">
          <div className="AuthButtons" style={{
            
          }}>
            <ul style={{
              listStyleType: "none", margin: "0", padding: "0"
            }}>
              <div style={{
                backgroundColor: "red"
              }}>
                <button onClick={() => {

                }}>
                  Student
                </button>
                <button onClick={() => {
                  
                }}>
                  Teacher
                </button>
              </div>
              <div>
                <button onClick={() => {
                    setIsSigning(true);
                    setIsLogging(false);
                  }}>
                  Register Instead
                </button>
              </div>
              <button onClick={() => {
                  setIsSigning(false);
                  setIsLogging(false);
                }}>
                Return to Home Page
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage