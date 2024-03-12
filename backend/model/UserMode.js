const executeQuery = require("../mysql")

module.exports = class User {
    #id; //# - field is private and not updated outside of class 
    username;
    passEncoded;
    email;
    birthDate;
    phone;
    addressId;

    constructor({ username, passEncoded, email, birthDate, phone, addressId}, id = null){
        this.#id = id;
        this.username = username;
        this.passEncoded = passEncoded;
        this.email = email;
        this.birthDate = birthDate;
        this.phone = phone;
        this.addressId = addressId;
        }

        get id () { return this.#id; }

        async save(){
        const result = await executeQuery(
            `INSERT INTO users (username, pass_encoded, email, birth_date, phone, address_id) VALUES (?, ?, ?, ?, ?, ?);`,
                [this.username, this.passEncoded, this.email, this.birthDate, this.phone, this.addressId]);
            console.log(result);
            this.#id = result[0].insertId;
        }

        static async findAll() {
            const results = await executeQuery(`SELECT * FROM users`)
            console.log(results);
            const result = results[0].map
                (userObj => 
                    new User(
                        {
                            username: userObj.username,
                            passEncoded: userObj.pass_encoded,
                            email: userObj.email,
                            birthDate: userObj.birth_date,
                            phone: userObj.phone,
                            addressId: userObj.address_id,
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
            },
                result.id
            );
        }

        static async deleteById(id) {
            const result = await executeQuery(`DELETE FROM users WHERE id=?`, [id]);
            console.log(result); 
            if(result[0].affectedRows === 0) throw new Error("not found");
            return result;
            }
    
        async update(){
            const result = await executeQuery(`UPDATE users SET username =?, pass_encoded =?, email =?, birth_date =?, phone =?, address_id =? WHERE id=?`, 
            [this.username, this.passEncoded, this.email, this.birthDate, this.phone, this.addressId, this.#id])
                console.log(result);
                return result;
            }

        getInstance(){
        return{...this, id: this.#id};
        }
}