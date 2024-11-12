export const getCategory = async (username: string, type = 'all') => {
  try {
    //add Access-Control-Allow-Origin
    const response = await fetch(`/api/category?username=${username}&type=${type}`,
      { headers: { "Access-Control-Allow-Origin": "*" } });
    if (!response.ok) throw new Error("Failed to fetch categories");

    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const submitTransaction = async (transactionData: any) => {
  try {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData)
    });

    return response;
  } catch (error) {
    console.error("Error submitting transaction:", error);
  }
};

export const getLimit = async (username: string = "sharathrao99@gmail.com", category: string) => {
  try {
    const response = await fetch(`/api/limit?username=${username}&category=${category}`);
    if (!response.ok) throw new Error("Failed to fetch limit");
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching limit:", error);
    return 0;
  }
};

export const createCategory = async (categoryData: any) => {
  try {
    const response = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData)
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error)
    return error;
  }
}


export const updateLimit = async (limitData: any) => {
  try {
    const response = await fetch("/api/limit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(limitData)
    });
    return response;
  } catch (error) {
    return error;
  }
}

export const getWeeklyExpenses = async (username: string) => {
  try {
    // Calculate the start and end dates of the current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(5, 30, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek.setHours(5, 30, 0, 0);

    // Format dates to ISO strings for API compatibility
    const startDateISO = startOfWeek.toISOString();
    const endDateISO = endOfWeek.toISOString();
    // console.log(startDateISO, endDateISO);
    // Fetch expense transactions from the API
    const response = await fetch(
      `/api/transaction?username=${username}&startDate=${startDateISO}&endDate=${endDateISO}`,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );

    if (!response.ok) throw new Error("Failed to fetch weekly expenses");

    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error("Error fetching weekly expenses:", error);
    return [];
  }
};

export const fetchMonthlyTransactions = async (username: string) => {
  try {
    const startDate = new Date(new Date().setDate(1)); // First day of the month
    startDate.setHours(5, 30, 0, 0);
    const endDate = new Date(new Date().setMonth(startDate.getMonth() + 1, 0)); // Last day of the month
    endDate.setHours(5, 30, 0, 0);
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

    const response = await fetch(`/api/transaction?username=${username}&startDate=${startDateISO}&endDate=${endDateISO}`);
    if (!response.ok) {
      throw new Error("Error fetching transactions");
    }

    const data = await response.json();
    // console.log(data);
    return data.transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// export const insertUserData = (user: any, profile: any, account: any) => {
//   //insert data to db if not exists
//   console.log("user", user);
//   console.log("profile", profile);
//   console.log("account", account);
// }



