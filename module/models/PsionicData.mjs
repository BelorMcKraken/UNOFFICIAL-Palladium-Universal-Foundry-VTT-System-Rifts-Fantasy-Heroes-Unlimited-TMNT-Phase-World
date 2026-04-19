const { NumberField, StringField } = foundry.data.fields;

export default class PsionicData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:     new StringField({ initial: "" }),
      category:    new StringField({ initial: "" }),         // "healing" | "physical" | "sensitive" | "super"
      ispCost:     new NumberField({ integer: true, min: 0, initial: 0 }),
      range:       new StringField({ initial: "" }),
      duration:    new StringField({ initial: "" }),
      savingThrow: new StringField({ initial: "" }),
      effect:      new StringField({ initial: "" }),
      source:      new StringField({ initial: "" })
    };
  }
}
