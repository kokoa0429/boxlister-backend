const user = {
    user: 'boxlister',
    pwd: 'password',
    roles: [{
        role: 'readWrite',
        db: 'boxlister'
    }]
};

db.createUser(user);