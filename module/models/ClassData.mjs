const { NumberField, StringField } = foundry.data.fields;

/**
 * The Class (OCC/RCC) Item is the "recipe" for assembling a character.
 *
 * Complex fields (attributeBonuses, occSkills, occRelatedSkills, etc.) are stored
 * as JSON strings. This is intentional for v1 — the vault produces rich JSON objects
 * for these fields, and the actor-factory logic in system.mjs will parse + apply them.
 *
 * As the system matures, these can graduate to nested SchemaFields or ArrayFields
 * once the exact shapes stabilize through use.
 */
export default class ClassData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // ── Identity ──────────────────────────────────────────────
      jsonKey:          new StringField({ initial: "" }),    // "occ_vagabond", "rcc_dragon_hatchling"
      category:         new StringField({ initial: "" }),    // "Scholars & Adventurers" | "Men at Arms" | "Psychic" | "Magic" | "Special"
      alignmentAllowed: new StringField({ initial: "" }),    // "Any" | "Good or Selfish only"
      attrRequirements: new StringField({ initial: "" }),    // "None" | "I.Q. 10+, P.E. 12+"
      raceRequirements: new StringField({ initial: "" }),    // "None" | "Human only"
      xpTableRef:       new StringField({ initial: "" }),    // "xp_tech" | "xp_combat" | "xp_psychic" | etc.

      // ── Bonuses (JSON strings) ────────────────────────────────
      attributeBonuses: new StringField({ initial: "{}" }),  // JSON: { "fixed": { "ps": 1 }, "rolled": { "ma": "1d4" } }
      sdcBonus:         new StringField({ initial: "" }),    // "2d6+10" or "0"
      occBonuses:       new StringField({ initial: "{}" }),  // JSON: { "perception": 4, "save_vs_psionics": 1, ... }

      // ── Combat ────────────────────────────────────────────────
      h2hDefault:       new StringField({ initial: "" }),    // json_key: "h2h_basic" | "h2h_expert" | "h2h_non_skilled"
      h2hUpgrades:      new StringField({ initial: "[]" }), // JSON array of upgrade paths

      // ── Skills (JSON strings) ─────────────────────────────────
      occSkills:        new StringField({ initial: "[]" }), // JSON array of fixed skills + choices
      occRelatedSkills: new StringField({ initial: "{}" }), // JSON object with available categories + counts
      secondarySkills:  new StringField({ initial: "{}" }), // JSON: { "count_initial": 8, "gained_at_levels": [...] }

      // ── Equipment & Money ─────────────────────────────────────
      startingEquipment:  new StringField({ initial: "{}" }), // JSON: { "armor": "...", "weapons": "...", "gear": "..." }
      startingCredits:    new StringField({ initial: "" }),
      startingCybernetics:new StringField({ initial: "" }),

      // ── Powers ────────────────────────────────────────────────
      specialAbilities:   new StringField({ initial: "[]" }), // JSON array of OCC special ability refs
      psionics:           new StringField({ initial: "{}" }), // JSON: { "tier": "none", "isp_base": null, ... }
      magic:              new StringField({ initial: "{}" }), // JSON: { "is_caster": false, "ppe_base": null, ... }

      // ── Inheritance (MOS / subspecies) ────────────────────────
      inheritsFrom:       new StringField({ initial: "" }),   // Parent class json_key for MOS children

      // ── Source ────────────────────────────────────────────────
      source:             new StringField({ initial: "" })
    };
  }
}
