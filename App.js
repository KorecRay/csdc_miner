
window.App = function App() {
	const [coins, setCoins] = React.useState(() => {
		const saved = localStorage.getItem("coins");
		return saved ? parseFloat(saved) : 0;
	});
	const [showShop, setShowShop] = React.useState(false);
	const [showGPUView, setShowGPUView] = React.useState(false);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const hashRate = window.Inventory.getHashRate();
			const power = window.Inventory.getPowerUsage();
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
				<p>Total Power Usage: {window.Inventory.getPowerUsage()} W</p>
			</div>
			<window.MinerButton onMine={handleClickMine} />
			<button className="openstore" onClick={() => setShowShop(!showShop)}>
				{showShop ? "Close Shop" : "Open Shop"}
			</button>

			<ShopModal
				show={showShop}
				onClose={() => setShowShop(false)}
				onBuy={handleBuy}
			/>
			<GPUViewPanel />
		</div>
	);
};
