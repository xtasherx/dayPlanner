$(document).ready(function () {
  // display the day/time at the top of page
  $("#currentDay").text(`${moment().format("dddd MMM Do YYYY ")}`);

  // variable to store current time in military time
  const anHourAgo = moment().subtract(1, "hour").format("HHmmss"); // time minus 1hr
  const aSecAhead = moment().add(1, "second").format("HHmmss"); // time plus one second

  // WHEN I refresh the page  --  THEN the saved events persist

  // retrieve event data from local storage on page load
  const returnStorage = localStorage.getItem("json");
  // save current local storage data from JSON back to an object in JS on page load
  const events2 = JSON.parse(returnStorage);

  // write out events on load to their timeslots
  $(".form-control").each(function (i) {
    // check to see if the current time blocks are in the past and add styling accordingly
    // find a way to check if time is in the present

    if ($(this).attr("data-time") < anHourAgo) {
      $(this).css("background-color", "slategrey");
    }

    if ($(this).attr("data-time") > aSecAhead) {
      $(this).css("background-color", "lavenderblush");
    }

    const eventKey = $(this).next().attr("id");
    $(this).text(events2[eventKey]);
  });

  // event listener for save button stores that timeslot variable into local storage
  $(".btn").on("click", function () {
    buttonId = $(this).attr("id");
    events2[buttonId] = $(this).prev().val();
    localStorage.setItem("json", JSON.stringify(events2));
  });
});
