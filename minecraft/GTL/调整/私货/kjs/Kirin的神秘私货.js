ServerEvents.recipes(event => {
    const gtr = event.recipes.gtceu
    //铁烧锻铁
    event.smelting('gtceu:wrought_iron_ingot','minecraft:iron_ingot',0,10);
    //锻铁烧钢
    event.smelting('gtceu:steel_ingot','gtceu:wrought_iron_ingot',0,10);

    //认准24号电路
    //多功能机械方块组装降价
    gtr.assembler("kirin:multi_functional_casing")
        .itemInputs("gtceu:solid_machine_casing", "4x gtceu:double_aluminium_plate", "2x gtceu:mv_electric_motor", "2x gtceu:mv_electric_piston")
        .itemOutputs("8x gtlcore:multi_functional_casing")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //钢钻头
    //我操爆破作者是啥卵吗钢钻头和其他钻头一个电路
    gtr.assembler("kirin:steel_drill_head_as")
        .itemInputs("8x gtceu:steel_plate")
        .itemOutputs("gtceu:steel_drill_head")
        .circuit(24)
        .EUt(120)
        .duration(128)
    //大型蒸汽输入仓降价降阶段
    gtr.assembler("kirin:large_steam_input_hatch")
        .itemInputs("gtceu:steam_machine_casing", "4x gtceu:steel_gear", "2x gtceu:steel_tiny_fluid_pipe", "2x gtceu:steel_rotor")
        .itemOutputs("2x gtceu:large_steam_input_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //进阶探板降阶段
    gtr.assembler("kirin:advanced_energy_detector_cover")
        .itemInputs("gtceu:energy_detector_cover", "4x gtceu:lv_sensor")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("gtceu:advanced_energy_detector_cover")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //洁净的可配置自动维护仓降价降阶段
    //无菌
    gtr.assembler("kirin:sterile_configuration_cleaning_maintenance_hatch")
        .itemInputs("gtceu:auto_configuration_maintenance_hatch", "gtceu:sterile_cleaning_maintenance_hatch")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("gtceu:sterile_configuration_cleaning_maintenance_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //无菌重力
    gtr.assembler("kirin:sterile_cleaning_gravity_configuration_maintenance_hatch")
        .itemInputs("gtceu:sterile_configuration_cleaning_maintenance_hatch", "gtceu:gravity_hatch")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("gtceu:sterile_cleaning_gravity_configuration_maintenance_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //绝对
    gtr.assembler("kirin:law_configuration_cleaning_maintenance_hatch")
        .itemInputs("gtceu:auto_configuration_maintenance_hatch", "gtceu:law_cleaning_maintenance_hatch")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("gtceu:law_configuration_cleaning_maintenance_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //绝对重力
    gtr.assembler("kirin:law_cleaning_gravity_configuration_maintenance_hatch")
        .itemInputs("gtceu:law_configuration_cleaning_maintenance_hatch", "gtceu:gravity_hatch")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("gtceu:law_cleaning_gravity_configuration_maintenance_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //重力
    gtr.assembler("kirin:gravity_hatch")
        .itemInputs("ad_astra:gravity_normalizer", "4x gtceu:maintenance_hatch")
        .inputFluids("gtceu:darmstadtium 144")
        .itemOutputs("gtceu:gravity_hatch")
        .circuit(24)
        .duration(40)
        .EUt(7)
    //世界加速器进组装机
    for (let index = 1; index < 9; index++) {
        let tierName = GTValues.VN[index].toLowerCase()
        gtr.assembler(`kirin:${tierName}_world_accelerator`)
            .itemInputs(`4x gtceu:${tierName}_field_generator`,
                `2x gtceu:${tierName}_emitter`,
                `2x gtceu:${tierName}_sensor`,
                `gtceu:${tierName}_machine_hull`
                )
            .circuit(20)
            .itemOutputs(`gtceu:${tierName}_world_accelerator`)
            .EUt(GTValues.VA[index])
            .duration(200)
        }
    //并行控制仓进组装机
    for (let index = 4; index < 14; index++) {
        let tierName = GTValues.VN[index].toLowerCase()
        let circuitsName = GTValues.VN[index+1].toLowerCase()
        gtr.assembler(`kirin:${tierName}_parallel_hatch`)
            .itemInputs(`4x #gtceu:circuits/${circuitsName}`,
                `gtceu:${tierName}_emitter`,
                `gtceu:${tierName}_sensor`,
                `gtceu:${tierName}_machine_hull`
                )
            .circuit(23)
            .itemOutputs(`gtceu:${tierName}_parallel_hatch`)
            .EUt(GTValues.VA[index])
            .duration(200)
        }
        //单独处理max并行控制仓
        gtr.assembler('kirin:max_parallel_hatch')
            .itemInputs('4x kubejs:suprachronal_max',
                'gtlcore:max_emitter',
                'gtlcore:max_sensor',
                'gtceu:max_machine_hull'
            )
            .circuit(23)
            .itemOutputs('gtceu:max_parallel_hatch')
            .EUt(2147483648)
            .duration(200)
    //
})
