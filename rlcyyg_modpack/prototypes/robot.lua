local robot_animations = {}

robot_animations.defender =
{

  idle =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/defender-robot/defender-robot.png",
        priority = "high",
        line_length = 16,
        width = 56,
        height = 59,
        direction_count = 16,
        shift = util.by_pixel(0, 0.25),
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/defender-robot/defender-robot-mask.png",
        priority = "high",
        line_length = 16,
        width = 28,
        height = 21,
        direction_count = 16,
        shift = util.by_pixel(0, -4.75),
        apply_runtime_tint = true,
        scale = 0.5
      }
    }
  },
  shadow_idle =
  {
    filename = "__base__/graphics/entity/defender-robot/defender-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 88,
    height = 50,
    direction_count = 16,
    shift = util.by_pixel(25.5, 19),
    scale = 0.5,
    draw_as_shadow = true
  },
  in_motion =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/defender-robot/defender-robot.png",
        priority = "high",
        line_length = 16,
        width = 56,
        height = 59,
        animation_speed = 1,
        direction_count = 16,
        shift = util.by_pixel(0, 0.25),
        y = 59,
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/defender-robot/defender-robot-mask.png",
        priority = "high",
        line_length = 16,
        width = 28,
        height = 21,
        animation_speed = 1,
        direction_count = 16,
        shift = util.by_pixel(0, -4.75),
        apply_runtime_tint = true,
        y = 21,
        scale = 0.5
      }
    }
  },
  shadow_in_motion =
  {
    filename = "__base__/graphics/entity/defender-robot/defender-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 88,
    height = 50,
    animation_speed = 1,
    direction_count = 16,
    shift = util.by_pixel(25.5, 19),
    scale = 0.5,
    draw_as_shadow = true
  }
}

robot_animations.sparks =
{
  {
    filename = "__base__/graphics/entity/sparks/sparks-01.png",
    draw_as_glow = true,
    width = 39,
    height = 34,
    frame_count = 19,
    line_length = 19,
    shift = {-0.109375, 0.3125},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  },
  {
    filename = "__base__/graphics/entity/sparks/sparks-02.png",
    draw_as_glow = true,
    width = 36,
    height = 32,
    frame_count = 19,
    line_length = 19,
    shift = {0.03125, 0.125},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  },
  {
    filename = "__base__/graphics/entity/sparks/sparks-03.png",
    draw_as_glow = true,
    width = 42,
    height = 29,
    frame_count = 19,
    line_length = 19,
    shift = {-0.0625, 0.203125},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  },
  {
    filename = "__base__/graphics/entity/sparks/sparks-04.png",
    draw_as_glow = true,
    width = 40,
    height = 35,
    frame_count = 19,
    line_length = 19,
    shift = {-0.0625, 0.234375},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  },
  {
    filename = "__base__/graphics/entity/sparks/sparks-05.png",
    draw_as_glow = true,
    width = 39,
    height = 29,
    frame_count = 19,
    line_length = 19,
    shift = {-0.109375, 0.171875},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  },
  {
    filename = "__base__/graphics/entity/sparks/sparks-06.png",
    draw_as_glow = true,
    width = 44,
    height = 36,
    frame_count = 19,
    line_length = 19,
    shift = {0.03125, 0.3125},
    tint = {1.0, 0.9, 0.0, 1.0},
    animation_speed = 0.3
  }
}

