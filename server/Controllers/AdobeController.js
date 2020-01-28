

module.exports = (app,ps) => {

    const index = async () => {
        app.get("/api/Adobe",  function(req, res) {
    
               
                 ps.addCommand(`& "${require('path').resolve(__dirname, 'FindMissingAdobeUsers.ps1')}"`);
                 
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

