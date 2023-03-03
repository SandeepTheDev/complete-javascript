/**
 * Instructions
 *
 * This exercise calls for you to write some async flow-control code. To start
 * off with, you'll use promises only.
 *
 * Expected behavior:
 * - Request all 3 files at the same time (in "parallel").
 * - Render them ASAP (don't just blindly wait for all to finish loading).
 * - But, render them in proper (obvious) order: "file1", "file2", "file3".
 * - After all 3 are done, output "Complete!".
 */

import { fakeAjax } from "../../utilities/helper.js";

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

p1.then(output)
  .then(function () {
    return p2;
  })
  .then(output)
  .then(function () {
    return p3;
  })
  .then(output)
  .then(function () {
    output("Complete!");
  });

// [Optional] Promise utility
// here we can have any number of urls & its not hard coded.
["file1", "file2", "file3"]
  .map(getFile)
  .reduce(
    function combine(chain, pr) {
      return chain
        .then(function chainPr() {
          return pr;
        })
        .then(output);
    },
    Promise.resolve() // fulfilled promise to start chain
  )
  .then(function () {
    output("Complete!");
  });