robot_animations.logistic_robot =
{
  idle =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot.png",
    priority = "high",
    line_length = 16,
    width = 80,
    height = 84,
    shift = util.by_pixel(0, -3),
    direction_count = 16,
    y = 84,
    scale = 0.5
  },
  idle_with_cargo =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot.png",
    priority = "high",
    line_length = 16,
    width = 80,
    height = 84,
    shift = util.by_pixel(0, -3),
    direction_count = 16,
    scale = 0.5
  },
  in_motion =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot.png",
    priority = "high",
    line_length = 16,
    width = 80,
    height = 84,
    shift = util.by_pixel(0, -3),
    direction_count = 16,
    y = 252,
    scale = 0.5
  },
  in_motion_with_cargo =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot.png",
    priority = "high",
    line_length = 16,
    width = 80,
    height = 84,
    shift = util.by_pixel(0, -3),
    direction_count = 16,
    y = 168,
    scale = 0.5
  },
  shadow_idle =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 115,
    height = 57,
    shift = util.by_pixel(31.75, 19.75),
    direction_count = 16,
    y = 57,
    scale = 0.5,
    draw_as_shadow = true
  },
  shadow_idle_with_cargo =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 115,
    height = 57,
    shift = util.by_pixel(31.75, 19.75),
    direction_count = 16,
    scale = 0.5,
    draw_as_shadow = true
  },
  shadow_in_motion =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 115,
    height = 57,
    shift = util.by_pixel(31.75, 19.75),
    direction_count = 16,
    y = 57*3,
    scale = 0.5,
    draw_as_shadow = true
  },
  shadow_in_motion_with_cargo =
  {
    filename = "__base__/graphics/entity/logistic-robot/logistic-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 115,
    height = 57,
    shift = util.by_pixel(31.75, 19.75),
    direction_count = 16,
    y = 114,
    scale = 0.5,
    draw_as_shadow = true
  }
}

robot_animations.construction_robot =
{

  idle =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot.png",
    priority = "high",
    line_length = 16,
    width = 66,
    height = 76,
    shift = util.by_pixel(0,-4.5),
    direction_count = 16,
    scale = 0.5
  },
  in_motion =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot.png",
    priority = "high",
    line_length = 16,
    width = 66,
    height = 76,
    shift = util.by_pixel(0, -4.5),
    direction_count = 16,
    y = 76,
    scale = 0.5
  },
  shadow_idle =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 104,
    height = 49,
    shift = util.by_pixel(33.5, 18.75),
    direction_count = 16,
    scale = 0.5,
    draw_as_shadow = true
  },
  shadow_in_motion =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 104,
    height = 49,
    shift = util.by_pixel(33.5, 18.75),
    direction_count = 16,
    scale = 0.5,
    draw_as_shadow = true
  },
  working =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot-working.png",
    priority = "high",
    line_length = 2,
    width = 57,
    height = 74,
    frame_count = 2,
    shift = util.by_pixel(-0.25, -5),
    direction_count = 16,
    animation_speed = 0.3,
    scale = 0.5
  },
  shadow_working =
  {
    filename = "__base__/graphics/entity/construction-robot/construction-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 104,
    height = 49,
    repeat_count = 2,
    shift = util.by_pixel(33.5, 18.75),
    direction_count = 16,
    scale = 0.5,
    draw_as_shadow = true
  }
}

robot_animations.distractor =
{

  idle =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/distractor-robot/distractor-robot.png",
        priority = "high",
        line_length = 16,
        width = 72,
        height = 62,
        direction_count = 16,
        shift = util.by_pixel(0, -2.5),
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/distractor-robot/distractor-robot-mask.png",
        priority = "high",
        line_length = 16,
        width = 42,
        height = 37,
        direction_count = 16,
        shift = util.by_pixel(0, -6.25),
        apply_runtime_tint = true,
        scale = 0.5
      }
    }
  },
  shadow_idle =
  {
    filename = "__base__/graphics/entity/distractor-robot/distractor-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 96,
    height = 59,
    direction_count = 16,
    shift = util.by_pixel(32.5, 19.25),
    scale = 0.5,
    draw_as_shadow = true
  },
  in_motion =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/distractor-robot/distractor-robot.png",
        priority = "high",
        line_length = 16,
        width = 72,
        height = 62,
        direction_count = 16,
        shift = util.by_pixel(0, -2.5),
        y = 62,
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/distractor-robot/distractor-robot-mask.png",
        priority = "high",
        line_length = 16,
        width = 42,
        height = 37,
        direction_count = 16,
        shift = util.by_pixel(0, -6.25),
        apply_runtime_tint = true,
        y = 37,
        scale = 0.5
      }
    }
  },
  shadow_in_motion =
  {
    filename = "__base__/graphics/entity/distractor-robot/distractor-robot-shadow.png",
    priority = "high",
    line_length = 16,
    width = 96,
    height = 59,
    direction_count = 16,
    shift = util.by_pixel(32.5, 19.25),
    scale = 0.5,
    draw_as_shadow = true
  }
}

