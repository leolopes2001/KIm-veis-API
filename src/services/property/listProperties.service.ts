import { propertyRepository } from "../../repositories";

const listPropertiesService = async () => {
  const properties = await propertyRepository.find();
  return properties;
};
export default listPropertiesService;
