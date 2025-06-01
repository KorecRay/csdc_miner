window.GPUViewPanel = function GPUViewPanel() {
	const [show, setShow] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [openGroups, setOpenGroups] = React.useState({}); // 控制各分類開關

	const toggleGPU = (uuid) => {
		const gpu = window.Inventory.gpus.find(g => g.uuid === uuid);
		if (gpu) {
			gpu.on = !gpu.on;
			setRefresh(r => r + 1);
			window.Inventory.save();
		}
	};

	const grouped = {};
	for (const gpu of window.Inventory.gpus) {
		const spec = window.GPU_LIST.find(item => item.id === gpu.modelId);
		if (!spec) continue;
		const group = spec.id.split("_")[0].toUpperCase();
		if (!grouped[group]) grouped[group] = [];
		grouped[group].push({ ...gpu, spec });
	}

	const toggleGroup = (group) => {
		setOpenGroups(prev => ({
			...prev,
			[group]: !prev[group]
		}));
	};

	return (
		<div>
			<button className="gpurackbtn" onClick={() => setShow(!show)}>
				{show ? 'Hide GPU Rack' : 'Show GPU Rack'}
			</button>

			{show && (
				<div className="gpu-rack">
					{Object.keys(grouped).length === 0 && <p>NULL</p>}

					{Object.entries(grouped).map(([group, list]) => (
						<div className="series-container" key={group}>
							<div
								className="series-text"
								onClick={() => toggleGroup(group)}
								style={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}
							>
								<span>{openGroups[group] ? '▼' : '►'} {group} Series</span>
								<span style={{ fontSize: '1.5vh' }}>{list.length} GPU</span>
							</div>

							{openGroups[group] && list.map(g => (
								<div className="rack-info" key={g.uuid}>
									<div>Model：{g.spec.name}</div>
									<div>UUID：{g.uuid}</div>
									<div style={{ color: g.on ? 'rgb(100,225,100)' : 'rgb(225,100,100)' }}>
										State：{g.on ? 'Active' : 'Closed'}
									</div>
									<button
										onClick={() => toggleGPU(g.uuid)}
										className={g.on ? 'disconnect' : 'connect'}
									>
										{g.on ? '❌ disconnect' : '✅ connect'}
									</button>
								</div>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
