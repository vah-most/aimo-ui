/*
 * Created on Sat Nov 12 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

/* Some sample dummy names from:
 * https://cybertext.wordpress.com/2007/04/30/fake-names-for-documentation/
 */
const sampleNames = [
  "Paddy O’Furniture",
  "Olive Yew",
  "Aida Bugg",
  "Maureen Biologist",
  "Teri Dactyl",
  "Peg Legge",
  "Allie Grater",
  "Liz Erd",
  "A. Mused",
  "Constance Noring",
  "Lois Di Nominator",
  "Minnie Van Ryder",
  "Lynn O’Leeum",
  "P. Ann O’Recital",
  "Ray O’Sun",
  "Lee A. Sun",
  "Ray Sin",
  "Isabelle Ringing",
  "Eileen Sideways",
  "Rita Book",
  "Paige Turner",
  "Rhoda Report",
  "Augusta Wind",
  "Chris Anthemum",
  "Anne Teak",
  "U.R. Nice",
  "Anita Bath",
  "Harriet Upp",
  "I.M. Tired",
  "I. Missy Ewe",
  "Ivana B. Withew",
  "Anita Letterback",
  "Hope Furaletter",
  "B. Homesoon",
  "Bea Mine",
  "Bess Twishes",
  "C. Yasoon",
  "Audie Yose",
  "Dee End",
  "Amanda Hug",
  "Ben Dover",
  "Eileen Dover",
  "Willie Makit",
  "Willie Findit",
  "Skye Blue",
  "Staum Clowd",
  "Addie Minstra",
  "Anne Ortha",
  "Dave Allippa",
  "Dee Zynah",
  "Hugh Mannerizorsa",
  "Loco Lyzayta",
  "Manny Jah",
  "Mark Ateer",
  "Reeve Ewer",
  "Tex Ryta",
  "Theresa Green",
  "Barry Kade",
  "Stan Dupp",
  "Neil Down",
  "Con Trariweis",
  "Don Messwidme",
  "Al Annon",
  "Anna Domino",
  "Clyde Stale",
  "Anna Logwatch",
  "Anna Littlical",
  "Norma Leigh Absent",
  "Sly Meebuggah",
  "Saul Goodmate",
  "Faye Clether",
  "Sarah Moanees",

  "Clyde Stale",
  "Anna Logwatch",
  "Anna Littlical",
  "Norma Leigh Absent",
  "Sly Meebuggah",
  "Saul Goodmate",
  "Faye Clether",
  "Sarah Moanees",
];

/*
 * returns data in format of {name: '...', lastname: '...', email: '...'}
 */
export function generateTableData() {
  const data = sampleNames.map((name, index) => {
    const nameParts = name.split(" ");
    if (nameParts.length < 2) return;
    return {
      id: index + 1,
      name: nameParts[0],
      lastname: nameParts[1],
      email: `${nameParts[0]}.${nameParts[1].substring(
        0,
        1
      )}@example.com`.toLowerCase(),
    };
  });

  return data;
}
