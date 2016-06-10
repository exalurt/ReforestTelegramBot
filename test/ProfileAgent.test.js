const expect    = require("chai").expect;
const Perfil = require("../build/ProfileAgent");

describe("ProfileAgent", function() {
    describe("load members", function() {
        it("load 'ap' correct", function() {
            const perfil = new Perfil();
            perfil.ap = "35.301349 AP Manna";
            expect(perfil.ap).to.equal(35301349);
        });
        
        it("load 'name' correct", function() {
            const perfil = new Perfil();
            perfil.name = "KellyKapowski .4";
            expect(perfil.name).to.equal("KellyKapowski");
        });

        it("load 'image' correct", function() {
            const perfil = new Perfil();
            perfil.image = "image.jpg";
            expect(perfil.image).to.equal("image.jpg");
        });
        
        it("load 'level' correct", function() {
            const perfil = new Perfil();
            perfil.level = "LVL 15";
            expect(perfil.level).to.equal(15);
        });
        
        it("load 'reto' correct", function() {
            const perfil = new Perfil();
            perfil.reto = "retito";
            expect(perfil.reto).to.equal("retito");
        });
        
        it("load 'date' correct", function() {
            const perfil = new Perfil();
            perfil.setData("XM Collected 144,700,906 XM");
            expect(perfil.getData("XM Collected")).to.equal(144700906);
        });
        
        it("load 'date' null", function() {
            const perfil = new Perfil();
            expect(perfil.getData("XM Collected")).to.equal(null);
        });
    });

    describe("check", function() {
        it("false", function() {
            const perfil = new Perfil();
            expect(perfil.isCheck()).to.equal(false);
        });

        it("true", function() {
            const perfil = new Perfil();
            perfil.name = "KellyKap0wski";
            perfil.level = "LVL 15";
            perfil.ap = "36,301,849 AP 140,000,000 AP";
            perfil.image = "image.jpg";
            perfil.reto = "reto";
            perfil.setData("Unique Portals Visited 5,019");
            perfil.setData("Portals Discovered 1");
            perfil.setData("XM Collected 144,700,906 XM");
            perfil.setData("Distance Walked 2,184 km");
            perfil.setData("Resonators Deployed 54,719");
            perfil.setData("Links Created 8,896");
            perfil.setData("Control Fields Created 4,747");
            perfil.setData("Mind Units Captured 10,642,121 MUs");
            perfil.setData("Longest Link Ever Created 292 km");
            perfil.setData("Largest Control Field 3,082,190 MUs");
            perfil.setData("XM Recharged 79,158,869 XM");
            perfil.setData("Portals Captured 7,314");
            perfil.setData("Unique Portals Captured 2,955");
            perfil.setData("Mods Deployed 8,844");
            perfil.setData("Resonators Destroyed 34,120");
            perfil.setData("Portals Neutralized 5,316");
            perfil.setData("Enemy Links Destroyed 6,005");
            perfil.setData("Enemy Control Fields Destroyed 3,014");
            perfil.setData("Max Time Portal Held 326 days");
            perfil.setData("Max Time Link Maintained 113 days");
            perfil.setData("Max Link Length x Days 727 km-days");
            perfil.setData("Max Time Field Held 113 days");
            perfil.setData("Largest Field MUs x Days 318,818 MU-days");
            perfil.setData("Unique Missions Completed 42");
            perfil.setData("Hacks 27,202");
            perfil.setData("Glyph Hack Points 98,183");
            perfil.setData("Longest Hacking Streak 426 days");
            perfil.setData("Agents Successfully Recruited 2");

            expect(perfil.isCheck()).to.equal(true);
        });
    });
});