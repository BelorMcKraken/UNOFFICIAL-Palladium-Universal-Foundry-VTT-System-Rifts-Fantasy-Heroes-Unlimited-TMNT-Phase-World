const { NumberField, StringField } = foundry.data.fields;

export default class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      jsonKey:            new StringField({ initial: "" }),     // Vault json_key: "barter", "climbing", etc.
      category:           new StringField({ initial: "" }),     // Skill category: "Rogue", "Physical", "Technical"
      baseProficiency:    new StringField({ initial: "" }),     // Base %: "30%"
      perLevel:           new StringField({ initial: "" }),     // Per-level gain: "+5%"
      currentLevel:       new NumberField({ integer: true, min: 1, initial: 1 }),
      currentProficiency: new NumberField({ integer: true, min: 0, initial: 0 }),  // Computed total %
      occBonus:           new StringField({ initial: "" }),     // OCC skill bonus: "+10%"
      skillSource:        new StringField({ initial: "" }),     // "occ" | "occ_related" | "secondary" | "other"
      prerequisites:      new StringField({ initial: "" }),     // Prerequisite skills or notes
      specialBonuses:     new StringField({ initial: "" }),     // Any special bonus text
      source:             new StringField({ initial: "" })      // Book + page ref
    };
  }
}
