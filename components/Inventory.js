window.Inventory = {
	gpus: [],
	psus: [],
	
	addGPU(gpuObj) {
		this.gpus.push(gpuObj);
		this.save();
	},
	addpsu(psuObj) {
		this.psus.push(psuObj);
		this.save();
	},
	removeGPU(uuid) {
		const index = this.gpus.findIndex(g => g.uuid === uuid);
		if (index !== -1) {
			this.gpus.splice(index, 1);
			this.save();
		}
	},
	removepsu(uuid) {
		const psuindex = this.psus.findIndex(psu => psu.uuid === uuid);
		if (psuindex !== -1) {
			this.psus.splice(psuindex, 1);
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
	getGPUPowerUsage() {
		let total = 0;
		for (const gpu of this.gpus) {
			if (!gpu.on) continue;
			const data = window.GPU_LIST.find(d => d.id === gpu.modelId);
			if (data) total += data.power;
		}
		return total;
	},
	
	getpsuPowerOutput() {
		let totalpsu = 0;
		for (const psu of this.psus) {
			if (!psu.on) continue;
			const data = window.PowerSupply_LIST.find(d => d.id === psu.modelId);
			if (data) totalpsu += data.power;
		}
		return totalpsu;
	},

	TotalPowerUsage() {
    	return this.getpsuPowerOutput() - this.getGPUPowerUsage();
  	},


	save() {
		localStorage.setItem("gpu_list", JSON.stringify(this.gpus));
		localStorage.setItem("psu_list", JSON.stringify(this.psus));

		const TotalPowerUsage = this.TotalPowerUsage();
    	localStorage.setItem("TotalPowerUsage", JSON.stringify(TotalPowerUsage));
	},
	load() {
		const rawgpu = localStorage.getItem("gpu_list");
		if (rawgpu) {
			try {
				this.gpus = JSON.parse(rawgpu);
			} catch (e) {
				console.warn("Invalid GPU list in storage");
			}
		}

		const rawpsu = localStorage.getItem("psu_list");
		if (rawpsu) {
			try {
				this.psus = JSON.parse(rawpsu);
			} catch (e) {
				console.warn("Invalid psu list in storage");
			}
		}
	}
};


window.Inventory.load();