import AppError from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";
import { categoryRepository } from "../../repositories";

const createCategoryService = async (categoryRequest: ICategoryRequest) => {
  const foundCategory = await categoryRepository.findOne({
    where: {
      name: categoryRequest.name,
    },
    withDeleted: true,
  });

  if (foundCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoryRepository.create(categoryRequest);

  const newCategory = await categoryRepository.save(category);

  console.log(newCategory);

  return newCategory;
};

export default createCategoryService;
