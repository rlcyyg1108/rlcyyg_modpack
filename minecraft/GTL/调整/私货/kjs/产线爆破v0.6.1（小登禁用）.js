ServerEvents.recipes((BlastProduct) => {
    const grtr = BlastProduct.recipes.gtceu
    BlastProduct.remove({ id: "minecraft:crafting_table" })
    BlastProduct.remove({ id: "minecraft:furnace" })
    BlastProduct.remove({ id: "minecraft:blast_furnace" })
    BlastProduct.shaped("8x ae2:redstone_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "#forge:dusts/redstone"
    })
//红石p2p
    BlastProduct.shaped("8x ae2:item_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "#forge:chests"
    })
//物品p2p
    BlastProduct.shaped("8x ae2:fluid_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "minecraft:bucket"
    })
//流体p2p
    BlastProduct.shaped("8x ae2:fe_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "ae2:energy_acceptor"
    })
//能源p2p
    BlastProduct.shaped("8x ae2:light_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "minecraft:torch"
    })
//光p2p
    BlastProduct.shaped("8x mae2:pattern_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "ae2:blank_pattern"
    })
//样板p2p
    BlastProduct.shaped("8x mae2:eu_p2p_tunnel", [
        "AAA",
        "ADA",
        "AAA"
    ], {
        A: "ae2:me_p2p_tunnel",
        D: "gtceu:battery_alloy_ingot"
    })
