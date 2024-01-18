import { statesList } from "./statesList";

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

export const tempPaymentRider = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    sNo: index + 1,
    transactionId: getTransactionId(),
    paymentDate: getRandomDate(),
    rider: getRandomFullName(),
    driver: getRandomFullName(),
    avatar: getRandomAvatar(),
    amount: getRandomAmount(),
    source: getRandomAddress(),
    destination: getRandomAddress(),
    fare: getRandomFare(),
    conenience: getRandomCon(),
    rating: getRandomRating(),
    paymentType: index % 3 === 0 ? 'Credit card' : 'Apple pay',
}));


export const tempNotifications = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    driver: getRandomFullName(),
    avatar: getRandomAvatar(),
    date: getRandomNotificationsDate(),
    content: getRandomContent(),
}));


function getRandomAddress() {
    const randomPair = statesList[Math.floor(Math.random() * statesList.length)];
    return randomPair.capital + ", " + randomPair?.state + ", " + "India"
}

function getTransactionId() {
    const prefix = 'T';
    const randomNumbers = Math.floor(10000000000000 + Math.random() * 9000000000);
    return `${prefix}${randomNumbers}`;
}

function getRandomAmount() {
    const prefix = '$';
    const randomNumbers = Math.floor(1000 + Math.random() * 900);
    return `${prefix}${randomNumbers}`;
}

function getRandomFare() {
    const prefix = '$';
    const randomNumbers = Math.floor(100 + Math.random() * 90);
    return `${prefix}${randomNumbers}`;
}

function getRandomCon() {
    const prefix = '$';
    const randomNumbers = Math.floor(10 + Math.random() * 10);
    return `${prefix}${randomNumbers}`;
}

function getRandomRating() {
    const randomNumber = Math.floor(1 + Math.random() * 5);
    return randomNumber;
}

function getRandomFullName() {
    const firstNames = ['John', 'Alice', 'Bob', 'Emma', 'David', 'Sophia', 'Michael', 'Olivia', 'William', 'Ella'];
    const lastNames = ['Doe', 'Johnson', 'Smith', 'White', 'Brown', 'Lee', 'Davis', 'Martin', 'Rodriguez', 'Taylor'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function getRandomContent() {
    const firstNames = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "Tomorrow is a new day with no mistakes in it yet.",
        "The sunsets are proof that no matter what happens, every day can end beautifully.",
        "Life is what happens when you're busy making other plans.",
        "Happiness is not something ready-made. It comes from your own actions.",
        "The only way to do great work is to love what you do.",
        "Every accomplishment starts with the decision to try.",
        "Be the change that you wish to see in the world.",
        "Time you enjoy wasting is not wasted time.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "Life is really simple, but we insist on making it complicated.",
        "Your time is limited, don't waste it living someone else's life."
    ];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];

    return `${randomFirstName}`;
}

function getRandomDate() {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 365); // Random number of days ago
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - randomDaysAgo);

    return pastDate.toLocaleDateString();
}

function getRandomNotificationsDate() {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 10); // Random number of days ago
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

export const tempRideData = [
    {
        "tripId": "TRPAA01",
        "status": "Assigned",
        "country": "India",
        "source": "New Delhi, Delhi, India",
        "destination": "Agra, U.P., India"
    },
    {
        "tripId": "TRPAA02",
        "status": "Not Assigned",
        "country": "India",
        "source": "Mumbai, Maharashtra, India",
        "destination": "Pune, Maharashtra, India"
    },
    {
        "tripId": "TRPAA03",
        "status": "Assigned",
        "country": "India",
        "source": "Kolkata, West Bengal, India",
        "destination": "Darjeeling, West Bengal, India"
    },
    {
        "tripId": "TRPAA04",
        "status": "Not Assigned",
        "country": "India",
        "source": "Chennai, Tamil Nadu, India",
        "destination": "Madurai, Tamil Nadu, India"
    },
    {
        "tripId": "TRPAA05",
        "status": "Assigned",
        "country": "India",
        "source": "Jaipur, Rajasthan, India",
        "destination": "Udaipur, Rajasthan, India"
    },
    {
        "tripId": "TRPAA06",
        "status": "Not Assigned",
        "country": "India",
        "source": "Bengaluru, Karnataka, India",
        "destination": "Mysuru, Karnataka, India"
    },
    {
        "tripId": "TRPAA07",
        "status": "Assigned",
        "country": "India",
        "source": "Hyderabad, Telangana, India",
        "destination": "Visakhapatnam, Andhra Pradesh, India"
    },
    {
        "tripId": "TRPAA08",
        "status": "Not Assigned",
        "country": "India",
        "source": "Ahmedabad, Gujarat, India",
        "destination": "Surat, Gujarat, India"
    },
    {
        "tripId": "TRPAA09",
        "status": "Assigned",
        "country": "India",
        "source": "Lucknow, U.P., India",
        "destination": "Kanpur, U.P., India"
    },
    {
        "tripId": "TRPAA10",
        "status": "Not Assigned",
        "country": "India",
        "source": "Chandigarh, Punjab, India",
        "destination": "Amritsar, Punjab, India"
    },
    {
        "tripId": "TRPAA11",
        "status": "Assigned",
        "country": "India",
        "source": "Bhopal, Madhya Pradesh, India",
        "destination": "Indore, Madhya Pradesh, India"
    },
    {
        "tripId": "TRPAA12",
        "status": "Not Assigned",
        "country": "India",
        "source": "Guwahati, Assam, India",
        "destination": "Shillong, Meghalaya, India"
    },
    {
        "tripId": "TRPAA13",
        "status": "Assigned",
        "country": "India",
        "source": "Patna, Bihar, India",
        "destination": "Gaya, Bihar, India"
    },
    {
        "tripId": "TRPAA14",
        "status": "Not Assigned",
        "country": "India",
        "source": "Thiruvananthapuram, Kerala, India",
        "destination": "Kochi, Kerala, India"
    },
    {
        "tripId": "TRPAA15",
        "status": "Assigned",
        "country": "India",
        "source": "Raipur, Chhattisgarh, India",
        "destination": "Bilaspur, Chhattisgarh, India"
    },
    {
        "tripId": "TRPAA16",
        "status": "Not Assigned",
        "country": "India",
        "source": "Ranchi, Jharkhand, India",
        "destination": "Jamshedpur, Jharkhand, India"
    },
    {
        "tripId": "TRPAA17",
        "status": "Assigned",
        "country": "India",
        "source": "Dehradun, Uttarakhand, India",
        "destination": "Haridwar, Uttarakhand, India"
    },
    {
        "tripId": "TRPAA18",
        "status": "Not Assigned",
        "country": "India",
        "source": "Bhubaneswar, Odisha, India",
        "destination": "Cuttack, Odisha, India"
    },
    {
        "tripId": "TRPAA19",
        "status": "Assigned",
        "country": "India",
        "source": "Srinagar, Jammu and Kashmir, India",
        "destination": "Jammu, Jammu and Kashmir, India"
    },
    {
        "tripId": "TRPAA20",
        "status": "Not Assigned",
        "country": "India",
        "source": "Vadodara, Gujarat, India",
        "destination": "Rajkot, Gujarat, India"
    }
]
