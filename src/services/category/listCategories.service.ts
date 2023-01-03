import Categories from "../../entities/categories.entity";
import { categoryRepository } from "../../repositories";

const listCategoriesService = async (): Promise<Categories[]> => {
  const categories = await categoryRepository.find();
  return categories;
};

export default listCategoriesService;
