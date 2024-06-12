db.createCollection('user');
db.user.insertOne({
    username: 'root',
    password: 'helloworld1208'
})

db.createCollection('assignments');
db.createCollection('courses');
db.createCollection('enrolled');
db.createCollection('submissions');
db.createCollection('users');
