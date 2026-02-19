ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    
    gtr.suprachronal_assembly_line("greythings:fishbig_custom")     //超时空装配线鱼大配方
        .chancedInput("expatternprovider:fishbig", 7500, 0)
        .itemInputs("32x gtlcore:compressed_pufferfish",
            "16x gtlcore:super_glue",
            "8x gtlcore:super_glue",
            "15x kubejs:fishbig_fabric",
            "3x kubejs:fishbig_frame",
            "kubejs:fishbig_hade",
            "kubejs:fishbig_hair",
            "kubejs:fishbig_lhand",
            "kubejs:fishbig_rhand",
            "kubejs:fishbig_rleg",
            "kubejs:fishbig_lleg",
            "kubejs:fishbig_body")
        .inputFluids("gtceu:miracle_gas 240000000","gtceu:uu_matter 2147483646")
        .itemOutputs("2x expatternprovider:fishbig")
        .EUt( 131072 * GTValues.VA[GTValues.MAX])
        .duration(288000)
        .stationResearch(b => b.researchStack("ae2:controller")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_hade_custom")    //鱼大头部
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("64x gtceu:double_cosmic_plate",
            "64x gtceu:double_cosmic_plate",
            "64x gtceu:double_cosmic_plate",
            "48x gtceu:double_cosmic_plate",
            "48x kubejs:fishbig_frame",
            "48x gtceu:create_computation",
            "64x gtlcore:max_sensor",
            "32x gtlcore:max_sensor",)
        .inputFluids("gtceu:transcendentmetal 13824")
        .itemOutputs("kubejs:fishbig_hade")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:barrier")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_hair_custom")    //鱼大头发
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("48x gtlcore:infinity_glass",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "48x kubejs:fishbig_frame",
            "64x kubejs:fishbig_fabric",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_hair")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:end_portal_frame")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))
    
    gtr.suprachronal_assembly_line("greythings:fishbig_body_custom")    //鱼大身体
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("48x gtceu:create_aggregation",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_frame",
            "32x kubejs:fishbig_frame",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_body")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:structure_void")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_lhand_custom")   //鱼大左手
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("3x gtceu:creative_data_access_hatch",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "48x kubejs:fishbig_frame",
            "48x gtlcore:component_assembly_line_casing_max",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_lhand")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:jigsaw")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_rhand_custom")   //鱼大右手
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("3x gtmthings:creative_laser_hatch",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "48x kubejs:fishbig_frame",
            "48x gtlcore:component_assembly_line_casing_max",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_rhand")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:structure_block")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_rleg_custom")    //鱼大右腿
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("3x gtmthings:creative_laser_hatch",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "48x kubejs:fishbig_frame",
            "48x gtceu:max_buffer",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_rleg")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:command_block_minecart")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))

    gtr.suprachronal_assembly_line("greythings:fishbig_lleg_custom")    //鱼大左腿
        .notConsumable("expatternprovider:fishbig")
        .itemInputs("3x gtceu:creative_data_access_hatch",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "64x kubejs:fishbig_fabric",
            "48x kubejs:fishbig_frame",
            "48x gtceu:max_buffer",
            "32x kubejs:fishbig_fabric",)
        .inputFluids("gtceu:eternity 13824")
        .itemOutputs("kubejs:fishbig_lleg")
        .EUt(65536 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .stationResearch(b => b.researchStack("minecraft:debug_stick")
            .dataStack("gtceu:data_module")
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(524288))
            
    gtr.qft("greythings:treasures_crystal_1_custom")    //奇珍结晶1
        .notConsumable("kubejs:heartofthesmogus")
        .chancedInput("gtlcore:treasures_crystal", 2500, 0)
        .itemInputs("16x gtlcore:world_fragments_overworld",
                    "16x gtlcore:world_fragments_nether",
                    "16x gtlcore:world_fragments_end",
                    "16x gtlcore:world_fragments_reactor",
                    "16x gtlcore:world_fragments_moon",
                    "16x gtlcore:world_fragments_mars",
                    "16x gtlcore:world_fragments_venus",
                    "16x gtlcore:world_fragments_mercury",
                    "16x gtlcore:world_fragments_ceres",
                    "16x gtlcore:world_fragments_io",
                    "16x gtlcore:world_fragments_ganymede",
                    "16x gtlcore:world_fragments_pluto",
                    "16x gtlcore:world_fragments_enceladus",
                    "16x gtlcore:world_fragments_titan",
                    "16x gtlcore:world_fragments_glacio",
                    "16x gtlcore:world_fragments_barnarda",
                    )
        .inputFluids("gtceu:uu_matter 100000000","gtceu:eternity 250000","gtceu:magmatter 250000")
        .itemOutputs("8x gtlcore:treasures_crystal")
        .EUt(1024 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("greythings:treasures_crystal_0_custom")    //奇珍结晶0
        .notConsumable("8x gtlcore:super_glue")
        .chancedInput("gtlcore:treasures_crystal", 7500, 0)
        .itemInputs("64x gtlcore:world_fragments_overworld",
                    "64x gtlcore:world_fragments_nether",
                    "64x gtlcore:world_fragments_end",
                    "64x gtlcore:world_fragments_reactor",
                    "64x gtlcore:world_fragments_moon",
                    "64x gtlcore:world_fragments_mars",
                    "64x gtlcore:world_fragments_venus",
                    "64x gtlcore:world_fragments_mercury",
                    "64x gtlcore:world_fragments_ceres",
                    "64x gtlcore:world_fragments_io",
                    "64x gtlcore:world_fragments_ganymede",
                    "64x gtlcore:world_fragments_pluto",
                    "64x gtlcore:world_fragments_enceladus",
                    "64x gtlcore:world_fragments_titan",
                    "64x gtlcore:world_fragments_glacio",
                    "64x gtlcore:world_fragments_barnarda",
                    )
        .inputFluids("gtceu:uu_matter 100000000","gtceu:eternity 2500000","gtceu:magmatter 2500000")
        .itemOutputs("2x gtlcore:treasures_crystal")
        .EUt(1024 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("greythings:mining_crystal_0_custom")   //采掘结晶0
        .notConsumable("8x gtlcore:super_glue")
        .chancedInput("gtlcore:mining_crystal", 7500, 0)
        .itemInputs("64x gtlcore:world_fragments_overworld",
                    "64x gtlcore:world_fragments_nether",
                    "64x gtlcore:world_fragments_end",
                    "64x gtlcore:world_fragments_reactor",
                    "64x gtlcore:world_fragments_moon",
                    "64x gtlcore:world_fragments_mars",
                    "64x gtlcore:world_fragments_venus",
                    "64x gtlcore:world_fragments_mercury",
                    "64x gtlcore:world_fragments_ceres",
                    "64x gtlcore:world_fragments_io",
                    "64x gtlcore:world_fragments_ganymede",
                    "64x gtlcore:world_fragments_pluto",
                    "64x gtlcore:world_fragments_enceladus",
                    "64x gtlcore:world_fragments_titan",
                    "64x gtlcore:world_fragments_glacio",
                    "64x gtlcore:world_fragments_barnarda",
                    )
        .inputFluids("gtceu:uu_matter 100000000","gtceu:magmatter 2500000","gtceu:eternity 2500000")
        .itemOutputs("2x gtlcore:mining_crystal")
        .EUt(1024 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.qft("greythings:mining_crystal_1_custom")   //采掘结晶1
        .notConsumable("gtlcore:ultimate_tea")
        .chancedInput("gtlcore:mining_crystal", 2500, 0)
        .itemInputs("16x gtlcore:world_fragments_overworld",
                    "16x gtlcore:world_fragments_nether",
                    "16x gtlcore:world_fragments_end",
                    "16x gtlcore:world_fragments_reactor",
                    "16x gtlcore:world_fragments_moon",
                    "16x gtlcore:world_fragments_mars",
                    "16x gtlcore:world_fragments_venus",
                    "16x gtlcore:world_fragments_mercury",
                    "16x gtlcore:world_fragments_ceres",
                    "16x gtlcore:world_fragments_io",
                    "16x gtlcore:world_fragments_ganymede",
                    "16x gtlcore:world_fragments_pluto",
                    "16x gtlcore:world_fragments_enceladus",
                    "16x gtlcore:world_fragments_titan",
                    "16x gtlcore:world_fragments_glacio",
                    "16x gtlcore:world_fragments_barnarda",
                    )
        .inputFluids("gtceu:uu_matter 100000000","gtceu:eternity 250000","gtceu:magmatter 250000")
        .itemOutputs("8x gtlcore:mining_crystal")
        .EUt(1024 * GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.assembler("greythings:super_portable_item_storage_cell_custom")     //青铜物品盘组装
        .itemInputs("64x gtceu:bronze_crate")
        .itemOutputs("gtlcore:super_portable_item_storage_cell")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)

    gtr.assembler("greythings:super_portable_fluid_storage_cell_custom")    //青铜流体盘组装
        .itemInputs("64x gtceu:bronze_drum")
        .itemOutputs("gtlcore:super_portable_fluid_storage_cell")
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)

    const drill_materials = ["titanium","neutronium","ultimet","hsse","vibranium","naquadah_alloy","duranium"]
        for (let i = 0; i < drill_materials.length; i++){   //钻头组装
            gtr.assembler(`greythings:${drill_materials[i]}_drill_head_custom`)
            .circuit(15)
            .itemInputs(`4x gtceu:${drill_materials[i]}_plate`,"4x gtceu:steel_plate")
            .itemOutputs(`gtceu:${drill_materials[i]}_drill_head`)
            .EUt(2 * GTValues.VA[GTValues.LV])
            .duration(200)
        }
            gtr.assembler("greythings:steel_drill_head_custom")
            .circuit(16)
            .itemInputs("8x gtceu:steel_plate")
            .itemOutputs("gtceu:steel_drill_head")
            .EUt(2 * GTValues.VA[GTValues.LV])
            .duration(200)

    gtr.qft("greythings:command_block_custom")  //脉冲型命令方块
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("kubejs:command_wand")
        .itemInputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_block")
        .inputFluids("gtceu:miracle_gas 24000")
        .itemOutputs("minecraft:command_block")
        .EUt(128 * GTValues.VA[GTValues.MAX])
        .duration(240)
        .dimension("kubejs:ancient_world")

    gtr.qft("greythings:magmatter_block")   //磁物质块
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("16x gtlcore:compressed_pufferfish")
        .itemInputs("64x gtceu:magmatter_ingot")
        .inputFluids("gtceu:miracle_adhesive 10000")
        .itemOutputs("gtceu:magmatter_block")
        .EUt(128 * GTValues.VA[GTValues.MAX])
        .duration(240)
        .dimension("kubejs:ancient_world")

    gtr.qft("greythings:chain_command_block_custom")    //连锁型命令方块
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("kubejs:command_wand")
        .itemInputs("kubejs:chain_command_block_core","kubejs:command_block_broken")
        .inputFluids("gtceu:miracle_gas 24000")
        .itemOutputs("minecraft:chain_command_block")
        .EUt(256 * GTValues.VA[GTValues.MAX])
        .duration(240)
        .dimension("kubejs:ancient_world")

    gtr.qft("greythings:repeating_command_block_custom")    //循环型命令方块
        .notConsumable("expatternprovider:fishbig")
        .notConsumable("kubejs:command_wand")
        .itemInputs("kubejs:repeating_command_block_core","kubejs:chain_command_block_broken")
        .inputFluids("gtceu:miracle_gas 24000")
        .itemOutputs("minecraft:repeating_command_block")
        .EUt(256 * GTValues.VA[GTValues.MAX])
        .duration(240)
        .dimension("kubejs:ancient_world")

    gtr.electric_implosion_compressor("greythings:spacetime_singularity_custom")    //奇点-时空
        .notConsumable("16x gtceu:transcendentmetal_nanoswarm")
        .itemInputs("1000x gtceu:spacetime_ingot")
        .itemOutputs(Item.of('avaritia:singularity', '{Id:"avaritia:spacetime"}'))
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(200)
        .addCondition(new GravityCondition(false))

    gtr.qft("greythings:endest_pearl_custom")   //终望珍珠
        .itemInputs("24x minecraft:end_stone",
            "32x minecraft:ender_pearl",
            "4x avaritia:neutron_ingot",
            "minecraft:nether_star"
            )
        .inputFluids("gtceu:uu_matter 1000")
        .itemOutputs("avaritia:endest_pearl")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(300)
        .addCondition(new GravityCondition(true))

    gtr.qft("greythings:cosmic_meatballs_custom")   //寰宇肉丸
        .notConsumable("gtlcore:compressed_pufferfish")
        .itemInputs("minecraft:porkchop",
            "minecraft:beef",
            "minecraft:mutton",
            "minecraft:cod",
            "minecraft:salmon",
            "minecraft:tropical_fish",
            "minecraft:pufferfish",
            "minecraft:rabbit",
            "minecraft:chicken",
            "minecraft:rotten_flesh",
            "minecraft:spider_eye",
            "minecraft:egg",
            "avaritia:neutron_nugget"
            )
        .inputFluids("gtceu:miracle_adhesive 1000")
        .itemOutputs("avaritia:cosmic_meatballs")
        .EUt(64 * GTValues.VA[GTValues.MAX])
        .duration(300)

    gtr.dimensionally_transcendent_mixer("greythings:miracle_adhesive_custom")  //奇迹粘合剂
        .itemInputs("kubejs:hyper_stable_self_healing_adhesive")
        .inputFluids("gtceu:miracle_gas 100000")
        .outputFluids("gtceu:miracle_adhesive 100000")
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(300)
        .addCondition(new GravityCondition(false))

    gtr.qft("greythings:neutronium_credit")     //中子素币
        .notConsumable("kubejs:suprachronal_mainframe_complex")
        .notConsumable("gtceu:credit_casting_mold")
        .itemInputs("4096x avaritia:neutron")
        .inputFluids("gtceu:neutronium 589824")
        .itemOutputs("gtceu:neutronium_credit")
        .EUt(256 * GTValues.VA[GTValues.MAX])
        .duration(300)
        .addCondition(new GravityCondition(true))

    gtr.electric_implosion_compressor("greythings:quantum_entangled_singularity_1")    //无nbt量子纠缠态奇点1
        .itemInputs("ae2:singularity",
                    "gtceu:ender_pearl_dust")
        .itemOutputs("2x ae2:quantum_entangled_singularity")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1)

    gtr.electric_implosion_compressor("greythings:quantum_entangled_singularity_2")    //无nbt量子纠缠态奇点2
        .itemInputs("ae2:singularity",
                    "minecraft:ender_pearl")
        .itemOutputs("2x ae2:quantum_entangled_singularity")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(1)

    const singularity_materials_1 = ["lafium","enderite","ruthenium_trinium_americium_neutronate","hastelloyk_243","titansteel","hastelloy_x","highurabilityompoundteel","hsse","pikyonium","abyssalalloy","black_titanium","ultimet","enriched_naquadah_trinium_europium_duranide","blue_steel","cinobite","maraging_steel_300"]
    const singularity_materials_2 = ["potin","indium_gallium_phosphide","yttrium_barium_cuprate","cobalt_brass","uranium_rhodium_dinaquadide","red_steel","germaniumtungstennitride","watertight_steel","aluminium_bronze","soldering_alloy","nickel_zinc_ferrite","hsla_steel","rtm_alloy","hastelloy_c_276","stellite_100","grisium"]
    for (let i = 0; i < singularity_materials_1.length; i++){   //电聚爆奇点
    gtr.electric_implosion_compressor(`greythings:combined_singularity_${singularity_materials_1[i]}`)
        .itemInputs(`64x gtceu:${singularity_materials_1[i]}_block`,
                    `64x gtceu:${singularity_materials_2[i]}_block`,
        )
        .itemOutputs(`kubejs:combined_singularity_${[i]}`)
        .EUt(64 * GTValues.VA[GTValues.MAX])
        .duration(800)
    }

    gtr.precision_assembler("greythings:nan_certificate")   //菜鸟证明
    .itemInputs("64x gtceu:periodicium_block",
                "64x gtceu:superheavy_l_alloy_block",
                "64x gtceu:superheavy_h_alloy_block",
                "576x gtceu:copper76_dust",
    )
    .inputFluids("gtceu:ytterbium_178 82944",
        "gtceu:titanium_50 82944",
        "gtceu:uranium_235 82944",
        "gtceu:plutonium_241 82944",
    )
    .itemOutputs("gtceu:nan_certificate")
    .EUt(2 * GTValues.VA[GTValues.UXV])
    .duration(20000)
    .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    .addCondition(new GravityCondition(true))
    .addCondition(new GravityCondition(false))
})