//EUp2p
    BlastProduct.shaped("minecraft:crafting_table", [
        "AA ",
        "BB ",
        "   "
    ], {
        A: "minecraft:flint",
        B: "#minecraft:logs"
    })
    BlastProduct.shaped("minecraft:furnace", [
        "AAA",
        "BBB",
        "AAA"
    ], {
        A: "minecraft:cobblestone",
        B: "minecraft:flint"
    })
    BlastProduct.shaped("minecraft:blast_furnace", [
        "AAA",
        "ABA",
        "CDC"
    ], {
        A: "#forge:plates/iron",
        B: "minecraft:furnace",
        C: "minecraft:smooth_stone",
        D: "minecraft:iron_block"
    })

    grtr.electrolyzer("gtceu:cooperite_dust")//铂系金属一步产出
        .itemInputs("4x gtceu:purified_cooperite_ore")
        .inputFluids("gtceu:nitric_acid 400")
        .itemOutputs("4x gtceu:cooperite_dust")
        .itemOutputs("3x gtceu:palladium_dust")
        .itemOutputs("4x gtceu:ruthenium_dust") 
        .itemOutputs("4x gtceu:iridium_dust")
        .itemOutputs("2x gtceu:osmium_dust")
        .itemOutputs("4x gtceu:rhodium_dust")
        .outputFluids("gtceu:sulfuric_acid 4000")
        .EUt(1920)
        .duration(1024)
    grtr.large_chemical_reactor("gtceu:uranium_235_dust")//铀235一步产出
        .itemInputs("30x gtceu:impure_uraninite_dust")
        .inputFluids("gtceu:sulfuric_acid 15000")
        .inputFluids("gtceu:hydrogen 40000")
        .notConsumableFluid("gtceu:fluorine 5000")
        .outputFluids("gtceu:uranium_sulfate_waste_solution 30000")
        .itemOutputs("gtceu:uranium_235_dust")
        .itemOutputs("9x gtceu:uranium_dust")
        .circuit(23)
        .EUt(1920)
        .duration(640)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("gtceu:uranium_dust")//晶质铀矿急速处理
        .itemInputs("30x gtceu:uraninite_dust")
        .inputFluids("gtceu:hydrogen 40000")
        .notConsumableFluid("gtceu:fluorine 5000")
        .itemOutputs("gtceu:uranium_235_dust")
        .itemOutputs("9x gtceu:uranium_dust")
        .circuit(23)
        .EUt(1920)
        .duration(640)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("gtceu:alumina_dust")//氧化铝强行反应
        .itemInputs("2x gtceu:aluminium_dust")
        .inputFluids("gtceu:oxygen 3000")
        .circuit(24)
        .itemOutputs("5x gtceu:alumina_dust")
        .EUt(1920)
        .duration(64)
    grtr.electrolyzer("gtceu:tungsten_dust_li")//钨粉一步电解，钨酸锂
        .itemInputs("7x gtceu:tungstate_dust")
        .itemOutputs("2x gtceu:lithium_dust")
        .itemOutputs("gtceu:tungsten_dust")
        .outputFluids("gtceu:oxygen 3000")
        .EUt(1920)
        .duration(512)
    grtr.electrolyzer("gtceu:tungsten_dust_ca")//钨粉一步电解，钨酸钙
        .itemInputs("6x gtceu:scheelite_dust")
        .itemOutputs("gtceu:calcium_dust")
        .itemOutputs("gtceu:tungsten_dust")
        .outputFluids("gtceu:oxygen 3000")
        .EUt(1920)
        .duration(512)
    grtr.large_chemical_reactor("gtceu:refinery_gas")//天然气脱硫
        .inputFluids("gtceu:natural_gas 16000")
        .notConsumableFluid("gtceu:hydrogen 2000")
        .outputFluids("gtceu:refinery_gas 16000")
        .itemOutputs("gtceu:sulfur_dust")
        .EUt(30)
        .duration(128)
    grtr.large_chemical_reactor("gtceu:bromine")//暴力提溴
        .inputFluids("water 3000")
        .inputFluids("gtceu:chlorine 1500")
        .inputFluids("gtceu:salt_water 60000")
        .outputFluids("gtceu:bromine 1000")
        .circuit(24)
        .EUt(7680)
        .duration(512)
    grtr.large_chemical_reactor("gtceu:rare_earth_metal_dust")//独（群）居石一步出稀土金属粉
        .itemInputs("4x gtceu:monazite_dust")
        .inputFluids("gtceu:hydrogen 10000")
        .inputFluids("gtceu:hydrochloric_acid 1000")
        .inputFluids("gtceu:oxygen 1000")
        .itemOutputs("gtceu:rare_earth_metal_dust")
        .circuit(24)
        .cleanroom(CleanroomType.CLEANROOM)
        .EUt(7680)
        .duration(2048)
    grtr.large_chemical_reactor("gtceu:indium_dust")//一步铟富集
        .itemInputs("4x gtceu:purified_sphalerite_ore")
        .itemInputs("4x gtceu:purified_galena_ore")
        .inputFluids("gtceu:sulfuric_acid 16000")
        .itemOutputs("gtceu:indium_dust")
        .outputFluids("gtceu:lead_zinc_solution 16000")
        .circuit(4)
        .EUt(7680)
        .duration(128)
    grtr.chemical_reactor("gtceu:oil")//ad石油转化为gt石油
        .inputFluids("ad_astra:oil 1000")
        .outputFluids("gtceu:oil 1000")
        .EUt(2)
        .duration(16)
    grtr.large_chemical_reactor("gtceu:formic_acid")//甲酸一步产出
        .notConsumable("gtceu:potassium_hydroxide_dust")
        .inputFluids("gtceu:carbon_monoxide 1000")
        .inputFluids("water 1000")
        .outputFluids("gtceu:formic_acid 1000")
        .EUt(480)
        .duration(32)
    grtr.large_chemical_reactor("gtceu:potassium_iodide_dust")//海带生碘
        .itemInputs("80x minecraft:kelp")
        .inputFluids("water 10000")
        .notConsumableFluid("gtceu:chlorine 4000")
        .itemOutputs("2x gtceu:potassium_iodide_dust")
        .EUt(1920)
        .duration(1024)
    grtr.large_chemical_reactor("gtceu:agar_dust")//琼脂一步产出
        .itemInputs("12x gtceu:calcium_dust")
        .itemInputs("12x gtceu:meat_dust")
        .inputFluids("gtceu:sulfuric_acid 3000")
        .inputFluids("gtceu:distilled_water 17000")
        .inputFluids("gtceu:phosphoric_acid 3000")
        .itemOutputs("2x gtceu:phosphorus_dust")
        .itemOutputs("8x gtceu:agar_dust")
        .circuit(23)
        .EUt(30720)
        .duration(512)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
    grtr.distort("gtceu:super_mutated_living_solder")//复活旧版本超突变，直接从旧版本拿的，不是我写的
        .notConsumable("gtceu:draconium_nanoswarm")
        .itemInputs(
            "64x ae2:sky_dust",
            "64x kubejs:essence",
            "16x gtceu:nether_star_dust",
            "16x gtceu:draconium_dust"
        )
        .inputFluids(
            "gtceu:helium_plasma 64000",
            "gtceu:oxygen_plasma 64000",
            "gtceu:tin 64000",
            "gtceu:carbon 64000",
            "gtceu:beryllium 64000"
        )
        .outputFluids("gtceu:super_mutated_living_solder 64000")
        .blastFurnaceTemp(21000)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(600)
    grtr.extruder("gtceu:nan_certificate_rebirth")//不再是菜鸟的证明
        .itemInputs("128x gtceu:neutronium_block")
        .itemOutputs("gtceu:nan_certificate")
        .EUt(491520)
        .duration(20000)
    grtr.incubator("gtceu:biomediumraw2")//生物培养基原液打破循环，生物主机流批一点很合理吧
        .notConsumable("64x kubejs:bioware_mainframe")
        .itemInputs("gtceu:tritanium_dust")
        .itemInputs("16x kubejs:tcetieseaweedextract")
        .inputFluids("gtceu:raw_growth_medium 16000")
        .outputFluids("gtceu:biomediumraw 16000")
        .EUt(1920)
        .duration(1200)
        .addCondition(new GravityCondition(true))
    grtr.dimensionally_transcendent_plasma_forge("gtceu:cosmicneutronium")//宇宙中子绿罐子催化剂
        .notConsumable("kubejs:eternity_catalyst")
        .notConsumable("64x kubejs:extremely_durable_plasma_cell")
        .inputFluids("gtceu:uu_matter 1000000")
        .inputFluids("gtceu:dense_neutron_plasma 1000")
        .outputFluids("gtceu:cosmicneutronium 5000")
        .outputFluids("gtceu:dimensionallytranscendentresidue 100")
        .blastFurnaceTemp(60000)
        .EUt(2013265920)
        .duration(1920)
    grtr.large_chemical_reactor("gtceu:purified_tengam_dust_fast")//纯镃免去洗矿磁选
        .itemInputs("gtceu:raw_tengam_dust")
        .inputFluids("gtceu:distilled_water 1000")
        .itemOutputs("gtceu:purified_tengam_dust")
        .EUt(7864320)
        .duration(512)
    grtr.large_chemical_reactor("gtceu:hydrogen_peroxide")//过氧化氢配方去循环
        .notConsumableFluid("gtceu:ethylanthraquinone 16000")
        .notConsumableFluid("gtceu:anthracene 1000")
        .inputFluids("gtceu:oxygen 2000")
        .inputFluids("gtceu:hydrogen 2000")
        .outputFluids("gtceu:hydrogen_peroxide 1000")
        .EUt(1920)
        .duration(512)
    grtr.random_ore("every_ore")//大虚采加强方案（神秘一号电路）
        .circuit(1)
        .EUt(122880)
        .duration(1024)
        .itemOutputs("256x gtceu:bentonite_ore",
        "256x gtceu:magnetite_ore",
        "256x gtceu:olivine_ore",
        "256x gtceu:glauconite_sand_ore",
        "256x gtceu:almandine_ore",
        "256x gtceu:pyrope_ore",
        "256x gtceu:sapphire_ore",
        "256x gtceu:green_sapphire_ore",
        "256x gtceu:goethite_ore",
        "256x gtceu:yellow_limonite_ore",
        "256x gtceu:hematite_ore",
        "256x gtceu:malachite_ore",
        "256x gtceu:soapstone_ore",
        "256x gtceu:talc_ore",
        "256x gtceu:glauconite_sand_ore",
        "256x gtceu:pentlandite_ore",
        "256x gtceu:grossular_ore",
        "256x gtceu:spessartine_ore",
        "256x gtceu:pyrolusite_ore",
        "256x gtceu:tantalite_ore",
        "256x gtceu:chalcopyrite_ore",
        "256x gtceu:zeolite_ore",
        "256x gtceu:cassiterite_ore",
        "256x gtceu:realgar_ore",
        "256x gtceu:coal_ore",
        "256x gtceu:chalcopyrite_ore",
        "256x gtceu:iron_ore",
        "256x gtceu:pyrite_ore",
        "256x gtceu:copper_ore",
        "256x gtceu:magnetite_ore",
        "256x gtceu:vanadium_magnetite_ore",
        "256x gtceu:gold_ore",
        "256x gtceu:lazurite_ore",
        "256x gtceu:sodalite_ore",
        "256x gtceu:lapis_ore",
        "256x gtceu:calcite_ore",
        "256x gtceu:galena_ore",
        "256x gtceu:silver_ore",
        "256x gtceu:lead_ore",
        "256x gtceu:kyanite_ore",
        "256x gtceu:mica_ore",
        "256x gtceu:bauxite_ore",
        "256x gtceu:pollucite_ore",
        "256x gtceu:tin_ore",
        "256x gtceu:cassiterite_ore",
        "256x gtceu:red_garnet_ore",
        "256x gtceu:yellow_garnet_ore",
        "256x gtceu:amethyst_ore",
        "256x gtceu:opal_ore",
        "256x gtceu:basaltic_mineral_sand_ore",
        "256x gtceu:granitic_mineral_sand_ore",
        "256x gtceu:fullers_earth_ore",
        "256x gtceu:gypsum_ore",
        "256x gtceu:rock_salt_ore",
        "256x gtceu:salt_ore",
        "256x gtceu:lepidolite_ore",
        "256x gtceu:spodumene_ore",
        "256x gtceu:redstone_ore",
        "256x gtceu:ruby_ore",
        "256x gtceu:cinnabar_ore",
        "256x gtceu:apatite_ore",
        "256x gtceu:tricalcium_phosphate_ore",
        "256x gtceu:pyrochlore_ore",
        "256x gtceu:cassiterite_sand_ore",
        "256x gtceu:garnet_sand_ore",
        "256x gtceu:asbestos_ore",
        "256x gtceu:diatomite_ore",
        "256x gtceu:oilsands_ore",
        "256x gtceu:graphite_ore",
        "256x gtceu:diamond_ore",
        "256x gtceu:coal_ore",
        "256x gtceu:garnierite_ore",
        "256x gtceu:nickel_ore",
        "256x gtceu:cobaltite_ore",
        "256x gtceu:pentlandite_ore",
        "256x gtceu:netherrack_tetrahedrite_ore",
        "256x gtceu:netherrack_copper_ore",
        "256x gtceu:netherrack_stibnite_ore",
        "256x gtceu:netherrack_bastnasite_ore",
        "256x gtceu:netherrack_molybdenum_ore",
        "256x gtceu:netherrack_neodymium_ore",
        "256x gtceu:netherrack_monazite_ore",
        "256x gtceu:netherrack_redstone_ore",
        "256x gtceu:netherrack_ruby_ore",
        "256x gtceu:netherrack_cinnabar_ore",
        "256x gtceu:netherrack_rubidium_ore",
        "256x gtceu:netherrack_saltpeter_ore",
        "256x gtceu:netherrack_diatomite_ore",
        "256x gtceu:netherrack_electrotine_ore",
        "256x gtceu:netherrack_alunite_ore",
        "256x gtceu:netherrack_beryllium_ore",
        "256x gtceu:netherrack_emerald_ore",
        "256x gtceu:netherrack_celestine_ore",
        "256x gtceu:netherrack_grossular_ore",
        "256x gtceu:netherrack_pyrolusite_ore",
        "256x gtceu:netherrack_tantalite_ore",
        "256x gtceu:netherrack_zircon_ore",
        "256x gtceu:netherrack_wulfenite_ore",
        "256x gtceu:netherrack_molybdenite_ore",
        "256x gtceu:netherrack_molybdenum_ore",
        "256x gtceu:netherrack_powellite_ore",
        "256x gtceu:netherrack_goethite_ore",
        "256x gtceu:netherrack_yellow_limonite_ore",
        "256x gtceu:netherrack_hematite_ore",
        "256x gtceu:netherrack_gold_ore",
        "256x gtceu:netherrack_quartzite_ore",
        "256x gtceu:netherrack_certus_quartz_ore",
        "256x gtceu:netherrack_barite_ore",
        "256x gtceu:netherrack_blue_topaz_ore",
        "256x gtceu:netherrack_topaz_ore",
        "256x gtceu:netherrack_chalcocite_ore",
        "256x gtceu:netherrack_bornite_ore",
        "256x gtceu:netherrack_nether_quartz_ore",
        "256x gtceu:netherrack_quartzite_ore",
        "256x minecraft:ancient_debris",
        "256x gtceu:netherrack_sulfur_ore",
        "256x gtceu:netherrack_pyrite_ore",
        "256x gtceu:netherrack_sphalerite_ore",
        "256x gtceu:netherrack_indium_ore",
        "256x gtceu:endstone_magnetite_ore",
        "256x gtceu:endstone_vanadium_magnetite_ore",
        "256x gtceu:endstone_chromite_ore",
        "256x gtceu:endstone_gold_ore",
        "256x gtceu:endstone_bauxite_ore",
        "256x gtceu:endstone_ilmenite_ore",
        "256x gtceu:endstone_aluminium_ore",
        "256x gtceu:endstone_titanium_ore",
        "256x gtceu:endstone_bornite_ore",
        "256x gtceu:endstone_cooperite_ore",
        "256x gtceu:endstone_platinum_ore",
        "256x gtceu:endstone_palladium_ore",
        "256x gtceu:endstone_scheelite_ore",
        "256x gtceu:endstone_tungstate_ore",
        "256x gtceu:endstone_lithium_ore",
        "256x gtceu:endstone_tellurium_ore",
        "256x gtceu:endstone_pitchblende_ore",
        "256x gtceu:endstone_uraninite_ore",
        "256x gtceu:endstone_tungsten_ore",
        "256x gtceu:endstone_naquadah_ore",
        "256x gtceu:endstone_enriched_naquadah_ore",
        "256x gtceu:endstone_plutonium_ore",
        "256x gtceu:endstone_trinium_compound_ore")
    grtr.assembler("gtceu:steel_drill_head_as")//钢钻头
        .itemInputs("8x gtceu:steel_plate")
        .itemOutputs("gtceu:steel_drill_head")
        .circuit(9)
        .EUt(120)
        .duration(128)
    grtr.assembler("gtceu:titanium_drill_head_as")//钛钻头
        .itemInputs("4x gtceu:steel_plate")
        .itemInputs("4x gtceu:titanium_plate")
        .itemOutputs("gtceu:titanium_drill_head")
        .circuit(9)
        .EUt(120)
        .duration(128)
    grtr.assembler("gtceu:neutronium_drill_head_as")//中子素钻头
        .itemInputs("4x gtceu:steel_plate")
        .itemInputs("4x gtceu:neutronium_plate")
        .itemOutputs("gtceu:neutronium_drill_head")
        .circuit(9)
        .EUt(120)
        .duration(128)
    grtr.assembler("gtceu:vibranium_drill_head_as")//振金钻头
        .itemInputs("4x gtceu:steel_plate")
        .itemInputs("4x gtceu:vibranium_plate")
        .itemOutputs("gtceu:vibranium_drill_head")
        .circuit(9)
        .EUt(120)
        .duration(128)
    grtr.assembler("gtceu:naquadah_alloy_drill_head_as")//硅岩合金钻头
        .itemInputs("4x gtceu:steel_plate")
        .itemInputs("4x gtceu:naquadah_alloy_plate")
        .itemOutputs("gtceu:naquadah_alloy_drill_head")
        .circuit(9)
        .EUt(120)
        .duration(128)
    grtr.greenhouse("apple_oak")//苹果橡木
        .notConsumable("minecraft:oak_sapling")
        .itemInputs("4x gtceu:fertilizer")
        .itemOutputs("12x minecraft:apple")
        .inputFluids("water 1000")
        .circuit(3)
        .EUt(480)
        .duration(600)
    grtr.greenhouse("apple_dark_oak")//苹果深色橡木
        .notConsumable("minecraft:dark_oak_sapling")
        .itemInputs("8x gtceu:fertilizer")
        .itemOutputs("24x minecraft:apple")
        .inputFluids("water 1000")
        .circuit(3)
        .EUt(120)
        .duration(300)
