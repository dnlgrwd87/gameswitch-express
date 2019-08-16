const mongoose = require('mongoose');
const User = require('./models/User');
const Item = require('./models/Item');

module.exports.connect = () => {
    mongoose.connect('mongodb://localhost/gameswitch', { useNewUrlParser: true }, async () => {
        console.log('Connected to the database');
        
        // clear database first
        await User.collection.deleteMany({});
        await Item.collection.deleteMany({});

        const users = [
            {
                firstName: 'Daniel',
                lastName: 'Garwood',
                email: 'dgarwood@uncc.edu',
                password: '$2b$10$2HNUc/aodY/IkuBmY7g1ZOvBy4T5bBk4P1/hRJT2avCrQALf3LNxa'
            },
            {
                firstName: 'Cloud',
                lastName: 'Strife',
                email: 'cstrife@uncc.edu',
                password: '$2b$10$8CaOYe8fCcqaR2rhMHZU7O/HJrtgcYC4RP7yUnVo0TjRZOM6Sha6m'
            }
        ]

        await User.collection.insertMany(users);

        const user1 = users[0];
        const user2 = users[1];

        const games = [{
            postedBy: user1._id,
            itemName: 'Zelda: Breath of the Wild',
            catalogCategory: 'nintendo',
            description:
                'Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule In this stunning Open-Air Adventure. Now on Nintendo Switch, your journey is freer and more open than ever. Take your system anywhere, and adventure as Link any way you like.',
            rating: 5,
            platform: 'Nintendo Switch',
            genres: ['Action', 'Adventure'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81HN%2B-mL2WL._SL1500_.jpg'

        },
        {
            postedBy: user1._id,
            itemName: 'Super Smash Bros Ultimate',
            catalogCategory: 'nintendo',
            description:
                'Gaming icons clash in the ultimate brawl you can play anytime, anywhere! Smash rivals off the stage as new characters Simon Belmont and King K. Rool join Inkling, Ridley, and every fighter in Super Smash Bros. history. Enjoy enhanced speed and combat at new stages based on the Castlevania series, Super Mario Odyssey, and more!',
            rating: 5,
            platform: 'Nintendo Switch',
            genres: ['Fighting'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81bH3%2BDbvNL._SY679_.jpg'
        },
        {
            postedBy: user1._id,
            itemName: 'Super Mario Odyssey',
            catalogCategory: 'nintendo',
            description:
                'Explore incredible places far from the Mushroom Kingdom as you join Mario and his new ally Cappy on a massive, globe-trotting 3D adventure. Use amazing new abilities - like the power to capture and control objects, animals, and enemies - to collect Power Moons so you can power up the Odyssey airship and save Princess Peach from Bowser\'s wedding plans!',
            rating: 5,
            platform: 'Nintendo Switch',
            genres: ['Action', 'Platform'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/91JZdTYcjFL._SY679_.jpg'
        },
        {
            postedBy: user1._id,
            itemName: 'Anthem',
            catalogCategory: 'xbox',
            description:
                'Team with up to three other players in cooperative adventures that reward both combined effort and individual skill. Each player\'s choice of javelin exosuit will shape their contribution and strategic role. As you explore, you will discover a gripping story filled with unique and memorable characters. Seamless and intelligent matchmaking will ensure you can quickly and easily find other players to adventure alongside.',
            rating: 5,
            platform: 'Xbox One',
            genres: ['Action'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81UOzRKhXNL._SL1500_.jpg'
        },
        {
            postedBy: user2._id,
            itemName: 'Titanfall 2',
            catalogCategory: 'xbox',
            description:
                'Pilot and Titan unite as never before in Respawn Entertainment\'s highly anticipated Titanfall® 2. Featuring a single player campaign that explores the unique bond between man and machine, and backed by a deeper multiplayer experience, Titanfall 2 delivers fast-paced action brimming with inventive twists.',
            rating: 5,
            platform: 'Xbox One',
            genres: ['Shooter'],
            retailPrice: 49.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/816IMYzvv8L._SL1500_.jpg'
        },
        {
            postedBy: user2._id,
            itemName: 'The Elder Scrolls V: Skyrim',
            catalogCategory: 'xbox',
            description:
                'The Empire of Tamriel is on the edge. The High King of Skyrim has been murdered. Alliances form as claims to the throne are made. In the midst of this conflict, a far more dangerous, ancient evil is awakened. Dragons, long lost to the passages of the Elder Scrolls, have returned to Tamriel. The future of Skyrim, even the Empire itself, hangs in the balance as they wait for the prophesized Dragonborn to come; a hero born with the power of The Voice, and the only one who can stand amongst the dragons.',
            rating: 5,
            platform: 'Xbox One',
            genres: ['Role-Playing'],
            retailPrice: 39.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81dDIETeEiL._SL1500_.jpg'
        },
        {
            postedBy: user2._id,
            itemName: 'Kingdom Hearts III',
            catalogCategory: 'playstation',
            description:
                'KINGDOM HEARTS III tells the story of the power of friendship and light vs. darkness as Sora and his friends embark on a perilous adventure. Set in a vast array of Disney and Pixar worlds, KINGDOM HEARTS follows the journey of Sora, an unknowing heir to a spectacular power. Sora is joined by Donald Duck and Goofy to stop an evil force known as the Heartless from invading and overtaking the universe. Sora, Donald, and Goofy unite with iconic Disney-Pixar characters old and new to overcome tremendous challenges and persevere against the darkness threatening their worlds.',
            rating: 5,
            platform: 'Playstation 4',
            genres: ['Role-Playing'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/A109Z6CfX3L._SL1500_.jpg'
        },
        {
            postedBy: user2._id,
            itemName: 'Minecraft',
            catalogCategory: 'playstation',
            description:
                'Build with your imagination! Minecraft, the best-selling game on Xbox 360, is now available on Xbox One. Create and explore your very own world where the only limit is what you can imagine - just be sure to build a shelter before night comes to keep yourself safe from monsters. Play on your own, or with up to 4 players split screen, or 8 players online.',
            rating: 5,
            platform: 'Playstation 4',
            genres: ['Casual'],
            retailPrice: 19.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/51eR6YlIG-L._SX215_.jpg'
        },
        {
            postedBy: user2._id,
            itemName: 'Spider-Man',
            catalogCategory: 'playstation',
            description:
                'Starring the world\'s most iconic Super Hero, Spider-Man PS4 (working title) features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. From traversing with parkour and utilizing the environment, to new combat and blockbuster set pieces, it\'s Spider-Man unlike any you\'ve played before.',
            rating: 5,
            platform: 'Playstation 4',
            genres: ['Action'],
            retailPrice: 59.99,
            imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81d6JU6g1pL._SL1500_.jpg'
        }]

        await Item.collection.insertMany(games);

        console.log('Database populated');
    });
}