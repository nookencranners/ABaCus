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
          <ul className="classList">
            {DefaultClasses.map((classItem) => (
              <li className="classContainer">
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
            <ul className="studentList">
            {DefaultStudents.map((studentItem) => (
              <li className="studentContainer">
                <div>
                  {studentItem.studentId}
                </div>
                <div>
                  {studentItem.name}
                </div>
                <div>
                   Age: {studentItem.age}
                </div>
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