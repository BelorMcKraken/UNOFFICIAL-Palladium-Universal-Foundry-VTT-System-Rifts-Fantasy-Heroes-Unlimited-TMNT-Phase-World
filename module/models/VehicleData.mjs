const { SchemaField, NumberField, StringField } = foundry.data.fields;

export default class VehicleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:       new StringField({ initial: "" }),
      category:      new StringField({ initial: "" }),     // "ground" | "hover" | "aircraft" | "power_armor" | "robot"
      crew:          new StringField({ initial: "" }),      // "1 pilot" | "1 pilot + 2 passengers"
      speed:         new SchemaField({
        ground:  new StringField({ initial: "" }),          // "60 mph"
        flying:  new StringField({ initial: "" }),          // "200 mph" or ""
        water:   new StringField({ initial: "" })
      }),
      mdcMain:       new NumberField({ integer: true, min: 0, initial: 0 }),
      mdcByLocation: new StringField({ initial: "" }),     // Detailed MDC breakdown (text for now)
      weaponSystems: new StringField({ initial: "" }),     // Weapon systems (text for now)
      weight:        new StringField({ initial: "" }),
      cost:          new StringField({ initial: "" }),
      source:        new StringField({ initial: "" })
    };
  }
}