robot_animations.destroyer =
{

  idle =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot.png",
        priority = "high",
        line_length = 32,
        width = 88,
        height = 77,
        y = 77,
        direction_count = 32,
        shift = util.by_pixel(2.5, -1.25),
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot-mask.png",
        priority = "high",
        line_length = 32,
        width = 52,
        height = 42,
        y = 42,
        direction_count = 32,
        shift = util.by_pixel(2.5, -7),
        apply_runtime_tint = true,
        scale = 0.5
      }
    }
  },
  shadow_idle =
  {
    filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot-shadow.png",
    priority = "high",
    line_length = 32,
    width = 108,
    height = 66,
    direction_count = 32,
    shift = util.by_pixel(23.5, 19),
    scale = 0.5,
    draw_as_shadow = true
  },
  in_motion =
  {
    layers =
    {
      {
        filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot.png",
        priority = "high",
        line_length = 32,
        width = 88,
        height = 77,
        direction_count = 32,
        shift = util.by_pixel(2.5, -1.25),
        scale = 0.5
      },
      {
        filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot-mask.png",
        priority = "high",
        line_length = 32,
        width = 52,
        height = 42,
        direction_count = 32,
        shift = util.by_pixel(2.5, -7),
        apply_runtime_tint = true,
        scale = 0.5
      }
    }
  },
  shadow_in_motion =
  {
    filename = "__base__/graphics/entity/destroyer-robot/destroyer-robot-shadow.png",
    priority = "high",
    line_length = 32,
    width = 108,
    height = 66,
    direction_count = 32,
    shift = util.by_pixel(23.5, 19),
    scale = 0.5,
    draw_as_shadow = true
  }
}



