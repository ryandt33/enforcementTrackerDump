const fs = require("fs");
const timestamp = Math.floor(new Date().getTime());
console.log(timestamp);

fetch(
  `https://www.enforcementtracker.com/data4sfk3j4hwe324kjhfdwe.json?_=${timestamp}`
)
  .then((response) => response.json())
  .then(({ data }) => {
    const map = [
      "",
      "",
      "Flag HTML",
      "Enforcement Agency",
      "Date",
      "Fine",
      "Company",
      "Law",
      "Law Title",
      "Description",
      "Link to Doc",
      "Link To Enforcement Tracker",
    ];

    const outputArray = [];
    let csv =
      [
        "Flag HTML",
        "Enforcement Agency",
        "Date",
        "Fine",
        "Company",
        "Law",
        "Law Title",
        "Description",
        "Link to Doc",
        "Link To Enforcement Tracker",
      ].join(",") + "\n";

    for (field of data) {
      for (let i = 2; i < map.length; i++) {
        csv += `"${field[i]}",`;
      }
      csv += "\n";
    }

    fs.writeFileSync("output.csv", csv, "utf-8");
  });
