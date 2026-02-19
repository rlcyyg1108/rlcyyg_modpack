ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    gtr.electric_implosion_compressor("aachthings:combined_singularity_0")//电力压缩奇点
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

    gtr.electric_implosion_compressor("aachthingss:combined_singularity_7")
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
        .itemInputs("64x gtceu:maraging_steel_300_block", "64x gtceu:grisium_block")//576mb永恒固化永恒奇点
        .itemOutputs("kubejs:combined_singularity_15")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)
        
    gtr.fluid_solidifier("aachtings:eternal_singularity")
        .notConsumable("kubejs:pellet_antimatter")
        .inputFluids("gtceu:eternal 576")
        .itemOutputs("avarita:eternal_singularity")
        .EUt(2097152)
        .duration(200)
        
//    gtr.cosmos_simulation("aachtings:plastic_gen")
//        .itemInputs("kubejs:leptonic_charge")
                
//    gtr.assembly_line("aachtings:forge_of_the_antichrist")
//      .notConsumable("expatternprovider:fishbig")
//      .itemInputs(
//      "64x kubejs.create_ultimate_battery", 
//      ""
//      )
})