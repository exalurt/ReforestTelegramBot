const expect    = require("chai").expect;
const PaserLines = require("../build/PaserLines");
function datos(){
  var str = "-’ JRE AGENT INTEL MISSIL\n\
\n\
KellyKap0wski <\n\
LVL 15\n\
36,301,849 AP 140,000,000 AP\n\
\n\
EEK” g 4/4 02/2\n\
\n\
/ \\\n\
«W» .9 \\\n\
\m/ ,\\\n\
xn\n\
\\ r,\\ V\n\
\n\
 \n\
\n\
 \n\
\n\
A\n\
V\n\
\n\
@QQQQQ\n\
º\n\
ALLTIME 1 MONTH 1 WEEK 1 NOW\n\
\n\
i\n\
\n\
Unique Portals Visited 5,019\n\
Portals Discovered 1\n\
XM Collected 144,700,906 XM\n\
1:\n\
\n\
Distance Walked 2,184 km\n\
1:\n\
\n\
Resonators Deployed 54,719\n\
Links Created 8,896\n\
Control Fields Created 4,747\n\
Mind Units Captured 10,642,121 MUs\n\
Longest Link Ever Created 292 km\n\
Largest Control Field 3,082,190 MUs\n\
XM Recharged 79,158,869 XM\n\
Portals Captured 7,314\n\
Unique Portals Captured 2,955\n\
Mods Deployed 8,844\n\
I\n\
\n\
Resonators Destroyed 34,120\n\
Portals Neutralized 5,316\n\
Enemy Links Destroyed 6,005\n\
Enemy Control Fields Destroyed 3,014\n\
i\n\
\n\
Max Time Portal Held 326 days\n\
Max Time Link Maintained 113 days\n\
Max Link Length x Days 727 km-days\n\
Max Time Field Held 113 days\n\
Largest Field MUs x Days 318,818 MU-days\n\
I\n\
\n\
Unique Missions Completed 42\n\
I\n\
\n\
Hacks 27,202\n\
Glyph Hack Points 98,183\n\
Longest Hacking Streak 426 days\n\
i\n\
\n\
Agents Successfully Recruited 2";


  var result = str.split("\n");
  return result;
}
describe("PaserLines", function() {
    describe("create ProfileAgent", function() {
        it("not null", function() {
            const parserLine = new PaserLines("el reto");
            const as = parserLine.scannerLine(datos());
            expect(as).to.be.not.null;
        });
    });
});
