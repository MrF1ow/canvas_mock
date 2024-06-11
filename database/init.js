db.createCollection('user');
db.user.insertOne({
    username: 'root',
    password: 'helloworld1208'
})

db.createCollection('courses');
db.createCollection('assignments');
db.createCollection('submissions');
db.createCollection('users');