//用前提示：请把文件放置在kubejs/server_scripts使用
//基于产线撕裂者1.9.8.1，删除了绝大多数显然不合理的配方，对后期和游戏末期的流程进行了简化，配合GTL addition使用
let fluidlist = ['kubejs:gelid_cryotheum','ad_astra:cryo_fuel']
let fluidid = ['gelid_cryotheum','cryo_fuel']
const op_output_list = ['2147483647x gtceu:exquisite_red_garnet_gem', '2147483647x gtceu:exquisite_blue_topaz_gem', '2147483647x gtceu:exquisite_emerald_gem', '2147483647x gtceu:exquisite_olivine_gem', '2147483647x gtceu:exquisite_yellow_garnet_gem', '2147483647x gtceu:exquisite_certus_quartz_gem', '2147483647x gtceu:exquisite_coal_gem', '2147483647x gtceu:exquisite_quartzite_gem', '2147483647x gtceu:exquisite_grossular_gem', '2147483647x gtceu:exquisite_sodalite_gem', '2147483647x gtceu:exquisite_lazurite_gem', '2147483647x gtceu:exquisite_rock_salt_gem', '2147483647x gtceu:exquisite_lapis_gem', '2147483647x gtceu:exquisite_almandine_gem', '2147483647x gtceu:exquisite_salt_gem', '2147483647x gtceu:exquisite_nether_quartz_gem', '2147483647x gtceu:exquisite_monazite_gem', '2147483647x gtceu:exquisite_pyrope_gem', '2147483647x gtceu:exquisite_spessartine_gem', '2147483647x gtceu:exquisite_apatite_gem', '2147483647x gtceu:exquisite_opal_gem', '2147483647x gtceu:exquisite_ruby_gem', '2147483647x gtceu:exquisite_green_sapphire_gem', '2147483647x gtceu:exquisite_realgar_gem', '2147483647x gtceu:exquisite_cinnabar_gem', '2147483647x gtceu:exquisite_jasper_gem', '2147483647x gtceu:exquisite_malachite_gem', '2147483647x gtceu:exquisite_diamond_gem', '2147483647x gtceu:exquisite_sapphire_gem', '2147483647x gtceu:exquisite_amethyst_gem', '2147483647x gtceu:exquisite_topaz_gem', '2147483647x gtceu:flawless_spessartine_gem', '2147483647x gtceu:flawless_quartzite_gem', '2147483647x gtceu:flawless_nether_quartz_gem', '2147483647x gtceu:flawless_certus_quartz_gem', '2147483647x gtceu:flawless_red_garnet_gem', '2147483647x gtceu:flawless_sodalite_gem', '2147483647x gtceu:flawless_monazite_gem', '2147483647x gtceu:flawless_salt_gem', '2147483647x gtceu:flawless_apatite_gem', '2147483647x gtceu:flawless_almandine_gem', '2147483647x gtceu:flawless_coal_gem', '2147483647x gtceu:flawless_lazurite_gem', '2147483647x gtceu:flawless_pyrope_gem', '2147483647x gtceu:flawless_rock_salt_gem', '2147483647x gtceu:flawless_grossular_gem', '2147483647x gtceu:flawless_opal_gem', '2147483647x gtceu:flawless_amethyst_gem', '2147483647x gtceu:flawless_topaz_gem', '2147483647x gtceu:flawless_jasper_gem', '2147483647x gtceu:flawless_malachite_gem', '2147483647x gtceu:flawless_cinnabar_gem', '2147483647x gtceu:flawless_ruby_gem', '2147483647x gtceu:flawless_green_sapphire_gem', '2147483647x gtceu:flawless_sapphire_gem', '2147483647x gtceu:flawless_diamond_gem', '2147483647x gtceu:flawless_realgar_gem', '2147483647x gtceu:flawless_lapis_gem', '2147483647x gtceu:flawless_yellow_garnet_gem', '2147483647x gtceu:flawless_olivine_gem', '2147483647x gtceu:flawless_emerald_gem', '2147483647x gtceu:flawless_blue_topaz_gem', '2147483647x gtceu:pyrope_gem', '2147483647x gtceu:realgar_gem', '2147483647x minecraft:lapis_lazuli', '2147483647x gtceu:topaz_gem', '2147483647x gtceu:yellow_garnet_gem', '2147483647x minecraft:quartz', '2147483647x gtceu:malachite_gem', '2147483647x gtceu:rock_salt_gem', '2147483647x gtceu:sodalite_gem', '2147483647x gtceu:cinnabar_gem', '2147483647x gtceu:olivine_gem', '2147483647x minecraft:coal', '2147483647x gtceu:monazite_gem', '2147483647x gtceu:opal_gem', '2147483647x gtceu:salt_gem', '2147483647x gtceu:quartzite_gem', '2147483647x gtceu:jasper_gem', '2147483647x gtceu:apatite_gem', '2147483647x minecraft:amethyst_shard', '2147483647x gtceu:ruby_gem', '2147483647x gtceu:red_garnet_gem', '2147483647x minecraft:emerald', '2147483647x gtceu:green_sapphire_gem', '2147483647x gtceu:sapphire_gem', '2147483647x gtceu:lazurite_gem', '2147483647x gtceu:blue_topaz_gem', '2147483647x gtceu:certus_quartz_gem', '2147483647x gtceu:andradite_gem', '2147483647x gtceu:grossular_gem', '2147483647x minecraft:diamond', '2147483647x gtceu:almandine_gem', '2147483647x gtceu:spessartine_gem', '2147483647x gtceu:silicon_dioxide_dust', '2147483647x gtceu:mica_dust', '2147483647x gtceu:trinium_compound_dust', '2147483647x gtceu:force_dust', '2147483647x gtceu:earth_crystal_dust', '2147483647x gtceu:trona_dust', '2147483647x gtceu:celestine_dust', '2147483647x gtceu:malachite_dust', '2147483647x gtceu:enriched_naquadah_dust', '2147483647x gtceu:endstone_dust', '2147483647x gtceu:ender_pearl_dust', '2147483647x gtceu:enderium_dust', '2147483647x gtceu:cinnabar_dust', '2147483647x gtceu:olivine_dust', '2147483647x gtceu:bastnasite_dust', '2147483647x gtceu:cobalt_oxide_dust', '2147483647x gtceu:pitchblende_dust', '2147483647x gtceu:zeolite_dust', '2147483647x gtceu:oilsands_dust', '2147483647x gtceu:infused_gold_dust', '2147483647x gtceu:uraninite_dust', '2147483647x gtceu:starmetal_dust', '2147483647x gtceu:alunite_dust', '2147483647x gtceu:galena_dust', '2147483647x gtceu:sodalite_dust', '2147483647x gtceu:calcite_dust', '2147483647x gtceu:bornite_dust', '2147483647x gtceu:vibranium_dust', '2147483647x gtceu:desh_dust', '2147483647x gtceu:alien_algae_dust', '2147483647x gtceu:rock_salt_dust', '2147483647x gtceu:orichalcum_dust', '2147483647x gtceu:antimony_trioxide_dust', '2147483647x gtceu:nether_quartz_dust', '2147483647x gtceu:uruium_dust', '2147483647x gtceu:silicon_dioxide_dust', '2147483647x gtceu:mica_dust', '2147483647x gtceu:trinium_compound_dust', '2147483647x gtceu:force_dust', '2147483647x gtceu:earth_crystal_dust', '2147483647x gtceu:trona_dust', '2147483647x gtceu:celestine_dust', '2147483647x gtceu:malachite_dust', '2147483647x gtceu:enriched_naquadah_dust', '2147483647x gtceu:endstone_dust', '2147483647x gtceu:ender_pearl_dust', '2147483647x gtceu:enderium_dust', '2147483647x gtceu:cinnabar_dust', '2147483647x gtceu:olivine_dust', '2147483647x gtceu:bastnasite_dust', '2147483647x gtceu:cobalt_oxide_dust', '2147483647x gtceu:pitchblende_dust', '2147483647x gtceu:zeolite_dust', '2147483647x gtceu:oilsands_dust', '2147483647x gtceu:infused_gold_dust', '2147483647x gtceu:uraninite_dust', '2147483647x gtceu:starmetal_dust', '2147483647x gtceu:alunite_dust', '2147483647x gtceu:galena_dust', '2147483647x gtceu:sodalite_dust', '2147483647x gtceu:calcite_dust', '2147483647x gtceu:bornite_dust', '2147483647x gtceu:vibranium_dust', '2147483647x gtceu:desh_dust', '2147483647x gtceu:alien_algae_dust', '2147483647x gtceu:rock_salt_dust', '2147483647x gtceu:orichalcum_dust', '2147483647x gtceu:antimony_trioxide_dust', '2147483647x gtceu:nether_quartz_dust', '2147483647x gtceu:uruium_dust', '2147483647x gtceu:mithril_dust', '2147483647x gtceu:rare_earth_dust', '2147483647x gtceu:rare_earth_metal_dust', '2147483647x gtceu:adamantine_compounds_dust', '2147483647x gtceu:amethyst_dust', '2147483647x gtceu:ostrum_dust', '2147483647x gtceu:ruby_dust', '2147483647x gtceu:red_garnet_dust', '2147483647x minecraft:redstone', '2147483647x gtceu:electrotine_dust', '2147483647x gtceu:lazurite_dust', '2147483647x gtceu:blue_topaz_dust', '2147483647x gtceu:bloodstone_dust', '2147483647x gtceu:cooperite_dust', '2147483647x gtceu:certus_quartz_dust', '2147483647x gtceu:hematite_dust', '2147483647x gtceu:pyrolusite_dust', '2147483647x gtceu:cobaltite_dust', '2147483647x gtceu:molybdenite_dust', '2147483647x gtceu:chalcocite_dust', '2147483647x gtceu:stibnite_dust', '2147483647x gtceu:kyanite_dust', '2147483647x gtceu:sapphire_dust', '2147483647x gtceu:magnesite_dust', '2147483647x minecraft:glowstone_dust', '2147483647x gtceu:granitic_mineral_sand_dust', '2147483647x gtceu:bentonite_dust', '2147483647x gtceu:calorite_dust', '2147483647x gtceu:green_sapphire_dust', '2147483647x gtceu:emerald_dust', '2147483647x gtceu:paper_dust', '2147483647x gtceu:soda_ash_dust', '2147483647x gtceu:zincite_dust', '2147483647x gtceu:apatite_dust', '2147483647x gtceu:tricalcium_phosphate_dust', '2147483647x gtceu:phosphate_dust', '2147483647x gtceu:goethite_dust', '2147483647x gtceu:polonium_dust', '2147483647x gtceu:thorium_dust', '2147483647x gtceu:samarium_refined_powder_dust', '2147483647x gtceu:vanadium_magnetite_dust', '2147483647x gtceu:vanadium_dust', '2147483647x gtceu:neodymium_dust', '2147483647x gtceu:calcium_dust', '2147483647x gtceu:andradite_dust', '2147483647x gtceu:molybdenum_dust', '2147483647x gtceu:powellite_dust', '2147483647x gtceu:wulfenite_dust', '2147483647x gtceu:tantalum_dust', '2147483647x gtceu:tantalite_dust', '2147483647x gtceu:potassium_dust', '2147483647x gtceu:iron_dust', '2147483647x gtceu:almandine_dust', '2147483647x gtceu:platinum_dust', '2147483647x gtceu:lead_dust', '2147483647x gtceu:massicot_dust', '2147483647x gtceu:bismuth_dust', '2147483647x gtceu:diamond_dust', '2147483647x gtceu:cobalt_dust', '2147483647x gtceu:palladium_dust', '2147483647x gtceu:tungstate_dust', '2147483647x gtceu:tungsten_dust', '2147483647x gtceu:sodium_dust', '2147483647x gtceu:ilmenite_dust', '2147483647x gtceu:titanium_dust', '2147483647x gtceu:plutonium_dust', '2147483647x gtceu:plutonium_241_dust', '2147483647x gtceu:uvarovite_dust', '2147483647x gtceu:grossular_dust', '2147483647x gtceu:barite_dust', '2147483647x gtceu:gold_dust', '2147483647x gtceu:rutile_dust', '2147483647x gtceu:copper_dust', '2147483647x gtceu:bauxite_dust', '2147483647x gtceu:aluminium_dust', '2147483647x gtceu:indium_dust', '2147483647x gtceu:chromium_dust', '2147483647x gtceu:chromite_dust', '2147483647x gtceu:pollucite_dust', '2147483647x gtceu:caesium_dust', '2147483647x gtceu:silver_dust', '2147483647x gtceu:manganese_dust', '2147483647x gtceu:spessartine_dust', '2147483647x gtceu:magnesium_dust', '2147483647x gtceu:pyrope_dust', '2147483647x gtceu:americium_dust', '2147483647x gtceu:cadmium_dust', '2147483647x gtceu:nickel_dust', '2147483647x gtceu:pentlandite_dust', '2147483647x gtceu:gallium_dust', '2147483647x gtceu:lanthanum_dust', '2147483647x gtceu:sphalerite_dust', '2147483647x gtceu:realgar_dust', '2147483647x gtceu:tin_dust', '2147483647x gtceu:cassiterite_dust', '2147483647x gtceu:cassiterite_sand_dust', '2147483647x gtceu:technetium_dust', '2147483647x gtceu:actinium_dust', '2147483647x gtceu:antimony_dust', '2147483647x gtceu:zinc_dust', '2147483647x gtceu:zircon_dust', '2147483647x gtceu:spodumene_dust', '2147483647x gtceu:lithium_dust', '2147483647x gtceu:lepidolite_dust', '2147483647x gtceu:rubidium_dust', '2147483647x gtceu:niobium_dust', '2147483647x gtceu:beryllium_dust', '2147483647x gtceu:europium_dust', '2147483647x gtceu:lapis_dust', '2147483647x gtceu:topaz_dust', '2147483647x gtceu:yellow_garnet_dust', '2147483647x gtceu:yellow_limonite_dust', '2147483647x gtceu:pyrite_dust', '2147483647x gtceu:chalcopyrite_dust', '2147483647x gtceu:clay_dust', '2147483647x gtceu:tetrahedrite_dust', '2147483647x gtceu:raw_tengam_dust', '2147483647x gtceu:platinum_group_sludge_dust']
let orelist = []
const packed_infinity_cell = (cellname,type,list)=>{
    const list_length = list.length
    let a = "1L,"
    a = a.repeat(list_length - 1)+'1L'
    let b = "{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:"+type+"\",id:\""+list[0]+"\"}}}"
    for(let i = 1;i < list_length;i++)
    {
        b = b + ",{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:"+type+"\",id:\""+list[i]+"\"}}}"
    }
    return Item.of('ae2:portable_item_cell_16k',
"{RepairCost:0,amts:[L;"+a+"],display:{Name:'{\"text\":\""+cellname+"\"}'},ic:"+list_length+"L,internalCurrentPower:20000.0d,keys:["+b+"]}") 
}
const packed_infinity_cell_if = (cellname,list1,list2)=>{
    const list_length = list1.length + list2.length
    let a = "1L,"
    a = a.repeat(list_length - 1)+'1L'
    let b = "{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:i\",id:\""+list1[0]+"\"}}}"
    for(let i = 1;i < list1.length;i++)
    {
        b = b + ",{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:i\",id:\""+list1[i]+"\"}}}"
    }
    for(let i = 0;i < list2.length;i++)
    {
        b = b + ",{\"#c\":\"ae2:i\",id:\"expatternprovider:infinity_cell\",tag:{record:{\"#c\":\"ae2:f\",id:\""+list2[i]+"\"}}}"
    }
    return Item.of('ae2:portable_item_cell_16k',
"{RepairCost:0,amts:[L;"+a+"],display:{Name:'{\"text\":\""+cellname+"\"}'},ic:"+list_length+"L,internalCurrentPower:20000.0d,keys:["+b+"]}") 
}
ServerEvents.tags('fluid',(event) => {
        const liquidsObj = event.get('forge:liquids').getObjectIds()
        liquidsObj.forEach(element => {
            fluidlist.push(element.namespace+':'+element.path)
            fluidid.push(element.path)
        })
        const plasmasObj = event.get('forge:plasmas').getObjectIds()
        plasmasObj.forEach(element => {
            fluidlist.push(element.namespace+':'+element.path)
            fluidid.push(element.path)
        })
        const moltensObj = event.get('forge:moltens').getObjectIds()
        moltensObj.forEach(element => {
            fluidlist.push(element.namespace+':'+element.path)
            fluidid.push(element.path)
        })
        const gasesObj = event.get('forge:gases').getObjectIds()
        gasesObj.forEach(element => {
            fluidlist.push(element.namespace+':'+element.path)
            fluidid.push(element.path)
        })
})
ServerEvents.tags('item',(event) => {
    const oresObj = event.get('forge:ores_in_ground/stone').getObjectIds()
    oresObj.forEach(element=>{
        orelist.push('64x '+element.namespace+':'+element.path)
    })
})
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu
    for(let i = 0; i < fluidlist.length;i++)//创造罐子加强配方
        {
            gtr.chemical_bath("kubejs:infinite_"+fluidid[i])
            .notConsumable('1x gtceu:creative_tank')
            .notConsumableFluid(fluidlist[i]+' 1')
            .outputFluids(fluidlist[i]+' 2147483647')
            .EUt(1)
            .duration(1)        
        }
    gtr.distort('refinedproductionline:easier_hydrogen_peroxide')//过氧化氢反循环
        .notConsumable('gtceu:naquadah_nanoswarm')
        .notConsumableFluid('gtceu:ethylanthraquinone 1000')
        .inputFluids('gtceu:hydrogen 1000','gtceu:oxygen 1000')
        .outputFluids('gtceu:hydrogen_peroxide 1000')
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UV])
        .blastFurnaceTemp(14400)
    gtr.distort("refinedproductionline:easier_rad_away_dust")//2种药片
        .notConsumable('gtceu:silver_nanoswarm')
        .itemInputs('5x gtceu:iodine_dust','25x gtceu:saltpeter_dust')
        .inputFluids('gtceu:iron 3024','gtceu:carbon 17856','gtceu:oxygen 35000','gtceu:nitrogen 64000','gtceu:hydrogen 115000')
        .itemOutputs('48x gtceu:rad_away_dust')
        .duration(200)
        .EUt(GTValues.VA[GTValues.UHV])
        .blastFurnaceTemp(16200)
    gtr.distort("refinedproductionline:easier_paracetamol_dust")
        .notConsumable('gtceu:silver_nanoswarm')
        .itemInputs('384x gtceu:carbon_dust')
        .inputFluids('gtceu:nitrogen_dioxide 48000','gtceu:hydrogen 432000')
        .itemOutputs('48x gtceu:paracetamol_dust')
        .duration(200)
        .EUt(GTValues.VA[GTValues.UHV])
        .blastFurnaceTemp(16200)
    gtr.distort('refinedproductionline:easier_polycyclic_aromatic_mixture_dust')//多环芳香烃混合物
        .notConsumable('32x gtceu:spacetime_nanoswarm')
        .notConsumable('gtceu:sodium_seaborgate_dust')
        .itemInputs('12x gtceu:carbon_dust')
        .inputFluids('gtceu:naphthalene 32000','gtceu:hydrogen 12000','gtceu:chlorine 6000','gtceu:methanol 4000','minecraft:water 1000','gtceu:propene 1000')
        .itemOutputs('90x gtceu:polycyclic_aromatic_mixture_dust')
        .duration(4000)
        .EUt(GTValues.VA[GTValues.MAX])
        .blastFurnaceTemp(36000)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    gtr.compressor('refinedproductionline:debug_pattern_test')//配方样板测试工具
        .itemInputs('16384x ae2:blank_pattern')
        .EUt(1)
        .itemOutputs('gtlcore:debug_pattern_test')
        .duration(1)
    gtr.distort('refinedproductionline:easier_aerographene')//石墨烯气凝胶单步
        .notConsumable('32x gtceu:spacetime_nanoswarm')
        .notConsumable('32x gtceu:transcendentmetal_nanoswarm')
        .itemOutputs('kubejs:aerographene')
        .inputFluids('gtceu:oxygen 4000', 'gtceu:chlorine 3000', 'gtceu:propene 1000', 'minecraft:water 1000', 'gtceu:benzene 1000', 'gtceu:acetone 1000', 'gtceu:methanol 1000', 'gtceu:carbon_dioxide 1000')
        .itemInputs('2x gtceu:sugar_gem')
        .duration(4000)
        .EUt(GTValues.VA[GTValues.MAX])
        .blastFurnaceTemp(36000)
        .cleanroom(GTLCleanroomType.LAW_CLEANROOM)
    gtr.distort('refinedproductionline:easier_viscoelastic_polyurethane_foam')//黏弹性聚氨脂泡沫单步
        .notConsumable('32x gtceu:transcendentmetal_nanoswarm')
        .inputFluids('gtceu:oxygen 11000', 'minecraft:water 5000', 'gtceu:ethylene 5000', 'gtceu:air 2000', 'gtceu:nitric_acid 2000', 'gtceu:hydrogen 1000', 'gtceu:toluene 1000')
        .itemInputs('gtceu:calcium_dust', '3x gtceu:carbon_dust')
        .outputFluids('gtceu:viscoelastic_polyurethane_foam 4000')
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(200)
        .blastFurnaceTemp(36000)
    gtr.qft('refinedproductionline:endgame_echo_shard')//大量操优化回响碎片
        .notConsumable("64x minecraft:sculk_shrieker")
        .notConsumable("64x minecraft:sculk_sensor")
        .itemInputs("64x minecraft:dirt", "64x minecraft:vine")
        .inputFluids("gtceu:unknowwater 1000")
        .chancedOutput("64x gtceu:echo_shard_block", 1, 0)
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(3000)
    gtr.qft('refinedproductionline:endgame_draconium_dust')//大量操优化龙尘
        .notConsumable("1x kubejs:draconium_dust")
        .itemInputs('33x minecraft:glowstone_dust','32x gtceu:ender_pearl_dust','28x gtceu:sulfur_dust','28x gtceu:carbon_dust','2x gtceu:gold_dust')
        .chancedOutput("64x kubejs:draconium_dust", 1, 0)
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(2000)
    gtr.distort('refinedproductionline:endgame_azafullerene')//氮杂富勒烯单步
        .notConsumable('64x gtlcore:component_assembly_line_casing_uxv')  
        .notConsumable('36x gtceu:tiny_rhenium_dust')      
        .itemInputs('gtceu:fullerene_dust')
        .inputFluids('gtceu:nitrogen 120000','gtceu:hydrogen 80000')
        .outputFluids('gtceu:azafullerene 10000')
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UXV])
        .blastFurnaceTemp(48000)
