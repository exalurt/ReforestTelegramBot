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
});