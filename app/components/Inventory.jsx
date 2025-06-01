window.Inventory = {
	gpus: [],
	addGPU(id) {
		this.gpus.push(id);
	},
	removeGPU(id) {
		const index = this.gpus.indexOf(id);
		if (index !== -1) this.gpus.splice(index, 1);
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
	}
};
