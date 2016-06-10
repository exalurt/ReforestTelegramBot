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

  isCheck() {
    if (this._ap     === undefined || this._ap     === null) return false;
    if (this._name   === undefined || this._name   === null) return false;
    if (this._level  === undefined || this._level  === null) return false;
    if (this._image  === undefined || this._image  === null) return false;
    if (this._reto   === undefined || this._reto   === null) return false;

    for (let [key,value] of this._data) {
      if (value === undefined || value === null) return false;
    }

    return true;
  }

  get ap() {
    return this._ap;
  }

  set ap(ap) {
    const value = this._getValueInput(ap.substring(0, ap.indexOf(" ")));
    this._ap = value;
    if (isNaN(this._ap)) {
      this._ap = null;
    }
  }

  setData(key){
    for (var element of this._data.keys()) {
      if(key.startsWith(element)) {
        let value = this._getValueInput(key);
        if (isNaN(value)) {
          value = null;
        }
        this._data.set(element, value);
      }
    }
  }

  getData(key){
    return this._data.get(key);
  }

  get DataMap() {
    return this._data;
  }

  get image() {
    return this._image;
  }

  set image(img) {
    this._image = img;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    let value = this._getValueInput(level.substring(level.length-2,level.length));
    if (isNaN(value)) {
      value = null;
    }
    this._level = value;
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
}
