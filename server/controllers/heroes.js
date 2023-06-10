const mongoose = require("mongoose");
const { Hero } = require("../models/Hero");
const { HeroImage } = require("../models/HeroImage");
const {
  saveImageInFile,
  removeImageFromFile,
  isImageFileExist,
} = require("../helpers/utils");

const findHeroes = async ({ limit, skip }) => {
  const heroes =
    limit > 0
      ? await Hero.find()
        .skip(skip ?? 0)
        .limit(limit)
      : await Hero.find();

  const heroIds = heroes.map((hero) => hero._id);
  const allHeroImages = await HeroImage.find({ hero_id: { $in: heroIds } });
  return heroes.map((hero) => {
    const images = allHeroImages.filter(
      (heroImage) => heroImage.hero_id.toString() === hero._id.toString()
    );
    return {
      id: hero._id,
      nickname: hero.nickname,
      real_name: hero.real_name,
      origin_description: hero.origin_description,
      superpowers: hero.superpowers,
      catch_phrase: hero.catch_phrase,
      images: images.map((image) => image.link),
    };
  });
};

const createHero = async (
  files,
  { nickname, real_name, origin_description, superpowers, catch_phrase }
) => {
  const links = files?.length
    ? await Promise.all(
      files.map(async (file) =>
        saveImageInFile(file, { fieldname: "images" })
      )
    )
    : [];

  const hero = new Hero({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
  });

  const savedHero = await hero.save();
  await HeroImage.insertMany(
    links.map((link) => {
      return {
        hero_id: savedHero._id,
        link,
      };
    })
  );

  return {
    id: savedHero._id,
    nickname: savedHero.nickname,
    real_name: savedHero.real_name,
    origin_description: savedHero.origin_description,
    superpowers: savedHero.superpowers,
    catch_phrase: savedHero.catch_phrase,
    images: links,
  };
};

const updateHero = async (
  id,
  file,
  {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    current_link,
  }
) => {
  const dataToUpdate = {
    ...(nickname ? { nickname } : {}),
    ...(real_name ? { real_name } : {}),
    ...(origin_description ? { origin_description } : {}),
    ...(superpowers ? { superpowers } : {}),
    ...(catch_phrase ? { catch_phrase } : {}),
  };

  if (current_link) {
    const isCurrentLinkValid = await isImageFileExist(current_link);
    if (!isCurrentLinkValid) {
      const error = new Error(`Current link is not valid`);
      error.statusCode = 404;
      throw error;
    }
  }

  const updateHero = await Hero.findByIdAndUpdate(id, dataToUpdate);
  if (!updateHero) {
    const error = new Error(`Resource doesn't exist`);
    error.statusCode = 404;
    throw error;
  }

  const link = await saveImageInFile(file, { fieldname: "image" });
  if (link) {
    const heroImage = new HeroImage({
      link,
      hero_id: updateHero._id,
    });
    const promises = [heroImage.save()];
    if (current_link) {
      promises.push(...[HeroImage.deleteOne({
        hero_id: updateHero._id,
        link: current_link,
      }),
      removeImageFromFile(current_link)]
      );
    }
    await Promise.all(promises);
  }

  const heroImages = await HeroImage.find({ hero_id: updateHero._id });
  return {
    id: updateHero._id,
    nickname: updateHero.nickname,
    real_name: updateHero.real_name,
    origin_description: updateHero.origin_description,
    superpowers: updateHero.superpowers,
    catch_phrase: updateHero.catch_phrase,
    images: heroImages.map((image) => image.link),
  };
};

const deleteHero = async (id) => {
  const images = await HeroImage.find({
    hero_id: new mongoose.Types.ObjectId(id),
  });

  const [deleted] = await Promise.all([
    Hero.findByIdAndRemove(id),
    HeroImage.deleteMany({ hero_id: new mongoose.Types.ObjectId(id) }),
    ...images.map((image) => removeImageFromFile(image.link)),
  ]);
  if (!deleted) {
    const error = new Error("Resource not found or has been deleted");
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  findHeroes,
  createHero,
  updateHero,
  deleteHero,
};
