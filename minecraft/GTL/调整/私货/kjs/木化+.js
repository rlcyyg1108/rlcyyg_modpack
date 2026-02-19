ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    gtr.wood_distillation("greythings_wood_distillation_plus:wood_distillation_plus_1")
        .itemInputs("16x #minecraft:logs")
        .inputFluids("gtceu:steam 1000")
        .itemOutputs("4x gtceu:dark_ash_dust")
        .outputFluids("gtceu:naphthalene 410",
            "gtceu:hydrogen_sulfide 307",
            "gtceu:creosote 205",
            "gtceu:phenol 102",
            "gtceu:carbon_dioxide 500",
            "gtceu:ammonia 600",
            "gtceu:ethylbenzene 500",
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)

    gtr.wood_distillation("greythings_wood_distillation_plus:wood_distillation_plus_2")
        .itemInputs("16x #minecraft:logs")
        .inputFluids("minecraft:water 6000")
        .itemOutputs("6x gtceu:fertilizer")
        .outputFluids("gtceu:methane 3300",
            "gtceu:methanol 825",
            "gtceu:acetic_acid 137",
            "gtceu:ammonia 550",
            "gtceu:carbon_dioxide 2200",
            "gtceu:creosote 560",
            "gtceu:ethanol 825"
        )
        .EUt(GTValues.VA[GTValues.MV])
        .duration(200)
})
