data:extend
(
    {
        {
            type = "technology",
            name = "rlcmp-kaiju",
            icon_size = 256,
            icon = "__rlcyyg_modpack__/thumbnail.png",
            localised_name = "若睁开眼 我们就能看见海藻",
            effects =
            {
              {
                type = "character-crafting-speed",
                modifier = 1000,
              },
              {
                type = "character-mining-speed",
                modifier = 1000,
              },
              {
                type = "character-item-drop-distance",
                modifier = 1000,
              },
              {
                type = "character-build-distance",
                modifier = 1000,
              },
              {
                type = "character-reach-distance",
                modifier = 1000,
              },
              {
                type = "character-resource-reach-distance",
                modifier = 1000,
              },
          --[[
              {
                type = "character-item-pickup-distance",
                modifier = 1000,
              },
              {
                type = "character-loot-pickup-distance",
                modifier = 1000,
              },
              {
                type = "character-running-speed",
                modifier = 1000,
              },
          ]]
            },
            research_trigger =
            {
              type = "craft-item",
              item = "wooden-chest",
              count = 1
            },
            order = "a",
          },
    }
)