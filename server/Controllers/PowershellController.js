

module.exports = (app,ps) => {

    const index = async () => {
        app.get("/api/GetUsers",  function(req, res) {
    
               
                 ps.addCommand(`& "${require('path').resolve(__dirname, '50Users.ps1')}"`);
                 
                 ps.invoke().then(output => {
                     
                     const users = output.split("\n")

                    res.status(200).send(users)
                 }).catch(error => {
                    res.status(422).send(error)
                 });

            
          });  
}


  

    return Object.create({
        index,
        // ...
    })
}

