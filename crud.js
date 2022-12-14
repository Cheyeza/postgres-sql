const Pool = require('pg').Pool
const pool = new Pool({
    connectionLimit : 1000,
    host            : 'localhost',
    user            : 'admin',
    password        : 'admin12345',
    database        : 'api',
    port : 5432
})


const getUsers = (req, res) => {

        pool.query('SELECT * from users ', (error, results) => {
           if(error){
            throw error
           }
           res.status(200).json(results.rows)
        })

}

const putUsers = (req, res) => {

    const id = parseInt(req.params.id);
        const { name, email} = req.body

        pool.query('UPDATE users SET name = $1,email = $2 WHERE id = $3', [name, email, id] , (error, results) => {
           // connection.release() // return the connection to pool

           if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${id}`)

        })

    
}

const postUsers = (req, res) => {

    const { name, email } = req.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}

const deleteUser = (req, res) => {

    const id = parseInt(req.params.id);
    

        pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
           
            if(!err) {
                res.send(`User with  ID: ${[req.params.id]} has been deleted.`)
            } else {
                console.log(err)
            }

        })
    
}



module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUser,
  }

