ServerEvents.recipes((event) => {
    event.shapeless("3x gtceu:diamond_dust", ["gtceu:gold_dust", "gtceu:steel_dust", "gtceu:stone_dust"])//"金刚石"粉
    
    const gtr = event.recipes.gtceu
    
    gtr.electric_implosion_compressor("aachthings:combined_singularity_0")
        .itemInputs("64x gtceu:lafium_block", "64x gtceu:potin_block")
        .itemOutputs("kubejs:combined_singularity_0")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_1")
        .itemInputs("64x gtceu:enderite_block", "64x gtceu:indium_gallium_phosphide_block")
        .itemOutputs("kubejs:combined_singularity_1")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_2")
        .itemInputs("64x gtceu:ruthenium_trinium_americium_neutronate_block", "64x gtceu:yttrium_barium_cuprate_block")
        .itemOutputs("kubejs:combined_singularity_2")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_3")
        .itemInputs("64x gtceu:hastelloyk_243_block", "64x gtceu:cobalt_brass_block")
        .itemOutputs("kubejs:combined_singularity_3")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_4")
        .itemInputs("64x gtceu:titansteel_block", "64x gtceu:uranium_rhodium_dinaquadide_block")
        .itemOutputs("kubejs:combined_singularity_4")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_5")
        .itemInputs("64x gtceu:hastelloy_x_block", "64x gtceu:red_steel_block")
        .itemOutputs("kubejs:combined_singularity_5")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_6")
        .itemInputs("64x gtceu:highurabilityompoundteel_block", "64x gtceu:germaniumtungstennitride_block")
        .itemOutputs("kubejs:combined_singularity_6")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_7")
        .itemInputs("64x gtceu:hsse_block", "64x gtceu:watertight_steel_block")
        .itemOutputs("kubejs:combined_singularity_7")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_8")
        .itemInputs("64x gtceu:pikyonium_block", "64x gtceu:aluminium_bronze_block")
        .itemOutputs("kubejs:combined_singularity_8")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_9")
        .itemInputs("64x gtceu:abyssalalloy_block", "64x gtceu:soldering_alloy_block")
        .itemOutputs("kubejs:combined_singularity_9")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_10")
        .itemInputs("64x gtceu:black_titanium_block", "64x gtceu:nickel_zinc_ferrite_block")
        .itemOutputs("kubejs:combined_singularity_10")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_11")
        .itemInputs("64x gtceu:ultimet_block", "64x gtceu:hsla_steel_block")
        .itemOutputs("kubejs:combined_singularity_11")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_12")
        .itemInputs("64x gtceu:enriched_naquadah_trinium_europium_duranide_block", "64x gtceu:rtm_alloy_block")
        .itemOutputs("kubejs:combined_singularity_12")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_13")
        .itemInputs("64x gtceu:blue_steel_block", "64x gtceu:hastelloy_c_276_block")
        .itemOutputs("kubejs:combined_singularity_13")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_14")
        .itemInputs("64x gtceu:cinobite_block", "64x gtceu:stellite_100_block")
        .itemOutputs("kubejs:combined_singularity_14")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)

    gtr.electric_implosion_compressor("aachthings:combined_singularity_15")
        .itemInputs("64x gtceu:maraging_steel_300_block", "64x gtceu:grisium_block")
        .itemOutputs("kubejs:combined_singularity_15")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)
        
    gtr.lightning_processor("aachtings:oganesson")//冷却亚稳态Og
        .notConsumable("gtceu:vacuum_freezer")
        .inputFluids("gtceu:metastable_oganesson 1000")
        .outputFluids("gtceu:oganesson 1000")
        .duration(20)
        .EUt(2097152)
        
    gtr.lightning_processor("aachtings:hassium")//冷却亚稳态𬭶
        .notConsumable("gtceu:vacuum_freezer")
        .inputFluids("gtceu:liquid_metastable_hassium 1000")
        .outputFluids("gtceu:hassium 1000")
        .duration(20)
        .EUt(2097152)
        
    gtr.electrolyzer("aachthings:plutonium_241_dust")//钚241取消概率
        .itemInputs("gtceu:plutonium_dust")
        .itemOutputs("gtceu:plutonium_241_dust")
        .duration(20)
        .EUt(524288)
        
    gtr.electrolyzer("aachtings:bedrock_dust")//基岩粉
        .notConsumable("gtceu:bedrock_drilling_rig")
        .itemOutputs("64x gtceu:bedrock_dust")
        .duration(20)
        .EUt(524288)
       
    gtr.lightning_processor("aachtings:c60_dust")//富勒烯简化配方
        .notConsumable("gtceu:fullerene_dust")
        .itemInputs("60x gtceu:carbon_dust")
        .itemOutputs("gtceu:fullerene_dust")
        .circuit(24)
        .EUt(8388608)
        .duration(120)
        
    gtr.lightning_processor("aachtings:66_dust")//66粉简化配方
        .notConsumable('gtceu:hexanitrohexaaxaisowurtzitane_dust')
        .itemInputs("6x gtceu:carbon_dust")
        .inputFluids("gtceu:hydrogen 6000", "gtceu:nitrogen 12000", "gtceu:oxygen 12000")
        .itemOutputs("gtceu:hexanitrohexaaxaisowurtzitane_dust")
        .circuit(24)
        .EUt(8388608)
        .duration(120)
        
    gtr.lightning_processor("aachtings:quantanium")//液态量子闪电处理配方
        .inputFluids("gtceu:neon 10000")
        .itemInputs("4x gtceu:quantum_star", "8x gtceu:quantum_eye", "16x gtceu:mithril_dust", "16x gtceu:gadolinium_dust", "64x minecraft:netherite_scrap", "64x ae2:fluix_dust")
        .outputFluids("gtceu:quantanium 10000")
        .duration(1200)
        .EUt(524288)
        
    gtr.lightning_processor("aachtings:actinium_radium_nitrate_solution")//钫处理取消概率
        .notConsumable("1x gtceu:trifluoroacetic_phosphate_ester_dust")
        .inputFluids("gtceu:actinium_radium_nitrate_solution 13000")
        .itemOutputs("26x gtceu:actinium_nitrate_dust", "27x gtceu:radium_nitrate_dust", "4x gtceu:francium_dust", "gtceu:thorium_dust", "2x gtceu:protactinium_dust", "gtceu:radium_dust")
        .outputFluids("minecraft:water 13000")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(160)
        
})