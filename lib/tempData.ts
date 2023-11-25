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
