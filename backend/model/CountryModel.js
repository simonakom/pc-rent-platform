const executeQuery = require("../mysql")

module.exports = class Country {
    #id; //# - field is private and not updated outside of class 
    country;
    countryShort;

    constructor({ country, countryShort}, id = null){
    this.#id = id;
    this.country = country; 
    this.countryShort = countryShort;
    }

    get id () { return this.#id; }

    async save(){
    const result = await executeQuery(
        `INSERT INTO countries (country_name, country_short) VALUES (?, ?);`,
            [this.country, this.countryShort]);
        console.log(result);
        this.#id = result[0].insertId;
    }

    static async findAll() {
        const results = await executeQuery(`SELECT * FROM countries`)
        console.log(results);
        const result = results[0].map
            (countryObj => 
                new Country(
                    {
                        country: countryObj.country_name,
                        countryShort: countryObj.country_short
                    },
                    countryObj.id
                    )
                );
        return result;
        }

    static async findById(id) { 
        const results = await executeQuery(`SELECT * FROM countries WHERE id=?`, [id,]);
        console.log(results);
        const result = results[0][0];
        return new Country({
            country: result.country_name,
            countryShort: result.country_short,
        },
            result.id
        );
    }

    static async deleteById(id) {
        const result = await executeQuery(`DELETE FROM countries WHERE id=?`, [id]);
        console.log(result); 
        if(result[0].affectedRows === 0) throw new Error("not found");
        return result;
        }

    async update(){
        const result = await executeQuery(`UPDATE countries SET country_name =?, country_short =? WHERE id=?`, 
            [this.country, this.countryShort, this.#id])
            console.log(result);
            return result;
        }


    getInstance(){
        return{...this, id: this.#id};
    }
};