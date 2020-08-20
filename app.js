// GIVEN I am using a daily planner to create a schedule

$(document).ready(function () {
  // display the day/time at the top of page
  $("#currentDay").text(`${moment().format("dddd MMM Do YYYY ")}`);

  // variable to store current time in military time for conditional
  let now = moment().format("HHmm");
  // WHEN I refresh the page  --  THEN the saved events persist

  // retrieve event data from local storage on page load
  let returnStorage = localStorage.getItem("json");
  // save current local storage data from JSON back to an object in JS on page load
  let events2 = JSON.parse(returnStorage);

  // write out events on load to their timeslots
  $(".form-control").each(function (i) {
    let eventKey = $(this).next().attr("id");
    $(this).text(events2[eventKey]);

    // check to see if the current time blocks are in the past and add styling accordingly
    if ($(this).attr("data-time") < now) {
      $(this).css("background-color", "lavenderblush");
    } else {
      $(this).css("background-color", "white");
    }
  });
  // event listener for save button stores that timeslot variable into local storage
  $(".btn").on("click", function () {
    buttonId = $(this).attr("id");
    events2[buttonId] = $(this).prev().val();
    localStorage.setItem("json", JSON.stringify(events2));
    l;
  });
});
