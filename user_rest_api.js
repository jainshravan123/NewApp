var mysql = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    
    //for hello world
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
    
    
    
    //Posting user details with address 
    router.post("/users",function(req,res){  
        
        
         var add_query  = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
         var add_table  = ["address", "country_id", "state_id", "city", "area1", "area2", "pincode", req.body.country_id, req.body.state_id, req.body.city, req.body.area1, req.body.area2, req.body.pincode];
         add_query      = mysql.format(add_query,add_table);
        connection.query(add_query, function(add_err, add_rows){
            
            if(add_err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query1"+add_err});
            }else{
        
                    var query1 = "INSERT into ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)"; 
                    var table1 = ["user_info", "first_name", "last_name", "dob", "email", "contact_number", "gender", "address_id", "picture_path", "user_status",  req.body.first_name, req.body.last_name, req.body.dob, req.body.email, req.body.contact_number, req.body.gender, add_rows.insertId, req.body.picture_path, req.body.user_status];

                    query1 = mysql.format(query1, table1);
                    connection.query(query1, function(err1, rows1){

                    if(err1){

                          res.json({"Error" : true, "Message" : "Error executing MySQL query1"+err1});

                    }else{

                           var query2 = "INSERT into ??(??, ??, ??, ??) VALUES(?,?,?,?)";
                           var table2 = ["login", "username", "password", "login_status", "user_info_id", req.body.username, req.body.password, req.body.login_status, rows1.insertId];
                           query2 = mysql.format(query2, table2); 
                           connection.query(query2, function(err2, rows2){

                           if(err2){
                                      res.json({"Error" : true, "Message" : "Error executing MySQL query2"+err2});

                                   }else{

                                      res.json({"Error" : false, "Message" : "User Added !", "data" : rows2.insertId});

                                   }});
                             }});   
          }});        
    });
            
    
    //Posting user address details
    router.post("/users/address/:user_id", function(req, res){
        
        var query1 = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var table1 = ["address", "country_id", "state_id", "city", "area1", "area2", "pincode", req.body.country_id, req.body.state_id, req.body.city, req.body.area1, req.body.area2, req.body.pincode];
        query1 = mysql.format(query1,table1);
        connection.query(query1, function(err1, rows1){
            
            if(err1){
                res.json({"Error" : true, "Message" : "Error executing MySQL query1"+err1});
            }else{
                
                var query2 = "UPDATE ?? SET ??=? WHERE ?? = ?";
                var table2 = ["user_info", "address_id", rows1.insertId, "user_id", req.param.user_id];
                query2 = mysql.format(query2, table2);
                connection.query(query2, function(err2, rows2){
                    
                     res.json({"Error" : false, "Message" : "Address Added !", "data" : rows2.insertId});
                    
                });
          }});
    });
    
    
    
     //Checking login Credentialas
     router.post("/users/check_login",function(req,res){
        var query = "select user_info_id from ?? where ?? = ? AND ?? = ?";
        var table = ["login", "username",req.body.username, "password", md5(req.param.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "result" : rows.length, "Users" : rows});
            }
        });
    });
    
    
    
     //Getting all of the users details
     router.get("/users",function(req,res){
     var query = " select u1.user_id, u1.first_name, u1.last_name, u1.dob, u1.email, u1.contact_number, u1.gender, u1.picture_path, u1.creation_time, u1.user_status, a1.area1, a1.area2, a1.city, s1.state_name, c1.country_name, a1.pincode from user_info u1, address a1, state s1, country c1 where u1.address_id = a1.address_id AND a1.state_id = s1.state_id AND a1.country_id = c1.country_id";
   
     connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });    
    
    
    
    //Getting a single user details based on user_id 
    router.get("/users/:user_id",function(req,res){
        var query = "select u1.user_id, u1.first_name, u1.last_name, u1.dob, u1.email, u1.contact_number, u1.gender, u1.picture_path, u1.creation_time, u1.user_status, a1.area1, a1.area2, a1.city, s1.state_name, c1.country_name, a1.pincode from user_info u1, address a1, state s1, country c1 where u1.address_id = a1.address_id AND a1.state_id = s1.state_id AND a1.country_id = c1.country_id AND ??=?";
        var table = ["u1.user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
    
    
    
    //Getting all countries
    router.get("/country", function(req, res){
        
        var query = "SELECT * FROM ??";
        var table = ["country"];
        query     = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
            
                res.json({"Error" : true, "Message" : "Error executing MySql Query!"+err});
                
             }else{
               
                 res.json({"Error" : false, "Message" : "Success", "Data" : rows});
                 
             }});
    });
    
    
    //Getting All states on the basis of country_id
    router.get("/state/:country_id", function(req, res){
        
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["state", "country_id", req.params.country_id];
        query     = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
            
                res.json({"Error" : true, "Message" : "Error executing MySql Query!"+err});
                
             }else{
               
                 res.json({"Error" : false, "Message" : "Success", "Num_Row" : rows.length, "Data" : rows});
                  
             }});
    });
    
    
    //Updating single user_info details on the basis of user_id
    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?";
        var table = ["user_info","first_name",req.body.first_name,"last_name",req.body.last_name, "dob", req.body.dob, "email", req.body.email, "contact_number", req.body.contact_number, "gender", req.body.gender, "picture_path", req.body.picture_path, "user_status", req.body.user_status, "user_id", req.body.user_id];
        
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the User Information for user_id "+req.body.user_id});
            }
        });
    });
        
    
    
    
    //Updating single user_address details on the basis of address_id
    router.put("/users/address/:address_id",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["address", "country_id", req.body.country_id, "state_id", req.body.state_id, "city", req.body.city, "area1", req.body.area1 , "area2", req.body.area2, "pincode", req.body.pincode, "address_id", req.params.address_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the address details for address id  "+req.body.address_id});
            }
        });
    });
    
   
 
    /*
     // for deleting a single user details 
     router.delete("/users/:email",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["login_table","username",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });
    */
}

module.exports = REST_ROUTER;