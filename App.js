
window.App = function App() {
	const [coins, setCoins] = React.useState(() => {
		const saved = localStorage.getItem("coins");
		return saved ? parseFloat(saved) : 0;
	});
	const [showShop, setShowShop] = React.useState(false);
	const [showGPUView, setShowGPUView] = React.useState(false);
	const random = Math.random() * 0.0002 - 0.0001;

	React.useEffect(() => {
		const interval = setInterval(() => {
			const hashRate = window.Inventory.getHashRate();
			const power = window.Inventory.getGPUPowerUsage();
			const mined = hashRate;
			const cost = power * 0.0000001;
			const net = mined - cost;

			setCoins(prev => {
				const updated = prev + net;
				localStorage.setItem("coins", updated); // 存進 localStorage
				return updated;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleClickMine = () => {
		setCoins(prev => prev + 0.0001);
	};

	function generateUUID() {
		return 'gpu-' + Math.random().toString(36).substring(2, 10);
	}

	function generatepsuUUID() {
		return 'psu-' + Math.random().toString(36).substring(2, 10);
	}

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
			uuid: generateUUID(),
			modelId: gpuData.id,
			on: false, // defalut is on
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
			uuid: generatepsuUUID(),
			modelId: PowerSupplyData.id,
			on: false, // defalut is on
		};

		window.Inventory.addpsu(newpsu);
		console.log("Buy in Power Supply:", newpsu);
	}

	const handleSell = (id) => {
		const gpu = window.GPU_LIST.find(g => g.id === id);
		if (!gpu) return;

		const owned = window.Inventory.gpus.filter(g => g === id).length;
		if (owned > 0) {
			window.Inventory.removeGPU(id);
			setCoins(prev => prev + gpu.sellPrice);
		} else {
			alert('Sold Out!');
		}
	};


	return (
		<div className="allitem">
			<span class="title">CSDC Miner</span>
			<div class="state">
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
