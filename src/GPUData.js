const GPU_LIST = [
  {
    id: "gtx_1050ti",
    name: "GTX 1050 Ti",
    hashRate: 0.000014,
    power: 75,
    buyPrice: 0.004504,
    sellPrice: 0.002703
  },
  {
    id: "gtx_1060",
    name: "GTX 1060 6GB",
    hashRate: 0.000019,
    power: 120,
    buyPrice: 0.006341,
    sellPrice: 0.003624
  },
  {
    id: "gtx_1660",
    name: "GTX 1660",
    hashRate: 0.000034,
    power: 100,
    buyPrice: 0.011085,
    sellPrice: 0.006466
  },
  {
    id: "gtx_1660s",
    name: "GTX 1660 Super",
    hashRate: 0.000036,
    power: 125,
    buyPrice: 0.015885,
    sellPrice: 0.009077
  },
  {
    id: "rtx_2060",
    name: "RTX 2060",
    hashRate: 0.000032,
    power: 160,
    buyPrice: 0.012713,
    sellPrice: 0.007628
  },
  {
    id: "rtx_2070",
    name: "RTX 2070",
    hashRate: 0.000042,
    power: 175,
    buyPrice: 0.022393,
    sellPrice: 0.012316
  },
  {
    id: "rtx_2080",
    name: "RTX 2080",
    hashRate: 0.000053,
    power: 215,
    buyPrice: 0.026735,
    sellPrice: 0.015277
  },
  {
    id: "rtx_2060super",
    name: "RTX 2060 Super",
    hashRate: 0.000036,
    power: 175,
    buyPrice: 0.018171,
    sellPrice: 0.010689
  },
  {
    id: "rtx_2070super",
    name: "RTX 2070 Super",
    hashRate: 0.000046,
    power: 215,
    buyPrice: 0.019533,
    sellPrice: 0.011889
  },
  {
    id: "rtx_2080super",
    name: "RTX 2080 Super",
    hashRate: 0.000058,
    power: 250,
    buyPrice: 0.033253,
    sellPrice: 0.019952
  },
  {
    id: "rtx_3050",
    name: "RTX 3050",
    hashRate: 0.000042,
    power: 130,
    buyPrice: 0.014922,
    sellPrice: 0.009119
  },
  {
    id: "rtx_3060",
    name: "RTX 3060",
    hashRate: 0.000055,
    power: 120,
    buyPrice: 0.027606,
    sellPrice: 0.016563
  },
  {
    id: "rtx_3060ti",
    name: "RTX 3060 Ti",
    hashRate: 0.00006,
    power: 200,
    buyPrice: 0.032579,
    sellPrice: 0.019548
  },
  {
    id: "rtx_3070",
    name: "RTX 3070",
    hashRate: 0.000063,
    power: 220,
    buyPrice: 0.034428,
    sellPrice: 0.020657
  },
  {
    id: "rtx_3080",
    name: "RTX 3080",
    hashRate: 0.00009,
    power: 320,
    buyPrice: 0.064613,
    sellPrice: 0.037593
  },
  {
    id: "rtx_3090",
    name: "RTX 3090",
    hashRate: 0.0001,
    power: 350,
    buyPrice: 0.056907,
    sellPrice: 0.033269
  },
  {
    id: "rtx_3070ti",
    name: "RTX 3070 Ti",
    hashRate: 0.000068,
    power: 290,
    buyPrice: 0.037536,
    sellPrice: 0.022522
  },
  {
    id: "rtx_3080ti",
    name: "RTX 3080 Ti",
    hashRate: 0.000098,
    power: 350,
    buyPrice: 0.064704,
    sellPrice: 0.038822
  },
  {
    id: "rtx_3090ti",
    name: "RTX 3090 Ti",
    hashRate: 0.00011,
    power: 400,
    buyPrice: 0.084553,
    sellPrice: 0.050497
  },
  {
    id: "rtx_4050",
    name: "RTX 4050",
    hashRate: 0.000036,
    power: 85,
    buyPrice: 0.01318,
    sellPrice: 0.008002
  },
  {
    id: "rtx_4060",
    name: "RTX 4060",
    hashRate: 0.00006,
    power: 115,
    buyPrice: 0.032493,
    sellPrice: 0.018568
  },
  {
    id: "rtx_4070",
    name: "RTX 4070",
    hashRate: 0.00007,
    power: 200,
    buyPrice: 0.045079,
    sellPrice: 0.027284
  },
  {
    id: "rtx_4080",
    name: "RTX 4080",
    hashRate: 0.00011,
    power: 320,
    buyPrice: 0.069448,
    sellPrice: 0.041669
  },
  {
    id: "rtx_4090",
    name: "RTX 4090",
    hashRate: 0.00013,
    power: 450,
    buyPrice: 0.08497,
    sellPrice: 0.049982
  },
  {
    id: "rtx_4070ti",
    name: "RTX 4070 Ti",
    hashRate: 0.000085,
    power: 285,
    buyPrice: 0.052633,
    sellPrice: 0.031799
  },
  {
    id: "rtx_4080super",
    name: "RTX 4080 Super",
    hashRate: 0.000115,
    power: 320,
    buyPrice: 0.077862,
    sellPrice: 0.045864
  },
  {
    id: "rx_5600xt",
    name: "Radeon RX 5600 XT",
    hashRate: 0.000038,
    power: 150,
    buyPrice: 0.01154,
    sellPrice: 0.007419
  },
  {
    id: "rx_5700",
    name: "Radeon RX 5700",
    hashRate: 0.000051,
    power: 180,
    buyPrice: 0.021497,
    sellPrice: 0.012284
  },
  {
    id: "rx_5700xt",
    name: "Radeon RX 5700 XT",
    hashRate: 0.000055,
    power: 225,
    buyPrice: 0.019733,
    sellPrice: 0.012011
  },
  {
    id: "rx_6600",
    name: "Radeon RX 6600",
    hashRate: 0.000048,
    power: 130,
    buyPrice: 0.019039,
    sellPrice: 0.011423
  },
  {
    id: "rx_6700xt",
    name: "Radeon RX 6700 XT",
    hashRate: 0.00006,
    power: 230,
    buyPrice: 0.034091,
    sellPrice: 0.019984
  },
  {
    id: "rx_6800",
    name: "Radeon RX 6800",
    hashRate: 0.000065,
    power: 250,
    buyPrice: 0.036074,
    sellPrice: 0.021863
  },
  {
    id: "rx_6900xt",
    name: "Radeon RX 6900 XT",
    hashRate: 0.000072,
    power: 300,
    buyPrice: 0.037815,
    sellPrice: 0.023634
  },
  {
    id: "rx_7600",
    name: "Radeon RX 7600",
    hashRate: 0.00005,
    power: 165,
    buyPrice: 0.026304,
    sellPrice: 0.016011
  },
  {
    id: "rx_7700xt",
    name: "Radeon RX 7700 XT",
    hashRate: 0.000063,
    power: 245,
    buyPrice: 0.031274,
    sellPrice: 0.018396
  },
  {
    id: "rx_7900xtx",
    name: "Radeon RX 7900 XTX",
    hashRate: 0.00009,
    power: 355,
    buyPrice: 0.05631,
    sellPrice: 0.033009
  },
  {
    id: "arc_a380",
    name: "Intel Arc A380",
    hashRate: 0.000012,
    power: 75,
    buyPrice: 0.003263,
    sellPrice: 0.001631
  },
  {
    id: "arc_a750",
    name: "Intel Arc A750",
    hashRate: 0.000035,
    power: 150,
    buyPrice: 0.015331,
    sellPrice: 0.009435
  },
  {
    id: "arc_a770",
    name: "Intel Arc A770",
    hashRate: 0.000045,
    power: 140,
    buyPrice: 0.018291,
    sellPrice: 0.010162
  }
]