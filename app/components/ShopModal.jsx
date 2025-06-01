window.ShopModal = function ShopModal({ show, onClose, onBuy }) {
	if (!show) return null;

	const grouped = {};
	for (const gpu of window.GPU_LIST) {
		const group = gpu.id.split('_')[0].toUpperCase();
		if (!grouped[group]) grouped[group] = [];
		grouped[group].push(gpu);
	}

	const [openGroups, setOpenGroups] = React.useState({});

	const toggleGroup = (group) => {
		setOpenGroups(prev => ({
			...prev,
			[group]: !prev[group]
		}));
	};

	return (
		<div className="store">
			{/* <h3 style={{ marginBottom: '2vh' }}>GPU Store</h3> */}

			{Object.entries(grouped).map(([group, list]) => (
				<div key={group}>
					<div
						onClick={() => toggleGroup(group)}
						style={{
							cursor: 'pointer',
							fontWeight: 'bold',
							fontSize: '16px',
							borderBottom: '1px solid white',
							paddingBottom: '4px',
							display: 'flex',
							alignContent: 'center',
							width: '100%'
							// justifyContent: 'space-between',
						}}
					>
						<span>{openGroups[group] ? '▼' : '►'} {group} Series</span>
						<span style={{ fontSize: '12px' }}>{list.length} Items</span>
					</div>

					{openGroups[group] && list.map(gpu => (
						<div key={gpu.id}>
							<strong>{gpu.name}</strong><br />
							Hashrate: {gpu.hashRate} / TDP: {gpu.power}W<br />
							Price: {gpu.buyPrice} / Sell: {gpu.sellPrice}<br />
							<button onClick={() => onBuy(gpu.id)}>Buy</button>
						</div>
					))}
				</div>
			))}
		</div>
	);
};