const needtocooldown=['chaos','crystalmatrix','draconiumawakened']//反应室介导的逆熵单步冷却1
    for(let i=0;i<needtocooldown.length;i++)
        {
            gtr.antientropy_condensation('refinedproductionline:easier_cool_'+needtocooldown[i])
            .notConsumable('64x gtceu:eternity_nanoswarm')
            .notConsumable('sgjourney:reaction_chamber')
            .inputFluids('gtceu:'+needtocooldown[i]+'_plasma 1000')
            .outputFluids('gtceu:'+needtocooldown[i]+' 1000')
            .EUt(GTValues.VA[GTValues.MAX])
            .duration(2000)
        }
const needtocooldown_liquid=['degenerate_rhenium','cosmic_mesh']//反应室介导的逆熵单步冷却2(沟槽的为什么有液体的命名不一样啊！)
    for(let i=0;i<needtocooldown_liquid.length;i++)
        {
            gtr.antientropy_condensation('refinedproductionline:easier_cool_'+needtocooldown_liquid[i])
            .notConsumable('64x gtceu:eternity_nanoswarm')
            .notConsumable('sgjourney:reaction_chamber')
            .inputFluids('gtceu:'+needtocooldown_liquid[i]+'_plasma 1000')
            .outputFluids('gtceu:liquid_'+needtocooldown_liquid[i]+' 1000')
            .EUt(GTValues.VA[GTValues.MAX])
            .duration(2000)
        }
    gtr.stellar_forge("refinedproductionline:endgame_neutronium_sphere")//单步中子素球体合成
        .notConsumable('4x sgjourney:reaction_chamber')
        .notConsumable("kubejs:ball_field_shape")
        .inputFluids("gtceu:neutronium 1000", "gtceu:heavy_lepton_mixture 1000")
        .itemInputs("kubejs:naquadria_charge")
        .itemOutputs("4x kubejs:neutronium_sphere")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(1000)
        .addData("SCTier", 3)
    gtr.dimensionally_transcendent_plasma_forge("refinedproductionline:endgame_dense_neutron_plasma")//单步致密中子等离子体合成
        .notConsumable("4x sgjourney:reaction_chamber")
        .itemInputs("4x kubejs:neutronium_sphere")
        .inputFluids("gtceu:heavy_quark_degenerate_matter_plasma 10000", "gtceu:periodicium 1000")
        .outputFluids("gtceu:dense_neutron_plasma 10000", "gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(800)
        .blastFurnaceTemp(26000)
    gtr.dimensionally_transcendent_plasma_forge('refinedproductionline:endgame_cosmicneutronium')//单步宇宙中子素合成
        .notConsumable('4x sgjourney:reaction_chamber')
        .notConsumable('64x gtceu:eternity_nanoswarm')
        .inputFluids('gtceu:uu_matter 1000000','gtceu:dense_neutron_plasma 1000')
        .outputFluids('gtceu:cosmicneutronium 5000',"gtceu:dimensionallytranscendentresidue 100")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(2000)
        .blastFurnaceTemp(26000)
    gtr.sps_crafting("refinedproductionline:endgame_echoite_plasma")//回响合金等离子体去除罐子需求
        .notConsumable('16x kubejs:heartofthesmogus')
        .itemInputs("16x gtceu:exquisite_echo_shard_gem",'8x gtceu:degenerate_rhenium_plate')
        .inputFluids("gtceu:mana 16000", "gtceu:enderium 1152", "gtceu:infuscolium 1152")
        .outputFluids("gtceu:echoite_plasma 2304")
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(400)
    gtr.stellar_forge("refinedproductionline:endgame_legendarium_plasma")//传奇合金等离子体去除罐子需求
        .notConsumable("4x sgjourney:reaction_chamber")
        .inputFluids("gtceu:naquadriatictaranium 576", "gtceu:trinium 288", "gtceu:duranium 288", "gtceu:tritanium 288", "gtceu:orichalcum 288", "gtceu:mithril 288", "gtceu:adamantium 288", "gtceu:adamantine 288", "gtceu:vibranium 288")
        .itemInputs("kubejs:leptonic_charge", "4x kubejs:neutronium_sphere")
        .outputFluids("gtceu:legendarium_plasma 2304")
        .EUt(GTValues.VA[GTValues.OpV])
        .duration(200)
        .addData("SCTier", 3)
    gtr.stellar_forge('refinedproductionline:endgame_free_proton_gas')//单步气态高密度自由质子气
        .notConsumable("4x sgjourney:reaction_chamber")
        .itemInputs('4x kubejs:leptonic_charge','kubejs:charged_triplet_neutronium_sphere')
        .outputFluids('gtceu:free_proton_gas 10000')
        .EUt(GTValues.VA[GTValues.UXV])
        .duration(200)
        .addData("SCTier", 3)
    gtr.autoclave('refinedproductionline:creative_tank')//来自产线撕裂者的创造储罐，等待修订配方中
        .itemInputs('4x gtlcore:ultimate_tea')
        .inputFluids('gtladditions:star_gate_crystal_slurry 2147483648000')
        .itemOutputs('gtceu:creative_tank')
        .EUt(GTValues.VEX[GTValues.MAX_TRUE])
        .duration(1000000)
    gtr.miner_module("refinedproductionline:ultimate_space_ore")//同样来自产线撕裂者的终极矿石采集
        .notConsumable('256x gtladditions:astral_array')
        .circuit(32)
        .itemOutputs(orelist)
        .duration(1)
        .EUt(GTValues.VA[GTValues.MAX])
    gtr.dimensionally_transcendent_plasma_forge("kubejs:null")//神煅空烧配方
        .circuit(32)
        .notConsumable('gtladditions:forge_of_the_antichrist')
        .outputFluids('water 1')
        .EUt(1)
        .duration(1)
        .blastFurnaceTemp(36000)
/*    if(!Ingredient.of('sgjourney:pegasus_stargate').isEmpty())//星门系列专属配方
        {
            
             event.remove({output:'avaritia:neutron_gear'})
            gtr.qft("thetornproductionline:easier_fishbig")//超后期单步鱼大
            .notConsumable('avaritia:neutron_gear')
            .notConsumableFluid('gtladditions:star_gate_crystal_slurry 2147483647')
            .itemInputs('769622676x gtceu:diamond_dust',
                    '110122226x minecraft:ancient_debris',
                    '110122226x gtceu:calorite_dust',
                    '68060878x gtceu:amethyst_dust',
                    '28318856x gtceu:lapis_dust',
                    '24830648x gtceu:emerald_dust',
                    '2379328x gtceu:olivine_dust',
                    '1943035x gtceu:raw_tengam_dust',
                    '588777x gtceu:graphite_dust',
                    '297416x gtceu:yellow_garnet_dust',
                    '134788x gtceu:jasper_dust',
                    '83968x gtceu:nether_quartz_dust',
                    '65568x gtceu:apatite_dust',
                    '1264x gtceu:stem_cells',
                    '1152x gtceu:bedrock_dust',
                    '320x gtceu:red_garnet_dust',
                    '320x gtceu:lazurite_dust'
                    )
            .chancedOutput('1x expatternprovider:fishbig',1,0)
            .EUt(1)
            .duration(1)
            gtr.qft('thetornproductionline:neutron_gear_pattern')//中子齿轮的处理样板配方
            .itemInputs('64x gtceu:create_computation','4x gtladditions:apocalyptic_torsion_quantum_matrix','ae2:blank_pattern')
            .itemOutputs(Item.of('ae2:processing_pattern', '{in:[{"#":65536L,"#c":"ae2:i",id:"gtladditions:draconic_collapse_core"},{"#":4096L,"#c":"ae2:i",id:"gtladditions:thread_modifier_hatch"},{"#":65536L,"#c":"ae2:i",id:"gtceu:door_of_create"},{"#":65536L,"#c":"ae2:i",id:"gtceu:create_aggregation"},{"#":256L,"#c":"ae2:i",id:"expatternprovider:fishbig"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:arcanic_astrograph"},{"#":16777216L,"#c":"ae2:i",id:"gtceu:eternity_nanoswarm"},{"#":16777216L,"#c":"ae2:i",id:"gtceu:spacetime_nanoswarm"},{"#":16777216L,"#c":"ae2:i",id:"gtceu:transcendentmetal_nanoswarm"},{"#":2147483647L,"#c":"ae2:i",id:"gtceu:cosmicneutronium_block"},{"#":2147483647L,"#c":"ae2:i",id:"kubejs:cosmic_singularity"},{"#":114L,"#c":"ae2:i",id:"gtladditions:forge_of_the_antichrist"},{"#":514L,"#c":"ae2:i",id:"gtladditions:apocalyptic_torsion_quantum_matrix"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:nexus_satellite_factory_mk4"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:nexus_satellite_factory_mk3"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:nexus_satellite_factory_mk2"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:nexus_satellite_factory_mk1"},{"#":2147483647L,"#c":"ae2:i",id:"kubejs:extremely_durable_plasma_cell"},{"#":16777216L,"#c":"ae2:i",id:"kubejs:suprachronal_mainframe_complex"},{"#":2147483647L,"#c":"ae2:i",id:"kubejs:quantum_anomaly"},{"#":2147483647L,"#c":"ae2:i",id:"avaritia:infinity"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:god_forge_energy_casing"},{"#":2147483647L,"#c":"ae2:i",id:"gtceu:spacetime_hex_wire"},{"#":65536L,"#c":"ae2:i",id:"gtladditions:astral_array"},{"#":2147483647L,"#c":"ae2:i",id:"kubejs:quantum_chromodynamic_charge"},{"#":2147483647L,"#c":"ae2:i",id:"gtceu:magnetohydrodynamicallyconstrainedstarmatter_block"},{"#":2147483647L,"#c":"ae2:i",id:"gtlcore:infinite_cell_component"},{"#":2147483647L,"#c":"ae2:i",id:"gtceu:opv_quantum_tank"},{"#":16777216L,"#c":"ae2:i",id:"gtladditions:strange_annihilation_fuel_rod"},{"#":1L,"#c":"ae2:i",id:"gtceu:nan_certificate"},{"#":16777216L,"#c":"ae2:i",id:"gtladditions:black_hole_seed"},{"#":1L,"#c":"ae2:i",id:"kubejs:time_twister_wireless"},{"#":256L,"#c":"ae2:i",id:"gtladditions:heart_of_the_universe"},{"#":2147483647L,"#c":"ae2:i",id:"kubejs:max_universal_circuit"},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],out:[{"#":1L,"#c":"ae2:i",id:"avaritia:neutron_gear",tag:{RepairCost:0,display:{Name:\'{"text":"配方过于复杂无法用JEI全部显示请查看空白样板合成用途以查看合成中子齿轮的完整配方样板"}\'}}},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}'))
            .EUt(GTValues.VA[GTValues.MAX]*2147483648)
            .duration(1)
            gtr.nightmare_crafting('thetornproductionline:neutron_gear')//中子齿轮新配方
            .itemInputs('2147483647x gtceu:cosmicneutronium_block', 
                    '2147483647x gtceu:opv_quantum_tank',
                    '2147483647x gtlcore:infinite_cell_component', 
                    '2147483647x avaritia:infinity', 
                    '2147483647x kubejs:quantum_anomaly',
                    '2147483647x gtceu:spacetime_hex_wire', 
                    '2147483647x kubejs:quantum_chromodynamic_charge', 
                    '2147483647x gtceu:magnetohydrodynamicallyconstrainedstarmatter_block', 
                    '2147483647x kubejs:cosmic_singularity', 
                    '2147483647x kubejs:max_universal_circuit', 
                    '2147483647x kubejs:extremely_durable_plasma_cell',
                    '16777216x kubejs:suprachronal_mainframe_complex', 
                    '16777216x gtladditions:black_hole_seed', 
                    '16777216x gtladditions:strange_annihilation_fuel_rod',
                    '16777216x gtceu:spacetime_nanoswarm', 
                    '16777216x gtceu:transcendentmetal_nanoswarm', 
                    '16777216x gtceu:eternity_nanoswarm',
                    '65536x gtladditions:draconic_collapse_core', 
                    '65536x gtceu:door_of_create', 
                    '65536x gtceu:create_aggregation', 
                    '65536x gtladditions:astral_array', 
                    '65536x gtladditions:nexus_satellite_factory_mk1', 
                    '65536x gtladditions:nexus_satellite_factory_mk2', 
                    '65536x gtladditions:nexus_satellite_factory_mk3', 
                    '65536x gtladditions:nexus_satellite_factory_mk4',
                    '65536x gtladditions:god_forge_energy_casing',
                    '65536x gtladditions:arcanic_astrograph',
                    'kubejs:time_twister_wireless', 
                    'gtceu:nan_certificate',
                    '4096x gtladditions:thread_modifier_hatch',
                    '114x gtladditions:forge_of_the_antichrist',
                    '514x gtladditions:apocalyptic_torsion_quantum_matrix',
                    '256x gtladditions:heart_of_the_universe',
                    '256x expatternprovider:fishbig')
            .itemOutputs(Item.of('avaritia:neutron_gear', "{RepairCost:0,display:{Name:'{\"text\":\"配方过于复杂无法用JEI全部显示请查看空白样板合成用途以查看合成中子齿轮的完整配方样板\"}'}}"))
            .duration(114514)
            .EUt(GTValues.VA[GTValues.MAX])
        }
        else//原版/旧版add配方
        {
            gtr.gravitation_shockburst("thetornproductionline:creative_thing_1")//4大原版隐藏配方(在1.4.4.5中首次出现 难度较大)
            .itemInputs('64x expatternprovider:fishbig')
            .itemOutputs('gtlcore:ultimate_tea')
            .EUt(2147483648)
            .duration(20)
            gtr.gravitation_shockburst("thetornproductionline:creative_thing_2")
            .itemInputs('16x gtlcore:ultimate_tea')
            .itemOutputs('kubejs:heartofthesmogus')
            .EUt(2147483648)
            .duration(20)
            gtr.assembler("thetornproductionline:creative_thing_3")
            .itemInputs('8x gtlcore:ultimate_tea','expatternprovider:fishbig')
            .itemOutputs('gtceu:creative_tank')
            .EUt(2147483648)
            .duration(20)
            gtr.assembler("thetornproductionline:creative_thing_4")
            .itemInputs('64x kubejs:heartofthesmogus','expatternprovider:fishbig')
            .itemOutputs('gtceu:creative_chest')
            .EUt(2147483648)
            .duration(20)
        }
        if(!Ingredient.of('gtladditions:dimension_focus_infinity_crafting_array').isEmpty())//add系列专属配方
        {
            gtr.miner_module("thetornproductionline:ultimate_space_ore")//终极矿石采集
            .notConsumable('256x gtladditions:astral_array')
            .circuit(32)
            .itemOutputs(orelist)
            .duration(1)
            .EUt(GTValues.VA[GTValues.MAX])
            //event.remove({id:'gtladditions:nightmare_crafting/cosmic_meatballs'})
            //event.remove({id:'gtladditions:nightmare_crafting/endest_pearl'})
        }
        else
        {
            gtr.qft("thetornproductionline:ultimate_false_cosmos_simulation")//原版究极量子模拟
            .circuit(12)
            .itemInputs('65536x gtceu:eye_of_harmony','gtlcore:cell_component_256m')
            .itemOutputs(homocelloutputs)
            .duration(20)
            .EUt(2147483648)
            gtr.assembler('thetornproductionline:ultimate_gas_collect')//原版究极集气
                .itemInputs('64x gtceu:annihilate_generator','1024x gtceu:large_gas_collector','64x kubejs:exotic_mainframe','gtlcore:cell_component_256m')
                .itemOutputs(packed_infinity_cell('集气元件包','f',['gtceu:air','gtceu:liquid_air','gtceu:nether_air','gtceu:liquid_nether_air','gtceu:ender_air','gtceu:liquid_ender_air']))
                .duration(20)
                .EUt(GTValues.VA[GTValues.UXV])
        }
*/
})  