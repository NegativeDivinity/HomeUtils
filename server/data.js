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
    ],
    contacts: [
        {
            name: 'Skylar',
            nickName: 'sky',
            phone: 8155648349,
            email: 'skylar@gmail.com',
            job: 'Helpdesk Technician',
            company: 'Epensmith',
        },
    ],
    todo: [
        {
            title: 'Bathroom',
            itemTime: '02/02/2001 5:21:25 AM',
        }
    ]
}

export default data;