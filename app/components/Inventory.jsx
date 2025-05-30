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
    return this.gpus.reduce((total, id) => {
      const gpu = window.GPU_LIST.find(g => g.id === id);
      return total + (gpu ? gpu.hashRate : 0);
    }, 0);
  },
  getPowerUsage() {
    return this.gpus.reduce((total, id) => {
      const gpu = window.GPU_LIST.find(g => g.id === id);
      return total + (gpu ? gpu.power : 0);
    }, 0);
  }
};
