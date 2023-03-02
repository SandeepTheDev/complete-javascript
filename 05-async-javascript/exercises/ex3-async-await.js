/**
 * Instructions
 *
 * This exercise calls for you to write some async flow-control code. To start
 * off with, you'll use promises with async await.
 *
 * Expected behavior:
 * - Request all 3 files at the same time (in "parallel").
 * - Render them ASAP (don't just blindly wait for all to finish loading).
 * - But, render them in proper (obvious) order: "file1", "file2", "file3".
 * - After all 3 are done, output "Complete!".
 */

function fakeAjax(url, cb) {
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

function output(text) {
  console.log(text);
}

function getFile(file) {
  return new Promise(function executor(resolve) {
    // instead of calling resolve here, passing resolve as callback
    fakeAjax(file, resolve);
  });
}

// request all files at once in "parallel"
var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

async function printPromises() {
  var p1result = await p1;
  console.log(p1result);
  var p2result = await p2;
  console.log(p2result);
  var p3result = await p3;
  console.log(p3result);
  console.log("Completed!");
}

printPromises();
