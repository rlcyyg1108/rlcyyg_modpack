ServerEvents.recipes(event => {
    console.info('Optimizing GTSE Electrolyzer Recipes with Random Catalyst Chain...')

    // ==================== TIER 1: 基础资源 (电路1-5) ====================

    // 配方01 - 木质资源包 (初始配方，使用木棍作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_01')
        .circuit(1)
        .notConsumable('minecraft:stick') // 初始无消耗催化剂
        .itemOutputs('64x minecraft:oak_log')        // 橡木原木 (随机催化剂)
        .itemOutputs('64x gtceu:sticky_resin')     // 黏性树脂 (随机催化剂)
        .itemOutputs('64x minecraft:white_wool') // 白色羊毛 (随机催化剂)
        .itemOutputs('64x minecraft:oak_sapling')  // 橡树树苗 (随机催化剂)
        .itemOutputs('64x minecraft:birch_sapling') // 白桦树苗 (随机催化剂)
        .itemOutputs('64x gtceu:rubber_sapling')   // 橡胶树苗 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方02 - 石材资源包 (使用配方01的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_02')
        .circuit(2)
        .notConsumable('#catalyst:tier1') // 使用配方01的任何产物作为催化剂
        .itemOutputs('64x minecraft:cobblestone') // 圆石 (随机催化剂)
        .itemOutputs('64x minecraft:sand')          // 沙子 (随机催化剂)
        .itemOutputs('64x minecraft:clay')          // 黏土 (随机催化剂)
        .itemOutputs('64x minecraft:flint')          // 燧石 (随机催化剂)
        .itemOutputs('64x minecraft:dirt')           // 泥土 (随机催化剂)
        .itemOutputs('64x minecraft:gravel')         // 沙砾 (替代奇点)
        .EUt(1)
        .duration(40)

    // 配方03 - 种植资源包 (使用配方02的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_03')
        .circuit(3)
        .notConsumable('#catalyst:tier2') // 使用配方02的任何产物作为催化剂
        .itemOutputs('64x minecraft:sugar_cane')   // 甘蔗 (随机催化剂)
        .itemOutputs('64x minecraft:wheat_seeds')   // 小麦种子 (随机催化剂)
        .itemOutputs('64x minecraft:potato')         // 马铃薯 (随机催化剂)
        .itemOutputs('64x minecraft:melon')          // 西瓜 (随机催化剂)
        .itemOutputs('64x minecraft:carrot')         // 胡萝卜 (随机催化剂)
        .itemOutputs('16x ae2:creative_energy_cell') // 创造能源元件 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方04 - 花卉资源包 (使用配方03的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_04')
        .circuit(4)
        .notConsumable('#catalyst:tier3') // 使用配方03的任何产物作为催化剂
        .itemOutputs('64x minecraft:poppy')          // 虞美人 (随机催化剂)
        .itemOutputs('64x minecraft:dandelion')     // 蒲公英 (随机催化剂)
        .itemOutputs('64x minecraft:cactus')         // 仙人掌 (随机催化剂)
        .itemOutputs('64x minecraft:cornflower')    // 矢车菊 (随机催化剂)
        .itemOutputs('64x minecraft:bone_meal')     // 骨粉 (随机催化剂)
        .itemOutputs('64x minecraft:ink_sac')       // 墨囊 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方05 - 珍稀资源包 (使用配方04的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_05')
        .circuit(5)
        .notConsumable('#catalyst:tier4') // 使用配方04的任何产物作为催化剂
        .itemOutputs('64x minecraft:leather')       // 皮革 (随机催化剂)
        .itemOutputs('64x minecraft:blaze_rod')    // 烈焰棒 (随机催化剂)
        .itemOutputs('16x minecraft:ender_pearl')   // 末影珍珠 (随机催化剂)
        .itemOutputs('64x minecraft:nether_star')  // 下界之星 (随机催化剂)
        .itemOutputs('64x minecraft:gunpowder')     // 火药 (随机催化剂)
        .itemOutputs('64x minecraft:ghast_tear')    // 恶魂之泪 (随机催化剂)
        .outputFluids('gtceu:oil_medium 72000') // 原油
        .EUt(1)
        .duration(40)

    // ==================== TIER 2: 矿物资源 (电路10-15) ====================

    // 配方10 - 主世界矿物包 (使用配方05的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_10')
        .circuit(10)
        .notConsumable('#catalyst:tier5') // 使用配方05的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_coal')         // 粗煤炭 (随机催化剂)
        .itemOutputs('64x minecraft:raw_copper')    // 粗铜 (随机催化剂)
        .itemOutputs('64x minecraft:raw_iron')      // 粗铁 (随机催化剂)
        .itemOutputs('64x gtceu:raw_redstone')    // 粗红石 (随机催化剂)
        .itemOutputs('64x minecraft:raw_gold')       // 粗金 (随机催化剂)
        .itemOutputs('64x gtceu:raw_diamond')     // 粗钻石 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方11 - 异世界矿物包 (使用配方10的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_11')
        .circuit(11)
        .notConsumable('#catalyst:tier10') // 使用配方10的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_nether_quartz') // 粗下界石英 (随机催化剂)
        .itemOutputs('64x minecraft:glowstone')       // 萤石 (随机催化剂)
        .itemOutputs('64x minecraft:end_stone')      // 末地石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_lapis')        // 粗青金石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_emerald')       // 粗绿宝石 (随机催化剂)
        .itemOutputs('64x minecraft:shulker_shell')  // 潜影壳 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方12 - GTCEu扩展矿物包 (使用配方11的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_12')
        .circuit(12)
        .notConsumable('#catalyst:tier11') // 使用配方11的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_tin')         // 粗锡 (随机催化剂)
        .itemOutputs('64x gtceu:raw_certus_quartz') // 粗赛特斯石英 (随机催化剂)
        .itemOutputs('64x gtceu:raw_amethyst')     // 粗紫水晶 (随机催化剂)
        .itemOutputs('64x ae2:sky_stone_block')    // 陨石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_lead')        // 粗铅 (随机催化剂)
        .itemOutputs('64x gtceu:raw_silver')       // 粗银 (随机催化剂)
        .EUt(1)
        .duration(40)

    // ==================== TIER 3: GTM矿物 (电路20-26) ====================

    // 配方20 - 重金属矿物包 (使用配方12的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_20')
        .circuit(20)
        .notConsumable('#catalyst:tier12') // 使用配方12的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_stibnite')    // 粗辉锑矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_salt')          // 粗盐 (随机催化剂)
        .itemOutputs('64x gtceu:raw_lepidolite') // 粗锂云母 (随机催化剂)
        .itemOutputs('64x gtceu:raw_silver')       // 粗银 (随机催化剂)
        .itemOutputs('64x gtceu:raw_galena')      // 粗方铅矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_nickel')        // 粗镍 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方21 - 工业合金矿物包 (使用配方20的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_21')
        .circuit(21)
        .notConsumable('#catalyst:tier20') // 使用配方20的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_garnierite')  // 粗硅镁镍矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_cobalt')       // 粗钴 (随机催化剂)
        .itemOutputs('64x gtceu:raw_magnesite')  // 粗菱镁矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_oilsands')     // 粗油砂 (随机催化剂)
        .itemOutputs('64x gtceu:raw_aluminium')   // 粗铝 (随机催化剂)
        .itemOutputs('64x gtceu:raw_ilmenite')     // 粗钛铁矿 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方22 - 现代金属矿物包 (使用配方21的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_22')
        .circuit(22)
        .notConsumable('#catalyst:tier21') // 使用配方21的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_pyrolusite')   // 粗软锰矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_vanadium_magnetite') // 粗钒磁铁矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_sphalerite') // 粗闪锌矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_bauxite')     // 粗铝土矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_platinum')    // 粗铂 (随机催化剂)
        .itemOutputs('64x gtceu:raw_palladium')    // 粗钯 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方23 - 工业矿物包 (使用配方22的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_23')
        .circuit(23)
        .notConsumable('#catalyst:tier22') // 使用配方22的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_mica')        // 粗云母 (随机催化剂)
        .itemOutputs('64x gtceu:raw_asbestos')     // 粗石棉 (随机催化剂)
        .itemOutputs('64x gtceu:raw_calcite')     // 粗方解石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_graphite')    // 粗石墨 (随机催化剂)
        .itemOutputs('64x gtceu:raw_quartzite')   // 粗石英岩 (随机催化剂)
        .itemOutputs('64x gtceu:raw_tricalcium_phosphate') // 粗磷酸三钙 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方24 - 稀有矿物包 (使用配方23的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_24')
        .circuit(24)
        .notConsumable('#catalyst:tier23') // 使用配方23的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_scheelite')   // 粗白钨矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_cooperite')   // 粗谢尔顿矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_monazite')    // 粗独居石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_pitchblende') // 粗沥青铀矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_plutonium')   // 粗钚239 (随机催化剂)
        .itemOutputs('64x gtceu:raw_naquadah')     // 粗硅岩 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方25 - 宝石矿物包 (使用配方24的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_25')
        .circuit(25)
        .notConsumable('#catalyst:tier24') // 使用配方24的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_ruby')        // 粗红宝石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_realgar')     // 粗雄黄 (随机催化剂)
        .itemOutputs('64x gtceu:raw_sapphire')    // 粗蓝宝石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_electrotine') // 粗蓝石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_tantalite')   // 粗钽铁矿 (随机催化剂)
        .itemOutputs('64x gtceu:raw_bastnasite')   // 粗氟碳镧铈矿 (随机催化剂)
        .EUt(1)
        .duration(40)

    // 配方26 - 终极矿物包 (使用配方25的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_26')
        .circuit(26)
        .notConsumable('#catalyst:tier25') // 使用配方25的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_molybdenum')  // 粗钼 (随机催化剂)
        .itemOutputs('64x gtceu:raw_pollucite')   // 粗铯榴石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_beryllium')   // 粗铍 (随机催化剂)
        .itemOutputs('64x gtceu:raw_barite')      // 粗重晶石 (随机催化剂)
        .itemOutputs('64x gtceu:raw_cinnabar')    // 粗朱砂 (随机催化剂)
        .itemOutputs('64x gtceu:raw_saltpeter')   // 粗硝石 (随机催化剂)
        .EUt(1)
        .duration(40)

    // ==================== 终极配方 ====================

    // 最终的终极配方 (使用配方26的随机产物作为无消耗催化剂)
    event.recipes.gtceu.electrolyzer('gtceu:optimized_se_ultimate')
        .circuit(16)  // 修复：将33改为16，避免电路配置超出范围
        .notConsumable('#catalyst:tier26') // 使用配方26的任何产物作为催化剂
        .itemOutputs('64x gtceu:raw_naquadah')      // 粗硅岩
        .itemOutputs('64x gtceu:raw_plutonium')     // 粗钚239
        .itemOutputs('64x gtceu:raw_ruby')         // 粗红宝石
        .itemOutputs('64x gtceu:raw_sapphire')    // 粗蓝宝石
        .itemOutputs('64x gtceu:raw_molybdenum') // 粗钼 (返还催化剂，形成循环)
        .itemOutputs('64x gtceu:raw_beryllium')    // 粗铍
        .EUt(1)
        .duration(40)
})