//论溶解罐的死法
    grtr.large_chemical_reactor("gtceu:bedrock_soot_solution_ch")//基岩烟溶液
        .inputFluids("gtceu:bedrock_smoke 1000")
        .inputFluids("gtceu:distilled_water 1000")
        .itemInputs("gtceu:naquadah_dust")
        .outputFluids("gtceu:bedrock_soot_solution 1000")
        .EUt(7680)
        .duration(512)
    grtr.large_chemical_reactor("gtceu:rhenium_sulfuric_solution_ch")//铼硫酸溶液
        .inputFluids("gtceu:molybdenum_flue 3000")
        .inputFluids("minecraft:water 250")
        .outputFluids("gtceu:rhenium_sulfuric_solution 3000")
        .EUt(491520)
        .duration(32)
    grtr.large_chemical_reactor("gtceu:rare_earth_hydroxides_ch")
        .itemInputs("gtceu:rare_earth_dust", "3x gtceu:sodium_hydroxide_dust")//稀土氢氧化物
        .inputFluids("gtceu:phosphoric_acid 100")
        .inputFluids("minecraft:water 900")
        .outputFluids("gtceu:rare_earth_hydroxides 1000")
        .EUt(480)
        .duration(64)
    grtr.large_chemical_reactor("gtceu:actinium_radium_hydroxide_solution_ch")//硝酸锕镭溶液
        .inputFluids("gtceu:actinium_radium_hydroxide_solution 1000")
        .inputFluids("gtceu:nitric_acid 12000")
        .outputFluids("gtceu:actinium_radium_nitrate_solution 13000")
        .EUt(3840)
        .duration(256)
