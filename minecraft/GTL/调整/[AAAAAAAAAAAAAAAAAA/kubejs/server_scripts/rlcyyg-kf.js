//作者：rlcyyg1108，QQ名叫戮屠槃蔑孽痠靡脳谑肂瘢彘
//下调了一些大机器的时期，在需要下位的阶段就能用上位，真是惬意啊
//给一些机制不太行（我觉得）的机器用配方给予效率加强
//给一些我游玩过程中遇到的无合适配方进行了配方格雷化
ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    //移除mek所有配方，这个是给我自己用的，所以默认注释掉
    //event.remove({ mod: 'mekanism' });
    //eaep的湮灭奇点工作台合成
    event.shaped(
        'extendedae_plus:oblivion_singularity',
        [
            ['minecraft:nether_star', 'minecraft:netherite_block', 'ae2:singularity']
        ]
    )
        .id('kubejs:eaep_oblivion_singularity')
        .group('kubejs:eaep_oblivion_singularity');
    //搅拌机合木化工厂
    gtr.mixer("rlcyyg:wood_distillation")
        .itemInputs("16x gtceu:distillation_tower",
            "8x gtceu:pyrolyse_oven",
            "48x gtceu:stainless_steel_huge_fluid_pipe",
            '12x gtceu:hv_electric_pump',
            '16x #gtceu:circuits/hv'
        )
        .inputFluids("gtceu:stainless_steel 1296",
            "gtceu:soldering_alloy 1520"
        )
        .itemOutputs("gtceu:wood_distillation")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20)
    //搅拌机合石化工厂
    gtr.mixer("rlcyyg:petrochemical_plant")
        .itemInputs("32x gtceu:distillation_tower",
            "16x gtceu:pyrolyse_oven",
            "8x gtceu:large_chemical_reactor",
            "48x gtceu:stainless_steel_huge_fluid_pipe",
            '12x gtceu:hv_electric_pump',
            '16x #gtceu:circuits/hv'
        )
        .inputFluids("gtceu:stainless_steel 1296",
            "gtceu:soldering_alloy 1520"
        )
        .itemOutputs("gtceu:petrochemical_plant")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20)
    //大集气加强
    //效率相当于不液化的空气，防止时间太短卡顿所以自带批处理x10
    //电压+2=功率*16，批处理x10，液化补偿x10，总共1600倍
    //空气
    gtr.large_gas_collector("rlcyyg:7")
        .notConsumable("kubejs:overworld_data")
        .notConsumable("gtceu:cold_ice_freezer")
        .outputFluids("gtceu:liquid_air 160000000")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(200)
    //下界空气
    gtr.large_gas_collector("rlcyyg:8")
        .notConsumable("kubejs:nether_data")
        .notConsumable("gtceu:cold_ice_freezer")
        .outputFluids("gtceu:liquid_nether_air 160000000")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(200)
    //末地空气
    gtr.large_gas_collector("rlcyyg:9")
        .notConsumable("kubejs:end_data")
        .notConsumable("gtceu:cold_ice_freezer")
        .outputFluids("gtceu:liquid_ender_air 160000000")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(200)
})

