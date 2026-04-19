const { NumberField, StringField } = foundry.data.fields;

export default class AmmoData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:     new StringField({ initial: "" }),
      category:    new StringField({ initial: "" }),      // "explosive" | "missile" | "e_clip" | "round"
      damage:      new StringField({ initial: "" }),      // "1D6x10 M.D."
      damageType:  new StringField({ initial: "mdc" }),   // "sdc" | "mdc"
      blastRadius: new StringField({ initial: "" }),      // "20 ft" or "" for non-area
      range:       new StringField({ initial: "" }),      // For missiles: "1 mile"
      guidanceType:new StringField({ initial: "" }),      // "none" | "laser" | "heat" | "radar"
      weight:      new StringField({ initial: "" }),
      cost:        new StringField({ initial: "" }),
      quantity:    new NumberField({ integer: true, min: 0, initial: 1 }),
      source:      new StringField({ initial: "" })
    };
  }
}
