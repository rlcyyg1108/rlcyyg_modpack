local sounds = require("__base__.prototypes.entity.sounds")
local item_sounds = require("__base__.prototypes.item_sounds")
local item_tints = require("__base__.prototypes.item-tints")
local simulations = require("__base__.prototypes.factoriopedia-simulations")

  data:extend
  ({
    {
        type = "item",
        name = "dzt-fuel",
        icon = "__rlcyyg_modpack__/thumbnail.png",
        localised_name = "吊炸天燃料",
        fuel_category = "chemical",
        fuel_value = "114514YJ",
        fuel_acceleration_multiplier = 19.19,
        fuel_top_speed_multiplier = 8.1,
        -- fuel_glow_color = {r = 0.1, g = 1, b = 0.1},
        subgroup = "uranium-processing",
        order = "r[uranium-processing]-e[nuclear-fuel]",
        inventory_move_sound = item_sounds.fuel_cell_inventory_move,
        pick_sound = item_sounds.fuel_cell_inventory_pickup,
        drop_sound = item_sounds.fuel_cell_inventory_move,
        stack_size = 100,
      },
      {
        type = "recipe",
        name = "dzt-fuel",
        enabled = true,
        --category = "centrifuging",
        subgroup = "uranium-processing",
        order = "b[uranium-products]-d[nuclear-fuel]",
        ingredients = {{type="item", name="wood", amount=1}},
        results = {{type="item", name="dzt-fuel", amount=10000}},
      },
      {
        type = "item",
        name = "rlc-personal-roboport-equipment",
        icon = "__base__/graphics/icons/personal-roboport-equipment.png",
        place_as_equipment_result = "rlc-personal-roboport-equipment",
        subgroup = "utility-equipment",
        order = "e[robotics]-a[personal-roboport-equipment]",
        inventory_move_sound = item_sounds.roboport_inventory_move,
        pick_sound = item_sounds.roboport_inventory_pickup,
        drop_sound = item_sounds.roboport_inventory_move,
        stack_size = 500000
      },
  })