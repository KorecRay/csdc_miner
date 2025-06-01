window.Inventory = {
	gpus: [],
	addGPU(gpuObj) {
		this.gpus.push(gpuObj);
		this.save(); // 每次操作都同步儲存
	},
	removeGPU(uuid) {
		const index = this.gpus.findIndex(g => g.uuid === uuid);
		if (index !== -1) {
			this.gpus.splice(index, 1);
			this.save();
		}
	},
	getHashRate() {
		let total = 0;
		for (const gpu of this.gpus) {
			if (!gpu.on) continue;
			const data = window.GPU_LIST.find(d => d.id === gpu.modelId);
			if (data) total += data.hashRate;
		}
		return total;
	},
	getPowerUsage() {
		let total = 0;
		for (const gpu of this.gpus) {
			if (!gpu.on) continue;
			const data = window.GPU_LIST.find(d => d.id === gpu.modelId);
			if (data) total += data.power;
		}
		return total;
	},
	save() {
		localStorage.setItem("gpu_list", JSON.stringify(this.gpus));
	},
	load() {
		const raw = localStorage.getItem("gpu_list");
		if (raw) {
			try {
				this.gpus = JSON.parse(raw);
			} catch (e) {
				console.warn("Invalid GPU list in storage");
			}
		}
	}
};

// 載入時初始化
window.Inventory.load();
