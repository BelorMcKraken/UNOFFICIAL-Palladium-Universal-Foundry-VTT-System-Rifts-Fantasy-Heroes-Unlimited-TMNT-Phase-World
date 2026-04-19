const { NumberField, StringField, BooleanField } = foundry.data.fields;

export default class CyberneticData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:    new StringField({ initial: "" }),
      category:   new StringField({ initial: "" }),        // "accessory" | "sensor" | "weapon"
      location:   new StringField({ initial: "" }),        // Body location: "hand" | "eye" | "arm" | "head"
      effect:     new StringField({ initial: "" }),        // Mechanical effect description
      damage:     new StringField({ initial: "" }),        // For bionic weapons: "2D6 M.D."
      damageType: new StringField({ initial: "" }),        // "sdc" | "mdc" (if weapon)
      cost:       new StringField({ initial: "" }),
      installed:  new BooleanField({ initial: false }),    // Whether currently implanted
      source:     new StringField({ initial: "" })
    };
  }
}
