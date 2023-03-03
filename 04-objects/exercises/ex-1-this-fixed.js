var workshop = {
  students: [],
  enrolledStudentIds: [],

  addStudent(id, name) {
    this.students.push({ id, name });
  },

  enrollStudent(id) {
    if (!this.enrolledStudentIds.includes(id)) {
      this.enrolledStudentIds.push(id);
    }
  },

  isStudentEnrolled(student) {
    return this.enrolledStudentIds.includes(student.id);
  },

  printEnrolledStudents() {
    var enrolledStudents = this.students.filter(
      this.isStudentEnrolled.bind(this)
    );
    console.log(enrolledStudents);
  },
};

workshop.addStudent(1, "Ross");
workshop.addStudent(2, "Todd");
workshop.enrollStudent(2);
workshop.enrollStudent(1);
workshop.printEnrolledStudents();
