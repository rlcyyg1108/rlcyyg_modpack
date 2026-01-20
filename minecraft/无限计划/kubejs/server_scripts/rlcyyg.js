ServerEvents.recipes(event => {
  //鞘翅
  event.shaped(
    'minecraft:elytra',
    [
      ['minecraft:phantom_membrane', 'minecraft:phantom_membrane', 'minecraft:phantom_membrane'],
      ['minecraft:phantom_membrane', 'minecraft:nether_star', 'minecraft:phantom_membrane'],
      ['minecraft:phantom_membrane', 'minecraft:netherite_block', 'minecraft:phantom_membrane']
    ]
  )
    .id('kubejs:elytra_from_phantom_nether')
    .group('kubejs:end_game_gear');
  //压缩板岩
  event.shaped(
    'kubejs:compressed_slate',
    [
      ['minecraft:netherite_block', 'minecraft:netherite_block', 'minecraft:netherite_block'],
      ['minecraft:netherite_block', 'minecraft:redstone_block', 'minecraft:netherite_block'],
      ['minecraft:netherite_block', 'minecraft:netherite_block', 'minecraft:netherite_block']
    ]
  )
    .id('kubejs:compressed_slate_from_netherite')
    .group('kubejs:compressed_materials');
  //橡树树叶
  event.shaped(
    Item.of('minecraft:oak_leaves', 64),
    [
      ['mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence'],
      ['mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence'],
      ['mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence', 'mysticalagriculture:nature_essence']
    ]
  )
    .id('kubejs:oak_leaves_from_nature_essence')
    .group('kubejs:leaves_crafting');
  //瓶装末地空气
  event.shaped(
    Item.of('botania:ender_air_bottle', 1),
    [
      ['mysticalagriculture:end_essence', 'mysticalagriculture:end_essence', 'mysticalagriculture:end_essence'],
      ['mysticalagriculture:end_essence', 'minecraft:glass_bottle', 'mysticalagriculture:end_essence'],
      ['mysticalagriculture:end_essence', 'mysticalagriculture:end_essence', 'mysticalagriculture:end_essence']
    ]
  )
    .id('kubejs:botania_bottled_end_air_from_nature_essence')
    .group('kubejs:botania_crafting');
  //终极觉醒晶体
  event.shaped(
    Item.of('kubejs:zahraanite', 1),
    [
      ['minecraft:redstone_block', 'minecraft:redstone_block', 'minecraft:redstone_block'],
      ['minecraft:redstone_block', 'mysticalagriculture:awakened_supremium_ingot', 'minecraft:redstone_block'],
      ['minecraft:redstone_block', 'minecraft:redstone_block', 'minecraft:redstone_block']
    ]
  )
    .id('kubejs:zahraaniterrrrrrr')
    .group('kubejs:zahraaniterrrrrrrr');
  //山羊角
  event.shaped(
    Item.of('minecraft:goat_horn', 1),
    [
      ['mysticalagriculture:sheep_essence', 'mysticalagriculture:sheep_essence', 'mysticalagriculture:stone_essence'],
      ['mysticalagriculture:sheep_essence', 'mysticalagriculture:sheep_essence', 'mysticalagriculture:stone_essence'],
      ['mysticalagriculture:sheep_essence', 'mysticalagriculture:sheep_essence', 'mysticalagriculture:stone_essence']
    ]
  )
    .id('kubejs:crafting/goat_horn_from_essences')
    .group('kubejs:mystical_agriculture');
});