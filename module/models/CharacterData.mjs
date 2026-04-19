const { SchemaField, NumberField, StringField, BooleanField, HTMLField } = foundry.data.fields;

/**
 * Attribute pair: base value + OCC/augmentation bonus.
 * The bonus field stores modifiers from class, cybernetics, magic, etc.
 * Total = value + bonus, computed in prepareDerivedData().
 */
function attributeField() {
  return new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    bonus: new NumberField({ required: true, integer: true, initial: 0 })
  });
}

/**
 * Resource pool with current/max (HP, SDC, MDC, PPE, ISP, etc.)
 */
function resourceField(initialMax = 0) {
  return new SchemaField({
    value: new NumberField({ required: true, integer: true, initial: initialMax }),
    max:   new NumberField({ required: true, integer: true, initial: initialMax })
  });
}

export default class CharacterData extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    return {

      // ── Identity ──────────────────────────────────────────────
      identity: new SchemaField({
        alignment:  new StringField({ initial: "" }),
        level:      new NumberField({ required: true, integer: true, min: 1, initial: 1 }),
        xp:         new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        classLabel: new StringField({ initial: "" }),   // Display name: "Vagabond O.C.C."
        classKey:   new StringField({ initial: "" }),    // Vault json_key: "occ_vagabond"
        species:    new StringField({ initial: "" }),
        campaign:   new StringField({ initial: "" })
      }),

