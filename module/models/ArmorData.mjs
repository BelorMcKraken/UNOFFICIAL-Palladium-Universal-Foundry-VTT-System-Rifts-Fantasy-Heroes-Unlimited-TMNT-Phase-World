const { SchemaField, NumberField, StringField, BooleanField } = foundry.data.fields;

export default class ArmorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:         new StringField({ initial: "" }),
      mdc:             new SchemaField({
        value: new NumberField({ integer: true, min: 0, initial: 0 }),
        max:   new NumberField({ integer: true, min: 0, initial: 0 })
      }),
      arPenalty:       new NumberField({ integer: true, initial: 0 }),     // Armor Rating penalty
      mobilityPenalty: new StringField({ initial: "" }),                   // "-10% to prowl, climb"
      weight:          new StringField({ initial: "" }),
      cost:            new StringField({ initial: "" }),
      tier:            new StringField({ initial: "" }),                   // "Light" | "Medium" | "Heavy"
      equipped:        new BooleanField({ initial: false }),
      source:          new StringField({ initial: "" })
    };
  }
}
