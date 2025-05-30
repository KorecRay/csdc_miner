
window.App = function App() {
  const [coins, setCoins] = React.useState(0);
  const [showShop, setShowShop] = React.useState(false);
  const random = Math.random() * 0.0002 - 0.0001;

  React.useEffect(() => {
    const interval = setInterval(() => {
      const hashRate = window.Inventory.getHashRate();
      const power = window.Inventory.getPowerUsage();
      const mined = hashRate;
      const cost = power * 0.0000001;

      setCoins(prev => prev + mined - cost);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClickMine = () => {
    setCoins(prev => prev + 0.0001);
  };

  const handleBuy = (id) => {
    const gpu = window.GPU_LIST.find(g => g.id === id);
    if (!gpu) return;

    if (coins >= gpu.buyPrice) {
      window.Inventory.addGPU(id);
      setCoins(prev => prev - (gpu.buyPrice+random));
    } else {
      alert('金額不足！');
    }
  };

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
      <button className="openstore" onClick={() => setShowShop(true)}>Store</button>
      <window.ShopModal
        show={showShop}
        onClose={() => setShowShop(false)}
        onBuy={handleBuy}
        onSell={handleSell}
      />
    </div>
  );
};
