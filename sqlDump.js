const db = require("./models");

const main = async () => {
  await db.sequelize.sync({ force: true });
  const { gdpr_record } = db;

  const timestamp = Math.floor(new Date().getTime());

  fetch(
    `https://www.enforcementtracker.com/data4sfk3j4hwe324kjhfdwe.json?_=${timestamp}`
  )
    .then((response) => response.json())
    .then(async ({ data }) => {
      const map = [
        "",
        "",
        "flag_html",
        "enforcement_agency",
        "date",
        "fine",
        "lompany",
        "law",
        "law_title",
        "description",
        "link_to_doc",
        "link_to_enforcement_tracker",
      ];

      let count = 1;

      for (field of data) {
        console.log(count++ + "/" + data.length);
        const db_obj = {};
        for (let i = 2; i < map.length; i++) {
          db_obj[map[i]] = field[i];

          if (map[i] === "fine") {
            db_obj[map[i]] = parseFloat(
              db_obj[map[i]].replace(/[^0-9.-]+/g, "")
            );

            if (isNaN(db_obj[map[i]])) {
              db_obj[map[i]] = null;
            }
          }

          if (map[i] === "date") {
            db_obj[map[i]] = new Date(db_obj[map[i]]);

            if (isNaN(db_obj[map[i]])) {
              db_obj[map[i]] = null;
            }
          }
        }

        const record = await gdpr_record.findOne({
          where: {
            link_to_enforcement_tracker: db_obj.link_to_enforcement_tracker,
          },
        });

        if (!record) {
          await gdpr_record.create(db_obj);
        }
      }
    });
};

main();
