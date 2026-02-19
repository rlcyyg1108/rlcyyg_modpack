
ServerEvents.recipes((event)=>{
    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev", "uiv", "uxv", "opv", "max"]
    const anya = ["4a","16a","64a"]
    const anya_laser = ['256a','1024a','4096a','16384a','65536a','262144a','1048576a','4194304a','16777216a','67108864a']
    const EUtList = {ulv:6,lv:30,mv:120,hv:480,ev:1920,iv:7680,luv:30720,zpm:122880,uv:491520,uhv:1966080,uev:7864320,uiv:31457280,uxv:125829120,opv:503316480,max:2013265920}
    const gtr = event.recipes.gtceu
    const isexisted = (item)=>!Item.of(item).isEmpty()
    const addrecipeifexist=(input,output,tier)=>{
        if(isexisted(input)&&isexisted(output))
            gtr.assembler(`lasywireless:easier_${output.split(':')[1]}`)
                .itemInputs(input)
                .itemOutputs(output)
                .inputFluids('minecraft:water 1000')
                .duration(100)
                .EUt(EUtList[tier])
                .circuit(30)
    }
    tiers.forEach(tier=>{
        addrecipeifexist(`gtceu:${tier}_energy_input_hatch`,`gtmthings:${tier}_2a_wireless_energy_input_hatch`,tier)
        addrecipeifexist(`gtceu:${tier}_substation_input_hatch_64a`,`gtmthings:${tier}_64a_wireless_energy_input_hatch`,tier)
        addrecipeifexist(`gtmthings:${tier}_2a_wireless_energy_input_hatch`,`gtmadvancedhatch:${tier}_2a_net_energy_input_hatch`,tier)
        addrecipeifexist(`gtceu:${tier}_energy_output_hatch`,`gtmthings:${tier}_2a_wireless_energy_output_hatch`,tier)
        addrecipeifexist(`gtceu:${tier}_substation_output_hatch_64a`,`gtmthings:${tier}_64a_wireless_energy_output_hatch`,tier)
        addrecipeifexist(`gtmthings:${tier}_2a_wireless_energy_output_hatch`,`gtmadvancedhatch:${tier}_2a_net_energy_output_hatch`,tier)
        anya.forEach(a=>{
            addrecipeifexist(`gtceu:${tier}_energy_input_hatch_${a}`,`gtmthings:${tier}_${a}_wireless_energy_input_hatch`,tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_energy_input_hatch`,`gtmadvancedhatch:${tier}_${a}_net_energy_input_hatch`,tier)
            addrecipeifexist(`gtceu:${tier}_energy_output_hatch_${a}`,`gtmthings:${tier}_${a}_wireless_energy_output_hatch`,tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_energy_output_hatch`,`gtmadvancedhatch:${tier}_${a}_net_energy_output_hatch`,tier)
        })
        anya_laser.forEach(a=>{
            addrecipeifexist(`gtceu:${tier}_${a}_laser_target_hatch`,`gtmthings:${tier}_${a}_wireless_laser_target_hatch`,tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_laser_target_hatch`,`gtmadvancedhatch:${tier}_${a}_net_laser_target_hatch`,tier)
            addrecipeifexist(`gtceu:${tier}_${a}_laser_source_hatch`,`gtmthings:${tier}_${a}_wireless_laser_source_hatch`,tier)
            addrecipeifexist(`gtmthings:${tier}_${a}_wireless_laser_source_hatch`,`gtmadvancedhatch:${tier}_${a}_net_laser_source_hatch`,tier)
            
        })
    })
    gtr.assembler('lasywireless:easier_advanced_energy_detector_cover')
    .itemInputs('gtceu:energy_detector_cover', 'gtceu:lv_sensor')
    .inputFluids('gtceu:soldering_alloy 72')
    .itemOutputs('gtceu:advanced_energy_detector_cover')
    .EUt(30)
    .duration(100)
})
