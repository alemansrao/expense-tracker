import { createCategory } from '@/utils/api';

async function handleUserSignIn(user) {
    if (!user.email || !user.name) {
        console.error("User's email or name not provided.");
        return;
    }

    try {
        // Step 1: Check if user exists in the database
        const userExists = await checkIfUserExists(user.email);
        if (userExists) {
            console.log("User already exists in the database.");
            return;
        }

        // Step 2: Add new user to the database
        const userAdded = await addUserToDatabase(user);
        if (userAdded) {
            console.log("User added to the database.");
        }

        // Step 3: Create mandatory categories for the new user
        await createDefaultCategories(user);

    } catch (error) {
        console.error("Error handling user sign-in:", error);
    }
}

// Function to check if user exists
async function checkIfUserExists(email) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            method: "GET",
            credentials: "same-origin",
        });

        if (!response.ok) {
            console.error("Failed to fetch users:", response.statusText);
            return false;
        }

        const emails = await response.json();
        return emails.includes(email);
    } catch (error) {
        console.error("Error checking if user exists:", error);
        return false;
    }
}

// Function to add a new user to the database
async function addUserToDatabase(user) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ name: user.name, email: user.email }),
        });

        if (!response.ok) {
            console.error("Failed to add user:", response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error adding user to database:", error);
        return false;
    }
}

// Function to create default categories for a new user
async function createDefaultCategories(user) {
    const categories = [
        { type: "Expense", name: "Shopping", username: user.email, limit: 5000 },
        { type: "Expense", name: "Food", username: user.email, limit: 5000 },
        { type: "Expense", name: "Transfer", username: user.email, limit: 5000 },
    ];

    let allSuccess = true;

    for (const category of categories) {
        try {
            const response = await createCategory(category);

            if (response.ok) {
                console.log(`${category.name} category created successfully.`);
            } else {
                console.error(`Failed to create ${category.name} category:`, response.statusText);
                allSuccess = false;
            }
        } catch (error) {
            console.error(`Error creating ${category.name} category:`, error);
            allSuccess = false;
        }
    }

    if (allSuccess) {
        console.log("All mandatory categories added to the database.");
    } else {
        console.warn("Some categories failed to be added to the database.");
    }
}

export default handleUserSignIn;
