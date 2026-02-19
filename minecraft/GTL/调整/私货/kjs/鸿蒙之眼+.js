ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    gtr.cosmos_simulation("greythings_eoh_plus:cosmos_simulation_plus")
        .itemInputs("2048x kubejs:leptonic_charge")
        .itemOutputs("16384x gtceu:white_dwarf_mtter_dust",
                    "16384x gtceu:black_dwarf_mtter_dust",
                    "131072x ae2:sky_dust",
                    "131072x gtceu:trinium_dust",
                    "131072x gtceu:plutonium_241_dust",
                    "131072x gtceu:titanium_50_dust",
                    "131072x gtceu:copper76_dust",
                    "131072x gtceu:uranium_235_dust",
                    "131072x gtceu:perditio_crystal_dust",
                    "131072x gtceu:earth_crystal_dust",
                    "131072x gtceu:ignis_crystal_dust",
                    "131072x gtceu:tartarite_dust",
                    "131072x gtceu:uruium_dust",
                    "131072x gtceu:force_dust",
                    "131072x gtceu:alien_algae_dust",
                    "131072x gtceu:bloodstone_dust",
                    "131072x minecraft:netherite_scrap",
                    "131072x gtceu:purified_tengam_dust",
                    "131072x gtceu:quantanium_dust",
                    "131072x gtceu:bedrock_dust",
                    "131072x gtceu:damascus_steel_dust",
                    "131072x avaritia:neutron_pile",
                    "131072x gtceu:certus_quartz_dust",
                    "131072x ae2:fluix_dust"
        )
        .duration(1200)
        .inputFluids("gtceu:cosmic_element 1024000")
        
})
