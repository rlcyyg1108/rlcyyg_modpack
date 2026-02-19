ServerEvents.recipes(event => {

  const tiers = [
    "lv","mv","hv","ev","iv",
    "luv","zpm","uv","uhv",
    "uev","uiv","uxv","opv","max"
  ]

  // ========= ① 基础 2A（仅 LV） =========
  event.shapeless(
    "gtmthings:lv_2a_wireless_energy_input_hatch",
    "gtceu:lv_energy_input_hatch"
  )

  event.shapeless(
    "gtmthings:lv_2a_wireless_energy_output_hatch",
    "gtceu:lv_energy_output_hatch"
  )

  // ========= ② 常规能源仓 =========
  const baseAmps = [4, 16]
  const highAmps = [64]
  const highTierIndex = tiers.indexOf("ev")

  tiers.forEach((tier, index) => {

    let amps = baseAmps.slice()
    if (index >= highTierIndex) {
      highAmps.forEach(a => amps.push(a))
    }

    amps.forEach(a => {

      // ===== 输入仓 ID =====
      let inputHatchId
      if (a === 64) {
        inputHatchId = `gtceu:${tier}_substation_input_hatch_64a`
      } else {
        inputHatchId = `gtceu:${tier}_energy_input_hatch_${a}a`
      }

      // ===== 输出仓 ID =====
      let outputHatchId
      if (a === 64) {
        outputHatchId = `gtceu:${tier}_substation_output_hatch_64a`
      } else {
        outputHatchId = `gtceu:${tier}_energy_output_hatch_${a}a`
      }

      // ===== 无线 输入 =====
      event.shapeless(
        `gtmthings:${tier}_${a}a_wireless_energy_input_hatch`,
        inputHatchId
      )

      // ===== 无线 输出 =====
      event.shapeless(
        `gtmthings:${tier}_${a}a_wireless_energy_output_hatch`,
        outputHatchId
      )

    })
  })

  // ===== 激光靶仓（Target）安数 =====
  const laserTargetAmps = [
    256,
    1024,
    4096,
    16384,
    65536,
    262144,
    1048576,
    4194304,
    16777216,
    67108864
  ]

  // ===== 激光源仓（Source）安数 =====
  const laserSourceAmps = [
    256,
    1024,
    4096,
    16384,
    65536,
    262144,
    1048576,
    4194304,
    16777216,
    67108863
  ]

  // ========= 激光靶仓：有线 → 无线 =========
  laserTargetAmps.forEach(a => {
    event.shapeless(
      `gtmthings:iv_${a}a_wireless_laser_target_hatch`,
      `gtceu:iv_${a}a_laser_target_hatch`
    )
  })

  // ========= 激光源仓：有线 → 无线 =========
  laserSourceAmps.forEach(a => {
    event.shapeless(
      `gtmthings:iv_${a}a_wireless_laser_source_hatch`,
      `gtceu:iv_${a}a_laser_source_hatch`
    )
  })
})