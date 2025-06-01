window.ShopModal = function ShopModal({ show, onClose, onBuy }) {
	if (!show) return null;

	return (
		<div className="store">
			<h3>GPU Store</h3>
			{window.GPU_LIST.map(gpu => (
				<div key={gpu.id}>
					<strong>{gpu.name}</strong>
					Hashrate: {gpu.hashRate} / TDP: {gpu.power}W<br />
					Price: {gpu.buyPrice} / Sell: {gpu.sellPrice}<br />
					<button onClick={() => onBuy(gpu.id)}>Buy</button>
				</div>
			))}
			{/* <button onClick={onClose}>Close Shop</button> */}
		</div>
	);
};
