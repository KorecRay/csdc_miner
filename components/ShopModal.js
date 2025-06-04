window.ShopModal = function ShopModal({ show, onClose, onBuy, onpsuBuy }) {
	if (!show) return null;

	const grouped = {};
	for (const gpu of window.GPU_LIST) {
		const group = gpu.id.split('_')[0].toUpperCase();
		if (!grouped[group]) grouped[group] = [];
		grouped[group].push(gpu);
	}

	const psuGrouped = {};
  	for (const psu of window.PowerSupply_LIST) {
    	const group = psu.id.split('_')[0].toUpperCase(); 
    	if (!psuGrouped[group]) psuGrouped[group] = [];
    	psuGrouped[group].push(psu);
  }

	const [openGroups, setOpenGroups] = React.useState({});
	const [openpsuGroups, setOpenpsuGroups] = React.useState({});

	const toggleGroup = (group) => {
		setOpenGroups(prev => ({
			...prev,
			[group]: !prev[group]
		}));
	};

	const togglepsuGroup = (psugroup) => {
    setOpenpsuGroups(prev => ({
      ...prev,
      [psugroup]: !prev[psugroup]
    }));
  };



	return (
		<div className="store">
			{/* <h3 style={{ marginBottom: '2vh' }}>GPU Store</h3> */}
			{/*<h3 style={{ margin: '2vh 0 1vh' }}>Power Supply Store</h3> */}

			{Object.entries(grouped).map(([group, list]) => (
				<div key={group} className="gpu-group">
					<div
						onClick={() => toggleGroup(group)}
						style={{
							cursor: 'pointer',
							fontWeight: 'bold',
							fontSize: '1.5vh',
							borderBottom: '1px solid white',
							paddingBottom: '4px',
							display: 'flex',
							alignContent: 'center',
							width: '100%',
							// justifyContent: 'space-between',
						}}
					>
						<span>{openGroups[group] ? '▼' : '►'} {group} Series</span>
						<span style={{ fontSize: '1.5vh' }}>{list.length} Items</span>
					</div>

					{openGroups[group] && list.map(gpu => (
						<div className="store-gpu" key={gpu.id}>
							<strong>{gpu.name}</strong>
							Hashrate: {gpu.hashRate} / TDP: {gpu.power}W<br />
							Price: {gpu.buyPrice} / Sell: {gpu.sellPrice}<br />
							<button className="buybtn" onClick={() => onBuy(gpu.id)}>Buy</button>
						</div>
					))}
				</div>
			))}

			
	      {Object.entries(psuGrouped).map(([psugroup, list]) => (
        		<div key={psugroup} className="psu-group">
          			<div
            			onClick={() => togglepsuGroup(psugroup)}
            			style={{
              				cursor: 'pointer',
              				fontWeight: 'bold',
              				fontSize: '1.5vh',
              				borderBottom: '1px solid white',
              				paddingBottom: '4px',
              				display: 'flex',
              				//alignItems: 'center',
              				// justifyContent: 'space-between'
            			}}
          			>
            			<span>{openpsuGroups[psugroup] ? '▼' : '►'} {psugroup}</span>
            			<span style={{ fontSize: '1.5vh' }}>{list.length} Items</span>
          			</div>

          			{openpsuGroups[psugroup] && list.map(psu => (
            			<div key={psu.id} className="store-psu">
              				<strong>{psu.name}</strong>
              				Power: {psu.power}W<br />
              				Price: ${psu.buyPrice}/ Sell: {psu.sellPrice}<br />
              				<button className="buybtn" onClick={() => onpsuBuy(psu.id)}>Buy</button>
            			</div>
          			))}
        		</div>
      		))}
		</div>
	);	
};
