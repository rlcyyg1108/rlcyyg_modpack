require ("__base__.prototypes.entity.laser-sounds")

data:extend
({
  {
    type = "roboport-equipment",
    name = "rlc-personal-roboport-equipment",
    take_result = "rlc-personal-roboport-equipment",
    sprite =
    {
      filename = "__base__/graphics/equipment/personal-roboport-equipment.png",
      width = 128,
      height = 128,
      priority = "medium",
      tint = {r=1, g=1, b=1},
      scale = 0.5
    },
    shape =
    {
      width = 1,
      height = 1,
      type = "full"
    },
    energy_source =
    {
      type = "electric",
      buffer_capacity = "35MJ",
      input_flow_limit = "3500kW",
      usage_priority = "secondary-input"
    },
    charging_energy = "1000kW",

    robot_limit = 11451,
    construction_radius = 1919,
    spawn_and_station_height = 0.4,
    spawn_and_station_shadow_height_offset = 0.5,
    charge_approach_distance = 2.6,
    robots_shrink_when_entering_and_exiting = true,

    recharging_animation =
    {
      filename = "__base__/graphics/entity/roboport/roboport-recharging.png",
      draw_as_glow = true,
      priority = "high",
      width = 37,
      height = 35,
      frame_count = 16,
      scale = 1.5,
      animation_speed = 0.5
    },
    recharging_light = {intensity = 0.2, size = 3, color = {r = 0.5, g = 0.5, b = 1.0}},
    stationing_offset = {0, -0.6},
    charging_station_shift = {0, 0.5},
    charging_station_count = 2,
    charging_station_count_affected_by_quality = true,
    charging_distance = 1.6,
    charging_threshold_distance = 5,
    categories = {"armor"}
  },
})
