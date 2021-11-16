import bcrypt from 'bcrypt';

const data = {
    users: [
        {
            firstName: 'Benjamin',
            lastName: 'Anderson',
            userName: 'NegativeDivinity',
            email: 'bcanderson0201@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            firstName: 'Mike',
            lastName: 'Bower',
            userName: 'PositiveDivinity',
            email: 'mbower@gmail.com',
            password: bcrypt.hashSync('1234', 8),
        },
    ]
}

export default data;