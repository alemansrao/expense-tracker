import { createCategory } from '@/utils/api';
async function handleUserSignIn(user) {
    if (!user.email || !user.name) {
        console.error("User's email or name not provided.");
        return;
    }

    try {
        // Check if user exists by fetching the list of emails from the users API
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            method: "GET",
            credentials: "same-origin",
        });

        if (!response.ok) {
            console.error("Failed to fetch users:", response.statusText);
            return;
        }

        const emails = await response.json();

        // If user exists, exit
        if (emails.includes(user.email)) {
            console.log("User already exists in the database.");
            return;
        }

        // Otherwise, add the user
        const addUserResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({ name: user.name, email: user.email }),
        });

        if (!addUserResponse.ok) {
            console.error("Failed to add user:", addUserResponse.statusText);
        } else {
            console.log("User added to the database.");
        }

        // if user added then add 3 category for the user with default limit of 5000
        const categoryData = {
            name: "Shopping",
            type: "Expense",
            username: user.email,
            limit: 5000
        };

        // Call the createCategory function
        const createCategoryResponse = await createCategory(categoryData);
        const categoryData1 = {
            name: "Savings",
            type: "Expense",
            username: user.email,
            limit: 5000
        };

        // Call the createCategory function
        const createCategoryResponse1 = await createCategory(categoryData1);
        const categoryData2 = {
            name: "Transfer",
            type: "Expense",
            username: user.email,
            limit: 5000
        };

        // Call the createCategory function
        const createCategoryResponse2 = await createCategory(categoryData2);

        if (!createCategoryResponse.ok) {
            console.error("Failed to create category:", createCategoryResponse.statusText);
        }
        else if (!createCategoryResponse1.ok) {
            console.error("Failed to create category:", createCategoryResponse1.statusText);
        }
        else if (!createCategoryResponse2.ok) {
            console.error("Failed to create category:", createCategoryResponse2.statusText);
        }
        else {
            console.log("Mandatory Categories added to the database.");
        }

    } catch (error) {
        console.error("Error handling user sign-in:", error);
    }
}


export default handleUserSignIn;
