import Categories from "../../entities/categories.entity";
import Properties from "../../entities/properties.entity";
import AppError from "../../errors/AppError";
import {
  IPropertyRequest,
  IPropertyResponse,
} from "../../interfaces/properties";
import {
  addresRepository,
  categoryRepository,
  propertyRepository,
} from "../../repositories";

const createPropertyService = async (
  propertyData: IPropertyRequest
): Promise<Properties | any> => {
  const categories = await categoryRepository.findOneBy({
    id: propertyData.categoryId,
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  
  const foundProperty = await propertyRepository.findOneBy({
    value: propertyData.value,
    size: propertyData.size,
    address: propertyData.address,
  });


  if (foundProperty) {
    throw new AppError("Property already registred", 409);
  }

 
  const foundAddress = await addresRepository.findOne({
    where: {
      district: propertyData.address.district,
    },
  });

  if (foundAddress) {
    throw new AppError("Address already registred", 400);
  }

  const address = await addresRepository.save(propertyData.address);

  const property = propertyRepository.create({
    value: propertyData.value,
    size: propertyData.size,
    address,
    category: categories,
  });

  const newProperty = await propertyRepository.save(property);

  return newProperty;
};

export default createPropertyService;
