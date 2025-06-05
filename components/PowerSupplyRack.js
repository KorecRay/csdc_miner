window.PowerSupplyViewPanel = function PowerSupplyViewPanel() {
	const [show, setShow] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	/*const [openGroups, setOpenGroups] = React.useState({});*/

	const togglepsu = (uuid) => {
		const psu = window.Inventory.PowerSupply.find(psu => psu.uuid === uuid);
    const psuId = psu.modelId;
    const psuSpec = window.PowerSupply_LIST.find(psu => psu.id === psuId);
    const PowerOutput = window.Inventory.getpsuPowerOutput();
		const PowerUsage = window.Inventory.getGPUPowerUsage();
		const UsablePower = PowerOutput - PowerUsage;

		if (psu) {
      if(psu.on){
        if(PowerOutput - psuSpec.power >= PowerUsage){
          psu.on = !psu.on;
		  	  setRefresh(r => r + 1);
		  	  window.Inventory.save();
        }else{
          alert("Can't disconnect this power supply, no enough power!")
        }
      }else{
        psu.on = !psu.on;
		  	setRefresh(r => r + 1);
		  	window.Inventory.save();
      }
		}
	};

  const sellpsu = (uuid) => {
		const psu = window.Inventory.PowerSupply.find(psu => psu.uuid === uuid);
    const psuId = psu.modelId;
    const psuSpec = window.PowerSupply_LIST.find(psu => psu.id === psuId);
    const PowerOutput = window.Inventory.getpsuPowerOutput();
		const PowerUsage = window.Inventory.getGPUPowerUsage();
		const UsablePower = PowerOutput - PowerUsage;

    if (psu) {
      if(psu.on){
        if(PowerOutput - psuSpec.power >= PowerUsage){
          window.App.handlepsuSell(uuid);
			    setRefresh(r => r + 1);
			    window.Inventory.save();
        }else{
          alert("Can't sell this power supply, no enough power!")
        }
      }else{
        window.App.handlepsuSell(uuid);
			  setRefresh(r => r + 1);
			  window.Inventory.save();
      }
		}
	};

	for (const psu of window.Inventory.PowerSupply) {
		const spec = window.PowerSupply_LIST.find(item => item.id === psu.modelId);
	}

	/*const grouped = {};
	for (const psu of window.Inventory.PowerSupply) {
		const spec = window.PowerSupply_LIST.find(item => item.id === psu.modelId);
		if (!spec) continue;
		const group = spec.id.split("_")[0].toUpperCase();
		if (!grouped[group]) grouped[group] = [];
		grouped[group].push({ ...psu, spec });
	}

	const toggleGroup = (group) => {
		setOpenGroups(prev => ({
			...prev,
			[group]: !prev[group]
		}));
	}; */


	return (
    <div>
      <button className="psurackbtn" onClick={() => setShow(!show)}>
        {show ? 'Hide Power Supply Rack' : 'Show Power Supply Rack'}
      </button>

      {show && (
        <div className="psu-rack">
          {window.Inventory.PowerSupply.length === 0 && <p>NULL</p>}

          {window.Inventory.PowerSupply.map(psu => {
            const spec = window.PowerSupply_LIST.find(item => item.id === psu.modelId);
            if (!spec) return null; 

            return (
              <div className="rack-info" key={psu.uuid}>
                <div>
                <div>Model：{spec.name}</div>
                <div>UUID：{psu.uuid}</div>
                <div style={{ color: psu.on ? 'rgb(100,225,100)' : 'rgb(225,100,100)' }}>
                  State：{psu.on ? 'Active' : 'Closed'}
                </div>
                <button
                  onClick={() => togglepsu(psu.uuid)}
                  className={psu.on ? 'disconnect' : 'connect'}
                >
                  {psu.on ? '❌ disconnect' : '✅ connect'}
                </button>
              </div>
              <div>
										<button
											  onClick={() => sellpsu(psu.uuid)}
											  className="sellbtn"
										>
											  Sell Power Supply
										</button>
								</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};