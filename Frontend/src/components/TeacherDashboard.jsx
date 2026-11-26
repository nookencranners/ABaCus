import DefaultClasses from './DefaultClasses'
import DefaultStudents from './DefaultStudents'
import DefaultTeachers from './DefaultTeachers'

const TeacherDashboard = ({ setViewingDashboard }) => {
  return (
    <>
      <div>TeacherDashboard</div>
      <div className="teacherDash">

        <div className="teacherDashBox">
          Classes
          <ul className="teacherList">
            {DefaultClasses.map((classItem) => (
              <li>
                <div>
                  {classItem.classId}
                </div>
                <div>
                  {classItem.className}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="teacherDashBox">
          Students
          <ul className="teacherList">
            {DefaultStudents.map((studentItem) => (
              <li>
                {studentItem.studentId}
              </li>
            ))}
          </ul>
        </div>
        
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