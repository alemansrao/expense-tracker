export const getCategory = async (username: string = "alemansrao") => {
  try {
    //add Access-Control-Allow-Origin
    const response = await fetch(`/api/category?username=${username}`,
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

export const getLimit = async (username: string = "alemansrao", category: string) => {
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