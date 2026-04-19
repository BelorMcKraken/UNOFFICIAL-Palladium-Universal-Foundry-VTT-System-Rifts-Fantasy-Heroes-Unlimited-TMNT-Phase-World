// ── Actor Models ────────────────────────────────────────────────
import CharacterData from "./models/CharacterData.mjs";

// ── Item Models ─────────────────────────────────────────────────
import SkillData     from "./models/SkillData.mjs";
import WeaponData    from "./models/WeaponData.mjs";
import ArmorData     from "./models/ArmorData.mjs";
import SpellData     from "./models/SpellData.mjs";
import PsionicData   from "./models/PsionicData.mjs";
import EquipmentData from "./models/EquipmentData.mjs";
import AmmoData      from "./models/AmmoData.mjs";
import CyberneticData from "./models/CyberneticData.mjs";
import VehicleData   from "./models/VehicleData.mjs";
import ClassData     from "./models/ClassData.mjs";

// ── Sheet Classes ───────────────────────────────────────────────
import PalladiumActorSheet from "./sheets/PalladiumActorSheet.mjs";

Hooks.once("init", () => {
  console.log("palladium-universal | Initializing Palladium Universal system");

  // ── Register Actor DataModels ───────────────────────────────
  CONFIG.Actor.dataModels.character = CharacterData;

  // ── Register Item DataModels ────────────────────────────────
  CONFIG.Item.dataModels.skill      = SkillData;
  CONFIG.Item.dataModels.weapon     = WeaponData;
  CONFIG.Item.dataModels.armor      = ArmorData;
  CONFIG.Item.dataModels.spell      = SpellData;
  CONFIG.Item.dataModels.psionic    = PsionicData;
  CONFIG.Item.dataModels.equipment  = EquipmentData;
  CONFIG.Item.dataModels.ammo       = AmmoData;
  CONFIG.Item.dataModels.cybernetic = CyberneticData;
  CONFIG.Item.dataModels.vehicle    = VehicleData;
  CONFIG.Item.dataModels.class      = ClassData;

  // ── Register Actor Sheet ──────────────────────────────────
  const ActorCollection = foundry.documents.collections.Actors;
  ActorCollection.unregisterSheet("core", foundry.applications.sheets.ActorSheetV2);
  ActorCollection.registerSheet("palladium-universal", PalladiumActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "Palladium Character Sheet"
  });

  // ── Token Resource Tracking ─────────────────────────────────
  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: ["health.hp", "health.sdc", "health.mdc", "magic.ppe", "psionics.isp"],
      value: ["identity.xp", "derived.perception"]
    }
  };
});
