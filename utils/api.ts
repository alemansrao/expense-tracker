export const getCategory = async (username: string = "alemansrao") => {
  try {
    const response = await fetch(`http://localhost:3000/api/category?username=${username}`);
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
    const response = await fetch("http://localhost:3000/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData)
    });

    return response;
  } catch (error) {
    console.error("Error submitting transaction:", error);
  }
};
