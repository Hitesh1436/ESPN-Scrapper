let url =
  "https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

const cheerio = require("cheerio");
const request = require("request");

request(url, function (error, response, html) {
  if (error) {
    console.error(error);
  } else {
    extractMatchDetails(html);  // fnc. bnya tki html mn se useful data store krwalee
  }
});

function extractMatchDetails(html) {
  let $ = cheerio.load(html);    // $ isme load krwadia html ko ab

  let descString = $(".header-info .description");   //   isse hum event ki info store krwadi h

  // console.log(descString)

  let descStringArr = descString.text().split(",");  // info extract krenge ab

  let venue = descStringArr[1].trim();  // venue dega
  let date = descStringArr[2].trim();  // date dega

  let result = $(
    ".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text span"
  ).text();   // result dega mtlb kon jeta kitne runs se jsa site pr h vse hi

  console.log(venue);
  console.log(date);
  console.log(result);

  console.log(
    "----------------------------------------------------------------"
  );

  let innings = $(".card.content-block.match-scorecard-table>.Collapsible");  // isse humne 2 tables store krwadiye  

  let htmlString = " ";  // ek blank string bnai jisme html store krenge ab hum

  for (let i = 0; i < innings.length; i++) {
    htmlString += $(innings[i]).html();  // cheerio ne jo data bhja hoga usme se phle MI ka table lega fir CSk ka table legaand htmlString mn dedega ans jo html ayga usse copy krke new html file banakr paste krdenge uss file mn

    let teamName = $(innings[i]).find("h5").text();
    teamName = teamName.split("INNINGS")[0].trim();

    let opponentIndex = i == 0 ? 1 : 0;

    let opponentName = $(innings[opponentIndex]).find("h5").text();
    opponentName = opponentName.split("INNINGS")[0].trim();

    // console.log(teamName, opponentName);
    let cInning = $(innings[i]);

    let allRows = cInning.find(".table.batsman tbody tr");

    for (let j = 0; j < allRows.length; j++) {
      let allCols = $(allRows[j]).find("td");
      let isWorthy = $(allCols[0]).hasClass("batsman-cell");

      if (isWorthy == true) {
        let playerName = $(allCols[0]).text().trim();

        let runs = $(allCols[2]).text().trim();
        let balls = $(allCols[3]).text().trim();
        let fours = $(allCols[5]).text().trim();
        let sixes = $(allCols[6]).text().trim();
        let STR = $(allCols[7]).text().trim();

        console.log(
          `${playerName} | ${runs} |${balls} | ${fours} | ${sixes} | ${STR}`
        );
        // Template Literal
      }
    }

    console.log("````````````````````````````````````````````````````````");

  }

  //   console.log(htmlString);
}

module.exports ={
  ps : processScoreCrad
}