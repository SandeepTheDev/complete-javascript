/**
 * Instructions
 *
 * This exercise calls for you to write some async flow-control code. To start
 * off with, you'll use callbacks only.
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
  fakeAjax(file, function (text) {
    // because of closure `handleResponse` is closed over `file`
    // handleResponse will be called thrice
    handleResponse(file, text);
  });
}

function handleResponse(filename, contents) {
  if (!(filename in responses)) {
    responses[filename] = contents;
  }

  var filenames = ["file1", "file2", "file3"];
  for (let i = 0; i < filenames.length; i++) {
    if (filenames[i] in responses) {
      if (typeof responses[filenames[i]] == "string") {
        output(responses[filenames[i]]);
        responses[filenames[i]] = false;
      }
    } else {
      return false;
    }
  }

  output("Complete!");
}

var responses = {};

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
