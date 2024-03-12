const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"Makom412@",
    database: "pc_rent_platform",
});

connection.connect((err)=>{
    console.log(err); 
    if (err) console.log(err);
    else {
        console.log("Connected to the database!");
        // executeStatement();
    }
});

async function execute(sql, parameters=[]) {
    try{
        const result = await connection.promise().execute(sql, parameters);
        return result;
    } catch (err) {
        console.error(`Error executing query: ${sql}, error: ${err} `);
        throw err;
    }
}

module.exports = execute;

// async function executeStatement(){
    // READ
    // const [result ] = await connection
    //     .promise()
    //     .execute('SELECT * FROM `addresses` WHERE `id` = 1');
    //      console.log(result);

    // CREATE 
    // const result = await connection
    //     .promise()
    //     .execute(
    //         `INSERT INTO users (username, pass_encoded, email, birth_date, phone, address_id)
    //         VALUES(
    //             "Simona12",
    //             "ASD123ASD123",
    //             "simona111@simona.lt",
    //             "1991-11-11",
    //             "+370612233445",
    //             1
    //         )`
    //     );
    //      console.log(result)

    // UPDATE 
    // const result = await connection
    //     .promise()
    //     .execute(
    //         `UPDATE users SET username = 'Simona20', email = 'simonak3223@gmail.com' WHERE id=3;`
    //     );
    //     console.log(result)

    // DELETE 
    // const result = await connection
    //     .promise()
    //     .execute(
    //         `DELETE FROM users WHERE id=3;`
    //     );
    //     console.log(result)
    // };