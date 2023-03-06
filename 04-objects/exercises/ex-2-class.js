class Helper {
  printStudentsName(students) {
    var studentNames = students.map((student) => student.name);
    console.log(studentNames);
  }
}

class Workshop extends Helper {
  constructor() {
    super();
    this.students = [];
    this.enrolledStudentIds = [];
  }

  addStudent(id, name) {
    this.students.push({ id, name });
  }

  enrollStudent(id) {
    if (!this.enrolledStudentIds.includes(id)) {
      this.enrolledStudentIds.push(id);
    }
  }

  isStudentEnrolled(student) {
    return this.enrolledStudentIds.includes(student.id);
  }

  printEnrolledStudents() {
    var enrolledStudents = this.students.filter(
      this.isStudentEnrolled.bind(this)
    );
    console.log(enrolledStudents);
  }
}

var deepJS = new Workshop();
deepJS.addStudent(1, "Ross");
deepJS.addStudent(2, "Todd");
deepJS.enrollStudent(1);
deepJS.printStudentsName(deepJS.students);