data:extend{
    {
      type = "logistic-robot",
      name = "rlc-logistic-robot",
      icon = "__base__/graphics/icons/logistic-robot.png",
      flags = {"placeable-player", "player-creation", "placeable-off-grid", "not-on-map"},
      minable = {hardness = 0.1, mining_time = 0.1, result = "rlc-logistic-robot"},
      resistances = { { type = "fire", percent = 85 } },
      max_health = 100,
      collision_box = {{0, 0}, {0, 0}},
      selection_box = {{-0.5, -1.5}, {0.5, -0.5}},
      max_payload_size = 1,
      speed = 0.05,
      transfer_distance = 0.5,
      max_energy = "0MJ",
      energy_per_tick = "0kJ",
      speed_multiplier_when_out_of_energy = 1,
      energy_per_move = "0kJ",
      min_to_charge = 0,
      max_to_charge = 0,
      icon_size = 32,
      idle =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, -0.0},
        direction_count = 16,
        y = 128
      },
      idle_with_cargo =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, -0.0},
        direction_count = 16
      },
      in_motion =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, -0.0},
        direction_count = 16,
        y = 384
      },
      in_motion_with_cargo =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, -0.0},
        direction_count = 16,
        y = 256
      },
      shadow_idle =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      shadow_idle_with_cargo =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      shadow_in_motion =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      shadow_in_motion_with_cargo =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/logistic-robot/logistic bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      working_sound = data.raw["logistic-robot"]["logistic-robot"].working_sound,
      cargo_centered = {0.0, 0.2},
    },
    {
      type = "construction-robot",
      name = "rlc-construction-robot",
      icon = "__base__/graphics/icons/construction-robot.png",
      flags = {"placeable-player", "player-creation", "placeable-off-grid", "not-on-map"},
      minable = {hardness = 0.1, mining_time = 0.1, result = "rlc-construction-robot"},
      resistances = { { type = "fire", percent = 85 } },
      max_health = 100,
      collision_box = {{0, 0}, {0, 0}},
      selection_box = {{-0.5, -1.5}, {0.5, -0.5}},
      max_payload_size = 1,
      speed = 0.06,
      transfer_distance = 0.5,
      max_energy = "0MJ",
      energy_per_tick = "0kJ",
      speed_multiplier_when_out_of_energy = 1,
      energy_per_move = "0kJ",
      min_to_charge = 0,
      max_to_charge = 0,
      icon_size = 32,
      working_light = {intensity = 0.8, size = 3, color = {r = 0.0, g = 1, b = 0.0}},
      idle =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      in_motion =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16,
        y = 128
      },
      shadow_idle =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      shadow_in_motion =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot shadow.png",
        priority = "high",
        line_length = 16,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 1,
        shift = {0.0, 0.0},
        direction_count = 16
      },
      working =
      {
        filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot working.png",
        priority = "high",
        line_length = 2,
        width = 128,
        height = 128,
        scale = 0.5,
        frame_count = 2,
        shift = {0.0, 0.0},
        direction_count = 16,
        animation_speed = 0.3,
      },
      shadow_working =
      {
        stripes = util.multiplystripes(2,
        {
          {
            filename = "__AtomicRobotsFix2Boost__/graphics/entity/construction-robot/construction bot shadow.png",
            width_in_frames = 16,
            height_in_frames = 1,
          }
        }),
        priority = "high",
        width = 50,
        height = 24,
        scale = 0.5,
        frame_count = 2,
        shift = {1.09375, 0.59375},
        direction_count = 16
      },
      smoke =
      {
        filename = "__base__/graphics/entity/smoke-construction/smoke-01.png",
        width = 39,
        height = 32,
        frame_count = 19,
        line_length = 19,
        shift = {0.078125, -0.15625},
        animation_speed = 0.3,
      },
      sparks =
      {
        {
          filename = "__base__/graphics/entity/sparks/sparks-01.png",
          width = 39,
          height = 34,
          frame_count = 19,
          line_length = 19,
          shift = {-0.109375, 0.3125},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
        {
          filename = "__base__/graphics/entity/sparks/sparks-02.png",
          width = 36,
          height = 32,
          frame_count = 19,
          line_length = 19,
          shift = {0.03125, 0.125},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
        {
          filename = "__base__/graphics/entity/sparks/sparks-03.png",
          width = 42,
          height = 29,
          frame_count = 19,
          line_length = 19,
          shift = {-0.0625, 0.203125},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
        {
          filename = "__base__/graphics/entity/sparks/sparks-04.png",
          width = 40,
          height = 35,
          frame_count = 19,
          line_length = 19,
          shift = {-0.0625, 0.234375},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
        {
          filename = "__base__/graphics/entity/sparks/sparks-05.png",
          width = 39,
          height = 29,
          frame_count = 19,
          line_length = 19,
          shift = {-0.109375, 0.171875},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
        {
          filename = "__base__/graphics/entity/sparks/sparks-06.png",
          width = 44,
          height = 36,
          frame_count = 19,
          line_length = 19,
          shift = {0.03125, 0.3125},
          tint = { r = 1.0, g = 0.9, b = 0.0, a = 1.0 },
          animation_speed = 0.3,
        },
      },
      working_sound = data.raw["construction-robot"]["construction-robot"].working_sound,
      cargo_centered = {0.0, 0.2},
      construction_vector = {0.30, 0.22},
    }
    }