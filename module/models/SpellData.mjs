const { NumberField, StringField } = foundry.data.fields;

export default class SpellData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:     new StringField({ initial: "" }),
      spellLevel:  new NumberField({ integer: true, min: 1, initial: 1 }),
      ppeCost:     new NumberField({ integer: true, min: 0, initial: 0 }),
      range:       new StringField({ initial: "" }),         // "100 ft" | "Self" | "Touch"
      duration:    new StringField({ initial: "" }),         // "2 min/level" | "Instant"
      savingThrow: new StringField({ initial: "" }),         // "Standard" | "None" | "Special"
      effect:      new StringField({ initial: "" }),
      school:      new StringField({ initial: "invocation" }),  // "invocation" | "techno_wizardry" | "specialized"
      source:      new StringField({ initial: "" })
    };
  }
}
