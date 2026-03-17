//作者：rlcyyg1108，QQ名叫戮屠槃蔑孽痠靡脳谑肂瘢彘
//下调了一些大机器的时期，在需要下位的阶段就能用上位，真是惬意啊
//给一些机制不太行（我觉得）的机器用配方给予效率加强
//给一些我游玩过程中遇到的无合适配方进行了配方格雷化
//写于2026.2.23
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