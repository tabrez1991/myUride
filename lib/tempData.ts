const userData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    username: `user${index + 1}`,
    avatar: getRandomAvatar(),
    fullName: getRandomFullName(),
    email: `user${index + 1}@example.com`,
    mobile: getRandomMobile(),
    status: index % 3 === 0 ? 'Active' : 'Inactive',
    dateCreated: getRandomDate(),
    lastLogin: getRandomDate(),
}));

function getRandomFullName() {
    const firstNames = ['John', 'Alice', 'Bob', 'Emma', 'David', 'Sophia', 'Michael', 'Olivia', 'William', 'Ella'];
    const lastNames = ['Doe', 'Johnson', 'Smith', 'White', 'Brown', 'Lee', 'Davis', 'Martin', 'Rodriguez', 'Taylor'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function getRandomDate() {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 365); // Random number of days ago
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - randomDaysAgo);

    return pastDate.toLocaleDateString();
}

function getRandomMobile() {
    const prefix = '+91'; // Assuming a country code for simplicity
    const randomNumbers = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit number

    return `${prefix}${randomNumbers}`;
}

function getRandomSeed() {
    return Math.floor(Math.random() * 50);
}

// Function to generate a random avatar URL
function getRandomAvatar() {
    const seed = getRandomSeed();
    return `https://mighty.tools/mockmind-api/content/human/${seed}.jpg`;
}

export const tempUserData = userData;