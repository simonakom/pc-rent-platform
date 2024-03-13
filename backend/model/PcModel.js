const executeQuery = require("../mysql");

module.exports = class PC {
	#id; // Private field for PC ID
	ownerId;
	cpu;
	gpu;
	ramType;
	ramSpeed;
	ramAmount;
	pcType;

	constructor(
		{ ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType },
		id = null
	) {
		this.#id = id;
		this.ownerId = ownerId;
		this.cpu = cpu;
		this.gpu = gpu;
		this.ramType = ramType;
		this.ramSpeed = ramSpeed;
		this.ramAmount = ramAmount;
		this.pcType = pcType;
	}

	get id() { return this.#id; }

	async save() {
		const result = await executeQuery(
			`INSERT INTO pc (owner_id, cpu, gpu, ram_type, ram_speed, ram_amount, pc_type) VALUES (?, ?, ?, ?, ?, ?, ?);`,
			[
				this.ownerId,
				this.cpu,
				this.gpu,
				this.ramType,
				this.ramSpeed,
				this.ramAmount,
				this.pcType,
			]
		);
		this.#id = result.insertId;
		return result;
	}
    static async findAll() {
        const results = await executeQuery(`SELECT * FROM pc`)
        console.log(results);
        const result = results[0].map
            (pcObj => 
                new PC(
                    {
						ownerId: pcObj.owner_id, 
						cpu: pcObj.cpu, 
						gpu: pcObj.gpu, 
						ramType: pcObj.ram_type, 
						ramSpeed: pcObj.ram_speed, 
						ramAmount: pcObj.ram_amount, 
						pcType: pcObj.pc_type
                    },
                    pcObj.id
                    )
                );
        return result;
        }

	    static async findById(id) { 
			const results = await executeQuery(`SELECT * FROM pc WHERE id=?`, [id,]);
			console.log(results);
			const result = results[0][0];
			return new PC({
						ownerId: result.owner_id, 
						cpu: result.cpu, 
						gpu: result.gpu, 
						ramType: result.ram_type, 
						ramSpeed: result.ram_speed, 
						ramAmount: result.ram_amount, 
						pcType: result.pc_type
			},
				result.id
			);
		}

		static async deleteById(id) {
			const result = await executeQuery(`DELETE FROM pc WHERE id=?`, [id]);
			console.log(result); 
			if(result[0].affectedRows === 0) throw new Error("PC not found");
			return result;
			}
	
    
    async update() {
		const result = await executeQuery(
			`UPDATE pc SET owner_id = ?, cpu = ?, gpu = ?, ram_type = ?, ram_speed = ?, ram_amount = ?, pc_type = ? WHERE id = ?`,
			[
				this.ownerId,
				this.cpu,
				this.gpu,
				this.ramType,
				this.ramSpeed,
				this.ramAmount,
				this.pcType,
				this.#id,
			]
		);
		return result;
	}

	getInstance() {
		return { ...this, id: this.#id };
	}
};