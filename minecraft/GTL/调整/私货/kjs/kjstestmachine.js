const $CoilWorkableElectricMultiblockMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine")
GTCEuStartupEvents.registry('gtceu:machine',event=>{
     event.create("advanced_chemical_distort", "multiblock", (holder) => new $CoilWorkableElectricMultiblockMachine(holder))
        .rotationState(RotationState.ALL)
        .recipeType("distort")
        .recipeModifiers([(machine, recipe) => GTRecipeModifiers.accurateParallel(machine, recipe, 2147483647, false).getFirst(), GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.PERFECT_OVERCLOCK)])
        .appearanceBlock(GTBlocks.CASING_PTFE_INERT)
        .pattern((definition) =>
        FactoryBlockPattern.start()
                .aisle('AAA','AAA','AAA')
                .aisle('AAA','AEA','AAA')
                .aisle('AAA','A~A','AAA')
                .where("~", Predicates.controller(Predicates.blocks(definition.get())))//控制中心
                .where("A", Predicates.blocks("gtceu:inert_machine_casing")
                    .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                    .or(Predicates.abilities(PartAbility.INPUT_LASER).setPreviewCount(1)))
                .where("E", Predicates.heatingCoils())
                .build())
        .beforeWorking((machine, recipe) => {
            if (recipe.data.getInt("ebf_temp") <= machine.getCoilType().getCoilTemperature()) {
                return true
            }
            machine.getRecipeLogic().interruptRecipe()
            return false
        })
        .additionalDisplay((controller, components) => {
            if (controller.isFormed()) {
                components.add(Component.translatable("gtceu.multiblock.blast_furnace.max_temperature", Text.of($FormattingUtil.formatNumbers(controller.getCoilType().getCoilTemperature()) + "K").red()))
            }
        })
        .workableCasingRenderer("gtceu:block/casings/solid/machine_casing_inert_ptfe", "gtceu:block/multiblock/fusion_reactor") 
})