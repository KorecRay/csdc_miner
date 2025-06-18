window.App = function App() {
	const [coins, setCoins] = React.useState(() => {
		const saved = localStorage.getItem("coins");
		return saved ? parseFloat(saved) : 0;
	});
	const [showShop, setShowShop] = React.useState(false);
	const [showGPUView, setShowGPUView] = React.useState(false);

	React.useEffect(() => {
		window.App = {
			handleSell,
			handlepsuSell,
			generateUUID,
			_generateUUID
		};

		const interval = setInterval(() => {
			const hashRate = window.Inventory.getHashRate();
			const power = window.Inventory.getGPUPowerUsage();
			const mined = hashRate;
			const cost = power * 0.0000001;
			const net = mined - cost;


			setCoins(prev => {
				const updated = prev + net;
				localStorage.setItem("coins", updated);
				return updated;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleClickMine = () => {
		setCoins(prev => prev + 0.0001);
	};

	//========================================================

	/**
	 * The tow func will remove in next version alters => @function generateUUID
	*/
	function _generateUUID() {
		console.warn(`This function has been deprecated in previous versions. Use function ${generateUUID} instead.`)
		return 'gpu-' + Math.random().toString(36).substring(2, 10);
	}

	function _generatepsuUUID() {
		console.warn(`This function has been deprecated in previous versions. Use function ${generateUUID} instead.`)
		return 'psu-' + Math.random().toString(36).substring(2, 10);
	}

	//========================================================

	/**
	 * Generate UUID for items
	 * 
	 * @param { string } type - Select the item type you want to generate for
	 * 
	 * @returns { string } str - random UUID
	 * 
	 * !!WARNING!! This function may return the same UUID with previous items 
	 */

	function generateUUID(type) {
		switch (type) {
			case "gpu":
				return 'gpu-' + Math.random().toString(36).substring(2, 10);
			case "psu":
				return 'psu-' + Math.random().toString(36).substring(2, 10);
		}
	}
	/**
	 * Handle prushase on GPUss
	 * 
	 * @param { string } gpuId - GPU's UUID
	 * 
	 * This function will integrate with powersupply soon @function handlepsuBuy
	 */

	const handleBuy = (gpuId) => {
		const gpuData = window.GPU_LIST.find(g => g.id === gpuId);
		if (!gpuData) return;
		if ((coins - gpuData.buyPrice) < 0) {
			alert("No Money")
			return;
		}
		console.log("current coins: ", coins);
		setCoins(prev => prev - gpuData.buyPrice)

		const newGpu = {
			uuid: generateUUID("gpu"),
			modelId: gpuData.id,
			on: false, // defalut is off
		};

		window.Inventory.addGPU(newGpu);
		console.log("Buy in GPU:", newGpu);
	}

	const handlepsuBuy = (psuId) => {
		const PowerSupplyData = window.PowerSupply_LIST.find(psu => psu.id === psuId);
		if (!PowerSupplyData) return;
		if ((coins - PowerSupplyData.buyPrice) < 0) {
			alert("No Money")
			return;
		}
		console.log("current coins: ", coins);
		setCoins(prev => prev - PowerSupplyData.buyPrice)

		const newpsu = {
			uuid: generateUUID("psu"),
			modelId: PowerSupplyData.id,
			on: false, // defalut is on
		};

		window.Inventory.addpsu(newpsu);
		console.log("Buy in Power Supply:", newpsu);
	}

	const handleSell = (uuid) => {
		const gpu = window.Inventory.gpus.find(g => g.uuid === uuid);
		if (!gpu) return;

		const gpuId = gpu.modelId;

		const gpuSpec = window.GPU_LIST.find(gpu => gpu.id === gpuId);
		window.Inventory.removeGPU(uuid);
		setCoins(prev => prev + gpuSpec.sellPrice);
	};

	const handlepsuSell = (uuid) => {
		const psu = window.Inventory.psus.find(psu => psu.uuid === uuid);
		if (!psu) return;

		const psuId = psu.modelId;

		const psuSpec = window.PowerSupply_LIST.find(psu => psu.id === psuId);
		window.Inventory.removepsu(uuid);
		setCoins(prev => prev + psuSpec.sellPrice);
	};

	return (
		<div className="allitem">
			<span className="title">CSDC Miner</span>
			<div className="state">
				<p>Coins Owned: {coins.toFixed(6)}</p>
				<p>Total Hashrate: {window.Inventory.getHashRate().toFixed(6)} / sec</p>
				<p>Total Power Output: {window.Inventory.getpsuPowerOutput()} W</p>
				<p>Total Power Usage: {window.Inventory.getGPUPowerUsage()} W</p>
			</div>
			<window.MinerButton onMine={handleClickMine} />
			<button className="openstore" onClick={() => setShowShop(!showShop)}>
				{showShop ? "Close Shop" : "Open Shop"}
			</button>

			<ShopModal
				show={showShop}
				onClose={() => setShowShop(false)}
				onBuy={handleBuy}
				onpsuBuy={handlepsuBuy}
			/>
			<GPUViewPanel />
			<PowerSupplyViewPanel />
		</div>
	);
};
