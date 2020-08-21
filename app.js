$(document).ready(function () {
  // display the day/time at the top of page
  $("#currentDay").text(`${moment().format("dddd MMM Do YYYY ")}`);

  // variable to store current time in military time
  const anHourAgo = moment().subtract(1, "hour").format("HHmmss"); // time minus 1hr
  const aSecAhead = moment().add(1, "second").format("HHmmss"); // time plus one second

  // Declare variable to hold local storage data & conditional to check if it is empty on load
  let events = localStorage.getItem("json")
    ? JSON.parse(localStorage.getItem("json"))
    : {};

  // event listener for save button stores timeslot value into local storage
  $(".btn").on("click", function () {
    let buttonId = $(this).attr("id");
    events[buttonId] = $(this).prev().val();
    localStorage.setItem("json", JSON.stringify(events));
  });

  $(".form-control").each(function (i) {
    // check to see if the current time blocks are in the past and add styling accordingly
    if ($(this).attr("data-time") < anHourAgo) {
      $(this).css("background-color", "gainsboro");
    }

    if ($(this).attr("data-time") > aSecAhead) {
      $(this).css("background-color", "lavenderblush");
    }

    // write items into their time blocks
    let eventKey = $(this).next().attr("id");
    $(this).text(events[eventKey]);
  });
});
