const { promises: fsPromises, constants } = require("fs");
const { v4: uuidv4 } = require("uuid");

const saveImageInFile = async (file, { fieldname }) => {
  if (file?.fieldname !== fieldname || !file?.mimetype?.startsWith("image")) {
    return null;
  }
  const imageId = uuidv4();
  const extension = file.mimetype.split("/")[1];
  const link = `images/${imageId}.${extension}`;
  await fsPromises.writeFile(link, file.buffer);
  return link;
};

const removeImageFromFile = async (link) => {
  return fsPromises.unlink(link);
};

const isImageFileExist = async (link) => {
  try {
    await fsPromises.access(link, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  saveImageInFile,
  removeImageFromFile,
  isImageFileExist,
};
