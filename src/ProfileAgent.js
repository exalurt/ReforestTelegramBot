module.exports = class ProfileAgent {
    
    constructor(){
        this._data  = new Map();
        this._data.set("Agents Successfully Recruited",null);
        this._data.set("Control Fields Created",null);
        this._data.set("Distance Walked",null);
        this._data.set("Enemy Control Fields Destroyed",null);
        this._data.set("Enemy Links Destroyed",null);
        this._data.set("Glyph Hack Points",null);
        this._data.set("Hacks",null);
        this._data.set("Largest Control Field",null);
        this._data.set("Largest Field MUs x Days",null);
        this._data.set("Links Created",null);
        this._data.set("Longest Hacking Streak",null);
        this._data.set("Longest Link Ever Created",null);
        this._data.set("Max Link Length x Days",null);
        this._data.set("Max Time Field Held",null);
        this._data.set("Max Time Link Maintained",null);
        this._data.set("Max Time Portal Held",null);
        this._data.set("Mind Units Captured",null);
        this._data.set("Mods Deployed",null);
        this._data.set("Portals Captured",null);
        this._data.set("Portals Discovered",null);
        this._data.set("Portals Neutralized",null);
        this._data.set("Resonators Deployed",null);
        this._data.set("Resonators Destroyed",null);
        this._data.set("Unique Missions Completed",null);
        this._data.set("Unique Portals Captured",null);
        this._data.set("Unique Portals Visited",null);
        this._data.set("XM Collected",null);
        this._data.set("XM Recharged",null);
    }
    
    get ap() {
        return this._ap;
    }

    set ap(ap) {        
        const value = ap.substring(0, ap.indexOf(" ")).replace(/[^0-9]/g, "");
        this._ap = parseInt(value,10);
    }
    
    
    setData(key){
        for (var element of this._data.keys()) {
            if(key.startsWith(element)) {
                this._data.set(element, this._getValueInput(key));
            }
        }
    }
    
    getData(key){
        return this._data.get(key);
    }
    
    get level() {
        return this._level;
    }

    set level(level) {
        const value = level.substring(level.length-2,level.length);
        this._level = parseInt(value,10);
    }
    
    get name() {
        return this._name;
    }

    set name(name) {
        const result = name.split(" ");
        this._name = result[0];
    }

    get reto() {
        return this._reto;
    }

    set reto(reto) {
        this._reto = reto;
    }

    _getValueInput(key) {
        const value = key.replace(/[^0-9]/g, "");
        return parseInt(value, 10);
    }
/*
    @Override
    public String toString() {
        StringBuilder agent = new StringBuilder();
        agent.append("Reto: ").append(reto).append("\n");
        agent.append("Nick: ").append(name).append("\n");
        agent.append("Level: ").append(level).append("\n");
        agent.append("AP: ").append(ap).append("\n");
        
        data.entrySet().stream().forEach((Map.Entry<String, Integer> element) -> {
            agent.append(element.getKey()).append(": ").append(element.getValue()).append("\n");
        });
        return agent.toString();
    }*/
}