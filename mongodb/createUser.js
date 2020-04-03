const user = {
    user: 'iachara',
    pwd: 'kokoacocoa',
    roles: [{
        role: 'readWrite',
        db: 'test'
    }]
};

db.createUser(user);