GTCEuStartupEvents.registry('gtceu:machine', e => {
    // 这样做可以获取代码提示
    /**
     * @type {Internal.MultiblockMachineBuilder}
     */
    let r = e.create('deep_atom_reassemble_chamber', 'multiblock');
    // 设定机器方块能够旋转到哪些方向
    r.rotationState(RotationState.NON_Y_AXIS)
    // 设置多方块结构
    r.pattern(
        def => FactoryBlockPattern.start() // 开始构建结构
            /*
.aisle("AAAAA", "A   A", "ABBBA", "A   A", "ABBBA", "AAAAA")
.aisle("AAAAA", "  C  ", "B   B", "  C  ", "B   B", "ADCDA")
.aisle("EAAAA", " CDC ", "B D B", " CDC ", "B D B", "ACDCA")
.aisle("AAAAA", "  C  ", "B   B", "  C  ", "B   B", "ADCDA")
.aisle("AAAAA", "A   A", "ABBBA", "A   A", "ABBBA", "AAAAA")
.where("~", Predicates.controller(Predicates.blocks(definition.get())))
.where("D", Predicates.blocks(Registries.getBlock("gtceu:steel_pipe_casing")))
.where("A", Predicates.blocks(Registries.getBlock("gtceu:solid_machine_casing")))
.where("C", Predicates.blocks(Registries.getBlock("gtceu:steel_gearbox")))
.where("E", Predicates.blocks(Registries.getBlock("gtceu:mv_fluid_drilling_rig")))
.where("B", Predicates.blocks(Registries.getBlock("gtceu:steel_frame")))
             */


            .aisle('CCCCCCC', 'P     P', 'P     P', 'P     P', 'P     P', 'P     P', 'CCCCCCC')
            .aisle('CDDDDDC', ' RRRRR ', ' FFFFF ', ' FGGGF ', ' FFFFF ', ' RRRRR ', 'CDDDDDC')
            .aisle('CDDDDDC', ' RFFFR ', ' FTTTF ', ' GAAAG ', ' FTTTF ', ' RFFFR ', 'CDDDDDC')
            .aisle('CDDDDDC', ' RFFFR ', ' FTTTF ', ' GATAG ', ' FTTTF ', ' RFFFR ', 'CDDDDDC')
            .aisle('CDDDDDC', ' RFFFR ', ' FTTTF ', ' GAAAG ', ' FTTTF ', ' RFFFR ', 'CDDDDDC')
            .aisle('CDDDDDC', ' RRRRR ', ' FFFFF ', ' FGGGF ', ' FFFFF ', ' RRRRR ', 'CDDDDDC')
            .aisle('CCC#CCC', 'P     P', 'P     P', 'P     P', 'P     P', 'P     P', 'CCCCCCC')
            .where('#', Predicates.controller(Predicates.blocks(def.get())))
            .where('D', Predicates.blocks('gtceu:atomic_casing'))
            .where('C',
                Predicates.blocks('gtceu:atomic_casing').setMinGlobalLimited(30)
                    .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
                    .or(Predicates.autoAbilities(def.recipeTypes)) // 自动根据配方类型设定需要的方块能力（物品/流体/能量的输入/输出）
            )
            .where('P', Predicates.blocks('ad_astra:ostrum_pillar'))
            .where('F', Predicates.blocks('gtceu:inert_machine_casing'))
            .where('T', Predicates.blocks('gtceu:ptfe_pipe_casing'))
            .where('R', Predicates.blocks('gtceu:rtm_alloy_coil_block'))
            .where('G', Predicates.blocks('gtceu:laminated_glass'))
            .where('A', Predicates.air())
            .where(' ', Predicates.any())
            .build() // 完成构建
    )
        // 机器结构有效时的纹理，建议使用各种机械方块的纹理以获取连接纹理
        // 参数1：基础纹理 - ResourceLocation
        // 参数2：有效时的纹理 - ResourceLocation - 意义不明，实践中似乎没有作用
        // 参数3（可省略）：是否染色 - boolean
        .workableCasingRenderer('gtceu:block/casings/gcym/atomic_casing', 'gtceu:block/multiblock/implosion_compressor', false)
        // 设置机器控制器方块的外观
        // 参数1：方块 - 方块 ID | Internal.Block
        .appearanceBlock(GCYMBlocks.CASING_ATOMIC)
        // 可用配方类型
        // 参数1（剩余参数）：配方类型 - GTRecipeType
        .recipeTypes(GTRecipeTypes.get('deep_atom_reassemble'), GTRecipeTypes.LARGE_CHEMICAL_RECIPES)
        // 配方调整函数（例如电压超频会让处理时间减少就是一种调整函数）
        .recipeModifier(GTRecipeModifiers.PARALLEL_HATCH.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK, GTRecipeModifiers.ELECTRIC_OVERCLOCK))

})
