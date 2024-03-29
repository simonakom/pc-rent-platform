const executeQuery = require("../mysql")

module.exports = class User {
    #id; 
    username;
    passEncoded;
    salt;
    email;
    birthDate;
    phone;
    addressId;

    constructor({ username, passEncoded, email, birthDate, phone, addressId, salt}, id = null){
        this.#id = id;
        this.username = username;
        this.passEncoded = passEncoded;
        this.email = email;
        this.birthDate = birthDate;
        this.phone = phone;
        this.addressId = addressId;
        this.salt = salt;
        }

        get id () { return this.#id; }

        async save(){
        const result = await executeQuery(
            `INSERT INTO users (username, pass_encoded, email, birth_date, phone, address_id, salt) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [this.username, this.passEncoded, this.email, this.birthDate, this.phone, this.addressId, this.salt]);
            console.log(result);
            this.#id = result[0].insertId;
            return result;
        }

         static async findAll() {
    const results = await executeStatement(`SELECT * FROM users`);
    const result = results[0].map(
      (userObj) =>
        new User(
          {
            username: userObj.username,
            pass_encoded: userObj.pass_encoded,
            email: userObj.email,
            birth_date: userObj.birth_date,
            phone: userObj.phone,
            address_id: userObj.address_id,
            salt: userObj.salt,
          },
          userObj.id
        )
    );
    return result;
  }

        static async findById(id) { 
            const results = await executeQuery(`SELECT * FROM users WHERE id=?`, [id,]);
            console.log(results);
            const result = results[0][0];
            return new User({
                username: result.username,
                passEncoded: result.pass_encoded,
                email: result.email,
                birthDate: result.birth_date,
                phone: result.phone,
                addressId: result.address_id,
                salt: result.salt
            },
                result.id
            );
        }

        static async findByUsername(username) {
		const results = await executeQuery(`SELECT * FROM users WHERE username = ?`,[username]);
		if (results[0].length === 0) return null;
		const user = results[0][0];
		return new User(
			{
				username: user.username,
				passEncoded: user.pass_encoded,
				email: user.email,
				birthDate: user.birth_date,
				phone: user.phone,
				addressId: user.address_id,
				salt: user.salt,
			},
			user.id
		);
	}

        static async deleteById(id) {
            const result = await executeQuery(`DELETE FROM users WHERE id=?`, [id]);
            console.log(result); 
            if(result[0].affectedRows === 0) throw new Error("not found");
            return result;
            }
    
        async update(){
            const result = await executeQuery(`UPDATE users SET username =?, pass_encoded =?, email =?, birth_date =?, phone =?, address_id =?, salt=? WHERE id=?`, 
            [this.username, this.passEncoded, this.email, this.birthDate, this.phone, this.addressId, this.salt, this.#id])
                console.log(result);
                return result; 
            }

        getInstance(){
        return{...this, id: this.#id};
        }
}