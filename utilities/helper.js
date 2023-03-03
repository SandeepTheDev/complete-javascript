export function log(value) {
  console.log(value);
}

export function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };

  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;
  console.log("Requesting: " + url);
  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}
