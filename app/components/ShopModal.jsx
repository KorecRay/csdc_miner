window.ShopModal = function ShopModal({ show, onClose, onBuy, onSell }) {
  if (!show) return null;

  return (
    <div className="store">
      {/* <h3>Store</h3> */}
      {window.GPU_LIST.map(gpu => (
        <div key={gpu.id}>
          <strong>{gpu.name}</strong><br />
          Hashrate: {gpu.hashRate} / TDP: {gpu.power}W<br />
          Price: 🪙 {gpu.buyPrice} / lan: 🪙 {gpu.sellPrice}
          <br />
          <button onClick={() => onBuy(gpu.id)}>Buy</button>
          {/* <button onClick={() => onSell(gpu.id)}>賣出</button> */}
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
