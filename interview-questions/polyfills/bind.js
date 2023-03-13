Function.prototype.myBind = function (...args) {
  let context = this;
  let params = args.slice(1);

  return function () {
    context.apply(args[0], params);
  };
};

function ask(question) {
  console.log(this.teacher, question);
}

var workshop = {
  teacher: "Kyle",
  ask,
};

setTimeout(workshop.ask.myBind(workshop, "What is explicit binding?"), 1000);
