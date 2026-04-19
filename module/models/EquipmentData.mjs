const { NumberField, StringField, BooleanField } = foundry.data.fields;

export default class EquipmentData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:  new StringField({ initial: "" }),
      category: new StringField({ initial: "" }),     // "basic" | "comms" | "medical" | "optics" | "scopes" | "sensors" | "surveillance"
      weight:   new StringField({ initial: "" }),
      cost:     new StringField({ initial: "" }),
      quantity: new NumberField({ integer: true, min: 0, initial: 1 }),
      effect:   new StringField({ initial: "" }),     // Mechanical effect description
      equipped: new BooleanField({ initial: false }),
      source:   new StringField({ initial: "" })
    };
  }
}
