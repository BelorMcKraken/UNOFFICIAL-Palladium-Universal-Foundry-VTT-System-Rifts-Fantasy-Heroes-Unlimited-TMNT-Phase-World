const { NumberField, StringField, BooleanField } = foundry.data.fields;

export default class WeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:    new StringField({ initial: "" }),
      category:   new StringField({ initial: "" }),        // "ancient" | "pistol" | "rifle" | "heavy"
      damage:     new StringField({ initial: "" }),        // "4D6 M.D." or "2D6 S.D.C."
      damageType: new StringField({ initial: "sdc" }),     // "sdc" | "mdc"
      range:      new StringField({ initial: "" }),        // "1,600 ft" or "Melee"
      rateOfFire: new StringField({ initial: "" }),        // "Standard" or "Single shot"
      payload:    new StringField({ initial: "" }),        // "20 per E-Clip"
      weight:     new StringField({ initial: "" }),
      cost:       new StringField({ initial: "" }),
      wpRequired: new StringField({ initial: "" }),        // Vault json_key of required W.P.
      quantity:   new NumberField({ integer: true, min: 0, initial: 1 }),
      equipped:   new BooleanField({ initial: false }),
      source:     new StringField({ initial: "" })
    };
  }
}
