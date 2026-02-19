ServerEvents.tags('block', event => {
    event.add('mineable/pickaxe', [
        'travelanchors:travel_anchor'
    ])
})
BlockEvents.broken('travelanchors:travel_anchor', event => {
    const { block, player, level, x, y, z } = event
    const heldItem = player.getMainHandItem()
    const hasPickaxe = heldItem.tags.contains('forge:tools/pickaxes')
    event.cancel()
    level.getServer().runCommandSilent(
        `/summon item ${x} ${y} ${z} {Item:{id:"travelanchors:travel_anchord",Count:1}}`
    )
})