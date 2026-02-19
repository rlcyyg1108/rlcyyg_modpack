ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    gtr.assembly_line("kubejs:uv_primitive_dragon_egg_energy")
        .itemInputs(
            "10x gtceu:uv_machine_casing",
            "10x gtceu:small_darmstadtium_gear",
            "2x #gtceu:circuits/uv",
            "minecraft:dragon_egg"
        )
        .inputFluids("gtceu:darmstadtium 10000", "gtceu:eternal_blue_dream_vein 100000")
        .EUt(GTValues.VA[GTValues.UV])
        .duration(800)
        .itemOutputs("gtl_extend:uv_primitive_dragon_egg_energy")
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtmthings:zpm_4a_wireless_energy_input_hatch"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UV])
            .CWUt(128))

    gtr.assembly_line("kubejs:uhv_primitive_dragon_egg_energy")
        .itemInputs(
            "10x gtceu:uhv_machine_casing",
            "10x gtceu:small_neutronium_gear",
            "2x #gtceu:circuits/uhv",
            "minecraft:dragon_egg"
        )
        .inputFluids("gtceu:neutronium 10000", "gtceu:eternal_blue_dream_vein 100000")
        .EUt(GTValues.VA[GTValues.UHV])
        .duration(800)
        .itemOutputs("gtl_extend:uhv_primitive_dragon_egg_energy")
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtmthings:uv_4a_wireless_energy_input_hatch"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128))

    gtr.assembly_line("kubejs:uev_primitive_dragon_egg_energy")
        .itemInputs(
            "10x gtceu:uev_machine_casing",
            "10x gtceu:small_quantanium_gear",
            "2x #gtceu:circuits/uev",
            "minecraft:dragon_egg"
        )
        .inputFluids("gtceu:quantanium 10000", "gtceu:eternal_blue_dream_vein 100000")
        .EUt(GTValues.VA[GTValues.UEV])
        .duration(800)
        .itemOutputs("gtl_extend:uev_primitive_dragon_egg_energy")
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtmthings:uhv_4a_wireless_energy_input_hatch"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UEV])
            .CWUt(128))

    gtr.assembly_line("kubejs:uiv_primitive_dragon_egg_energy")
        .itemInputs(
            "10x gtceu:uiv_machine_casing",
            "10x gtceu:adamantium_rotor",
            "2x #gtceu:circuits/uiv",
            "minecraft:dragon_egg"
        )
        .inputFluids("gtceu:adamantium 10000", "gtceu:eternal_blue_dream_vein 100000")
        .EUt(GTValues.VA[GTValues.UIV])
        .duration(800)
        .itemOutputs("gtl_extend:uiv_primitive_dragon_egg_energy")
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtmthings:uev_4a_wireless_energy_input_hatch"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(128))
})