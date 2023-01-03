import AppError from "../../errors/AppError";
import { categoryRepository } from "../../repositories";

const listPropertiesByCategoryService = async (categoryId: string) => {
  const foundCategoryProperties = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      properties: true,
    },
  });

  if (!foundCategoryProperties) {
    throw new AppError("Property not found", 404);
  }

  return foundCategoryProperties;
};

export default listPropertiesByCategoryService;
