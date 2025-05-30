window.RigPanel = function RigPanel({ onToggle }) {
    return (
        <div style={{ border: '1px solid gray', padding: 10, marginTop: 10 }}>
            <h3>機架（你的 GPU）</h3>
            {window.Inventory.gpus.length === 0 && <div>你尚未擁有任何 GPU</div>}
            {window.Inventory.gpus.map((g, index) => {
                const gpu = window.GPU_LIST.find(item => item.id === g.id);
                return (
                    <div key={index}>
                        {gpu.name} - {g.on ? "運作中" : "關機"}
                        <button onClick={() => onToggle(index)}>{g.on ? "關機" : "開機"}</button>
                    </div>
                );
            })}
        </div>
    );
};
