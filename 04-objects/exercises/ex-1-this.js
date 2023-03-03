/**
 * # Instruction
 *
 * Convert the module factory pattern to namespace pattern
 */

function defineWorkshop() {
  var students = [];
  var enrolledStudentIds = [];

  var publicAPI = {
    addStudent,
    enrollStudent,
    printEnrolledStudents,
  };

  return publicAPI;

  function addStudent(id, name) {
    students.push({ id, name });
  }

  function enrollStudent(id) {
    if (!enrolledStudentIds.includes(id)) {
      enrolledStudentIds.push(id);
    }
  }

  function isStudentEnrolled(student) {
    return enrolledStudentIds.includes(student.id);
  }

  function printEnrolledStudents() {
    var enrolledStudents = students.filter(isStudentEnrolled);
    console.log(enrolledStudents);
  }
}

var workshop = defineWorkshop();
workshop.addStudent(1, "Ross");
workshop.addStudent(2, "Todd");
workshop.enrollStudent(2);
workshop.printEnrolledStudents();