// 创建催化剂标签系统
ServerEvents.tags('item', event => {
    // T1催化剂 (配方01的产物)
    event.add('catalyst:tier1', [
        'minecraft:oak_log',
        'gtceu:sticky_resin',
        'minecraft:white_wool',
        'minecraft:oak_sapling',
        'minecraft:birch_sapling',
        'gtceu:rubber_sapling'
    ])
    
    // T2催化剂 (配方02的产物) - 移除了奇点，替换为沙砾
    event.add('catalyst:tier2', [
        'minecraft:cobblestone',
        'minecraft:sand',
        'minecraft:clay',
        'minecraft:flint',
        'minecraft:dirt',
        'minecraft:gravel'  // 用沙砾替代奇点
    ])
    
    // T3催化剂 (配方03的产物)
    event.add('catalyst:tier3', [
        'minecraft:sugar_cane',
        'minecraft:wheat_seeds',
        'minecraft:potato',
        'minecraft:melon',
        'minecraft:carrot',
        'ae2:creative_energy_cell'
    ])
    
    // T4催化剂 (配方04的产物)
    event.add('catalyst:tier4', [
        'minecraft:poppy',
        'minecraft:dandelion',
        'minecraft:cactus',
        'minecraft:cornflower',
        'minecraft:bone_meal',
        'minecraft:ink_sac'
    ])
    
    // T5催化剂 (配方05的产物)
    event.add('catalyst:tier5', [
        'minecraft:leather',
        'minecraft:blaze_rod',
        'minecraft:ender_pearl',
        'minecraft:nether_star',
        'minecraft:gunpowder',
        'minecraft:ghast_tear'
    ])
    
    // T10催化剂 (配方10的产物)
    event.add('catalyst:tier10', [
        'gtceu:raw_coal',
        'minecraft:raw_copper',
        'minecraft:raw_iron',
        'gtceu:raw_redstone',
        'minecraft:raw_gold',
        'gtceu:raw_diamond'
    ])
    
    // T11催化剂 (配方11的产物)
    event.add('catalyst:tier11', [
        'gtceu:raw_nether_quartz',
        'minecraft:glowstone',
        'minecraft:end_stone',
        'gtceu:raw_lapis',
        'gtceu:raw_emerald',
        'minecraft:shulker_shell'
    ])
    
    // T12催化剂 (配方12的产物)
    event.add('catalyst:tier12', [
        'gtceu:raw_tin',
        'gtceu:raw_certus_quartz',
        'gtceu:raw_amethyst',
        'ae2:sky_stone_block',
        'gtceu:raw_lead',
        'gtceu:raw_silver'
    ])
    
    // T20催化剂 (配方20的产物)
    event.add('catalyst:tier20', [
        'gtceu:raw_stibnite',
        'gtceu:raw_salt',
        'gtceu:raw_lepidolite',
        'gtceu:raw_silver',
        'gtceu:raw_galena',
        'gtceu:raw_nickel'
    ])
    
    // T21催化剂 (配方21的产物)
    event.add('catalyst:tier21', [
        'gtceu:raw_garnierite',
        'gtceu:raw_cobalt',
        'gtceu:raw_magnesite',
        'gtceu:raw_oilsands',
        'gtceu:raw_aluminium',
        'gtceu:raw_ilmenite'
    ])
    
    // T22催化剂 (配方22的产物)
    event.add('catalyst:tier22', [
        'gtceu:raw_pyrolusite',
        'gtceu:raw_vanadium_magnetite',
        'gtceu:raw_sphalerite',
        'gtceu:raw_bauxite',
        'gtceu:raw_platinum',
        'gtceu:raw_palladium'
    ])
    
    // T23催化剂 (配方23的产物)
    event.add('catalyst:tier23', [
        'gtceu:raw_mica',
        'gtceu:raw_asbestos',
        'gtceu:raw_calcite',
        'gtceu:raw_graphite',
        'gtceu:raw_quartzite',
        'gtceu:raw_tricalcium_phosphate'
    ])
    
    // T24催化剂 (配方24的产物)
    event.add('catalyst:tier24', [
        'gtceu:raw_scheelite',
        'gtceu:raw_cooperite',
        'gtceu:raw_monazite',
        'gtceu:raw_pitchblende',
        'gtceu:raw_plutonium',
        'gtceu:raw_naquadah'
    ])
    
    // T25催化剂 (配方25的产物)
    event.add('catalyst:tier25', [
        'gtceu:raw_ruby',
        'gtceu:raw_realgar',
        'gtceu:raw_sapphire',
        'gtceu:raw_electrotine',
        'gtceu:raw_tantalite',
        'gtceu:raw_bastnasite'
    ])
    
    // T26催化剂 (配方26的产物)
    event.add('catalyst:tier26', [
        'gtceu:raw_molybdenum',
        'gtceu:raw_pollucite',
        'gtceu:raw_beryllium',
        'gtceu:raw_barite',
        'gtceu:raw_cinnabar',
        'gtceu:raw_saltpeter'
    ])
})
