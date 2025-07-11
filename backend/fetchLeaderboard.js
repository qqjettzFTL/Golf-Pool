// backend/fetchLeaderboard.js

const axios = require("axios");
const cheerio = require("cheerio");
const pool = require("./db");

async function getESPNLeaderboard() {
  try {
    const res = await axios.get("https://www.espn.com/golf/leaderboard");
    const $ = cheerio.load(res.data);

    const players = [];

    // Loop through each table row from golf leaderboard
    $("table tbody tr").each((i, row) => {
      const place = $(row).find("td").eq(1).text().trim();  // Player position
      const name = $(row).find("td.plyr a").text().trim();  // Player name
      const score = $(row).find("td").eq(3).text().trim();  // Player score
      const thru = $(row).find("td").eq(4).text().trim();   // Players current hole

      if (name) {
        players.push({ name, place, score, thru });
      }
    });

    // Clear table before inserting new data
    await pool.query("DELETE FROM golfers");

    // Insert players into DB
    for (const p of players) {
      await pool.query(
        "INSERT INTO golfers (name, place, score, thru) VALUES ($1, $2, $3, $4)",
        [p.name, p.place, p.score, p.thru]
      );
    }

    console.log("Players successfully saved to DB");

  } catch (err) {
    console.error("Error scraping ESPN:", err.message);
  }
}

getESPNLeaderboard();