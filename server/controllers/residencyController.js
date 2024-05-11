import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//creating a residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).send({
      message: "residency created successfully",
      residency: residency,
    });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address is already there.");
    } else {
      throw new Error(err.message);
    }
  }
});

// getting all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.send(residencies);
});

//getting a residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id: id,
      },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
