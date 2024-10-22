// hooks/useCategories.ts
import { useState, useEffect } from "react";
import { getCategory } from "@/utils/api";

export const useCategories = (type: string = "Expense") => {
  const [allCategories, setAllCategories] = useState([]);
  const [allowedCategories, setAllowedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory('alemansrao');
      setAllCategories(categories);
      setAllowedCategories(categories.filter((cat: any) => cat.type === type));
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setAllowedCategories(allCategories.filter((cat: any) => cat.type === type));
  }, [type, allCategories]);

  return allowedCategories;
};
