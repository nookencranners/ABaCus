const TeacherDashboard = ({ setViewingDashboard }) => {
  return (
    <>
      <div>TeacherDashboard</div>
      <div className="teacherDash">
        <div className="teacherDashBox">Classes</div>
        <div className="teacherDashBox">Students</div>
      </div>
      <button onClick={() => {
          setViewingDashboard(false);
        }}>
        Return to Home Page
      </button>
    </>
  )
}

export default TeacherDashboard