      // ── Primary Attributes ────────────────────────────────────
      attributes: new SchemaField({
        iq:  attributeField(),
        me:  attributeField(),
        ma:  attributeField(),
        ps:  new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
          bonus: new NumberField({ required: true, integer: true, initial: 0 }),
          type:  new StringField({ initial: "normal" })  // normal | augmented | supernatural | robotic
        }),
        pp:  attributeField(),
        pe:  attributeField(),
        pb:  attributeField(),
        spd: attributeField()
      }),

      // ── Derived Bonuses (mostly computed in prepareDerivedData) ─
      derived: new SchemaField({
        iqSkillBonus:   new NumberField({ integer: true, initial: 0 }),
        ppCombatBonus:  new NumberField({ integer: true, initial: 0 }),
        peHpBonus:      new NumberField({ integer: true, initial: 0 }),
        psDamageBonus:  new NumberField({ integer: true, initial: 0 }),
        perception:     new NumberField({ integer: true, initial: 0 }),
        initiative:     new NumberField({ integer: true, initial: 0 }),
        strike:         new NumberField({ integer: true, initial: 0 }),
        parry:          new NumberField({ integer: true, initial: 0 }),
        dodge:          new NumberField({ integer: true, initial: 0 })
      }),

      // ── Health & Damage ───────────────────────────────────────
      health: new SchemaField({
        hp:         resourceField(),
        sdc:        resourceField(),
        mdc:        resourceField(),
        armor:      new StringField({ initial: "" }),
        forceField: new SchemaField({
          value: new NumberField({ integer: true, initial: 0 })
        })
      }),

      // ── Combat ────────────────────────────────────────────────
      combat: new SchemaField({
        attacksPerMelee: new NumberField({ required: true, integer: true, min: 0, initial: 2 }),
        damageBonus:     new NumberField({ integer: true, initial: 0 }),
        disarm:          new NumberField({ integer: true, initial: 0 }),
        pullPunch:       new NumberField({ integer: true, initial: 0 }),
        rollImpact:      new NumberField({ integer: true, initial: 0 }),
        critical:        new StringField({ initial: "" }),    // e.g. "Natural 20"
        koStun:          new StringField({ initial: "" })     // e.g. "Natural 20"
      }),

      // ── Saving Throws ─────────────────────────────────────────
      saves: new SchemaField({
        magic:      new NumberField({ integer: true, initial: 0 }),
        psionics:   new NumberField({ integer: true, initial: 0 }),
        poison:     new NumberField({ integer: true, initial: 0 }),
        horror:     new NumberField({ integer: true, initial: 0 }),
        possession: new NumberField({ integer: true, initial: 0 }),
        insanity:   new NumberField({ integer: true, initial: 0 }),
        comaDeath:  new NumberField({ integer: true, initial: 0 })
      }),

      // ── Notes ─────────────────────────────────────────────────
      biography: new HTMLField(),

      // ── Module Toggles ────────────────────────────────────────
      toggles: new SchemaField({
        useMdc:            new BooleanField({ initial: false }),
        useMagic:          new BooleanField({ initial: false }),
        usePsionics:       new BooleanField({ initial: false }),
        useMutations:      new BooleanField({ initial: false }),
        useSuperPowers:    new BooleanField({ initial: false }),
        useMecha:          new BooleanField({ initial: false }),
        useSurvivalHorror: new BooleanField({ initial: false })
      }),

      // ── Magic Module ──────────────────────────────────────────
      magic: new SchemaField({
        ppe:           resourceField(),
        spellStrength: new StringField({ initial: "" })
      }),

      // ── Psionics Module ───────────────────────────────────────
      psionics: new SchemaField({
        isp: resourceField()
      }),

      // ── Mutations Module (After the Bomb) ─────────────────────
      mutations: new SchemaField({
        animalType: new StringField({ initial: "" }),
        bioeTotal:  new NumberField({ integer: true, initial: 0 }),
        bioeSpent:  new NumberField({ integer: true, initial: 0 }),
        sizeLevel:  new StringField({ initial: "" })
      }),

      // ── Super Powers Module (Heroes Unlimited) ────────────────
      superPowers: new SchemaField({
        category:   new StringField({ initial: "" }),
        weaknesses: new StringField({ initial: "" })
      }),

      // ── Mecha / Vehicle Module ────────────────────────────────
      mecha: new SchemaField({
        name:          new StringField({ initial: "" }),
        speed:         new StringField({ initial: "" }),
        handling:      new StringField({ initial: "" }),
        mdcByLocation: new StringField({ initial: "" }),
        weaponSystems: new StringField({ initial: "" })
      }),

      // ── Survival / Horror Module ──────────────────────────────
      survival: new SchemaField({
        infectionLevel:  new StringField({ initial: "" }),
        supplies:        new StringField({ initial: "" }),
        insanityEffects: new StringField({ initial: "" })
      })
    };
  }

  // ── Derived Data ────────────────────────────────────────────────
  // Auto-computed whenever the actor is updated.

  prepareDerivedData() {
    super.prepareDerivedData();
    const attrs = this.attributes;

    // Attribute totals (value + bonus)
    for (const key of ["iq", "me", "ma", "ps", "pp", "pe", "pb", "spd"]) {
      attrs[key].total = attrs[key].value + attrs[key].bonus;
    }

    // Palladium attribute bonus threshold: 16+
    // IQ 16+ = +1 per point over 15 to skill rolls
    this.derived.iqSkillBonus = attrs.iq.total >= 16
      ? (attrs.iq.total - 15) : 0;

    // PP 16+ = +1 per point over 15 to strike/parry/dodge
    this.derived.ppCombatBonus = attrs.pp.total >= 16
      ? (attrs.pp.total - 15) : 0;

    // PE 16+ = +1 per point over 15 to save vs magic/poison, +5% vs coma/death
    this.derived.peHpBonus = attrs.pe.total >= 16
      ? (attrs.pe.total - 15) : 0;

    // PS damage bonus (normal PS, simplified — full table is in the vault)
    this.derived.psDamageBonus = attrs.ps.total >= 16
      ? (attrs.ps.total - 15) : 0;

    // Clamp HP to max
    this.health.hp.value = Math.min(this.health.hp.value, this.health.hp.max);
    this.health.sdc.value = Math.min(this.health.sdc.value, this.health.sdc.max);
    this.health.mdc.value = Math.min(this.health.mdc.value, this.health.mdc.max);
  }
}