//剩下四个稀土的溶解配方真的会有人用吗
    grtr.distort("gtceu:rad_away_dust_di")//消辐宁，开扭
        .notConsumable("gtceu:gold_nanoswarm")
        .itemInputs(
            "88x gtceu:carbon_dust",
            "5x gtceu:potassium_dust",
            "5x gtceu:iodine_dust",
            "21x gtceu:iron_dust"
        )
        .inputFluids(
            "gtceu:oxygen 50000",
            "gtceu:nitrogen 33000",
            "gtceu:hydrogen 115000"
        )
        .itemOutputs("317x gtceu:rad_away_dust")
        .blastFurnaceTemp(9000)
        .cleanroom(CleanroomType.CLEANROOM)
        .EUt(491520)
        .duration(1024)
    grtr.distort("gtceu:paracetamol_dust_di")//对乙酰氨基酚扭
        .notConsumable("gtceu:iron_nanoswarm")
        .itemInputs("8x gtceu:carbon_dust")
        .inputFluids(
            "gtceu:hydrogen 9000",
            "gtceu:nitrogen 1000",
            "gtceu:oxygen 2000"
        )
        .itemOutputs("20x gtceu:paracetamol_dust")
        .blastFurnaceTemp(7200)
        .cleanroom(CleanroomType.CLEANROOM)
        .EUt(122880)
        .duration(512)
    grtr.large_chemical_reactor("gtceu:absolute_ethanol_ch")//绝对乙醇去循环
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust")
        .inputFluids("gtceu:ethanol 1000")
        .inputFluids("gtceu:blaze 100")
        .outputFluids("gtceu:absolute_ethanol 1000")
        .EUt(1920)
        .duration(64)
    grtr.large_chemical_reactor("gtceu:ferrocene_ch")//二茂铁去循环
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust")
        .inputFluids("gtceu:blaze 100")
        .inputFluids("gtceu:cyclopentadiene 2000")
        .inputFluids("gtceu:iron_ii_chloride 1000")
        .outputFluids("gtceu:ferrocene 1000")
        .outputFluids("gtceu:diluted_hydrochloric_acid 2000")
        .EUt(30720)
        .duration(256)
    grtr.large_chemical_reactor("gtceu:tert_butanol_ch")//叔丁醇去循环
        .notConsumable("64x gtceu:zeolite_sieving_pellets_dust")
        .notConsumable("gtceu:magnesium_chloride_dust")
        .inputFluids("gtceu:acetone 1000")
        .inputFluids("gtceu:methane 1000")
        .inputFluids("gtceu:blaze 100")
        .outputFluids("gtceu:tert_butanol 1000")
        .EUt(480)
        .duration(128)
    grtr.distort("gtceu:hexanitrohexaaxaisowurtzitane_dust_di")//六六粉极端简化
        .notConsumable("gtceu:spacetime_nanoswarm")
        .notConsumable("kubejs:eternity_catalyst")
        .itemInputs("6x gtceu:carbon_dust")
        .inputFluids(
            "gtceu:hydrogen 6000",
            "gtceu:nitrogen 12000",
            "gtceu:oxygen 12000"
        )
        .itemOutputs("36x gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .blastFurnaceTemp(21600)
        .EUt(2013265920)
        .duration(256)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    grtr.distort("gtceu:liquid_starlight_di")//星能液扭
        .notConsumable("gtceu:infuscolium_nanoswarm")
        .inputFluids(
            "water 100000",
            "gtceu:starlight 10000",
            "gtceu:mana 10000"
        )
        .outputFluids("gtceu:liquid_starlight 10000")
        .blastFurnaceTemp(21600)
        .EUt(7864320)
        .duration(256)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    grtr.annihilate_generator("kubejs:pellet_antimatter_an")//物质湮灭（你用就行了，别乱说）
        .itemInputs("kubejs:pellet_antimatter")
        .itemOutputs()
        .duration(2)
        .EUt(-144155188075855872)
    grtr.large_chemical_reactor("gtceu:germanium_dust_ch_1")//灰烬提锗
        .notConsumableFluid("gtceu:chlorine 4000")
        .itemInputs("48x gtceu:ash_dust")
        .itemInputs("64x minecraft:nether_wart_block")
        .itemInputs("16x minecraft:nether_wart_block")
        .inputFluids("gtceu:oxygen 240")
        .inputFluids("gtceu:sulfuric_acid 4000")
        .inputFluids("gtceu:hydrogen 8000")
        .itemOutputs("gtceu:germanium_dust")
        .EUt(30720)
        .duration(256)
    grtr.large_chemical_reactor("gtceu:germanium_dust_ch_2")//黑色灰烬提锗
        .notConsumableFluid("gtceu:chlorine 4000")
        .itemInputs("48x gtceu:dark_ash_dust")
        .itemInputs("64x minecraft:nether_wart_block")
        .itemInputs("16x minecraft:nether_wart_block")
        .inputFluids("gtceu:oxygen 240")
        .inputFluids("gtceu:sulfuric_acid 4000")
        .inputFluids("gtceu:hydrogen 8000")
        .itemOutputs("gtceu:germanium_dust")
        .itemOutputs("48x gtceu:carbon_dust")
        .EUt(30720)
        .duration(512)
    grtr.large_chemical_reactor("minecraft:warped_stem")//绯红菌柄
        .notConsumable("gtlcore:conversion_simulate_card")
        .itemInputs("64x minecraft:birch_log")
        .itemOutputs("64x minecraft:warped_stem")
        .EUt(16)
        .duration(20)
        .circuit(32)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("kubejs:essence_block")//精华方块
        .notConsumable("gtlcore:fast_conversion_simulate_card")
        .itemInputs("64x minecraft:bone_block")
        .itemOutputs("64x kubejs:essence_block")
        .EUt(16)
        .duration(20)
        .circuit(32)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("minecraft:crimson_stem")//诡异菌柄
        .notConsumable("gtlcore:conversion_simulate_card")
        .itemInputs("64x minecraft:oak_log")
        .itemOutputs("64x minecraft:crimson_stem")
        .EUt(16)
        .duration(20)
        .circuit(32)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("kubejs:draconium_block_charged")//注入龙力的黑曜石
        .notConsumable("gtlcore:fast_conversion_simulate_card")
        .itemInputs("64x kubejs:infused_obsidian")
        .itemOutputs("64x kubejs:draconium_block_charged")
        .EUt(16)
        .duration(20)
        .circuit(32)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.large_chemical_reactor("gtceu:special_ceramics_dust_clay_ch")//特种陶瓷
        .itemInputs("#forge:dyes/brown")
        .itemInputs("32x gtceu:clay_dust")
        .inputFluids("water 8000")
        .itemOutputs("8x gtceu:special_ceramics_dust")
        .EUt(7680)
        .duration(64)
        .circuit(23)
    grtr.large_chemical_reactor("gtceu:special_ceramics_dust_dirt_ch")//特种陶瓷
        .itemInputs("#forge:dyes/brown")
        .itemInputs("8x minecraft:dirt")
        .inputFluids("water 1152")
        .itemOutputs("8x gtceu:special_ceramics_dust")
        .EUt(7680)
        .duration(64)
        .circuit(23)
    grtr.decay_hastener("gtceu:neptunium_dust_de")//衰变镎
        .inputFluids("gtceu:americium 144")
        .itemOutputs("gtceu:neptunium_dust")
        .EUt(480)
        .duration(8000)
    grtr.distort("gtceu:polycaprolactam_di")//聚己内酰胺扭
        .notConsumable("gtceu:copper_nanoswarm")
        .itemInputs("6x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 11000")
        .inputFluids("gtceu:oxygen 1000")
        .inputFluids("gtceu:nitrogen 1000")
        .outputFluids("gtceu:polycaprolactam 2736")
        .EUt(7680)
        .duration(256)
        .blastFurnaceTemp(5400)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.stellar_forge("kubejs:contained_kerr_newmann_singularity_st")//遏制克尔-纽曼黑洞奇点简化
        .itemInputs("kubejs:quantum_chromodynamic_charge")
        .itemInputs("kubejs:time_dilation_containment_unit")
        .itemInputs("64x kubejs:charged_triplet_neutronium_sphere")
        .itemOutputs("kubejs:contained_kerr_newmann_singularity")
        .EUt(125829120)
        .duration(384)
        .addData("SCTier", 3)
    grtr.large_chemical_reactor("minecraft:fire_charge_ch")//烈焰弹化反
        .itemInputs("minecraft:gunpowder")
        .itemInputs("gtceu:carbon_dust")
        .itemInputs("minecraft:blaze_powder")
        .itemOutputs("3x minecraft:fire_charge")
        .EUt(120)
        .duration(64)
    grtr.assembler("gtceu:lubricant_cell")//无限润滑油
        .itemInputs("gtlcore:cell_component_256m")
        .itemInputs("64x gtceu:large_distillery")
        .inputFluids("gtceu:lubricant 2147483647")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:f",id:"gtceu:lubricant"}}'))
        .EUt(122880)
        .duration(10000)
    grtr.assembler("gtceu:oil_medium_cell")//无限原油
        .itemInputs("gtlcore:cell_component_256m")
        .itemInputs("64x gtceu:zpm_fluid_drilling_rig")
        .inputFluids("gtceu:oil_medium 2147483647")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:f",id:"gtceu:oil_medium"}}'))
        .EUt(122880)
        .duration(10000)
    grtr.assembler("gtceu:oil_cell")//无限石油
        .itemInputs("gtlcore:cell_component_256m")
        .itemInputs("64x gtceu:zpm_fluid_drilling_rig")
        .inputFluids("gtceu:oil 2147483647")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:f",id:"gtceu:oil"}}'))
        .EUt(122880)
        .duration(10000)
    grtr.distort("gtceu:sodium_ethylxanthate_dust_di")//乙基黄原酸钠
        .notConsumable("gtceu:glowstone_nanoswarm")
        .itemInputs("3x gtceu:carbon_dust")
        .itemInputs("2x gtceu:sulfur_dust")
        .itemInputs("gtceu:sodium_dust")
        .inputFluids("gtceu:hydrogen 5000")
        .inputFluids("gtceu:oxygen 1000")
        .itemOutputs("12x gtceu:sodium_ethylxanthate_dust")
        .EUt(30720)
        .duration(256)
        .blastFurnaceTemp(4500)
    grtr.distort("gtceu:potassium_ethylxanthate_dust_di")//乙基黄原酸钾
        .notConsumable("gtceu:glowstone_nanoswarm")
        .itemInputs("3x gtceu:carbon_dust")
        .itemInputs("2x gtceu:sulfur_dust")
        .itemInputs("gtceu:potassium_dust")
        .inputFluids("gtceu:hydrogen 5000")
        .inputFluids("gtceu:oxygen 1000")
        .itemOutputs("12x gtceu:potassium_ethylxanthate_dust")
        .EUt(30720)
        .duration(256)
        .blastFurnaceTemp(4500)
const colours=["white","light_gray","gray","black","brown","red","orange","yellow","lime","green","cyan","light_blue","blue","purple","magenta","pink"]
//染料去循环
    colours.forEach((color)=>{
        grtr.large_chemical_reactor("gtceu:"+color+"_dye_ch")
            .notConsumableFluid("gtceu:"+color+"_dye 576")
            .itemInputs("2x gtceu:salt_dust")
            .inputFluids("gtceu:sulfuric_acid")
            .outputFluids("gtceu:"+color+"_dye 216")
            .EUt(120)
            .duration(256)
    })
    grtr.distort("gtceu:fullerene_dust_di")//富勒烯极端简化
        .notConsumable("gtceu:black_dwarf_mtter_nanoswarm")
        .itemInputs("60x gtceu:carbon_dust")
        .itemOutputs("60x gtceu:fullerene_dust")
        .EUt(503316480)
        .duration(128)
        .blastFurnaceTemp(21600)
//跳跃时间的精密机器
    colours.forEach((color)=>{
        BlastProduct.remove({ id: "minecraft:"+color+"_bed" })
        BlastProduct.custom({
        "type": "avaritia:shaped_extreme_craft",
        "category": "misc",
        "pattern": [
            "       FF",
            "FFFFFFFFF",
            "EEEEEEEEE",
            "CDCDCDCDC",
            "CDCDCDCDC",
            "BBBBBBBBB",
            "AA     AA",
            "         ",
            "         "
        ],
        "key": {
            "A": {
                "item": "gtceu:treated_wood_fence"
            },
            "B": {
                "item": "gtceu:treated_wood_planks"
            },
            "C": {
                "item": "gtceu:iron_spring"
            },
            "D": {
                "item": "minecraft:sponge"
            },
            "E": {
                "item": "gtceu:iron_rod"
            },
            "F": {
                "item": "minecraft:"+color+"_wool"
            }
        },
        "result": {
            "item": "minecraft:"+color+"_bed"
        },
        "show_notification": true
        })
    })
    grtr.component_assembly_line("gtlcore:primitive_robot_arm_as")//原始机械臂--部件装配
        .itemInputs("3x #gtceu:circuits/ulv")
        .inputFluids("gtceu:copper 108")
        .inputFluids("gtceu:bronze 6480")
        .inputFluids("gtceu:potin 648")
        .itemOutputs("256x gtlcore:primitive_robot_arm")
        .EUt(30)
        .duration(64)
        .addData("CATier", 1)
    grtr.component_assembly_line("gtlcore:primitive_fluid_regulator_as")//原始流体校准器--部件装配
        .itemInputs("3x #gtceu:circuits/ulv")
        .inputFluids("gtceu:copper 1404")
        .inputFluids("gtceu:bronze 6156")
        .inputFluids("gtceu:potin 432")
        .itemOutputs("256x gtlcore:primitive_fluid_regulator")
        .EUt(30)
        .duration(64)
        .addData("CATier", 1)
    const bender_voltage_materials =[["lv","tin"],["mv","copper"],["hv","gold"],["ev","aluminium"],["iv","platinum"],["luv","niobium_titanium"],["zpm","vanadium_gallium"],["uv","yttrium_barium_cuprate"],["uhv","europium"],["uev","mithril"],["uiv","neutronium"],["uxv","taranium"],["opv","crystalmatrix"]]
//将卷板机配方里面的扳手统一换成钢板
    bender_voltage_materials.forEach((trait)=>{
        BlastProduct.shaped("gtceu:"+trait[0]+"_bender",[
            "ABA",
            "CDC",
            "EFE"
        ],{
            A: "gtceu:"+trait[0]+"_electric_piston",
            B: "gtceu:steel_plate",
            C: "#gtceu:circuits/"+trait[0],
            D: "gtceu:"+trait[0]+"_machine_hull",
            E: "gtceu:"+trait[0]+"_electric_motor",
            F: "gtceu:"+trait[1]+"_single_cable"
        })
    })
    grtr.large_chemical_reactor("gtceu:sulfuric_acid_easier")//硫酸简化
        .notConsumable("gtceu:vanadium_pentoxide_powder_dust")
        .itemInputs("gtceu:sulfur_dust")
        .inputFluids("water 1000")
        .inputFluids("gtceu:oxygen 3000")
        .outputFluids("gtceu:sulfuric_acid 1000")
        .EUt(120)
        .duration(64)
    grtr.wood_distillation("wood_distillation1")//木化出萘
        .itemInputs("64x #minecraft:logs")
        .inputFluids("gtceu:steam 4000")
        .outputFluids(
            "gtceu:ammonia 2400",
            "gtceu:carbon_dioxide 2000",
            "gtceu:ethylbenzene 2000",
            "gtceu:naphthalene 1640",
            "gtceu:creosote 820",
            "gtceu:phenol 410",
            "gtceu:hydrogen_sulfide 300"
        )
        .itemOutputs("8x gtceu:coke_dust")
        .duration(256)
        .EUt(120)
    grtr.wood_distillation("wood_distillation2")//木化出萘
        .itemInputs("16x minecraft:coal")
        .inputFluids("gtceu:steam 1000")
        .outputFluids(
            "gtceu:ammonia 1200",
            "gtceu:carbon_dioxide 1000",
            "gtceu:ethylbenzene 1000",
            "gtceu:naphthalene 3520",
            "gtceu:hydrogen_sulfide 2640",
            "gtceu:creosote 1760",
            "gtceu:phenol 880"
        )
        .duration(256)
        .EUt(120)
    grtr.wood_distillation("gtceu:turpentine_wood")//木化松油
        .itemInputs("32x #minecraft:logs")
        .inputFluids("gtceu:naphtha 3200")
        .outputFluids("gtceu:turpentine 32000")
        .EUt(30720)
        .duration(256)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.incubator("minecraft:honeycomb")
        .notConsumable("minecraft:bee_spawn_egg")//蜜脾
        .notConsumable("64x #minecraft:flowers")
        .notConsumable("minecraft:beehive")
        .itemOutputs("192x minecraft:honeycomb")
        .EUt(1920)
        .duration(1024)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.incubator("minecraft:honey_bottle")
        .notConsumable("minecraft:bee_spawn_egg")//蜂蜜
        .notConsumable("64x #minecraft:flowers")
        .itemInputs("64x minecraft:glass_bottle")
        .itemOutputs("64x minecraft:honey_bottle")
        .EUt(1920)
        .duration(1024)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.incubator("minecraft:bee_spawn_egg")//蜜蜂蛋
        .itemInputs("4x gtceu:meat_dust")
        .itemInputs("4x minecraft:honeycomb")
        .itemInputs("4x minecraft:honey_bottle")
        .itemOutputs("minecraft:bee_spawn_egg")
        .EUt(480)
        .duration(100)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.assembler("unbreakable_grindball_soap")//不毁皂石研磨球
        .itemInputs("16384x gtceu:soapstone_dust")
        .inputFluids("gtceu:soldering_alloy 5760000")
        .itemOutputs(Item.of("kubejs:grindball_soapstone", "{Damage:0,Unbreakable:1}"))
        .circuit(4)
        .EUt(30720)
        .duration(2560)
    grtr.assembler("unbreakable_grindball_aluminium")//不毁铝研磨球
        .itemInputs("16384x gtceu:aluminium_dust")
        .inputFluids("gtceu:soldering_alloy 5760000")
        .itemOutputs(Item.of("kubejs:grindball_aluminium", "{Damage:0,Unbreakable:1}"))
        .circuit(4)
        .EUt(30720)
        .duration(2560)
    grtr.assembler("gtceu:avartia/neutron_ingot_cell")//无限黑中子锭
        .itemInputs("gtlcore:cell_component_256m")
        .itemInputs("256x avaritia:denser_neutron_collector")
        .itemInputs("16384x gtceu:uv_world_accelerator")
        .itemInputs("64x ae2:creative_energy_cell")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:i",id:"avaritia:neutron_ingot"}}'))
        .EUt(122880)
        .duration(10000)
    grtr.assembler("gtceu:avartia/neutron_cell")//无限黑中子块
        .itemInputs("gtlcore:cell_component_256m")
        .itemInputs("64x avaritia:densest_neutron_collector")
        .itemInputs("16384x gtceu:uv_world_accelerator")
        .itemInputs("64x ae2:creative_energy_cell")
        .itemOutputs(Item.of("expatternprovider:infinity_cell", '{record:{"#c":"ae2:i",id:"avaritia:neutron"}}'))
        .EUt(7864320)
        .duration(100)
//末地传送门框架配方
    BlastProduct.custom({
        "type": "avaritia:shaped_extreme_craft",
        "category": "misc",
        "pattern": [
            "         ",
            "         ",
            "         ",
            "         ",
            "BCFD DFCB",
            "ACEFGFECA",
            "BCDFFFDCB",
            "ACCCCCCCA",
            "AAAAAAAAA"
        ],
        "key": {
            "A": {
                "item": "minecraft:end_stone"
            },
            "B": {
                "item": "minecraft:ender_pearl"
            },
            "C": {
                "item": "minecraft:obsidian"
            },
            "D": {
                "item": "minecraft:end_crystal"
            },
            "E": {
                "item": "ae2:singularity"
            },
            "F": {
                "item": "minecraft:nether_star"
            },
            "G": {
                "item": "minecraft:enchanting_table"
            }
        },
        "result": {
            "item": "minecraft:end_portal_frame"
        },
        "show_notification": true
        })
    grtr.decay_hastener("gtceu:francium_dust_de")//衰变钫
        .inputFluids("gtceu:uranium_235 144")
        .itemOutputs("gtceu:francium_dust")
        .EUt(480)
        .duration(8000)
    grtr.autoclave("gtceu:raw_crystal_chip_easy")//芯片去循环
        .notConsumable("gtceu:raw_crystal_chip")
        .inputFluids("gtceu:bacterial_sludge 1000")
        .itemOutputs("3x gtceu:raw_crystal_chip")
        .EUt(122880)
        .duration(256)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
    grtr.large_chemical_reactor("naquadah_process")//简化(富集)硅岩处理的中子活化部分
        .itemInputs("6x gtceu:enriched_naquadah_dust")
        .itemInputs("6x gtceu:naquadah_dust")
        .inputFluids("gtceu:fluoroantimonic_acid 2000")
        .itemOutputs("gtceu:indium_phosphide_dust")
        .itemOutputs("4x gtceu:titanium_trifluoride_dust")
        .outputFluids("gtceu:impure_enriched_naquadah_solution 1000")
        .outputFluids("gtceu:impure_naquadria_solution 1000")
        .EUt(30720)
        .duration(256)
        .cleanroom(CleanroomType.CLEANROOM)
    grtr.electric_implosion_compressor("gtceu:shaped/singularity_cobblestone")//圆石爆奇点
        .notConsumable("ae2:cell_component_256k")
        .itemInputs("256000x minecraft:cobblestone")
        .itemOutputs("ae2:singularity")
        .EUt(491520)
        .duration(64)
    grtr.electric_implosion_compressor("gtceu:shaped/singularity_dust")//小撮粉爆奇点
        .notConsumable("ae2:cell_component_256k")
        .itemInputs("256000x #forge:tiny_dusts")
        .itemOutputs("ae2:singularity")
        .EUt(491520)
        .duration(64)
    grtr.electric_implosion_compressor("shaped/quantum_singularity")//量子态纠缠奇点，注意此配方产出的奇点不能链接量子桥
        .itemInputs("gtceu:ender_pearl_dust")
        .itemInputs("ae2:singularity")
        .itemOutputs("2x ae2:quantum_entangled_singularity")
        .EUt(419520)
        .duration(1)
    grtr.qft("gtceu:bedrock_dust_qft")//量操基岩粉
        .notConsumable("gtceu:starmetal_nanoswarm")
        .itemInputs("131072x gtceu:stone_dust")
        .itemOutputs("gtceu:bedrock_dust")
        .EUt(31457208)
        .duration(64)
    grtr.qft("gtceu:shaped/uu_amplifier")//UU增幅液
        .itemInputs("1073741824x #forge:tiny_dusts")
        .outputFluids("gtceu:uu_amplifier 1073741824")
        .circuit(1)
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(1024)
    grtr.qft("gtceu:shaped/uu_matter")//UU物质
        .itemInputs("2147483647x #forge:tiny_dusts")
        .outputFluids("gtceu:uu_matter 1073741824")
        .circuit(2)
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(256)
//怀旧鱼大配方，已弃用
/*
    BlastProduct.custom({
        "type": "avaritia:shaped_extreme_craft",
        "category": "misc",
        "pattern": [
            "J  ACA  J",
            "   ADA   ",
            "  ABABA  ",
            " ABBBBBA ",
            "AEABFBAGA",
            " ABBBBBA ",
            "  ABABA  ",
            " AHA AIA ",
            "J A   A J"
        ],
        "key": {
            "A": {
                "item": "kubejs:fishbig_fabric"
            },
            "B": {
                "item": "kubejs:fishbig_frame"
            },
            "C": {
                "item": "kubejs:fishbig_hair"
            },
            "D": {
                "item": "kubejs:fishbig_hade"
            },
            "E": {
                "item": "kubejs:fishbig_lhand"
            },
            "F": {
                "item": "kubejs:fishbig_body"
            },
            "G": {
                "item": "kubejs:fishbig_rhand"
            },
            "H": {
                "item": "kubejs:fishbig_lleg"
            },
            "I": {
                "item": "kubejs:fishbig_rleg"
            },
            "J": {
                "item": "avaritia:singularity"
            },
        },
        "result": {
            "item": "expatternprovider:fishbig"
        },
        "show_notification": true
    })
*/
    grtr.distort("kubejs:tcetieseaweedextract")//鲸鱼座T异星藻类提取物
      .notConsumable("gtceu:vibranium_nanoswarm") 
      .itemInputs(
        "256x minecraft:kelp",             
        "128x gtceu:alien_algae_dust",     
        "64x gtceu:energium_dust",         
        "64x gtceu:mithril_dust",          
        "64x gtceu:salt_dust",             
        "64x gtceu:meat_dust",             
        "64x gtceu:agar_dust"              
     )
      .inputFluids(
        "gtceu:unknowwater 16000", 
        "gtceu:phthalic_acid 16000",      
        "gtceu:methane 50000"             
     )
      .itemOutputs("256x kubejs:tcetieseaweedextract") 
      .blastFurnaceTemp(16800)               
      .cleanroom(CleanroomType.CLEANROOM)    
      .EUt(GTValues.VA[GTValues.UIV]) 
      .duration(2400)
    grtr.incubator("gtceu:shaped/raw_growth_medium")//培养基原液
        .notConsumable("gtlcore:eschericia_petri_dish")
        .itemInputs("16x minecraft:kelp")
        .itemInputs("8x gtceu:meat_dust")
        .inputFluids("gtceu:distilled_water 4000")
        .outputFluids("gtceu:raw_growth_medium 4000")
        .EUt(30720)
        .duration(128)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
    grtr.incubator("gtlcore:shaped/eschericia_petri_dish")//大肠杆菌
        .itemInputs("gtlcore:sterilized_petri_dish")
        .itemInputs("8x gtceu:meat_dust")
        .inputFluids("gtceu:sterilized_growth_medium 1000")
        .chancedOutput("gtlcore:eschericia_petri_dish",250,0)
        .EUt(122880)
        .duration(2048)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
    grtr.assembly_line("gtceu:max_battery_easier")//终极电池截断套娃
        .itemInputs("16x gtceu:double_darmstadtium_plate",
            "4x #gtceu:circuits/uhv",
            "4x gtceu:uv_field_generator",
            "64x gtceu:uhpic_wafer",
            "64x gtceu:uhpic_wafer",
            "64x gtceu:advanced_smd_diode",
            "64x gtceu:advanced_smd_capacitor",
            "64x gtceu:advanced_smd_resistor",
            "64x gtceu:advanced_smd_transistor",
            "64x gtceu:advanced_smd_inductor",
            "64x gtceu:enriched_naquadah_trinium_europium_duranide_single_wire",
            "64x gtceu:neutronium_bolt"
        )
        .inputFluids("gtceu:soldering_alloy 5760",
            "gtceu:polybenzimidazole 2304",
            "gtceu:naquadria 2592",
            "gtceu:raw_star_matter_plasma 1296"
        )
        .itemOutputs("gtceu:max_battery")
        .EUt(491520)
        .duration(2048)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:energy_cluster"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(491520)
            .CWUt(128))
    grtr.laser_engraver("gtceu:crystal_cpu/emerald")//绿宝石一步晶体cpu
        .notConsumable("gtceu:nether_star_lens")
        .itemInputs("16x minecraft:emerald")
        .itemOutputs("64x gtceu:crystal_cpu")
        .EUt(122880)
        .duration(128)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    grtr.laser_engraver("gtceu:crystal_cpu/olivine")//橄榄石一步晶体cpu
        .notConsumable("gtceu:nether_star_lens")
        .itemInputs("16x gtceu:olivine_gem")
        .itemOutputs("64x gtceu:crystal_cpu")
        .EUt(122880)
        .duration(128)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    grtr.large_chemical_reactor("kubejs:warped_ender_pearl")//大化反扭曲末影珍珠
        .itemInputs("minecraft:ender_pearl")
        .itemInputs("4x gtceu:calcium_dust")
        .inputFluids("gtceu:blaze 576")
        .itemOutputs("kubejs:warped_ender_pearl")
        .circuit(4)
        .EUt(480)
        .duration(64)
    grtr.extruder("ae2:creative_item_cell")//娱乐配方
        .itemInputs("gtceu:nan_certificate")
        .itemInputs("2147483647x expatternprovider:fishbig")
        .itemOutputs("ae2:creative_item_cell")
        .EUt(2147483647)
        .duration(32768)
})
