const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export default class PalladiumActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["palladium", "actor", "character"],
    position: { width: 720, height: 800 },
    window: {
      resizable: true
    },
    form: {
      submitOnChange: true
    },
    actions: {
      editItem:    PalladiumActorSheet.#onEditItem,
      deleteItem:  PalladiumActorSheet.#onDeleteItem,
      toggleEquip: PalladiumActorSheet.#onToggleEquip
    }
  };

  static PARTS = {
    sheet: {
      template: "systems/palladium-universal/templates/actor/actor-sheet.hbs"
    }
  };

  async _prepareContext(options) {
    const context = {
      actor: this.document,
      system: this.document.system,
      isEditable: this.isEditable,

      skills:      this.document.items.filter(i => i.type === "skill").sort((a, b) => a.name.localeCompare(b.name)),
      weapons:     this.document.items.filter(i => i.type === "weapon").sort((a, b) => a.name.localeCompare(b.name)),
      armor:       this.document.items.filter(i => i.type === "armor").sort((a, b) => a.name.localeCompare(b.name)),
      spells:      this.document.items.filter(i => i.type === "spell").sort((a, b) => a.name.localeCompare(b.name)),
      psionics:    this.document.items.filter(i => i.type === "psionic").sort((a, b) => a.name.localeCompare(b.name)),
      equipment:   this.document.items.filter(i => i.type === "equipment").sort((a, b) => a.name.localeCompare(b.name)),
      ammo:        this.document.items.filter(i => i.type === "ammo").sort((a, b) => a.name.localeCompare(b.name)),
      cybernetics: this.document.items.filter(i => i.type === "cybernetic").sort((a, b) => a.name.localeCompare(b.name)),
      vehicles:    this.document.items.filter(i => i.type === "vehicle").sort((a, b) => a.name.localeCompare(b.name)),
      classes:     this.document.items.filter(i => i.type === "class")
    };
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);

    const tabs = this.element.querySelectorAll(".tab[data-tab]");
    const nav = this.element.querySelectorAll(".sheet-tabs .item");

    nav.forEach(link => {
      link.addEventListener("click", ev => {
        const tabId = ev.currentTarget.dataset.tab;
        nav.forEach(n => n.classList.remove("active"));
        ev.currentTarget.classList.add("active");
        tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
      });
    });
  }

  static async #onEditItem(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  static async #onDeleteItem(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;
    const confirm = await foundry.applications.api.DialogV2.confirm({
      window: { title: `Delete ${item.name}?` },
      content: `<p>Remove <strong>${item.name}</strong> from this character?</p>`
    });
    if (confirm) await item.delete();
  }

  static async #onToggleEquip(event, target) {
    const itemId = target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.document.items.get(itemId);
    if (!item) return;
    const field = item.type === "cybernetic" ? "system.installed" : "system.equipped";
    await item.update({ [field]: !foundry.utils.getProperty(item, field) });
  }
}
